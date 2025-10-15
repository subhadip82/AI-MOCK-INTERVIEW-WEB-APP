import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userTable: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    subscriptionPlan: v.optional(v.string()),
    subscriptionExpiry: v.optional(v.number()),
    paymentMethod: v.optional(v.string()),
    dailyInterviewsUsed: v.optional(v.number()),
    monthlyInterviewsUsed: v.optional(v.number()),
    lastResetDate: v.optional(v.number()),
  }),

  InterviewSessionTable: defineTable({
    createdAt: v.optional(v.number()),
    interviewQuestions: v.array(
      v.object({
        id: v.optional(v.string()),
        question: v.string(),
        answer: v.string(),
        category: v.optional(v.string()),
        difficulty: v.optional(v.string()),
        type: v.optional(v.string()),
        createdAt: v.optional(v.number()),
      })
    ),
    resumeUrl: v.optional(v.string()),
    uid: v.optional(v.id("userTable")),
    status: v.optional(v.string()),
    jobTitle: v.optional(v.union(v.string(), v.null())),
    jobDescription: v.optional(v.union(v.string(), v.null())),
    completedAt: v.optional(v.number()),
    
    // FIXED: Update feedback to be an object instead of string
    feedback: v.optional(
      v.object({
        overallScore: v.number(),
        strengths: v.array(v.string()),
        areasForImprovement: v.array(v.string()),
        detailedFeedback: v.string(),
        suggestedResources: v.array(v.string()),
      })
    ),
    
    // You can keep score as a separate field or remove it since it's now in feedback object
    score: v.optional(v.number()),
    
    totalQuestions: v.optional(v.number()),
    generatedAt: v.optional(v.number()),
    feedbackGeneratedAt: v.optional(v.number()), // ADD THIS FIELD
    
    chatHistory: v.optional(
      v.array(
        v.object({
          id: v.string(),
          type: v.string(),
          message: v.string(),
          timestamp: v.number(),
        })
      )
    ),
  }),
});