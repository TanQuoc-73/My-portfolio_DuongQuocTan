'use client'

import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (input.trim() === "") return;
    setMessages(prev => [...prev, input.trim()]);
    setInput("");
  }

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex flex-col border border-gray-300 rounded-lg shadow-lg bg-white transition-all duration-300 ${
        open ? "w-80 h-96" : "w-14 h-14"
      } overflow-hidden`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-center items-center bg-[#996633] text-white w-full h-14 rounded-t-lg transition"
        aria-label={open ? "Close chatbox" : "Open chatbox"}
      >
        {open ? "Chat" : "💬"}
      </button>

      {open && (
        <>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center mt-10">No messages yet</p>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-blue-100 text-blue-900 px-3 py-1 rounded max-w-xs break-words"
              >
                {msg}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={input}
              placeholder="Type message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="flex-grow border rounded px-3 py-1 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-[#996633] text-white rounded px-4 py-1 hover:bg-black/30 transition"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
