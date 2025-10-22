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
import { Check } from "lucide-react";

import { toast } from "sonner";

interface FormData {
  fullName: string;
  email: string;
  whatsappNumber: string;
  contactNumber: string;
  collegeName: string;
  branch: string;
  year: string;
  domainInterested: string;
}

interface Step {
  title: string;
  fields: Array<keyof FormData>;
}

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
] as const;

const yearOptions = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "graduated",
] as const;

type Domain = (typeof domains)[number];
type YearOption = (typeof yearOptions)[number];

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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

  const handleDomainChange = (value: Domain) => {
    setFormData((prevData) => ({ ...prevData, domainInterested: value }));
  };

  const handleYearChange = (value: YearOption) => {
    setFormData((prevData) => ({ ...prevData, year: value }));
  };

  const validateForm = (): boolean => {
    const currentFields = steps[currentStep - 1].fields;
    return currentFields.every((field) => formData[field] !== "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all fields before proceeding");
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          applicationDate: new Date().toISOString(),
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const data = await response.json();
      window.location.href = `/registration-success?id=${data.id}`;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps: Step[] = [
    {
      title: "Personal Info",
      fields: ["fullName", "email"],
    },
    {
      title: "Contact Details",
      fields: ["whatsappNumber", "contactNumber"],
    },
    {
      title: "Academic Info",
      fields: ["collegeName", "branch", "year", "domainInterested"],
    },
  ];

  const renderFormFields = () => {
    const currentFields = steps[currentStep - 1].fields;

    return (
      <div className="grid grid-cols-1 gap-6">
        {currentFields.map((field) => {
          if (field === "year") {
            return (
              <div key={field} className="space-y-2">
                <Label
                  htmlFor={field}
                  className="text-sm font-semibold text-[#004aad]"
                >
                  Year *
                </Label>
                <Select
                  onValueChange={handleYearChange}
                  value={formData.year}
                  required
                >
                  <SelectTrigger className="w-full rounded-lg border-gray-200">
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
            );
          }

          if (field === "domainInterested") {
            return (
              <div key={field} className="space-y-2">
                <Label
                  htmlFor={field}
                  className="text-sm font-semibold text-[#004aad]"
                >
                  Domain Interested *
                </Label>
                <Select
                  onValueChange={handleDomainChange}
                  value={formData.domainInterested}
                  required
                >
                  <SelectTrigger className="w-full rounded-lg border-gray-200">
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
            );
          }

          return (
            <div key={field} className="space-y-2">
              <Label
                htmlFor={field}
                className="text-sm font-semibold text-[#004aad]"
              >
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")}{" "}
                *
              </Label>
              <Input
                type={
                  field === "email"
                    ? "email"
                    : field.includes("Number")
                    ? "tel"
                    : "text"
                }
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200"
                placeholder={`Enter your ${
                  field.charAt(0).toUpperCase() +
                  field
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .toLowerCase()
                }`}
                required
                pattern={field.includes("Number") ? "\\d{10}" : undefined}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Image
            src="/logos/nxtwise-logo.png"
            alt="nxtwise Logo"
            width={180}
            height={60}
            className="mx-auto mb-8"
          />
          <h1 className="text-3xl font-bold text-[#004aad] mb-4">
            Registration Form
          </h1>
          <p className="text-gray-600">
            Join us on your journey to professional excellence
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index + 1 <= currentStep
                      ? "bg-[#004aad] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm mt-2 text-gray-600">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 bg-gray-200 rounded">
            <div
              className="h-full bg-[#004aad] rounded transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderFormFields()}

            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 bg-[#004aad] text-white hover:bg-[#003a8a]"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : currentStep === steps.length
                  ? "Submit"
                  : "Next"}
              </Button>
            </div>
          </form>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
