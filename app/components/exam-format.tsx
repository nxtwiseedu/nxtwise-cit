import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, FileText, Download, Brain } from "lucide-react";

export function ExamFormat() {
  const examDetails = [
    {
      title: "Time Duration",
      value: "30 Minutes",
      description: "Carefully paced for optimal performance",
      icon: Clock,
    },
    {
      title: "Total Questions",
      value: "30 Questions",
      description: "Covering essential domain concepts",
      icon: FileText,
    },
    {
      title: "Maximum Marks",
      value: "30 Marks",
      description: "One mark per question, no negative marking",
      icon: Brain,
    },
  ];

  const handleDownload = async () => {
    try {
      // Fetch the PDF file
      const response = await fetch("/documents/cit-syllabus.pdf");
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "CIT-Syllabus-2025.pdf"; // The name that will appear when downloading

      // Append link to body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // You might want to show an error toast here
    }
  };

  return (
    <section className="py-20 bg-white text-[#004aad]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#004aad]">
                Exam Format
              </h2>
              <p className="text-[#004aad]/80 text-lg">
                Understanding the CIT examination structure and requirements
              </p>
            </div>
            <div className="grid gap-6">
              {examDetails.map((item) => (
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
                      <p className="text-white text-xl font-semibold mb-1">
                        {item.value}
                      </p>
                      <p className="text-white/90 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-white text-black p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 border-2 border-[#004aad]/10">
            <CardContent className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#004aad]">
                  Download Syllabus
                </h3>
                <p className="text-gray-600">
                  Get detailed information about exam topics and preparation
                  guidelines
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleDownload}
                className="w-full bg-[#004aad] text-white hover:bg-[#003a8a] font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Syllabus PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
