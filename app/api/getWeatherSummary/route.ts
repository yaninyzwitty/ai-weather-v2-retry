import { NextResponse } from "next/server";
import openai from "@/lib/openai";
export async function POST(request: Request) {
    const { weatherData }: any = request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: 'Pretend that I am a weather news presenter on Live tv. Be energetic and full of charisma. Introduce yourself as Yaninyz witty and say you are live from WITTY Headquarters. State the city you are providing a summary for. Then give a summary for todaays`s weather only. Make it easier for the viewer to understand and knowwhat to do to prepare for those wrsther conditions such as wear spf if uv is high or wear heavy jacket and carry umbrella if its raining. Use the uv index data provided by the UV advice. Provide a joke on regard to the weather. Assume the data came from your team at the news office and not the user',
            },
            {
                role: 'system',
                content: `Hi there, can i get summary of today's weather. Use the following information to get the weather data: ${JSON.stringify(weatherData)}`,
            }
        ],

    });

    const { data } = response;

    return NextResponse.json(data.choices[0].message)

    
};

