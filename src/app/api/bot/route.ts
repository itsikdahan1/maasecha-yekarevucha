// src/app/api/bot/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure the route is always dynamic

export async function GET(request: Request) {
  return NextResponse.json({ message: "API GET request is working!" });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "API POST request is working!" });
}