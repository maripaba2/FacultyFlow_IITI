import Document from "@models/document";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { title,uploadLink,driveLink,   userId} = await request.json();

    try {
        await connectToDB();
        const newDocument = new Document({ creator: userId, title,uploadLink,driveLink });

        await newDocument.save();
        return new Response(JSON.stringify(newDocument), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Document", { status: 500 });
    }
}
