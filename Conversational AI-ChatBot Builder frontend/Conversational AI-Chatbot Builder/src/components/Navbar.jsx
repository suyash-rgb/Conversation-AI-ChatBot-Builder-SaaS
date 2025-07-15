import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <nav className="w-full bg-white shadow fixed w-full z-50">
      <div className="max-w-5xl mx-auto px-2 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Chatbot Builder</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            className="bg-blue-600 text-white px-4 py-4 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            className="block mt-2 bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}