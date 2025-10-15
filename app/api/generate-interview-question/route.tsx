import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { Buffer } from "buffer";
import axios from "axios";
import { aj } from "@/utils/arcjet";
import { currentUser } from "@clerk/nextjs/server";

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(request: NextRequest) {
    try {
    const user = await currentUser();
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;

    if (!user || !user.primaryEmailAddress) {
        return NextResponse.json({ error: "User or user email not found." }, { status: 401 });
    }

    const decision = await aj.protect(request, { userId: user.primaryEmailAddress.emailAddress, requested: 5 }); // Deduct 5 tokens from the bucket
    console.log("Arcjet decision", decision);

    if (decision?.reason && decision.isDenied()) {
        return NextResponse.json(
        { error: "Too Many Requests, try again after 24 hours b b b  b   ", reason: decision.reason },
        { status: 429 },
        );
    }


        if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: `upload-${Date.now()}.pdf`,
            isPrivateFile: false,
            useUniqueFileName: true,
        });
    
        const res = await axios.post('http://localhost:5678/webhook/generate-interview-question', {
            resumeUrl: uploadResponse?.url
        });
        console.log("Interview Questions:", res.data);
    
        // Parse the questions string from n8n
        const questionsString = res.data?.content?.parts?.[0]?.text;
        let questions = [];
        try {
            questions = JSON.parse(questionsString);
        } catch (e) {
            questions = [];
        }

        return NextResponse.json({ interviewQuestions: questions, resumeUrl: uploadResponse?.url }, { status: 200 });
    } else {
        const res = await axios.post('http://localhost:5678/webhook/generate-interview-question', {
            resumeUrl: null, 
            jobTitle: jobTitle,
            jobDescription: jobDescription
        });
        console.log("Interview Questions:", res.data);
    
        // Parse the questions string from n8n
        const questionsString = res.data?.content?.parts?.[0]?.text;
        let questions = [];
        try {
            questions = JSON.parse(questionsString);
        } catch (e) {
            questions = [];
        }

        return NextResponse.json({ interviewQuestions: questions, resumeUrl: null }, { status: 200 });

    }
    } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
}
}