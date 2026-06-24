'use client';

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Send Message</h2>
            {/* Add contact form here */}
          </section>

          {/* Social Media */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Social Media</h2>
            {/* Add social media links here */}
          </section>
        </div>
      </div>
    </div>
  );
}
