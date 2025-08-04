import { NextResponse } from 'next/server';
import { getCommentsByProject } from '@/server/services/projectComment.service';
import type { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;

  if (!projectId) {
    return NextResponse.json({ success: false, message: 'Missing projectId' }, { status: 400 });
  }

  const projectIdNum = parseInt(projectId, 10);
  if (isNaN(projectIdNum)) {
    return NextResponse.json({ success: false, message: 'Invalid projectId' }, { status: 400 });
  }

  try {
    const data = await getCommentsByProject(projectIdNum);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
