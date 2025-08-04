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
    // Tạo user mới nếu chưa tồn tại
    const { error: insertError } = await supabase.from('users').insert({
      id: userId,
      email: email,
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
    // Đảm bảo user có bản ghi trong bảng users
    await ensureUserExists(user.id, user.email ?? '');

    const body = await request.json();

    const data = await addProjectComment({
      ...body,
      author_id: user.id, // Lấy từ user đăng nhập
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Lỗi server' }, { status: 500 });
  }
}
