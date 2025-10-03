import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { Buffer } from "buffer";

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: `upload-${Date.now()}.pdf`,
            isPrivateFile: false,
            useUniqueFileName: true,
        });

        return NextResponse.json({ url: uploadResponse.url }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}