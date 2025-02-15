import { NextResponse } from 'next/server';
import axios from 'axios';

// Define type for filter options matching the filters used in the application
interface Filters {
  personality: number;
  vocabulary: number; 
  correctness: number;
  bias: number;
  anxiety: number;
  intent: number;
  emphasis: number;
  accent: string;
}

// Define the expected structure of the Chutes API response
interface ChutesResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function POST(request: Request) {
  try {
    // Validate environment configuration first
    if (!process.env.CHUTES_API_BASE_URL || !process.env.CHUTES_API_KEY) {
      throw new Error('API configuration missing - check server environment variables');
    }

    const body = await request.json();
    
    const response = await axios.post(
      // Use your server-side API base URL
      process.env.CHUTES_API_BASE_URL,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CHUTES_API_KEY}`
        },
        // Ensure axios throws on HTTP errors
        validateStatus: (status) => status >= 200 && status < 300
      }
    );

    // Extract the processed text from the external API response.
    // Assumes the external API returns a structure like:
    // { choices: [ { message: { content: "processed text" } } ] }
    const processedText = response.data.choices[0].message.content;

    // Return the processed text wrapped in a "result" field
    return NextResponse.json({ result: processedText });
  } catch (error: any) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
}
