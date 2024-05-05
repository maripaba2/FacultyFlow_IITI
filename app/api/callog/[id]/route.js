import Callog from "@models/callog";
import { connectToDB } from "@utils/database";

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        await Callog.findByIdAndDelete(params.id);
        return new Response("Callog deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};