import { aj } from "@/utils/arcjet";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!aj) {
      console.error("Arcjet not initialized");
      return NextResponse.json({ error: "Service configuration error" }, { status: 500 });
    }

    // Use aj.protect instead of aj.protectRequest
   const decision = await aj.protect(request, { 
  userId, 
  requested: 5 
});

    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");

    // Your AI interview generation logic here
    return NextResponse.json({
      interviewQuestions: {
        questions: [] // Replace with real generated questions
      },
      resumeUrl: null
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
