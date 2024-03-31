import { NextResponse } from "next/server";
import Funds from "@models/funds";
import { connectToDB } from "@utils/database";




export async function GET(request) {
    try {
        await connectToDB()

        const funds = await Funds.find({}).populate('creator')
        // const { searchParams } = new URL(request.url);
        // console.log(searchParams.get('query'))
        // const query = searchParams.get('query');

        // const filteredFunds = funds.filter((fund) => {
        //     console.log('H');
        //     console.log(fund.place.toLowerCase().includes(query.toLowerCase()));
        //     return fund.title.toLowerCase().includes(query.toLowerCase()) || fund.place.toLowerCase().includes(query.toLowerCase());
        // });

        console.log("oihohodhohd")
        return new Response(JSON.stringify(funds), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all funds", { status: 500 })
    }
}