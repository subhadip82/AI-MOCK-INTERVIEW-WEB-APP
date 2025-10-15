import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a reminder
export const createReminder = mutation({
  args: {
    userId: v.id("userTable"),
    interviewId: v.optional(v.id("InterviewSessionTable")),
    type: v.string(),
    message: v.string(),
    scheduledFor: v.number(),
  },
  handler: async (ctx, args) => {
    const reminderId = await ctx.db.insert("ReminderTable", {
      userId: args.userId,
      interviewId: args.interviewId,
      type: args.type,
      message: args.message,
      scheduledFor: args.scheduledFor,
      status: "pending",
      createdAt: Date.now(),
    });

    return reminderId;
  },
});

// Get user reminders
export const getUserReminders = query({
  args: {
    userId: v.id("userTable"),
  },
  handler: async (ctx, args) => {
    const reminders = await ctx.db
      .query("ReminderTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();

    return reminders;
  },
});

// Get pending reminders (for notifications)
export const getPendingReminders = query({
  args: {},
  handler: async (ctx, args) => {
    const now = Date.now();
    const reminders = await ctx.db
      .query("ReminderTable")
      .filter((q) => q.eq(q.field("status"), "pending"))
      .filter((q) => q.lte(q.field("scheduledFor"), now))
      .collect();

    return reminders;
  },
});

// Mark reminder as sent
export const markReminderSent = mutation({
  args: {
    reminderId: v.id("ReminderTable"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reminderId, {
      status: "sent",
    });
    return { success: true };
  },
});

// Cancel reminder
export const cancelReminder = mutation({
  args: {
    reminderId: v.id("ReminderTable"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reminderId, {
      status: "cancelled",
    });
    return { success: true };
  },
});

// Create interview reminder
export const createInterviewReminder = mutation({
  args: {
    userId: v.id("userTable"),
    interviewId: v.id("InterviewSessionTable"),
    scheduledFor: v.number(),
  },
  handler: async (ctx, args) => {
    const interview = await ctx.db.get(args.interviewId);
    if (!interview) throw new Error("Interview not found");

    const reminderId = await ctx.db.insert("ReminderTable", {
      userId: args.userId,
      interviewId: args.interviewId,
      type: "interview_reminder",
      message: `Don't forget about your interview for ${interview.jobTitle || 'the position'} scheduled for ${new Date(args.scheduledFor).toLocaleString()}`,
      scheduledFor: args.scheduledFor,
      status: "pending",
      createdAt: Date.now(),
    });

    return reminderId;
  },
});

// Create feedback ready reminder
export const createFeedbackReminder = mutation({
  args: {
    userId: v.id("userTable"),
    interviewId: v.id("InterviewSessionTable"),
  },
  handler: async (ctx, args) => {
    const interview = await ctx.db.get(args.interviewId);
    if (!interview) throw new Error("Interview not found");

    const reminderId = await ctx.db.insert("ReminderTable", {
      userId: args.userId,
      interviewId: args.interviewId,
      type: "feedback_ready",
      message: `Your feedback for the ${interview.jobTitle || 'interview'} is now ready! Check your dashboard to view detailed feedback and scores.`,
      scheduledFor: Date.now(),
      status: "pending",
      createdAt: Date.now(),
    });

    return reminderId;
  },
});

// Create subscription expiry reminder
export const createSubscriptionExpiryReminder = mutation({
  args: {
    userId: v.id("userTable"),
    expiryDate: v.number(),
  },
  handler: async (ctx, args) => {
    const reminderId = await ctx.db.insert("ReminderTable", {
      userId: args.userId,
      type: "subscription_expiry",
      message: `Your subscription will expire on ${new Date(args.expiryDate).toLocaleDateString()}. Renew now to continue enjoying unlimited interviews!`,
      scheduledFor: args.expiryDate - (7 * 24 * 60 * 60 * 1000), // 7 days before expiry
      status: "pending",
      createdAt: Date.now(),
    });

    return reminderId;
  },
});
