import Logs from "../../../models/logs";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const user = searchParams.get('creator');

        await connectToDB()

        const logs = await Logs.find({creator: user});

        return new Response(JSON.stringify(logs), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all logs", { status: 500 })
    }
} 