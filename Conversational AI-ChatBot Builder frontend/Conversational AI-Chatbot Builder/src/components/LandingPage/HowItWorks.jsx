const steps = [
  {
    step: '1',
    title: 'Design',
    description: 'Use our visual builder to create your chatbot flow with nodes and logic.',
  },
  {
    step: '2',
    title: 'Deploy',
    description: 'Generate a script and embed it directly into your website or app.',
  },
  {
    step: '3',
    title: 'Engage',
    description: 'Start interacting with users and track performance in your dashboard.',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <div className="text-4xl font-bold text-blue-600 mb-2">{step.step}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}