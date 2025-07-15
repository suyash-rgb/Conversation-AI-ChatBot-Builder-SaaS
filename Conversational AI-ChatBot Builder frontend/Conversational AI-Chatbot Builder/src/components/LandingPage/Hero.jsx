import { Bot } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full py-20 px-6 bg-gray-900 text-white text-center">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Bot size={48} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Build & Deploy Your Own Chatbot Visually
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Drag, drop, and deploy AI-powered chatbots with zero code. Perfect for websites, SaaS tools, and customer support.
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
        >
          Get Started Free
        </a>
      </div>
    </section>
  );
}