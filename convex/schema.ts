import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  assistanceRequests: defineTable({
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
    status: v.union(
      v.literal("pending"),
      v.literal("matching"),
      v.literal("assigned"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    // Stable, globally unique WorkOS/Convex identity (identity.tokenIdentifier,
    // i.e. sub+iss) that owns this request. Optional only because a handful of
    // documents created before authentication existed have no owner — every
    // request created through createAssistanceRequest always sets it.
    ownerId: v.optional(v.string()),
  })
    .index("by_owner_createdAt", ["ownerId", "createdAt"])
    .index("by_owner_status", ["ownerId", "status"]),
});
