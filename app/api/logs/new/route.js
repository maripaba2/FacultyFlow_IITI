import Logs from "../../../../models/logs";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        await connectToDB();
        const { userId, title, type, entry, price, date } = await request.json();

        const newLog = new Logs({
            creator: userId,
            title: title,
            type: type,
            entry: entry,
            price: price,
            date :date
        });
        console.log(newLog);
        await newLog.save();

        return new Response(JSON.stringify(newLog), { status: 201 });
    } catch (error) {
        console.error("Error creating new Log:", error);
        return new Response("Failed to create a new Log", { status: 500 });
    }
};
