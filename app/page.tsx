import { Button } from "./components/ui/button";
import Image from "next/image";
import { CompanyLogos } from "./components/company-logos";
import { DomainGrid } from "./components/domain-grid";
import { ImportantDates } from "./components/important-dates";
import { Footer } from "./components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <Image
              src="/logos/EdzeetaBigLogo.svg"
              alt="Dzeeta Logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
            <Image
              src="/logos/OfficialPartner.svg"
              alt="Official Partner"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
          <div className="my-8 md:my-12 flex justify-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#004aad] text-center tracking-tight leading-tight border-b-4 border-[#004aad] pb-4">
              Common Internship Test
            </h1>
          </div>
          <div className="mt-12 md:mt-16 text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 text-[#004aad]">
              Start Your Career Journey with Leading Companies
            </h2>
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-base md:text-lg bg-[#004aad] text-white hover:bg-[#003a8a] 
                  px-8 py-4 rounded-lg font-semibold
                  shadow-lg hover:shadow-xl
                  transform transition-all duration-200 
                  hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-[#004aad] focus:ring-offset-2"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <ImportantDates />
      <DomainGrid />
      <CompanyLogos />
      <Footer />
    </main>
  );
}
