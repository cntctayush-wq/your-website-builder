import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Image, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeInUp, FloatingElement, PulseGlow } from "./AnimatedSection";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-chart-2/20 to-transparent blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <FadeInUp>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Detection</span>
            </motion.div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl max-w-4xl">
              Detect AI-Generated{" "}
              <span className="relative">
                <span className="text-primary">Content & Images</span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Upload your PDF and DOCX files to instantly identify AI-written text and 
              AI-generated images. Protect authenticity with our advanced detection technology.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <PulseGlow className="rounded-lg">
                    <Button size="lg" className="text-base px-8" data-testid="button-get-started-hero">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </PulseGlow>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="lg" className="text-base px-8" data-testid="button-see-demo">
                  See Demo
                </Button>
              </motion.div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.5} className="mt-12 w-full max-w-3xl">
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-2/20 to-primary/20 rounded-2xl blur-xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative bg-card/80 backdrop-blur-sm border rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <FloatingElement duration={4}>
                    <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 border border-primary/20">
                      <FileText className="h-10 w-10 text-primary" />
                    </div>
                  </FloatingElement>
                  <FloatingElement duration={5} className="md:-mt-4">
                    <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-chart-2/10 border border-chart-2/20">
                      <Image className="h-10 w-10 text-chart-2" />
                    </div>
                  </FloatingElement>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-muted-foreground mb-2">Supported formats</div>
                    <div className="flex flex-wrap gap-2">
                      {["PDF", "DOCX", "PNG", "JPG", "JPEG"].map((format, i) => (
                        <motion.span 
                          key={format}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="px-3 py-1 text-xs font-medium bg-muted rounded-full"
                        >
                          {format}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
