// src/pages/Messages.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

/**
 * Messages Page (Frontend-Only Mock Version)
 * ------------------------------------------
 * This page simulates a real chat system using:
 * - local mock conversations
 * - simple state-based message sending
 * 
 * When backend is ready:
 * - Replace fetchConversations() with GET /api/messages/:userId
 * - Replace sendMessage() with POST /api/messages
 */

export default function Messages() {
  const { user } = useAuth();

  // Mock conversation list
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  /** Mock initial load */
  useEffect(() => {
    const mock = [
      {
        chatId: "chat_1",
        partnerName: "Builder Dev",
        partnerId: "builder_123",
        lastMessage: "Thanks for checking my pitch!",
      },
      {
        chatId: "chat_2",
        partnerName: "Investor Alpha",
        partnerId: "investor_551",
        lastMessage: "Can you share your deck?",
      },
    ];
    setConversations(mock);
  }, []);

  /** When the user selects a conversation */
  const openChat = (chat) => {
    setActiveChat(chat);

    // Mock messages for both chats
    const mockMessages = {
      chat_1: [
        { sender: "builder_123", text: "Hey! Appreciate your interest.", time: "10:21 AM" },
        { sender: "me", text: "Loved your pitch!", time: "10:22 AM" },
      ],
      chat_2: [
        { sender: "investor_551", text: "Can you send more details?", time: "9:04 AM" },
      ],
    };

    setMessages(mockMessages[chat.chatId] || []);
  };

  /** Sending a message (mock, stored only in UI) */
  const sendMessage = () => {
    if (!draft.trim()) return;

    const newMessage = {
      sender: "me",
      text: draft,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setDraft("");

    // Update last message in conversation list
    setConversations((prev) =>
      prev.map((c) =>
        c.chatId === activeChat.chatId
          ? { ...c, lastMessage: newMessage.text }
          : c
      )
    );
  };

  if (!user)
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-xl font-bold">Messages</h2>
        <p className="text-gray-600 mt-2">Please log in to view your messages.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT — Conversations List */}
      <div className="bg-white shadow rounded p-4 h-[70vh] overflow-y-auto">
        <h3 className="font-semibold mb-4">Conversations</h3>

        {conversations.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => openChat(chat)}
            className={`p-3 rounded cursor-pointer mb-2 hover:bg-gray-100 ${
              activeChat?.chatId === chat.chatId ? "bg-gray-200" : ""
            }`}
          >
            <div className="font-medium">{chat.partnerName}</div>
            <div className="text-sm text-gray-600 truncate">{chat.lastMessage}</div>
          </div>
        ))}
      </div>

      {/* RIGHT — Chat Window */}
      <div className="md:col-span-2 bg-white shadow rounded p-4 flex flex-col h-[70vh]">
        {activeChat ? (
          <>
            <div className="font-semibold text-lg border-b pb-2">
              Chat with {activeChat.partnerName}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-xs p-2 rounded ${
                    m.sender === "me"
                      ? "bg-indigo-600 text-white self-end ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div>{m.text}</div>
                  <div className="text-xs opacity-70 mt-1">{m.time}</div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="border-t pt-2 flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message..."
                className="w-full border px-3 py-2 rounded"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-600 flex flex-col justify-center items-center h-full">
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
