import Invent from "@models/invent";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const invent = await Invent.findById(params.id).populate("creator")
        if (!invent) return new Response("Inventory Not Found", { status: 404 });

        return new Response(JSON.stringify(invent), { status: 200 })

    } catch (error) {
        return new Response
        ("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const {title,place,deadline,type,price} = await request.json();
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingInventory = await Invent.findById(params.id);

        if (!existingInventory) {
            return new Response("Inventory not found", { status: 404 });
        }
        existingInventory.title=title;
        existingInventory.place=place;
        
        existingInventory.deadline=deadline;
        existingInventory.price=price;
        existingInventory.type=type;

        await existingInventory.save();

        return new Response("Successfully updated the Inventory", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Updating Inventory", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        
        // Find the prompt by ID and remove it
        await Invent.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Inventory deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};