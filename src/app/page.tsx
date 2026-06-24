'use client';

import Link from 'next/link';
import { ArrowRight, Code, Zap, Target } from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building modern, responsive web applications with React and Next.js',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency',
    },
    {
      icon: Target,
      title: 'Solutions',
      description: 'Creating effective solutions tailored to your needs',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
              R
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Hi, I'm <span className="text-blue-600">Rifqy</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            A passionate developer crafting digital experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View My Work
              <ArrowRight size={20} />
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* What Can I Offer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            What Can I Offer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-center mb-4">
                    <Icon size={32} className="text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-center mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
