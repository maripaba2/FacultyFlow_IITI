import Funds from "@models/funds";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { dep,tot,  userId} = await request.json();

    try {
        await connectToDB();
        const newFund = new Funds({ creator: userId, department:dep,price:tot });
        console.log('r');
        await newFund.save();
        return new Response(JSON.stringify(newFund), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Fund", { status: 500 });
    }
}
