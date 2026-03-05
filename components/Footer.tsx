import React from 'react';
import Image from "next/image";
import ShoutlyLogo from "@/components/common/ShoutlyLogo";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Who We Help",
      links: [
        { category: "🏢 Local Business", sublinks: ["Real Estate", "Food & Beverage", "Retail / E‑comm", "Beauty & Wellness"] },
        { category: "💼 Professional Services", sublinks: ["Finance & Legal", "Education & Coaching", "Healthcare", "Business Consulting"] },
        { category: "🏋️ Lifestyle Brands", sublinks: ["Health & Fitness", "Hospitality & Tourism", "Pet Services", "Nonprofits"] },
        { category: "🏗️ Specialized Industries", sublinks: ["Construction & Trades", "Automotive", "Technology", "Home Services"] }
      ]
    },
    {
      title: "Product",
      links: ["All Features", "How It Works", "10k+ Templates", "Platforms", "Plans & Pricing"]
    },
    {
      title: "Resources",
      links: ["Blog", "Help Center", "Join Community", "Success Stories", "Free Editorial Calendar", "Industry Content Guides"]
    },
    {
      title: "Company",
      links: ["About Us", "Contact Us", "Press & Media", "Join Our Team", "Affiliate Program"]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@shoutlyai.com", href: "mailto:hello@shoutlyai.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        {/* Logo and Tagline */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {/* Logo */}
              <div className="bg-white relative w-28 h-10 sm:w-40 sm:h-14">
                  <a href="/">
                      <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                  </a>
              </div>
            </span>
          </div>
          <p className="text-gray-400 max-w-md">
            AI-powered social media automation. One prompt → 365 days.
          </p>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Who We Help - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-white/90">Who We Help</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {footerSections[0].links.map((category, idx) => (
                <div key={idx}>
                  <h4 className="text-sm font-medium text-blue-400 mb-3">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.sublinks.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a 
                          href="#" 
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                        >
                          <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Other Sections */}
          {footerSections.slice(1).map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-6 text-white/90">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact and Social Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {contactInfo.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow Us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ShoutlyAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;