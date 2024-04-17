import Invent from "@models/invent";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    
    const { title,place,deadline,price,type,userId} = await request.json();
    console.log('k');
    try {
        await connectToDB();
        const newInventory = new Invent({ creator: userId, title:title, place:place,deadline:deadline,price:price,type:type});
        console.log('ki');
        await newInventory.save();
        console.log('k');
        return new Response(JSON.stringify(newInventory), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new Inventory", { status: 500 });
    }
}
