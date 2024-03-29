import Funds from "@models/funds";
import { connectToDB } from "@utils/database";

// export const GET = async (request, { params }) => {
//     try {
//         await connectToDB()

//         const funds = await Funds.findById(params.id).populate("creator")
//         if (!funds) return new Response("Funds Not Found", { status: 404 });

//         return new Response(JSON.stringify(funds), { status: 200 })

//     } catch (error) {
//         return new Response
//         ("Internal terver Error", { status: 500 });
//     }
// }

export const PATCH = async (request, { params }) => {
    const {title, arrival} = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingFunds = await Funds.findById(params.id);

        if (!existingFunds) {
            return new Response("Funds not found", { status: 404 });
        }
        existingFunds.title=title;
        // existingFunds.place=place;
        existingFunds.arrival=arrival;
        // existingFunds.departure=departure;
        // existingFunds.price=price;
        // existingFunds.comment=comment;
        // existingFunds.link=link;
        // existingFunds.type=type;
             
        

        await existingFunds.save();
        console.log("akanksha");
        return new Response("Successfully updated the Funds", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Funds", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        
        // Find the prompt by ID and remove it
        await Funds.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Funds deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};