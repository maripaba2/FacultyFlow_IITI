import Travel from "@models/travel";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const travel = await Travel.find({}).populate('creator')

        return new Response(JSON.stringify(travel), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all travel", { status: 500 })
    }
} 