import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, Brain, Image, CheckCircle, Scan, 
  Fingerprint, Eye, Network, Shield, Sparkles, 
  Activity, FileSearch, ScanLine, Radar, Cpu, Binary
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisStep {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof FileText;
  status: "pending" | "processing" | "complete";
}

// Static CSS-based animations for performance
const pulseKeyframes = `
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: scale(2); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.4; }
  }
  @keyframes scan-line {
    0% { top: 0%; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

export default function Analyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileNames = (location.state as { files?: string[] })?.files || ["document.pdf"];
  
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phases = useMemo(() => ["Initializing", "Extracting", "Analyzing", "Deep Scanning", "Verifying", "Finalizing"], []);
  
  const [liveMetrics, setLiveMetrics] = useState([
    { label: "Patterns Detected", value: 0, max: 847 },
    { label: "Confidence Score", value: 0, max: 98 },
    { label: "Data Points", value: 0, max: 12453 },
    { label: "Anomalies Found", value: 0, max: 23 },
  ]);
  
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: "extract", label: "Content Extraction", sublabel: "Parsing document structure", icon: FileSearch, status: "pending" },
    { id: "text", label: "Text Pattern Analysis", sublabel: "NLP deep learning scan", icon: Brain, status: "pending" },
    { id: "images", label: "Visual Element Scan", sublabel: "CNN image recognition", icon: ScanLine, status: "pending" },
    { id: "fingerprint", label: "Digital Fingerprinting", sublabel: "Hash verification", icon: Fingerprint, status: "pending" },
    { id: "neural", label: "Neural Network Analysis", sublabel: "AI model inference", icon: Network, status: "pending" },
    { id: "verify", label: "Authenticity Verification", sublabel: "Cross-reference validation", icon: Shield, status: "pending" },
  ]);

  useEffect(() => {
    const totalDuration = 20000;
    const stepDuration = totalDuration / steps.length;
    
    // Single interval for progress - updates less frequently
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, totalDuration / 100);

    // Phase updates
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, totalDuration / phases.length);

    // Metrics update - less frequent
    const metricInterval = setInterval(() => {
      setLiveMetrics(prev => prev.map((m) => ({
        ...m,
        value: Math.min(m.value + Math.floor(Math.random() * (m.max / 20)) + 1, m.max)
      })));
    }, 500);

    // Step updates
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
    }, totalDuration + 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
      clearInterval(metricInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate, steps.length, phases.length]);

  const orbitingIcons = useMemo(() => [Eye, Fingerprint, Network, Binary], []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <style>{pulseKeyframes}</style>
      <Navbar />
      
      {/* Simplified Background - CSS animations only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Static floating icons with CSS animation */}
        {[Cpu, Brain, Shield, Sparkles, Scan].map((Icon, i) => (
          <div
            key={i}
            className="absolute text-primary/20 will-change-transform"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <Icon size={20 + i * 4} />
          </div>
        ))}
      </div>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Main Animation Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Central Brain Animation - Simplified */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* CSS Pulse Rings */}
            <div 
              className="absolute w-32 h-32 rounded-full border-2 border-primary/30 will-change-transform"
              style={{ animation: 'pulse-ring 2.5s ease-out infinite' }}
            />
            <div 
              className="absolute w-40 h-40 rounded-full border-2 border-primary/20 will-change-transform"
              style={{ animation: 'pulse-ring 2.5s ease-out infinite 0.5s' }}
            />
            
            {/* CSS Rotating Outer Ring */}
            <div 
              className="absolute w-32 h-32 will-change-transform"
              style={{ animation: 'orbit 8s linear infinite' }}
            >
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-3 h-3 rounded-full bg-primary/60"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${deg}deg) translateY(-60px) translateX(-50%)`,
                  }}
                />
              ))}
            </div>

            {/* Central Icon */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/30 shadow-[0_0_30px_5px_hsl(var(--primary)/0.3)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentPhase === 0 && <Cpu className="h-10 w-10 text-primary" />}
                  {currentPhase === 1 && <FileText className="h-10 w-10 text-primary" />}
                  {currentPhase === 2 && <Brain className="h-10 w-10 text-primary" />}
                  {currentPhase === 3 && <Scan className="h-10 w-10 text-primary" />}
                  {currentPhase === 4 && <Shield className="h-10 w-10 text-primary" />}
                  {currentPhase === 5 && <Sparkles className="h-10 w-10 text-primary" />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CSS Orbiting Icons */}
            <div 
              className="absolute w-48 h-48 will-change-transform"
              style={{ animation: 'orbit 10s linear infinite' }}
            >
              {orbitingIcons.map((Icon, i) => (
                <div
                  key={i}
                  className="absolute w-8 h-8 rounded-full bg-background border border-primary/30 flex items-center justify-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 90}deg) translateY(-90px) translateX(-50%)`,
                  }}
                >
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Phase Indicator */}
          <div className="mb-2">
            <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
              Phase {currentPhase + 1}/{phases.length}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{phases[currentPhase]} Analysis</h1>
          <p className="text-muted-foreground">
            {fileNames.length > 1 
              ? `Deep scanning ${fileNames.length} files...`
              : `Deep scanning ${fileNames[0]}...`
            }
          </p>
        </motion.div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {liveMetrics.map((metric, i) => (
            <div
              key={metric.label}
              className="p-4 rounded-lg border bg-card/50 border-border/50 transition-colors"
            >
              <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-xl font-bold font-mono text-primary">
                {metric.value.toLocaleString()}
                {i === 1 && '%'}
              </div>
            </div>
          ))}
        </div>

        {/* Main Progress Card */}
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 overflow-hidden relative">
          {/* CSS Scanning Bar */}
          <div 
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent will-change-transform"
            style={{ animation: 'scan-line 3s ease-in-out infinite' }}
          />
          
          <CardContent className="p-6 relative z-10">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '2s' }} />
                  <span>Overall Progress</span>
                </div>
                <span className="font-mono font-bold text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-3" />
                <div
                  className="absolute top-0 h-3 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent will-change-transform"
                  style={{ animation: 'shimmer 1.5s linear infinite' }}
                />
              </div>
            </div>

            {/* Analysis Steps */}
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                    step.status === "processing" 
                      ? "bg-primary/5 border-primary/30" 
                      : step.status === "complete"
                      ? "bg-chart-3/5 border-chart-3/30"
                      : "bg-muted/20 border-border/30"
                  }`}
                >
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      step.status === "processing" 
                        ? "bg-primary/20" 
                        : step.status === "complete"
                        ? "bg-chart-3/20"
                        : "bg-muted/50"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <CheckCircle className="h-6 w-6 text-chart-3" />
                    ) : (
                      <step.icon className={`h-6 w-6 ${
                        step.status === "processing" ? "text-primary animate-pulse" : "text-muted-foreground"
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${
                      step.status === "pending" ? "text-muted-foreground" : ""
                    }`}>
                      {step.label}
                    </p>
                    <p className={`text-xs ${
                      step.status === "processing" ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {step.sublabel}
                    </p>
                    {step.status === "processing" && (
                      <div className="mt-2 h-1 rounded-full bg-primary/20 overflow-hidden">
                        <div
                          className="h-full bg-primary will-change-transform"
                          style={{ 
                            animation: 'shimmer 1.5s linear infinite',
                            width: '50%'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {step.status === "processing" && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span className="text-xs font-mono text-primary animate-pulse">
                        Processing
                      </span>
                    </div>
                  )}

                  {step.status === "complete" && (
                    <span className="text-xs font-mono text-chart-3">
                      Complete
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Info */}
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
          <Radar className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Advanced AI analysis in progress • Estimated time: ~30 seconds</span>
        </div>
      </main>
    </div>
  );
}
