import { v } from "convex/values";
// import { mutation } from "./_generated/server";
import { query, mutation } from './_generated/server';

export const saveInterviewQuestion = mutation({
  args: {
    questions: v.array(
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
    jobTitle: v.optional(v.union(v.string(), v.null())),
    jobDescription: v.optional(v.union(v.string(), v.null())),
    totalQuestions: v.optional(v.number()),
    generatedAt: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const validatedQuestions = args.questions.map((q, i) => ({
      id: q.id || `q_${Date.now()}_${i}`,
      question: q.question,
      answer: q.answer,
      category: q.category ?? "general",
      difficulty: q.difficulty ?? "medium",
      type: q.type ?? "behavioral",
      createdAt: q.createdAt ?? Date.now(),
    }));

    const interviewId = await ctx.db.insert("InterviewSessionTable", {
      createdAt: Date.now(),
      interviewQuestions: validatedQuestions,
      resumeUrl: args.resumeUrl ?? undefined,
      uid: args.uid ?? undefined,
      status: args.status ?? "pending",
      jobTitle: args.jobTitle ?? undefined,
      jobDescription: args.jobDescription ?? undefined,
      totalQuestions: args.totalQuestions ?? validatedQuestions.length,
      generatedAt: args.generatedAt ?? Date.now(),
    });

    console.log("✅ Interview saved with ID:", interviewId);
    return interviewId;
  },
});

// ADD THIS MISSING MUTATION
export const UpdateInterviewStatus = mutation({
  args: {
    interviewId: v.id("InterviewSessionTable"),
    status: v.string(),
    chatHistory: v.optional(v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        message: v.string(),
        timestamp: v.number(),
      })
    )),
  },
  handler: async (ctx, args) => {
    const { interviewId, status, chatHistory } = args;
    
    // Update the interview status
    await ctx.db.patch(interviewId, {
      status: status,
      ...(chatHistory && { chatHistory: chatHistory }),
      completedAt: status === "completed" ? Date.now() : undefined,
    });

    console.log(`✅ Interview ${interviewId} status updated to: ${status}`);
    return { success: true };
  },
});

// ADD THIS MUTATION FOR FEEDBACK
export const SaveInterviewFeedback = mutation({
  args: {
    interviewId: v.id("InterviewSessionTable"),
    feedback: v.object({
      overallScore: v.number(),
      strengths: v.array(v.string()),
      areasForImprovement: v.array(v.string()),
      detailedFeedback: v.string(),
      suggestedResources: v.array(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const { interviewId, feedback } = args;
    
    await ctx.db.patch(interviewId, {
      feedback: feedback, // Store the complete object
      feedbackGeneratedAt: Date.now(),
    });

    console.log(`✅ Feedback saved for interview: ${interviewId}`);
    return { success: true };
  },
});