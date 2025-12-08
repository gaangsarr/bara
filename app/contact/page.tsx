import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us - BaraApp",
  description: "Hubungi kami untuk pertanyaan atau informasi lebih lanjut",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#CEDEFF] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-14">
          <h1
            className="text-4xl md:text-6xl font-bold mb-1"
            style={{ color: "#005792" }}
          >
            Hubungi Kami!
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#005792" }}
            >
              Kirim Pesan
            </h2>
            <ContactForm />
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Email Card */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4"
              style={{ borderLeftColor: "#005792" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #005792 0%, #13334C 100%)",
                  }}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: "#005792" }}
                  >
                    Email
                  </h3>
                  <p className="text-gray-600 mb-2">Kirim email ke:</p>
                  <a
                    href="mailto:baraproject@itpln.ac.id"
                    className="text-[#FD5F00] font-semibold hover:underline"
                  >
                    baraproject@itpln.ac.id
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4"
              style={{ borderLeftColor: "#FD5F00" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #FD5F00 0%, #FF8A3D 100%)",
                  }}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: "#005792" }}
                  >
                    Telepon
                  </h3>
                  <p className="text-gray-600 mb-2">Hubungi kami di:</p>
                  <a
                    href="https://wa.me/6285273113795"
                    className="text-[#FD5F00] font-semibold hover:underline"
                  >
                    +62 852-7311-3795
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4"
              style={{ borderLeftColor: "#00A3E0" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #00A3E0 0%, #0077B6 100%)",
                  }}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: "#005792" }}
                  >
                    Alamat
                  </h3>
                  <p className="text-gray-600 mb-2">Kunjungi kantor kami:</p>
                  <p className="text-gray-800 font-semibold">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.719890635905!2d106.72387077482863!3d-6.1682510938190385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f788f60e492d%3A0x8b5ed89a85136510!2sInstitut%20Teknologi%20PLN!5e0!3m2!1sid!2sid!4v1764750147980!5m2!1sid!2sid"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi BARA di Jakarta"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
