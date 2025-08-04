'use client';

import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FcGoogle } from 'react-icons/fc';

export default function SupabaseAuth() {
  const supabase = createClientComponentClient();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Lỗi đăng nhập:', error.message);
      alert('Đăng nhập thất bại! Vui lòng thử lại.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-4"
      style={{
        fontFamily: 'inherit'
      }}
    >
      <div className="text-center text-base text-[#996633] font-semibold tracking-wide mb-2">
        Đăng nhập để sử dụng đầy đủ chức năng
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-3 w-full justify-center py-3 px-4 rounded-xl font-semibold shadow border border-[#996633] bg-white text-[#996633] hover:bg-[#996633] hover:text-white transition-all duration-200"
      >
        <FcGoogle className="text-2xl bg-white rounded-full" />
        <span>Đăng nhập với Google</span>
      </button>
    </div>
  );
}
