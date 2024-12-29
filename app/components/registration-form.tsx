"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import Image from "next/image";

const domains = [
  "Full Stack Web Development",
  "Cyber Security",
  "Machine Learning",
  "Data Science",
  "Artificial Intelligence",
  "Amazon Web Services",
  "App Development",
  "AutoCAD",
  "Embedded Systems",
  "Internet of Things",
  "Human Resource",
  "Finance",
  "Digital Marketing",
];

const yearOptions = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "graduated",
];

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    contactNumber: "",
    collegeName: "",
    branch: "",
    year: "",
    domainInterested: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDomainChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, domainInterested: value }));
  };

  const handleYearChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, year: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Image
            src="/logos/EdzeetaBigLogo.svg"
            alt="Edzeeta Logo"
            width={180}
            height={60}
            className="mx-auto mb-8"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#004aad] mb-4">
            Registration Form
          </h1>
          <p className="text-gray-600 text-lg">
            Join us on your journey to professional excellence
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {Object.entries(formData).map(([key, value]) => {
                if (key === "domainInterested" || key === "year") return null;

                return (
                  <div key={key} className="space-y-2">
                    <Label
                      htmlFor={key}
                      className="text-sm font-semibold text-gray-700 block"
                    >
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Input
                      type={key === "email" ? "email" : "text"}
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-200 focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-20 transition-all"
                      placeholder={`Enter your ${
                        key.charAt(0).toUpperCase() +
                        key
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .toLowerCase()
                      }`}
                    />
                  </div>
                );
              })}

              {/* Year Select */}
              <div className="space-y-2">
                <Label
                  htmlFor="year"
                  className="text-sm font-semibold text-gray-700 block"
                >
                  Year
                </Label>
                <Select onValueChange={handleYearChange} value={formData.year}>
                  <SelectTrigger className="w-full rounded-lg border-gray-200 focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-20">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year.charAt(0).toUpperCase() + year.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Domain Select */}
              <div className="space-y-2">
                <Label
                  htmlFor="domainInterested"
                  className="text-sm font-semibold text-gray-700 block"
                >
                  Domain Interested
                </Label>
                <Select
                  onValueChange={handleDomainChange}
                  value={formData.domainInterested}
                >
                  <SelectTrigger className="w-full rounded-lg border-gray-200 focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-20">
                    <SelectValue placeholder="Select your preferred domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-[#004aad] text-white hover:bg-[#003a8a] 
                  py-6 text-lg font-semibold rounded-lg
                  shadow-lg hover:shadow-xl
                  transform transition-all duration-200 
                  hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-[#004aad] focus:ring-offset-2"
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 mt-8">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
