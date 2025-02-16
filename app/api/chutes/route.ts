import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model } = body;

    // Check which API to use based on the model
    if (model.includes('deepseek/deepseek-chat')) {
      // OpenRouter API call
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        body,
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
            'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
            'X-Title': 'AI-thentic',
            'Content-Type': 'application/json'
          }
        }
      );
      return NextResponse.json({ result: response.data.choices[0].message.content });
    } else {
      // Chutes API call
      const response = await axios.post(
        process.env.CHUTES_API_BASE_URL!,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CHUTES_API_KEY}`
          }
        }
      );
      return NextResponse.json({ result: response.data.choices[0].message.content });
    }
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
} 