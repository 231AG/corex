"use client";

import { useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeader from "@/components/ui/SectionHeader";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;          // <— keep a real reference

  setLoading(true);
  setSuccess(null);
  setError(null);

  const formData = new FormData(form);   // use form, not e.currentTarget
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(payload.error || "Failed to submit");
    }

    setSuccess("Message sent successfully.");
    form.reset();                        // <— this is now safe
  } catch (err: any) {
    setError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="section-padding container-custom">
      <Breadcrumb items={[{ label: "Contact" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Contact Us Info */}
        <div>
          <h2 className="text-4xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-8 max-w-xl">
            We understand the importance of approaching each work integrally and
            believe in the power of simple. Reach out to discuss projects,
            training, or partnerships - we're here to help.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <div>
                <h4 className="font-bold text-primary">Office Address, Liberia</h4>
                <p className="text-gray-600">
                  25/5 Double Street, Monrovia
                  <br />
                  Monrovia, Liberia
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center">
                <Mail className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <div>
                <h4 className="font-bold text-primary">Mail Us</h4>
                <p className="text-gray-600">
                  support@corexdigital.com
                  <br />
                  info@corexdigital.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center">
                <Phone className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <div>
                <h4 className="font-bold text-primary">Phone Call</h4>
                <p className="text-gray-600">
                  (+231) 77 000 0000
                  <br />
                  (+231) 88 000 0000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Get In Touch Form */}
        <div className="card relative overflow-hidden p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-primary mb-2">Get In Touch</h2>
          <p className="text-gray-600 mb-6 max-w-xl">
            We love hearing about new ideas, collaborations, or ways we can support
            your team. Tell us a bit about your project and we'll get back right
            away.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              required
              className="input-default placeholder-muted"
            />

            <label className="sr-only" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Phone"
              className="input-default placeholder-muted"
            />

            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="input-default placeholder-muted md:col-span-2"
            />

            <label className="sr-only" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              required
              className="input-default placeholder-muted md:col-span-2 h-40 resize-none"
            />

            <button
              type="submit"
              className="md:col-span-2 btn-primary flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Now"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            {success && (
              <p className="md:col-span-2 text-sm text-green-600 mt-2">
                {success}
              </p>
            )}
            {error && (
              <p className="md:col-span-2 text-sm text-red-600 mt-2">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Google Map Embed */}
      <div className="mt-12 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        <iframe
          title="CoreX Location"
          src="https://www.google.com/maps?q=6.292678,-10.789463&z=17&output=embed"
          className="w-full h-96 border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
