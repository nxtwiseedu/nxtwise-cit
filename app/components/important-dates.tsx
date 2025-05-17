import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import cit from "../../public/logos/cit.svg";
import Image from "next/image";
import Link from "next/link";

const dates = [
  {
    title: "Registration Starts",
    date: "15th May, 2025",
    icon: Calendar,
  },
  {
    title: "Registration Ends Soon",
    date: "First 500 eligible students",
    icon: Users,
  },
  {
    title: "CIT Exam Date",
    date: "18th May, 2025",
    icon: Calendar,
  },
  {
    title: "Internship Training Batch",
    date: "1st June, 2025 onwards",
    icon: Clock,
  },
];

export function ImportantDates() {
  return (
    <section className="py-20 bg-[#f5f8ff] text-[#004aad]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#004aad]">
                Important Dates
              </h2>
              <p className="text-[#004aad]/80 text-lg">
                Mark your calendar for these crucial deadlines
              </p>
            </div>
            <div className="grid gap-6">
              {dates.map((item) => (
                <Card
                  key={item.title}
                  className="bg-[#004aad] border-none transition-all duration-300 hover:bg-[#003a8a] hover:transform hover:translate-x-2"
                >
                  <CardContent className="flex items-center gap-6 p-6">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white">
                        {item.title}
                      </h3>
                      <p className="text-white/90 font-medium">{item.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card className="bg-white text-black p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 border-2 border-[#004aad]/10">
            <CardContent className="flex flex-col items-center text-center space-y-8">
              <div className="w-40 h-40 relative">
                <Image
                  src={cit}
                  alt="CIT Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#004aad]">
                  Registration for CIT 2025
                </h3>
                <p className="text-gray-600">
                  Secure your spot in the upcoming batch
                </p>
              </div>
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full bg-[#004aad] text-white hover:bg-[#003a8a] font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Register Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
