import Inventory from "@models/inventory";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const inventory = await Inventory.find({}).populate('creator')

        return new Response(JSON.stringify(inventory), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Inventory", { status: 500 })
    }
} 