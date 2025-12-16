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
    image: "/team/gangsar.png",
    instagram: "https://instagram.com/gaangsarr",
    linkedin: "https://linkedin.com/in/gangsaranjasmoro",
    featured: true,
  },
  {
    id: 2,
    name: "Abdul Akyas Sugianto",
    role: "The Hipster",
    image: "/team/gangsar.png",
    instagram: "https://instagram.com/abd.akyas_",
    linkedin: "http://linkedin.com/in/abdul-akyas-sugianto",
    featured: true,
  },
  {
    id: 3,
    name: "Aisyah Nur Kusuma Wardani",
    role: "The Hustler",
    image: "/team/gangsar.png",
    instagram: "https://instagram.com/syawarrrr",
    linkedin: "https://linkedin.com/in/aisyah-nur-kusuma",
    featured: true,
  },
];

const OurTeams = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-white" id="our-team">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="text-gray-600 font-medium text-sm md:text-base">
            Ayo Lihat
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#005792] mb-8 md:mb-12">
          Kelompok BARA
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {teamMembers.slice(0, 2).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
          {teamMembers.length > 2 && (
            <div className="flex justify-center">
              <div className="w-[calc(50%-0.375rem)]">
                <TeamCard member={teamMembers[2]} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Team Card Component
const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <div
      className={`group relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
        member.featured
          ? "border-2 md:border-4 border-[#005792]"
          : "border-2 md:border-4 border-gray-200"
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Social Icons */}
        {member.featured && (
          <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3 z-10">
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-[#005792] rounded-full flex items-center justify-center hover:bg-[#004270] transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-[#005792] rounded-full flex items-center justify-center hover:bg-[#004270] transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Info Container */}
      <div
        className={`p-3 md:p-6 ${
          member.featured ? "bg-[#005792] text-white" : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-sm md:text-xl font-bold mb-0.5 md:mb-1 min-h-10 md:min-h-14 flex items-center">
          {member.name}
        </h3>
        <p
          className={`text-xs md:text-sm ${
            member.featured ? "text-gray-200" : "text-gray-500"
          }`}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
};

export default OurTeams;
