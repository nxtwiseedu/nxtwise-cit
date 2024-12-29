import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Check, X } from "lucide-react";

const domains = [
  { name: "Full Stack Web Development", icon: "/logos/web-dev.svg" },
  { name: "Cyber Security", icon: "/logos/security.svg" },
  { name: "Machine Learning", icon: "/logos/ml.svg" },
  { name: "Data Science", icon: "/logos/data.svg" },
  { name: "Artificial Intelligence", icon: "/logos/ai.svg" },
  { name: "Amazon Web Services", icon: "/logos/aws.svg" },
  { name: "App Development", icon: "/logos/app-dev.svg" },
  { name: "AutoCAD", icon: "/logos/autocad.svg" },
  { name: "Embedded Systems", icon: "/logos/embedded.svg" },
  { name: "Internet of Things", icon: "/logos/iot.svg" },
  { name: "Human Resource", icon: "/logos/hr.svg" },
  { name: "Finance", icon: "/logos/finance.svg" },
  { name: "Digital Marketing", icon: "/logos/marketing.svg" },
];

const features = [
  {
    name: "CIT Participation Certificate",
    nonQualified: true,
    qualifiedNotEnrolled: true,
    qualifiedEnrolled: true,
  },
  {
    name: "AI Career Roadmap",
    nonQualified: true,
    qualifiedNotEnrolled: true,
    qualifiedEnrolled: true,
  },
  {
    name: "Skill Assessment Certificates",
    nonQualified: true,
    qualifiedNotEnrolled: true,
    qualifiedEnrolled: true,
  },
  {
    name: "Guaranteed Training & Internship Program",
    nonQualified: false,
    qualifiedNotEnrolled: false,
    qualifiedEnrolled: true,
  },
  {
    name: "Offer Letter",
    nonQualified: false,
    qualifiedNotEnrolled: false,
    qualifiedEnrolled: true,
  },
  {
    name: "Training & Internship Certificate",
    nonQualified: false,
    qualifiedNotEnrolled: false,
    qualifiedEnrolled: true,
  },
  {
    name: "Exclusive Hiring Portal Access",
    nonQualified: false,
    qualifiedNotEnrolled: false,
    qualifiedEnrolled: true,
  },
  {
    name: "Lifetime Access",
    nonQualified: false,
    qualifiedNotEnrolled: false,
    qualifiedEnrolled: true,
  },
];

export function DomainGrid() {
  return (
    <>
      {/* Domains Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
            Internship Domains
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain) => (
              <Card
                key={domain.name}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={domain.icon}
                        alt={domain.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold">{domain.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FF6B35]">
            Exclusive benefits CIT qualified students get after enrolling for an
            Internship.
          </h2>
          <div className="overflow-auto">
            <div className="min-w-[768px] bg-white rounded-lg shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 bg-gray-50 whitespace-nowrap">
                      Features
                    </th>
                    <th className="p-4 bg-gray-50 text-center whitespace-nowrap">
                      CIT Non-Qualified
                    </th>
                    <th className="p-4 bg-gray-50 text-center whitespace-nowrap">
                      <div>CIT Qualified</div>
                      <div className="font-normal text-sm text-gray-600">
                        Not Enrolled
                      </div>
                    </th>
                    <th className="p-4 bg-gray-50 text-center whitespace-nowrap">
                      <div>CIT Qualified</div>
                      <div className="font-normal text-sm text-gray-600">
                        Enrolled
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.name} className="border-b last:border-b-0">
                      <td className="p-4 text-gray-700 whitespace-nowrap">
                        {feature.name}
                      </td>
                      <td className="p-4 text-center">
                        {feature.nonQualified ? (
                          <Check className="inline-block w-6 h-6 text-green-500" />
                        ) : (
                          <X className="inline-block w-6 h-6 text-red-500" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.qualifiedNotEnrolled ? (
                          <Check className="inline-block w-6 h-6 text-green-500" />
                        ) : (
                          <X className="inline-block w-6 h-6 text-red-500" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.qualifiedEnrolled ? (
                          <Check className="inline-block w-6 h-6 text-green-500" />
                        ) : (
                          <X className="inline-block w-6 h-6 text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DomainGrid;
