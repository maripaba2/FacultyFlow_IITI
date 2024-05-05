const { GoogleGenerativeAI } = require("@google/generative-ai");
import { NextResponse } from "next/server";
require('dotenv').config();

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function POST(request) {
    const { messages } = await request.json();
    console.log(messages);

    try {
        const result = await model.generateContent(messages);
        const data = (result.response).text();
 
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all funds", { status: 500 })
    }
}