import Document from "@models/document";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const documents = await Document.find({}).populate('creator')

        return new Response(JSON.stringify(documents), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all documents", { status: 500 })
    }
} 