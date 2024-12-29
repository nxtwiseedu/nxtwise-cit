import Image from "next/image";

const companies = [
  "TCS",
  "Wipro",
  "Infosys",
  "Amazon",
  "Google",
  "Microsoft",
  "Capgemini",
  "PWC",
  "Deloitte",
  "EY",
  "Accenture",
  "Samsung",
  "Siemens",
  "Bosch",
  "Qualcomm",
  "Cisco",
  "HDFC-Bank",
  "ICICI-Bank",
];

export function CompanyLogos() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
          Our Interns work at
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {companies.map((company) => (
            <div
              key={company}
              className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Image
                src={`/logos/${company.toLowerCase()}.svg`}
                alt={`${company} logo`}
                width={120}
                height={40}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CompanyLogos;
