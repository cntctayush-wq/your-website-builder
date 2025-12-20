import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, Brain, Image, CheckCircle, Scan, Binary, 
  Fingerprint, Eye, Zap, Database, Cpu, Network, 
  Shield, Lock, Search, Sparkles, Activity, Atom,
  CircuitBoard, Layers, FileSearch, ScanLine, Radar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisStep {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof FileText;
  status: "pending" | "processing" | "complete";
}

interface FloatingIcon {
  id: number;
  Icon: typeof FileText;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingParticle = ({ icon: Icon, x, y, delay, duration, size }: { 
  icon: typeof FileText; 
  x: number; 
  y: number; 
  delay: number;
  duration: number;
  size: number;
}) => (
  <motion.div
    className="absolute text-primary/20"
    initial={{ x: `${x}%`, y: `${y}%`, opacity: 0, scale: 0 }}
    animate={{ 
      x: [`${x}%`, `${x + (Math.random() - 0.5) * 30}%`, `${x}%`],
      y: [`${y}%`, `${y + (Math.random() - 0.5) * 30}%`, `${y}%`],
      opacity: [0, 0.6, 0],
      scale: [0, 1, 0],
      rotate: [0, 360]
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <Icon size={size} />
  </motion.div>
);

const DataStream = ({ index }: { index: number }) => (
  <motion.div
    className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
    style={{ 
      top: `${20 + index * 15}%`,
      width: '100%',
    }}
    initial={{ x: '-100%', opacity: 0 }}
    animate={{ x: '100%', opacity: [0, 1, 0] }}
    transition={{ 
      duration: 2 + index * 0.3,
      delay: index * 0.4,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

const PulseRing = ({ delay, size }: { delay: number; size: number }) => (
  <motion.div
    className="absolute rounded-full border-2 border-primary/30"
    style={{ width: size, height: size }}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: [0.8, 1.5, 2], opacity: [0, 0.5, 0] }}
    transition={{ 
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
);

const NeuralNode = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-primary"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 1, 0.5, 1],
      opacity: [0, 1, 0.5, 1],
      boxShadow: [
        '0 0 0 0 hsl(var(--primary) / 0)',
        '0 0 20px 5px hsl(var(--primary) / 0.5)',
        '0 0 10px 2px hsl(var(--primary) / 0.3)',
        '0 0 20px 5px hsl(var(--primary) / 0.5)',
      ]
    }}
    transition={{ 
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const ScanningBar = () => (
  <motion.div
    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
    initial={{ top: '0%', opacity: 0 }}
    animate={{ top: ['0%', '100%', '0%'], opacity: [0, 1, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function Analyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileNames = (location.state as { files?: string[] })?.files || ["document.pdf"];
  
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);
  
  const phases = ["Initializing", "Extracting", "Analyzing", "Deep Scanning", "Verifying", "Finalizing"];
  const metrics = [
    { label: "Patterns Detected", value: 0 },
    { label: "Confidence Score", value: 0 },
    { label: "Data Points", value: 0 },
    { label: "Anomalies Found", value: 0 },
  ];
  
  const [liveMetrics, setLiveMetrics] = useState(metrics);
  
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: "extract", label: "Content Extraction", sublabel: "Parsing document structure", icon: FileSearch, status: "pending" },
    { id: "text", label: "Text Pattern Analysis", sublabel: "NLP deep learning scan", icon: Brain, status: "pending" },
    { id: "images", label: "Visual Element Scan", sublabel: "CNN image recognition", icon: ScanLine, status: "pending" },
    { id: "fingerprint", label: "Digital Fingerprinting", sublabel: "Hash verification", icon: Fingerprint, status: "pending" },
    { id: "neural", label: "Neural Network Analysis", sublabel: "AI model inference", icon: Network, status: "pending" },
    { id: "verify", label: "Authenticity Verification", sublabel: "Cross-reference validation", icon: Shield, status: "pending" },
  ]);

  const floatingIcons: FloatingIcon[] = useMemo(() => [
    Binary, Cpu, Database, Lock, Search, Sparkles, Activity, Atom, CircuitBoard, Layers, Radar, Eye, Zap
  ].map((Icon, i) => ({
    id: i,
    Icon,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    delay: i * 0.3,
    duration: 3 + Math.random() * 2,
    size: 16 + Math.random() * 16,
  })), []);

  const neuralNodes = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + (i % 4) * 25 + Math.random() * 10,
      y: 20 + Math.floor(i / 4) * 25 + Math.random() * 10,
      delay: i * 0.15,
    })), []);

  useEffect(() => {
    const totalDuration = 20000;
    const stepDuration = totalDuration / steps.length;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, totalDuration / 200);

    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, totalDuration / phases.length);

    const metricInterval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
      setLiveMetrics(prev => prev.map((m, i) => ({
        ...m,
        value: Math.min(m.value + Math.floor(Math.random() * 15) + 5, 
          i === 0 ? 847 : i === 1 ? 98 : i === 2 ? 12453 : 23)
      })));
    }, 300);

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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Icons */}
        {floatingIcons.map((item) => (
          <FloatingParticle 
            key={item.id}
            icon={item.Icon}
            x={item.x}
            y={item.y}
            delay={item.delay}
            duration={item.duration}
            size={item.size}
          />
        ))}
        
        {/* Data Streams */}
        {[0, 1, 2, 3, 4].map((i) => (
          <DataStream key={i} index={i} />
        ))}

        {/* Neural Nodes */}
        {neuralNodes.map((node) => (
          <NeuralNode key={node.id} x={node.x} y={node.y} delay={node.delay} />
        ))}
      </div>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Main Animation Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          {/* Central Brain Animation */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Pulse Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PulseRing delay={0} size={120} />
              <PulseRing delay={0.5} size={160} />
              <PulseRing delay={1} size={200} />
            </div>
            
            {/* Rotating Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32"
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <motion.div
                  key={deg}
                  className="absolute w-3 h-3 rounded-full bg-primary/60"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${deg}deg) translateY(-60px) translateX(-50%)`,
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </motion.div>

            {/* Counter-Rotating Inner Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border-2 border-dashed border-primary/40"
            />

            {/* Scanning Bar Inside */}
            <div className="absolute w-20 h-20 rounded-full overflow-hidden">
              <ScanningBar />
            </div>

            {/* Central Icon */}
            <motion.div
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/30"
              animate={{ 
                boxShadow: [
                  '0 0 20px 0 hsl(var(--primary) / 0.3)',
                  '0 0 40px 10px hsl(var(--primary) / 0.5)',
                  '0 0 20px 0 hsl(var(--primary) / 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentPhase === 0 && <Cpu className="h-10 w-10 text-primary" />}
                  {currentPhase === 1 && <FileText className="h-10 w-10 text-primary" />}
                  {currentPhase === 2 && <Brain className="h-10 w-10 text-primary" />}
                  {currentPhase === 3 && <Scan className="h-10 w-10 text-primary" />}
                  {currentPhase === 4 && <Shield className="h-10 w-10 text-primary" />}
                  {currentPhase === 5 && <Sparkles className="h-10 w-10 text-primary" />}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Orbiting Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-48 h-48"
            >
              {[Eye, Fingerprint, Network, Binary].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 rounded-full bg-background border border-primary/30 flex items-center justify-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 90}deg) translateY(-90px) translateX(-50%)`,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Icon className="h-4 w-4 text-primary" />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Phase Indicator */}
          <motion.div
            key={phases[currentPhase]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
              Phase {currentPhase + 1}/{phases.length}
            </span>
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={phases[currentPhase]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="inline-block"
              >
                {phases[currentPhase]} Analysis
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="text-muted-foreground">
            {fileNames.length > 1 
              ? `Deep scanning ${fileNames.length} files...`
              : `Deep scanning ${fileNames[0]}...`
            }
          </p>
        </motion.div>

        {/* Live Metrics Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          {liveMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                activeMetric === i 
                  ? 'bg-primary/10 border-primary/40 shadow-lg shadow-primary/10' 
                  : 'bg-card/50 border-border/50'
              }`}
              animate={activeMetric === i ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
              <motion.div 
                className="text-xl font-bold font-mono text-primary"
                key={metric.value}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {metric.value.toLocaleString()}
                {i === 1 && '%'}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Progress Card */}
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden">
            <ScanningBar />
          </div>
          
          <CardContent className="p-6 relative z-10">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="h-4 w-4 text-primary" />
                  </motion.div>
                  <span>Overall Progress</span>
                </div>
                <motion.span 
                  className="font-mono font-bold text-primary"
                  key={Math.round(progress)}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-3" />
                <motion.div
                  className="absolute top-0 h-3 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
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
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                    step.status === "processing" 
                      ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/5" 
                      : step.status === "complete"
                      ? "bg-chart-3/5 border-chart-3/30"
                      : "bg-muted/20 border-border/30"
                  }`}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center relative ${
                      step.status === "processing" 
                        ? "bg-primary/20" 
                        : step.status === "complete"
                        ? "bg-chart-3/20"
                        : "bg-muted/50"
                    }`}
                    animate={step.status === "processing" ? {
                      boxShadow: [
                        '0 0 0 0 hsl(var(--primary) / 0)',
                        '0 0 20px 5px hsl(var(--primary) / 0.3)',
                        '0 0 0 0 hsl(var(--primary) / 0)',
                      ]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {step.status === "complete" ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-6 w-6 text-chart-3" />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={step.status === "processing" ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <step.icon className={`h-6 w-6 ${
                          step.status === "processing" ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </motion.div>
                    )}
                  </motion.div>
                  
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
                      <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        className="mt-2 h-1 rounded-full bg-primary/20 overflow-hidden"
                      >
                        <motion.div
                          className="h-full bg-primary"
                          animate={{ width: ["0%", "100%"] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    )}
                  </div>

                  {step.status === "processing" && (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs font-mono text-primary"
                      >
                        Processing
                      </motion.span>
                    </div>
                  )}

                  {step.status === "complete" && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs font-mono text-chart-3"
                    >
                      Complete
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Radar className="h-4 w-4" />
          </motion.div>
          <span>Advanced AI analysis in progress • Estimated time: ~30 seconds</span>
        </motion.div>
      </main>
    </div>
  );
}
