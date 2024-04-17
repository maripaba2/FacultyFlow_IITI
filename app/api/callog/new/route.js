import Callog from "@models/callog";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { link,  userId} = await request.json();

    try {
        await connectToDB();
        const newCallog = new Callog({ creator: userId, Link:link });
        console.log(newCallog);
        console.log(link);
        await newCallog.save();
        return new Response(JSON.stringify(newCallog), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Callog", { status: 500 });
    }
}