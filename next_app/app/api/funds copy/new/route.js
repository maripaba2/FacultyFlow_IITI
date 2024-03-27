import Funds from "@models/funds";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { title,place, arrival,departure,price,comment,link, type,   userId} = await request.json();

    try {
        await connectToDB();
        const newFund = new Funds({ creator: userId, title,place, arrival,departure,price,comment,link, type });

        await newFund.save();
        return new Response(JSON.stringify(newFund), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Fund", { status: 500 });
    }
}
