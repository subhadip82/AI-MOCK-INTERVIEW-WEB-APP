import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const body = await request.json();
    const { plan, paymentMethod, amount } = body;

    if (!plan || !paymentMethod || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate payment ID
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create payment record
    const paymentRecordId = await convex.mutation(api.subscription.createPayment, {
      userId: user.id as any,
      plan,
      amount,
      paymentMethod,
      paymentId,
    });

    // Generate payment details based on method
    let paymentDetails = {};

    if (paymentMethod === "upi") {
      paymentDetails = {
        upiId: "ai-interview@paytm",
        merchantName: "AI Interview Platform",
        amount: amount,
        currency: "INR",
        transactionId: paymentId,
        instructions: "Please complete the payment using your UPI app"
      };
    } else if (paymentMethod === "qr") {
      paymentDetails = {
        qrCode: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`, // Placeholder QR
        merchantName: "AI Interview Platform",
        amount: amount,
        currency: "INR",
        transactionId: paymentId,
        instructions: "Scan the QR code with your payment app"
      };
    } else if (paymentMethod === "card") {
      paymentDetails = {
        merchantName: "AI Interview Platform",
        amount: amount,
        currency: "INR",
        transactionId: paymentId,
        instructions: "Complete payment using your card"
      };
    }

    return NextResponse.json({
      success: true,
      paymentId: paymentRecordId,
      paymentDetails,
      message: "Payment initiated successfully"
    });

  } catch (error: any) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      { error: error.message || "Payment failed" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, status } = body;

    if (!paymentId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Complete payment
    await convex.mutation(api.subscription.completePayment, {
      paymentId: paymentId as any,
      status,
    });

    return NextResponse.json({
      success: true,
      message: "Payment status updated"
    });

  } catch (error: any) {
    console.error("Payment Update Error:", error);
    return NextResponse.json(
      { error: error.message || "Payment update failed" },
      { status: 500 }
    );
  }
}
