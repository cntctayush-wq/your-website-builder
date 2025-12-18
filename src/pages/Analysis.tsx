import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Download, FileText, Image, AlertTriangle, 
  CheckCircle, Info, ChevronDown, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TextSection {
  id: string;
  content: string;
  aiScore: number;
  page: number;
}

interface ImageResult {
  id: string;
  name: string;
  page: number;
  aiScore: number;
  generator: string | null;
}

type HighlightType = "very-likely" | "likely" | "unlikely" | "rare";

interface HighlightedWord {
  text: string;
  highlight: HighlightType;
}

const highlightColors: Record<HighlightType, { bg: string; text: string }> = {
  "very-likely": { bg: "bg-green-500/20 dark:bg-green-500/30", text: "text-green-700 dark:text-green-400" },
  "likely": { bg: "bg-yellow-500/20 dark:bg-yellow-500/30", text: "text-yellow-700 dark:text-yellow-400" },
  "unlikely": { bg: "bg-red-500/20 dark:bg-red-500/30", text: "text-red-700 dark:text-red-400" },
  "rare": { bg: "bg-purple-500/20 dark:bg-purple-500/30", text: "text-purple-700 dark:text-purple-400" },
};

function getRandomHighlight(): HighlightType {
  const types: HighlightType[] = ["very-likely", "likely", "unlikely", "rare"];
  return types[Math.floor(Math.random() * types.length)];
}

function highlightText(content: string): HighlightedWord[] {
  const words = content.split(" ");
  return words.map((word) => ({
    text: word,
    highlight: getRandomHighlight(),
  }));
}

const mockTextSections: TextSection[] = [
  {
    id: "1",
    content: "The rapid advancement of artificial intelligence has fundamentally transformed various industries, creating unprecedented opportunities for automation and efficiency. Machine learning algorithms now power everything from recommendation systems to autonomous vehicles.",
    aiScore: 92,
    page: 1
  },
  {
    id: "2",
    content: "However, the integration of these technologies raises important ethical considerations that society must address. Privacy concerns, algorithmic bias, and the displacement of human workers are challenges that require careful policy responses.",
    aiScore: 88,
    page: 1
  },
  {
    id: "3",
    content: "Based on our field research conducted over six months, we observed significant variations in user behavior across different demographic groups. The data was collected through surveys and interviews.",
    aiScore: 15,
    page: 2
  },
];

const mockImages: ImageResult[] = [
  { id: "1", name: "figure_1.png", page: 3, aiScore: 95, generator: "DALL-E 3" },
  { id: "2", name: "chart_data.png", page: 5, aiScore: 8, generator: null },
  { id: "3", name: "illustration.jpg", page: 7, aiScore: 78, generator: "Midjourney" },
];

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const getColor = () => {
    if (score >= 70) return "text-destructive";
    if (score >= 40) return "text-chart-4";
    return "text-chart-3";
  };

  const getStatus = () => {
    if (score >= 70) return "High AI Probability";
    if (score >= 40) return "Moderate AI Probability";
    return "Likely Human";
  };

  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-muted"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={352}
            initial={{ strokeDashoffset: 352 }}
            animate={{ strokeDashoffset: 352 - (352 * score) / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={getColor()}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold ${getColor()}`}>{score}%</span>
        </div>
      </div>
      <p className="font-medium">{label}</p>
      <p className={`text-sm ${getColor()}`}>{getStatus()}</p>
    </div>
  );
}

function TextSectionCard({ section }: { section: TextSection }) {
  const [expanded, setExpanded] = useState(false);
  const [highlightedWords] = useState(() => highlightText(section.content));
  
  const getColor = () => {
    if (section.aiScore >= 70) return "border-destructive/30 bg-destructive/5";
    if (section.aiScore >= 40) return "border-chart-4/30 bg-chart-4/5";
    return "border-chart-3/30 bg-chart-3/5";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${getColor()}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">Page {section.page}</Badge>
            <Badge variant={section.aiScore >= 70 ? "destructive" : section.aiScore >= 40 ? "secondary" : "outline"}>
              {section.aiScore}% AI
            </Badge>
          </div>
          <div className={`p-3 rounded-md bg-card border text-sm leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
            {highlightedWords.map((word, index) => (
              <span
                key={index}
                className={`px-0.5 rounded ${highlightColors[word.highlight].bg} ${highlightColors[word.highlight].text}`}
              >
                {word.text}{" "}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-500/30"></span>
              Very Likely
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-yellow-500/30"></span>
              Likely
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-red-500/30"></span>
              Unlikely
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-purple-500/30"></span>
              Rare
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  );
}

export default function Analysis() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const overallTextScore = 78;
  const overallImageScore = 45;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Analysis Report</h1>
              <p className="text-muted-foreground">Research_Paper_2024.pdf</p>
            </div>
          </div>
          <Button data-testid="button-download-report">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="text">Text Analysis</TabsTrigger>
            <TabsTrigger value="images">Image Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Name</span>
                    <span className="font-medium">Research_Paper_2024.pdf</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pages</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Words</span>
                    <span className="font-medium">4,832</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Images</span>
                    <span className="font-medium">4</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Text Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScoreGauge score={overallTextScore} label="AI-Generated Text" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScoreGauge score={overallImageScore} label="AI-Generated Images" />
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Key Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">High AI content detected</p>
                      <p className="text-sm text-muted-foreground">
                        78% of text content shows patterns consistent with AI generation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-chart-3/10 border border-chart-3/20">
                    <CheckCircle className="h-5 w-5 text-chart-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-chart-3">Some original content found</p>
                      <p className="text-sm text-muted-foreground">
                        Research methodology sections appear to be human-written.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text">
            <Card>
              <CardHeader>
                <CardTitle>Text Sections Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {mockTextSections.map((section) => (
                    <TextSectionCard key={section.id} section={section} />
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Image Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockImages.map((image, i) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg border"
                    >
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{image.name}</p>
                        <p className="text-sm text-muted-foreground">Page {image.page}</p>
                        {image.generator && (
                          <Badge variant="secondary" className="mt-1">
                            {image.generator}
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          image.aiScore >= 70 ? "text-destructive" : 
                          image.aiScore >= 40 ? "text-chart-4" : "text-chart-3"
                        }`}>
                          {image.aiScore}%
                        </p>
                        <p className="text-sm text-muted-foreground">AI Score</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
