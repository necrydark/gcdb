// app/api/pageviews/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const posthogUrl = "https://eu.posthog.com" // or eu...
  const projectId = "80988"

  try {
    const url = `${posthogUrl}/api/projects/${projectId}/query/`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.POSTHOG_KEY!}`
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: `
            SELECT 
              toDate(timestamp) AS date,
              count() AS pageviews
            FROM events
            WHERE 
              event = '$pageview'
            GROUP BY date
            ORDER BY date DESC
          `
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `PostHog API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (error) {
    console.error('Error processing pageviews request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}