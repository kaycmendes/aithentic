import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Validate environment configuration first
    if (!process.env.CHUTES_API_BASE_URL || !process.env.CHUTES_API_KEY) {
      throw new Error('API configuration missing - check server environment variables');
    }

    const body = await request.json();

    const response = await axios.post(
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
    const processedText = response.data.choices[0].message.content;

    return NextResponse.json({ result: processedText });
  } catch (error: any) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
} 