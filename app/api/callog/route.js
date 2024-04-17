import Callog from "@models/callog";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const callog = await Callog.find({}).populate('creator')

        return new Response(JSON.stringify(callog), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all callog", { status: 500 })
    }
}