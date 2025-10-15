import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Check if user can create interview based on subscription limits
export const canCreateInterview = query({
  args: {
    userId: v.id("userTable"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const now = Date.now();
    const today = new Date().toDateString();
    const lastReset = user.lastResetDate ? new Date(user.lastResetDate).toDateString() : null;

    // Reset daily counter if it's a new day
    if (lastReset !== today) {
      await ctx.db.patch(args.userId, {
        dailyInterviewsUsed: 0,
        lastResetDate: now,
      });
    }

    // Get current usage
    const dailyUsed = user.dailyInterviewsUsed || 0;
    const monthlyUsed = user.monthlyInterviewsUsed || 0;

    // Check subscription limits
    let canCreate = false;
    let reason = "";

    if (user.subscriptionPlan === "yearly") {
      canCreate = true; // Unlimited for yearly
      reason = "Yearly subscription - unlimited interviews";
    } else if (user.subscriptionPlan === "monthly") {
      if (monthlyUsed < 10) {
        canCreate = true;
        reason = `Monthly subscription - ${10 - monthlyUsed} interviews remaining`;
      } else {
        reason = "Monthly limit reached (10 interviews)";
      }
    } else {
      // Free plan - 2 interviews per day
      if (dailyUsed < 2) {
        canCreate = true;
        reason = `Free plan - ${2 - dailyUsed} interviews remaining today`;
      } else {
        reason = "Daily limit reached (2 interviews)";
      }
    }

    return {
      canCreate,
      reason,
      dailyUsed,
      monthlyUsed,
      plan: user.subscriptionPlan || "free",
    };
  },
});

// Increment interview usage
export const incrementInterviewUsage = mutation({
  args: {
    userId: v.id("userTable"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const now = Date.now();
    const today = new Date().toDateString();
    const lastReset = user.lastResetDate ? new Date(user.lastResetDate).toDateString() : null;

    // Reset counters if needed
    let dailyUsed = user.dailyInterviewsUsed || 0;
    let monthlyUsed = user.monthlyInterviewsUsed || 0;

    if (lastReset !== today) {
      dailyUsed = 0;
    }

    // Increment usage
    dailyUsed += 1;
    monthlyUsed += 1;

    await ctx.db.patch(args.userId, {
      dailyInterviewsUsed: dailyUsed,
      monthlyInterviewsUsed: monthlyUsed,
      lastResetDate: now,
    });

    return { success: true };
  },
});

// Create payment record
export const createPayment = mutation({
  args: {
    userId: v.id("userTable"),
    plan: v.string(),
    amount: v.number(),
    paymentMethod: v.string(),
    paymentId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const expiresAt = args.plan === "yearly" 
      ? now + (365 * 24 * 60 * 60 * 1000) // 1 year
      : now + (30 * 24 * 60 * 60 * 1000); // 1 month

    const paymentId = await ctx.db.insert("PaymentTable", {
      userId: args.userId,
      plan: args.plan,
      amount: args.amount,
      currency: "INR",
      paymentMethod: args.paymentMethod,
      paymentId: args.paymentId,
      status: "pending",
      createdAt: now,
      expiresAt,
    });

    return paymentId;
  },
});

// Complete payment and update subscription
export const completePayment = mutation({
  args: {
    paymentId: v.id("PaymentTable"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get(args.paymentId);
    if (!payment) throw new Error("Payment not found");

    await ctx.db.patch(args.paymentId, {
      status: args.status,
    });

    if (args.status === "completed") {
      // Update user subscription
      await ctx.db.patch(payment.userId, {
        subscriptionPlan: payment.plan,
        subscriptionExpiry: payment.expiresAt,
        paymentMethod: payment.paymentMethod,
        dailyInterviewsUsed: 0,
        monthlyInterviewsUsed: 0,
        lastResetDate: Date.now(),
      });

      // Create subscription reminder
      await ctx.db.insert("ReminderTable", {
        userId: payment.userId,
        type: "subscription_expiry",
        message: `Your ${payment.plan} subscription will expire on ${new Date(payment.expiresAt).toLocaleDateString()}`,
        scheduledFor: payment.expiresAt - (7 * 24 * 60 * 60 * 1000), // 7 days before expiry
        status: "pending",
        createdAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Get user subscription details
export const getUserSubscription = query({
  args: {
    userId: v.id("userTable"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const payments = await ctx.db
      .query("PaymentTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();

    return {
      plan: user.subscriptionPlan || "free",
      expiry: user.subscriptionExpiry,
      paymentMethod: user.paymentMethod,
      dailyUsed: user.dailyInterviewsUsed || 0,
      monthlyUsed: user.monthlyInterviewsUsed || 0,
      payments: payments.slice(0, 5), // Last 5 payments
    };
  },
});

// Get subscription plans
export const getSubscriptionPlans = query({
  args: {},
  handler: async (ctx, args) => {
    return [
      {
        id: "free",
        name: "Free Plan",
        price: 0,
        currency: "INR",
        period: "forever",
        interviews: "2 per day",
        features: [
          "2 interviews per day",
          "Basic AI feedback",
          "Standard questions",
          "Email support"
        ],
        popular: false
      },
      {
        id: "monthly",
        name: "Monthly Plan",
        price: 4,
        currency: "INR",
        period: "month",
        interviews: "10 per month",
        features: [
          "10 interviews per month",
          "Advanced AI feedback",
          "Custom question sets",
          "Priority support",
          "Video recording",
          "Export reports"
        ],
        popular: true
      },
      {
        id: "yearly",
        name: "Yearly Plan",
        price: 10,
        currency: "INR",
        period: "year",
        interviews: "Unlimited",
        features: [
          "Unlimited interviews",
          "Advanced AI feedback",
          "Custom question sets",
          "Priority support",
          "Video recording",
          "Export reports",
          "API access",
          "Custom branding"
        ],
        popular: false
      }
    ];
  },
});
