import { NextResponse } from "next/server";
import Travel from "@models/travel";
import { connectToDB } from "@utils/database";




export async function GET(request) {
    try {
        await connectToDB()

        const funds = await Travel.find({}).populate('creator')
        const { searchParams } = new URL(request.url);
    // console.log(searchParams.get('query'))
    const query = searchParams.get('query');

    const filteredFunds = funds.filter((fund) => {
        // console.log(fund.place.toLowerCase().includes(query.toLowerCase()));
        return fund.title.toLowerCase().includes(query.toLowerCase()) || fund.place.toLowerCase().includes(query.toLowerCase()) || fund.departure.toLowerCase().includes(query.toLowerCase()) || fund.arrival.toLowerCase().includes(query.toLowerCase()) || fund.type.toLowerCase().includes(query.toLowerCase());
    });
        // console.log()
        return new Response(JSON.stringify(filteredFunds), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all funds", { status: 500 })
    }
}