import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { sendMessageToAnthropic } from '../lib/anthropic';
import type { Message } from './PindaricAssistant';

export function AnthropicTest() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setIsLoading(true);

    const newMessages = [...messages, { type: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await sendMessageToAnthropic(newMessages);
      setMessages([...newMessages, { type: 'assistant', content: response }]);
    } catch (err) {
      console.error('Error in test component:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Anthropic API Test</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="space-y-4 mb-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-white ml-12'
                  : 'bg-slate-100 mr-12'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="animate-spin" size={20} />
              <span>Claude is thinking...</span>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn-primary flex items-center gap-2"
            disabled={isLoading}
          >
            <Send size={20} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}