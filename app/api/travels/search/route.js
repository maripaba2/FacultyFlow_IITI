import { NextResponse } from "next/server";
import Travel from "@models/travel";
import { connectToDB } from "@utils/database";




export async function GET(request) {
    try {
        await connectToDB()

        const { searchParams } = new URL(request.url);
        const user = searchParams.get('creator');

        const funds = await Travel.find({creator: user});

        const query = searchParams.get('query');

        const filteredFunds = funds.filter((fund) => {
            return fund.title.toLowerCase().includes(query.toLowerCase()) || fund.place.toLowerCase().includes(query.toLowerCase()) || fund.departure.toLowerCase().includes(query.toLowerCase()) || fund.arrival.toLowerCase().includes(query.toLowerCase()) || fund.type.toLowerCase().includes(query.toLowerCase());
        });

        return new Response(JSON.stringify(filteredFunds), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all funds", { status: 500 })
    }
}