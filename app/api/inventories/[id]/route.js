import Inventory from "@models/inventory";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const inventory = await Inventory.findById(params.id).populate("creator")
        if (!inventory) return new Response("Inventory Not Found", { status: 404 });

        return new Response(JSON.stringify(inventory), { status: 200 })

    } catch (error) {
        return new Response
        ("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const {title,place, arrival,departure,price,comment,link, type,company} = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingInventory = await Inventory.findById(params.id);

        if (!existingInventory) {
            return new Response("Inventory not found", { status: 404 });
        }
        existingInventory.title=title;
        existingInventory.place=place;
        existingInventory.arrival=arrival;
        existingInventory.departure=departure;
        existingInventory.price=price;
        existingInventory.comment=comment;
        existingInventory.link=link;
        existingInventory.type=type;
        existingInventory.company=company;
             
        

        await existingInventory.save();

        return new Response("Successfully updated the Inventory", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Inventory", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        
        // Find the prompt by ID and remove it
        await Inventory.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Inventory deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};