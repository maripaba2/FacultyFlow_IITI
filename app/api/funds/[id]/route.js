import Entry from "@models/entry";
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
    const {name,amount,date} = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingFunds = await Entry.findById(params.id);

        if (!existingFunds) {
            return new Response("Funds not found", { status: 404 });
        }
        existingFunds.name=name;
        // existingFunds.place=place;
        existingFunds.amount=amount;
        existingFunds.date=date;
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
export const GET = async (request, { params }) => {
    const {name,amount,date,department,userId} = await request.json();
    
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingFunds = await Funds.find({ 
            _id: params.id,
            department: department // Replace 'desired_department' with the actual department you want to filter by
          });
          
        
        if (!existingFunds) {
            return new Response("Funds not found", { status: 404 });
        }
        
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
        await Entry.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Funds deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};