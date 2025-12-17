// components/OurTeams.tsx
import React from "react";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  instagram?: string;
  linkedin?: string;
  featured?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Gangsar Anjasmoro",
    role: "The Hacker",
    image: "/team/gangsarr.png",
    instagram: "https://instagram.com/gaangsarr",
    linkedin: "https://linkedin.com/in/gangsaranjasmoro",
    featured: true,
  },
  {
    id: 2,
    name: "Aisyah Nur Kusuma Wardani",
    role: "The Hustler",
    image: "/team/aisyah.jpg",
    instagram: "https://instagram.com/syawarrrr",
    linkedin: "https://linkedin.com/in/aisyah-nur-kusuma",
    featured: true,
  },
  {
    id: 3,
    name: "Abdul Akyas Sugianto",
    role: "The Hipster",
    image: "/team/abdul.jpg",
    instagram: "https://instagram.com/abd.akyas_",
    linkedin: "http://linkedin.com/in/abdul-akyas-sugianto",
    featured: true,
  },
];

const OurTeams = () => {
  return (
    <section
      className="py-12 md:py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
      id="our-team"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#005792]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Subtitle */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block">
            <span className="text-[#005792] font-semibold text-sm md:text-base tracking-wider uppercase mb-3 block">
              Meet The Team
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-[#005792] mb-4 relative">
              Kelompok BARA
            </h2>
          </div>
        </div>

        {/* Team Photo with Overlay Design */}
        <div className="mb-16 md:mb-20 max-w-4xl mx-auto relative">
          <div className="relative group">
            {/* Main Image - ASPECT RATIO CHANGED TO 4:3 */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/team/team-bgPantai.png"
                alt="BARA Team"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-700"
                sizes="2500px, 1875px"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#005792]/80 via-[#005792]/20 to-transparent opacity-60"></div>
            </div>

            {/* Floating Badge - RESPONSIVE */}
            <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl border-2 border-[#005792]/10">
              <p className="text-[#005792] font-bold text-sm md:text-lg lg:text-xl">
                3 Innovators
              </p>
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[#005792] rounded-tl-3xl hidden md:block"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-[#005792] rounded-br-3xl hidden md:block"></div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden mt-16">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {teamMembers.slice(0, 2).map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
          {teamMembers.length > 2 && (
            <div className="flex justify-center">
              <div className="w-[calc(50%-0.5rem)]">
                <TeamCard member={teamMembers[2]} index={2} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Team Card Component with Enhanced Design
const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-2 border-[#005792]/20 hover:border-[#005792] bg-white">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-all duration-700"
            sizes="(max-width: 768px) 50vw, 33vw"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#005792]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Social Icons */}
          {member.featured && (
            <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3 z-10 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#005792] hover:text-white transition-all duration-200 shadow-lg group/icon"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 md:w-6 md:h-6 text-[#005792] group-hover/icon:text-white" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#005792] hover:text-white transition-all duration-200 shadow-lg group/icon"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-[#005792] group-hover/icon:text-white" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Info Container with Enhanced Design */}
        <div className="relative p-4 md:p-6 bg-gradient-to-br from-[#005792] to-[#003d5c] text-white overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1 min-h-[2.5rem] md:min-h-[3rem] lg:min-h-[3.5rem] leading-tight">
              {member.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-white/50"></div>
              <p className="text-xs md:text-sm text-gray-200 font-medium">
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeams;
