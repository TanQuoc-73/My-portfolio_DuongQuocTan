import { NextResponse } from 'next/server';
import { supabase } from '@/server/db/supabase';

export async function GET() {
  const { data, error } = await supabase.from('posts').select('*').limit(1);
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}
