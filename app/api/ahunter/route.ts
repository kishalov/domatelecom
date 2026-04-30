import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const city = searchParams.get('city'); // Получаем город из запроса

  if (!query || query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const AHUNTER_TOKEN = process.env.AHUNTER_TOKEN;

  const apiUrl = new URL('https://ahunter.ru/site/suggest/address');
  apiUrl.searchParams.append('output', 'json');
  
  // Чтобы Ahunter искал в конкретном городе, 
  // склеиваем город и поисковый запрос улицы
  const fullQuery = city ? `${city}, ${query}` : query;
  apiUrl.searchParams.append('query', fullQuery);
  
  apiUrl.searchParams.append('token', AHUNTER_TOKEN || '');

  try {
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Ahunter API error');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ahunter Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}