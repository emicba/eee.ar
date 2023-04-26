import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const interRegular = fetch(new URL('../../assets/Inter-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);
const interBold = fetch(new URL('../../assets/Inter-Bold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export default async function handler(request: NextRequest) {
  const lightTheme = request.nextUrl.searchParams.get('light') === 'true';
  const [interRegularData, interBoldData] = await Promise.all([interRegular, interBold]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          backgroundColor: lightTheme ? '#ffffff' : 'rgb(24 24 27)',
          color: lightTheme ? 'rgb(24 24 27)' : 'rgb(255 255 255)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>eee.ar</div>
        <div style={{ marginTop: 20, color: 'rgb(156 163 175)' }}>Shorten your links : ^)</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegularData,
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBoldData,
          weight: 700,
        },
      ],
    }
  );
}
