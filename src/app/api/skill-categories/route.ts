import { NextResponse } from 'next/server';
import { getAllSkillCategories } from '@/server/services/skillCategory.service';

export async function GET() {
  try {
    const data = await getAllSkillCategories();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
