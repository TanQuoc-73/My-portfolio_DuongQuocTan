import { NextResponse } from 'next/server';
import { getCommentsByProject } from '@/server/services/projectComment.service';

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  if (!params || !params.projectId) {
    return NextResponse.json({ success: false, message: 'Missing projectId' }, { status: 400 });
  }

  const projectId = parseInt(params.projectId, 10);
  if (isNaN(projectId)) {
    return NextResponse.json({ success: false, message: 'Invalid projectId' }, { status: 400 });
  }

  try {
    const data = await getCommentsByProject(projectId);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
