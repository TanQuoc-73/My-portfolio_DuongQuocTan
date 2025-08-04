'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Giả sử gọi API hoặc gửi mail ở đây
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fff9f0] text-[#322410] px-6 py-16 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-10 text-[#996633]">Contact Me</h1>
      
      {submitted ? (
        <div className="p-6 bg-green-100 border border-green-400 rounded text-green-700 text-center mb-8">
          Cảm ơn bạn đã gửi liên hệ! Tôi sẽ phản hồi sớm nhất có thể.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border border-[#996633] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#996633]"
              placeholder="Your name"
              disabled={submitting}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border border-[#996633] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#996633]"
              placeholder="Your email"
              disabled={submitting}
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded border border-[#996633] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#996633]"
              placeholder="Write your message here..."
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#996633] text-white font-semibold rounded px-6 py-3 hover:bg-[#7a5e31] transition disabled:opacity-60"
          >
            {submitting ? 'Đang gửi...' : 'Send Message'}
          </button>
        </form>
      )}

      <div className="mt-16 border-t border-[#996633] pt-10 text-[#7a6348]">
        <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-3"><FaEnvelope /> <a href="mailto:your.email@example.com" className="underline hover:text-[#996633]">your.email@example.com</a></li>
          <li className="flex items-center gap-3"><FaPhone /> <a href="tel:+84123456789" className="underline hover:text-[#996633]">(+84) 123 456 789</a></li>
          <li className="flex items-center gap-3"><FaMapMarkerAlt /> Hanoi, Vietnam</li>
        </ul>

        <div className="mt-6 flex gap-6 text-2xl">
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#996633]"><FaLinkedin /></a>
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#996633]"><FaGithub /></a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#996633]"><FaTwitter /></a>
        </div>
      </div>
    </div>
  );
}
