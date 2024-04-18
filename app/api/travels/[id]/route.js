import Travel from "@models/travel";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const travel = await Travel.findById(params.id).populate("creator")
        if (!travel) return new Response("Travel Not Found", { status: 404 });

        return new Response(JSON.stringify(travel), { status: 200 })

    } catch (error) {
        return new Response
        ("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const {title,place, arrival,departure,price,comment,link, type} = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingTravel = await Travel.findById(params.id);

        if (!existingTravel) {
            return new Response("Travel not found", { status: 404 });
        }
        existingTravel.title=title;
        existingTravel.place=place;
        existingTravel.arrival=arrival;
        existingTravel.departure=departure;
        existingTravel.price=price;
        existingTravel.comment=comment;
        existingTravel.link=link;
        existingTravel.type=type;
             
        

        await existingTravel.save();

        return new Response("Successfully updated the Travel", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Travel", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        
        // Find the prompt by ID and remove it
        await Travel.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Travel deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};