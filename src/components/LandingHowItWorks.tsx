import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck } from "lucide-react";
import { FadeInUp } from "./AnimatedSection";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Document",
    description: "Drag and drop your PDF or DOCX file. We support documents up to 50MB with unlimited pages."
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI Analysis",
    description: "Our advanced algorithms scan every paragraph and image, comparing patterns against known AI signatures."
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Get Your Report",
    description: "Receive a detailed report showing AI probability scores, highlighted sections, and verification status."
  }
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInUp className="text-center mb-16">
          <span className="text-sm font-medium text-primary mb-4 block">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Simple Steps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Detecting AI content has never been easier. Upload, analyze, and get results in seconds.
          </p>
        </FadeInUp>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/50 via-chart-2/50 to-primary/50 -translate-y-1/2" />
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative mb-6"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg shadow-primary/25">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                      {step.number}
                    </span>
                  </motion.div>
                  <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
