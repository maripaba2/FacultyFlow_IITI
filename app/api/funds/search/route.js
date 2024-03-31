import { NextResponse } from "next/server";
import Funds from "@models/funds";
import { connectToDB } from "@utils/database";




export async function GET(request) {
    try {
        await connectToDB()

        const funds = await Funds.find({}).populate('creator')
        const { searchParams } = new URL(request.url);
    // console.log(searchParams.get('query'))
    const query = searchParams.get('query');

    const filteredFunds = funds.filter((fund) => {
<<<<<<< HEAD
        return fund.title.toLowerCase().includes(query.toLowerCase()) || fund.place.toLowerCase().includes(query.toLowerCase());
    });
=======
        // console.log(fund.place.toLowerCase().includes(query.toLowerCase()));
        return fund.title.toLowerCase().includes(query.toLowerCase()) || fund.place.toLowerCase().includes(query.toLowerCase());
    });
        // console.log()
>>>>>>> 6b238012caa26af08a202b1219c7510b121b604f
        return new Response(JSON.stringify(filteredFunds), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all funds", { status: 500 })
    }
}