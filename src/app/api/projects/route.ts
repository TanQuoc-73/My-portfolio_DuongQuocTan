import { NextResponse } from 'next/server';
import { getAllProjects } from '@/server/services/project.service';

export async function GET() {
  try {
    const data = await getAllProjects();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = typeof error === 'object' && error !== null && 'message' in error
      ? (error as { message: string }).message
      : 'An unexpected error occurred';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
