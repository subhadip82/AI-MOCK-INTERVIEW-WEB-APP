import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userTable: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    createdAt: v.number(),   // <-- Add this
    updatedAt: v.number(),   // <-- Add this
  }),
});