'use client';

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          {/* Add skills content here */}
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          {/* Add experience content here */}
        </section>

        {/* Certificates Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Certificates</h2>
          {/* Add certificates content here */}
        </section>
      </div>
    </div>
  );
}
