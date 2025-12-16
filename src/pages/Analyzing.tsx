import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Brain, Image, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface AnalysisStep {
  id: string;
  label: string;
  icon: typeof FileText;
  status: "pending" | "processing" | "complete";
}

export default function Analyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileNames = (location.state as { files?: string[] })?.files || ["document.pdf"];
  
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: "extract", label: "Extracting content", icon: FileText, status: "pending" },
    { id: "text", label: "Analyzing text patterns", icon: Brain, status: "pending" },
    { id: "images", label: "Scanning images", icon: Image, status: "pending" },
  ]);

  useEffect(() => {
    const totalDuration = 5000;
    const stepDuration = totalDuration / steps.length;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, totalDuration / 100);

    steps.forEach((_, index) => {
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => ({
            ...s,
            status: i < index ? "complete" : i === index ? "processing" : "pending"
          }))
        );
      }, index * stepDuration);

      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => ({
            ...s,
            status: i <= index ? "complete" : s.status
          }))
        );
      }, (index + 1) * stepDuration);
    });

    const redirectTimeout = setTimeout(() => {
      navigate("/analysis/1");
    }, totalDuration + 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate, steps.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary"
            />
            <Brain className="absolute h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Analyzing Your Document</h1>
          <p className="text-muted-foreground">
            {fileNames.length > 1 
              ? `Processing ${fileNames.length} files...`
              : `Processing ${fileNames[0]}...`
            }
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    step.status === "processing" 
                      ? "bg-primary/5 border-primary/20" 
                      : step.status === "complete"
                      ? "bg-chart-3/5 border-chart-3/20"
                      : "bg-muted/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    step.status === "processing" 
                      ? "bg-primary/10" 
                      : step.status === "complete"
                      ? "bg-chart-3/10"
                      : "bg-muted"
                  }`}>
                    {step.status === "complete" ? (
                      <CheckCircle className="h-5 w-5 text-chart-3" />
                    ) : (
                      <step.icon className={`h-5 w-5 ${
                        step.status === "processing" ? "text-primary" : "text-muted-foreground"
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-medium ${
                      step.status === "pending" ? "text-muted-foreground" : ""
                    }`}>
                      {step.label}
                    </p>
                    {step.status === "processing" && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-primary"
                      >
                        In progress...
                      </motion.p>
                    )}
                  </div>

                  {step.status === "processing" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          This usually takes about 30 seconds depending on file size
        </p>
      </main>
    </div>
  );
}
