"use client";

import { Github, Linkedin, Instagram, Mail } from "lucide-react";

// ============================================
// PERSONALIZE: Update your social media links (same as Contact section)
// ============================================
const socialLinks = [
  { icon: Github, url: "https://github.com/HarshYadav1711", label: "GitHub" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/harsh-yadav-20032010am/", label: "LinkedIn" },
  { icon: Instagram, url: "https://www.instagram.com/____.harsh__/", label: "Instagram" },
  { icon: Mail, url: "mailto:harshyadav.20032010@gmail.com", label: "Email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 md:px-12 lg:px-24 bg-background border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* ============================================
              PERSONALIZE: Update copyright text
              ============================================ */}
          <div className="text-gray-400 text-sm">
            © {currentYear} Harsh Yadav Full-Stack Developer. All rights reserved. {/* TODO: Replace "Full-Stack Developer" with your name */}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-500 hover:border-accent-yellow hover:text-accent-yellow transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

