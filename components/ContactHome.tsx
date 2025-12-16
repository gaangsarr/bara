// app/contact/page.tsx atau components/ContactPage.tsx
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 80%, #005792 100%)",
      }}
      id="contact"
    >
      <div className="max-w-3xl mx-auto mt-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-[#005792] font-medium text-sm md:text-base mb-3 block">
            Get In Touch
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: "#005792" }}
          >
            Hubungi Kami
          </h1>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-100 rounded-2xl p-8 md:p-10 shadow-lg">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
