import Invent from "@models/invent";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()
        const { searchParams } = new URL(request.url);
        const user = searchParams.get('creator');

        const funds = await Invent.find({user});

        const currentDate = new Date();
        // const currentMonth = currentDate.getMonth();
        const startOfWeek = new Date(currentDate);
        // startOfWeek.setHours(0, 0, 0, 0 - currentDate.getDay()); // Set to the first day of the week (Sunday)
        
        const endOfWeek = new Date(startOfWeek);
        
endOfWeek.setDate(startOfWeek.getDate() + 7);
        
        const filteredFunds = funds.filter(fund => {
            const arrivalDate = new Date(fund.deadline);
            // return arrivalDate.getMonth() === currentMonth;
            return (arrivalDate >= startOfWeek &&
            arrivalDate <= endOfWeek );
        });

        const deadlineDates = filteredFunds.map(fund => {
            const arrivalDate = new Date(fund.deadline);
            return {
                fundId: fund._id,
                name:fund.title, // Include fund ID if needed
                deadlineDate: new Date(arrivalDate.setDate(arrivalDate.getDate()+1)) // Set the deadline to be one day before the arrival
            };
        });

        // Send the filtered deadline dates as a response
        return new Response(JSON.stringify(deadlineDates), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch funds", { status: 500 });
    }
}