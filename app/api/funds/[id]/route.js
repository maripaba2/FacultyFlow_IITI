export const dynamic = 'force-dynamic'

import Entry from "@models/entry";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {
    const {name,amount,date} = await request.json();

    try {
        await connectToDB();

        const existingFunds = await Entry.findById(params.id);

        if (!existingFunds) {
            return new Response("Funds not found", { status: 404 });
        }
        existingFunds.name=name;
        existingFunds.amount=amount;
        existingFunds.date=date;


        await existingFunds.save();
        return new Response("Successfully updated the Funds", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Funds", { status: 500 });
    }
};
export const GET = async (request, { params }) => {
    const {name,amount,date,department,userId} = await request.json();
    
    try {
        await connectToDB();

        const existingFunds = await Funds.find({ 
            _id: params.id,
            department: department 
          });
          
        
        if (!existingFunds) {
            return new Response("Funds not found", { status: 404 });
        }

        await existingFunds.save();
        return new Response("Successfully updated the Funds", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Funds", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();

        await Entry.findByIdAndDelete(params.id);
        return new Response("Funds deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};