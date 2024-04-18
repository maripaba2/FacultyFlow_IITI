import Logs from "../../../models/logs";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const logs = await Logs.find({}).populate('creator')

        return new Response(JSON.stringify(logs), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all logs", { status: 500 })
    }
} 