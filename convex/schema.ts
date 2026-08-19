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
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),
});
