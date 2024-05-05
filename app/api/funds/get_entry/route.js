import Entry from "@models/entry";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const user = searchParams.get('creator');

        await connectToDB();

        const funds = await Entry.find({creator: user});

        return new Response(JSON.stringify(funds), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all funds", { status: 500 })
    }
} 