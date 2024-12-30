import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/logos/EdzeetaBigLogo.svg"
              alt="Edzeeta Logo"
              width={150}
              height={50}
              className="object-contain"
            />
            <p className="text-gray-600 text-sm">
              Bridging the gap between education and employment through
              innovative solutions.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-[#004aad] mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="h-4 w-4 text-[#004aad]" />
                <span>
                  4th floor, above Galaxy Dental Care, Kondapur, opp. Harsha
                  Toyota, Hyderabad - 500084{" "}
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone className="h-4 w-4 text-[#004aad]" />
                <span>+91-8073418832</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="h-4 w-4 text-[#004aad]" />
                <span>support@edzeeta.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-[#004aad] mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {[
                {
                  icon: Youtube,
                  label: "YouTube",
                  href: "https://www.youtube.com/@EdZeeta",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://instagram.com/edzeeta",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/edzeetalearning/",
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61552097862102",
                },
                {
                  icon: Twitter,
                  label: "Twitter",
                  href: "https://twitter.com/EdZeetaLearning/",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#004aad] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            &copy; 2024 Edzeeta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
