import { useState } from 'react';
import Picture from '../components/Picture';
import { supabase } from '@/supabase/client';

export default function QuickPrintzForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: JSON.stringify(formData),
    });
    if (error) {
      console.error('Error sending email:', error);
      // Handle error state here, maybe show a toast notification
    } else {
      console.log('Email sent successfully:', data);
      // Handle success state here, maybe show a success message and clear the form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }
  };

  return (
    <div
      className="min-h-dvh w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/quick printz store.webp')" }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg items-center justify-center p-6">
        <div className="w-full rounded-3xl bg-black/80 shadow-[0_0_80px_rgba(255,255,255,0.3)] ring-1 ring-white/10 p-6 relative overflow-hidden drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <Picture src="/images/blueredsmoke.png" alt="Blue Red Smoke" className="w-full h-full object-cover opacity-70" />
          </div>
          
          <div className="flex justify-center mb-6 relative z-10">
            <Picture src="/quickprintz-logo.png" alt="Quick Printz" className="h-60 w-auto" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-white/20 text-white border-transparent focus:border-white focus:bg-white/30 focus:ring-0"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-white/20 text-white border-transparent focus:border-white focus:bg-white/30 focus:ring-0"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-white/20 text-white border-transparent focus:border-white focus:bg-white/30 focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="block w-full rounded-xl px-5 py-3 text-center font-semibold tracking-wide
                         bg-gradient-to-b from-white/90 to-white/70 text-black ring-1 ring-white/40 hover:from-white"
            >
              Submit Order
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
