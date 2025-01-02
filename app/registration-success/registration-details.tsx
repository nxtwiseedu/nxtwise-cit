"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import { Card, CardContent } from "../components/ui/card";
import Link from "next/link";

interface RegistrationData {
  fullName: string;
  email: string;
  whatsappNumber: string;
  contactNumber: string;
  collegeName: string;
  branch: string;
  year: string;
  domainInterested: string;
  createdAt: string;
  status: string;
  timestamp: string;
}

export default function RegistrationSuccess() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("id");
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      if (!registrationId) {
        setError("Registration ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/get-registration?id=${registrationId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch registration data");
        }

        const data = await response.json();
        setRegistrationData(data.registrationData);
      } catch (error) {
        console.error("Error fetching registration data:", error);
        setError("Failed to fetch registration data");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationData();
  }, [registrationId]);

  const generatePDF = async () => {
    if (!registrationData) return;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.276, 841.89]); // A4 size
    const { height } = page.getSize();

    // Add logo placeholder
    page.drawText("Edzeeta", {
      x: 50,
      y: height - 50,
      size: 24,
      color: rgb(0, 0.29, 0.68), // #004aad in RGB
    });

    page.drawText("Registration Confirmation", {
      x: 50,
      y: height - 100,
      size: 20,
      color: rgb(0, 0, 0),
    });

    const details = [
      ["Full Name", registrationData.fullName],
      ["Email", registrationData.email],
      ["WhatsApp Number", registrationData.whatsappNumber],
      ["Contact Number", registrationData.contactNumber],
      ["College Name", registrationData.collegeName],
      ["Branch", registrationData.branch],
      ["Year", registrationData.year],
      ["Domain Interested", registrationData.domainInterested],
      ["Registration Date", registrationData.timestamp],
    ];

    let yOffset = height - 150;
    details.forEach(([label, value]) => {
      page.drawText(`${label}:`, {
        x: 50,
        y: yOffset,
        size: 12,
        color: rgb(0.4, 0.4, 0.4),
      });
      page.drawText(`${value}`, {
        x: 200,
        y: yOffset,
        size: 12,
        color: rgb(0, 0, 0),
      });
      yOffset -= 30;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `registration-${registrationData.fullName}.pdf`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004aad]"></div>
      </div>
    );
  }

  if (error || !registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Registration not found"}
          </h1>
          <Link href="/">
            <Button className="bg-[#004aad] text-white hover:bg-[#003a8a]">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Image
            src="/logos/EdzeetaBigLogo.svg"
            alt="Edzeeta Logo"
            width={180}
            height={60}
            className="mx-auto mb-8"
          />
          <div className="bg-green-50 rounded-full py-2 px-4 inline-flex items-center mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-700 font-medium">
              Registration Successful
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you for registering, {registrationData.fullName}!
          </h1>
          <p className="text-gray-600">
            Your registration has been confirmed. Below are your registration
            details.
          </p>
        </div>

        {/* Registration Details Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.fullName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.email}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  WhatsApp Number
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.whatsappNumber}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Contact Number
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.contactNumber}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  College Name
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.collegeName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Branch</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.branch}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Year</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.year}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Domain Interested
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {registrationData.domainInterested}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={generatePDF}
            className="bg-[#004aad] text-white hover:bg-[#003a8a]"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Registration Details
          </Button>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
