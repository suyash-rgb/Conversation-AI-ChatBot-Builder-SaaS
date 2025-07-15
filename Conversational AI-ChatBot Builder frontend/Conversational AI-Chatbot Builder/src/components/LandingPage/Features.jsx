import { Code2, Rocket, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: <Code2 size={32} />,
    title: 'Visual Chatbot Builder',
    description: 'Design conversation flows with drag-and-drop ease — no code required.',
  },
  {
    icon: <Rocket size={32} />,
    title: 'Instant Deployment',
    description: 'Generate embeddable scripts and go live on your site in seconds.',
  },
  {
    icon: <BarChart3 size={32} />,
    title: 'Built-in Analytics',
    description: 'Track interactions, drop-offs, and performance in real time.',
  },
  {
    icon: <Users size={32} />,
    title: 'Team Collaboration',
    description: 'Assign agents or CRM reps to monitor conversations and respond to customer queries in real time.',
  },
];

export default function Features() {
  return (
    <section className="w-full bg-white py-20 px-6" id="features">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12r">Why Choose Our Platform?</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <div className="mb-4 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}