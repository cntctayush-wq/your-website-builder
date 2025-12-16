import { Card, CardContent } from "@/components/ui/card";
import { FileSearch, Brain, ShieldCheck, Zap, BarChart3, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, FadeInUp } from "./AnimatedSection";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Detection",
    description: "Our ML models detect content from ChatGPT, Claude, Gemini, and other AI systems with 99%+ accuracy."
  },
  {
    icon: FileSearch,
    title: "Document Analysis",
    description: "Upload PDF and DOCX files for comprehensive text and image analysis in one seamless process."
  },
  {
    icon: ShieldCheck,
    title: "Image Verification",
    description: "Identify AI-generated images created by DALL-E, Midjourney, Stable Diffusion, and more."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get detailed detection reports in seconds with confidence scores for each element analyzed."
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Receive comprehensive breakdowns highlighting exactly which sections are AI-generated."
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your documents are encrypted and automatically deleted after analysis. We never store your content."
  }
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInUp className="text-center mb-16">
          <span className="text-sm font-medium text-primary mb-4 block">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Detect AI Content</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Powerful tools to verify the authenticity of documents and images in your workflow.
          </p>
        </FadeInUp>
        
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center"
                      >
                        <feature.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
