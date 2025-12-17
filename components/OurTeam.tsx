// components/OurTeams.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Linkedin, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  nim: string;
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
    nim: "202431170",
    role: "The Hacker",
    image: "/team/gangsarr.png",
    instagram: "https://instagram.com/gaangsarr",
    linkedin: "https://linkedin.com/in/gangsaranjasmoro",
    featured: true,
  },
  {
    id: 2,
    name: "Aisyah Nur Kusuma",
    nim: "202431066",
    role: "The Hustler",
    image: "/team/aisyah.jpg",
    instagram: "https://instagram.com/syawarrrr",
    linkedin: "https://linkedin.com/in/aisyah-nur-kusuma",
    featured: true,
  },
  {
    id: 3,
    name: "Abdul Akyas Sugianto",
    nim: "202431086",
    role: "The Hipster",
    image: "/team/abdul.jpg",
    instagram: "https://instagram.com/abd.akyas_",
    linkedin: "http://linkedin.com/in/abdul-akyas-sugianto",
    featured: true,
  },
];

const OurTeams = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === teamMembers.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  // Calculate offset for centering
  const getOffset = () => {
    const cardWidth = 260; // Width of each card
    const gap = 16; // Gap between cards
    return (
      -(selectedIndex * (cardWidth + gap)) +
      (window.innerWidth / 2 - cardWidth / 2)
    );
  };

  return (
    <section
      id="our-team"
      className="pb-12 md:pb-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      {/* Team Photo - FULL WIDTH NO PADDING */}
      <div className="mb-8 md:mb-20 w-full relative">
        {/* Mobile Image (4:3) - Hidden on Desktop */}
        <div className="relative w-full aspect-[4/3] md:hidden">
          <Image
            src="/team/teamMobile.png"
            alt="BARA Team"
            fill
            className="object-cover"
            sizes="100vw"
            quality={100}
            unoptimized
            priority
          />
          {/* Gradient Overlay - Bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 70%, rgba(255,255,255,1) 100%)",
            }}
          />
        </div>

        {/* Desktop Image (21:9) - Hidden on Mobile */}
        <div className="relative w-full aspect-[21/9] hidden md:block">
          <Image
            src="/team/OurTeams.png"
            alt="BARA Team"
            fill
            className="object-cover"
            sizes="100vw"
            quality={100}
            unoptimized
            priority
          />
          {/* Gradient Overlay - Bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 md:h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 100%)",
            }}
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        {/* Desktop Grid - 3 Columns (Original Style) */}
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
          {teamMembers.map((member, index) => (
            <DesktopTeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          {/* Carousel Container */}
          <div className="relative px-8">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#005792] hover:bg-[#003d5c] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#005792] hover:bg-[#003d5c] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards Container - Added padding for shadow */}
            <div className="overflow-visible py-12">
              <div className="overflow-hidden -mx-4 px-4">
                <motion.div
                  className="flex"
                  style={{ gap: "16px" }}
                  animate={{
                    x:
                      selectedIndex === 0
                        ? "calc(50% - 130px)"
                        : selectedIndex === 1
                        ? "calc(50% - 406px)"
                        : "calc(50% - 682px)",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {teamMembers.map((member, index) => {
                    const isSelected = index === selectedIndex;

                    return (
                      <motion.div
                        key={member.id}
                        onClick={() => handleSelect(index)}
                        className="flex-shrink-0 cursor-pointer"
                        style={{ width: "260px" }}
                        animate={{
                          scale: isSelected ? 1 : 0.85,
                          opacity: isSelected ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <MobileTeamCard
                          member={member}
                          isSelected={isSelected}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-[#005792] w-6"
                      : "bg-gray-300 w-2"
                  }`}
                  aria-label={`Go to member ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Desktop Team Card (Original Style)
const DesktopTeamCard = ({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) => {
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
            sizes="33vw"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#005792]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Social Icons */}
          {member.featured && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#005792] transition-all duration-200 shadow-lg group/icon"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-[#005792] group-hover/icon:text-white" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#005792] transition-all duration-200 shadow-lg group/icon"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-[#005792] group-hover/icon:text-white" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Info Container */}
        <div className="relative p-6 bg-gradient-to-br from-[#005792] to-[#003d5c] text-white overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-1 leading-tight">
              {member.name}
            </h3>
            <p className="text-sm text-blue-200 font-mono mb-2">{member.nim}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-200 font-medium">{member.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Team Card (Carousel Style)
const MobileTeamCard = ({
  member,
  isSelected,
}: {
  member: TeamMember;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 border-4 bg-white ${
        isSelected ? "border-[#005792]" : "border-gray-300"
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden group">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="260px"
        />

        {/* Social Icons (only for selected) */}
        {isSelected && member.featured && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#005792] transition-all duration-200 shadow-lg group/icon"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[#005792] group-hover/icon:text-white" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#005792] transition-all duration-200 shadow-lg group/icon"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-[#005792] group-hover/icon:text-white" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="relative p-4 bg-gradient-to-br from-[#005792] to-[#003d5c] text-white">
        <h3 className="text-base font-bold mb-1 leading-tight">
          {member.name}
        </h3>
        <p className="text-xs text-blue-200 font-mono mb-2">{member.nim}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-200 font-medium">{member.role}</p>
        </div>
      </div>
    </div>
  );
};

export default OurTeams;
