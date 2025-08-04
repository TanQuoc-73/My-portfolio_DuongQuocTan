import { NextResponse } from 'next/server';
import { addProjectComment } from '@/server/services/projectComment.service';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { supabase } from '@/server/db/supabase';

async function ensureUserExists(userId: string, email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (!data) {
    const { error: insertError } = await supabase.from('users').insert({
      id: userId,
      email,
      created_at: new Date().toISOString(),
    });
    if (insertError) throw insertError;
  }
}

export async function POST(request: Request) {
  const supabaseClient = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabaseClient.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ success: false, message: 'Unauthorized: Bạn cần đăng nhập' }, { status: 401 });
  }

  try {
    await ensureUserExists(user.id, user.email ?? '');
    const body = await request.json();
    const data = await addProjectComment({
      ...body,
      author_id: user.id,
    });
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Lỗi server';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
