import Travel from "@models/travel";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { title,place, arrival,departure,comment,link, type,   userId} = await request.json();

    try {
        await connectToDB();
        const newTravel = new Travel({ creator: userId, title,place, arrival,departure,comment,link, type });

        await newTravel.save();
        return new Response(JSON.stringify(newTravel), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Travel", { status: 500 });
    }
}
