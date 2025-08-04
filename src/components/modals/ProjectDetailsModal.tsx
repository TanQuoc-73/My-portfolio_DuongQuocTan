'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { FaStar } from 'react-icons/fa';
import { Project } from '@/types/project';
import { ProjectComment } from '@/types/project-comment';
import { useProjectComments } from '@/hooks/useProjectComments';
import { useAddProjectComment } from '@/hooks/useAddProjectComment';

type Props = {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectDetailsModal({ project, isOpen, onClose }: Props) {
  const { comments, loading: loadingComments, error: commentsError, setComments } = useProjectComments(project.id);
  const { addComment, loading: submitting, error: submitError } = useAddProjectComment();

  const [commentContent, setCommentContent] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submittedMsg, setSubmittedMsg] = useState('');

  // Tính điểm trung bình rating
  const averageRating =
    comments.length === 0
      ? 0
      : comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || rating === null) {
      alert('Vui lòng nhập nội dung bình luận và đánh giá sao.');
      return;
    }
    try {
      const newComment = await addComment({
        project_id: project.id,
        content: commentContent,
        rating,
      });
      setComments([newComment, ...comments]);
      setCommentContent('');
      setRating(null);
      setSubmittedMsg('Cảm ơn bạn đã gửi bình luận, chờ duyệt!');
    } catch {
      setSubmittedMsg('Lỗi gửi bình luận, vui lòng thử lại.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-[#996633] mb-2">{project.name}</h3>

      {/* Hiển thị điểm đánh giá trung bình */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-semibold text-[#996633]">Điểm đánh giá trung bình:</span>
        <span className="text-yellow-500 font-bold text-xl">{averageRating.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`h-5 w-5 ${
                num <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {project.cover_url && (
        <img
          src={project.cover_url}
          alt={`Cover image of ${project.name}`}
          className="rounded-lg mb-4 w-full object-cover max-h-80"
        />
      )}
      <p className="mb-6 text-[#7a6348]">{project.description}</p>

      <section>
        <h4 className="text-lg font-semibold text-[#996633] mb-3">Bình luận và đánh giá</h4>
        {loadingComments ? (
          <p>Đang tải bình luận...</p>
        ) : commentsError ? (
          <p className="text-red-600">Lỗi tải bình luận: {commentsError}</p>
        ) : comments.length === 0 ? (
          <p className="text-[#7a6348] mb-4">Chưa có bình luận nào.</p>
        ) : (
          <div className="max-h-60 overflow-auto mb-4">
            {comments.map((c: ProjectComment & { author_name?: string }) => (
              <div key={c.id} className="mb-3 border rounded p-3 bg-[#fff9f0]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-[#7a5e29]">{c.author_name}</span>
                  <div className="flex">
                    {[...Array(c.rating || 0)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-[#322410]">{c.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h4 className="text-lg font-semibold text-[#996633] mb-2">Gửi bình luận mới</h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            placeholder="Viết bình luận..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            rows={3}
            className="resize-none rounded border border-[#996633] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#996633]"
            disabled={submitting}
            required
          />
          <div>
            <label className="block mb-1 font-semibold text-[#996633]">Đánh giá sao:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={rating !== null && star <= rating}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-[#996633] text-white font-semibold py-2 rounded hover:bg-[#7a5e31] transition disabled:opacity-50"
          >
            {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
          </button>
          {submittedMsg && <p className="text-green-600 mt-2">{submittedMsg}</p>}
          {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
        </form>
      </section>
    </Modal>
  );
}

function Star({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      stroke="none"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.382 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.382-2.455a1 1 0 00-1.175 0l-3.382 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.287-3.97z" />
    </svg>
  );
}
