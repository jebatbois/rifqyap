'use client';

export default function Admin() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="space-y-6">
          {/* Manage Projects */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Projects</h2>
            {/* Add project management UI here */}
          </section>

          {/* Manage Skills */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Skills</h2>
            {/* Add skills management UI here */}
          </section>

          {/* View Messages */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            {/* Add messages UI here */}
          </section>
        </div>
      </div>
    </div>
  );
}
