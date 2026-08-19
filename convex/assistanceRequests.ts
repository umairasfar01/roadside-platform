import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";

/**
 * Returns the authenticated caller's identity, or throws if signed out.
 * Uses `tokenIdentifier` (sub+iss) rather than `subject` alone, since
 * `subject` is only unique within a single identity provider.
 */
async function requireAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized: you must be signed in to do this.");
  }
  return identity;
}

export const createAssistanceRequest = mutation({
  args: {
    vehicleType: v.union(
      v.literal("car"),
      v.literal("van"),
      v.literal("motorcycle"),
      v.literal("three-wheeler"),
      v.literal("bus"),
      v.literal("lorry"),
    ),
    issueType: v.union(
      v.literal("tire"),
      v.literal("battery"),
      v.literal("fuel"),
      v.literal("engine"),
      v.literal("brake"),
      v.literal("towing"),
      v.literal("overheating"),
      v.literal("other"),
    ),
    location: v.string(),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuthenticatedUser(ctx);
    const now = Date.now();

    return await ctx.db.insert("assistanceRequests", {
      vehicleType: args.vehicleType,
      issueType: args.issueType,
      location: args.location,
      details: args.details,
      status: "pending",
      createdAt: now,
      updatedAt: now,
      ownerId: identity.tokenIdentifier,
    });
  },
});

/** The authenticated caller's own assistance requests, newest-first. */
export const listAssistanceRequests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuthenticatedUser(ctx);

    return await ctx.db
      .query("assistanceRequests")
      .withIndex("by_owner_createdAt", (q) => q.eq("ownerId", identity.tokenIdentifier))
      .order("desc")
      .take(20);
  },
});

const ACTIVE_STATUSES = ["pending", "matching", "assigned", "in_progress"] as const;

/**
 * The authenticated caller's newest request that hasn't reached a terminal
 * status yet, or null if none.
 */
export const getActiveAssistanceRequest = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuthenticatedUser(ctx);

    const newestPerStatus = await Promise.all(
      ACTIVE_STATUSES.map((status) =>
        ctx.db
          .query("assistanceRequests")
          .withIndex("by_owner_status", (q) =>
            q.eq("ownerId", identity.tokenIdentifier).eq("status", status),
          )
          .order("desc")
          .first(),
      ),
    );

    return newestPerStatus.reduce<(typeof newestPerStatus)[number]>((newest, candidate) => {
      if (!candidate) return newest;
      if (!newest || candidate.createdAt > newest.createdAt) return candidate;
      return newest;
    }, null);
  },
});

type RequestStatus =
  | "pending"
  | "matching"
  | "assigned"
  | "in_progress"
  | "completed"
  | "cancelled";

// The only status this request may move to next. Terminal states have no
// outgoing transitions, and a status never transitions to itself.
const ALLOWED_NEXT_STATUS: Record<RequestStatus, RequestStatus[]> = {
  pending: ["matching", "cancelled"],
  matching: ["assigned", "cancelled"],
  assigned: ["in_progress", "cancelled"],
  in_progress: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

/**
 * Moves an assistance request to its next lifecycle status. Only `status`
 * and `updatedAt` are ever written; every other field is left untouched.
 * Backend infrastructure for a future mechanic/admin workflow — not called
 * from the customer-facing UI in this phase.
 *
 * KNOWN GAP (tracked for the future mechanic/admin auth phase, not fixed
 * here): this mutation does not check that the caller owns — or is the
 * assigned mechanic/admin for — the request it's changing. Anyone holding a
 * valid request ID and an authenticated session can currently transition any
 * request. Scope this once mechanic/admin roles exist; do not expand this
 * phase to build that authorization model now.
 */
export const updateAssistanceRequestStatus = mutation({
  args: {
    id: v.id("assistanceRequests"),
    status: v.union(
      v.literal("pending"),
      v.literal("matching"),
      v.literal("assigned"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get("assistanceRequests", args.id);
    if (!existing) {
      throw new Error(`Assistance request "${args.id}" does not exist.`);
    }

    if (!ALLOWED_NEXT_STATUS[existing.status].includes(args.status)) {
      throw new Error(
        `Cannot transition assistance request from "${existing.status}" to "${args.status}".`,
      );
    }

    await ctx.db.patch("assistanceRequests", args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return await ctx.db.get("assistanceRequests", args.id);
  },
});
