import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, X, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const MAX_SIZE = 50 * 1024 * 1024;

export default function Upload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only PDF and DOCX files are supported";
    }
    if (file.size > MAX_SIZE) {
      return "File size must be less than 50MB";
    }
    return null;
  };

  const processFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    
    fileArray.forEach((file) => {
      const error = validateFile(file);
      const uploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: error ? "error" : "uploading",
        error: error || undefined
      };

      setFiles((prev) => [...prev, uploadedFile]);

      if (!error) {
        simulateUpload(uploadedFile.id);
      }
    });
  }, []);

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: "complete" } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress } : f
          )
        );
      }
    }, 200);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleAnalyze = () => {
    const completedFiles = files.filter((f) => f.status === "complete");
    if (completedFiles.length === 0) {
      toast({
        title: "No files ready",
        description: "Please wait for files to finish uploading.",
        variant: "destructive"
      });
      return;
    }
    navigate("/analyzing", { state: { files: completedFiles.map((f) => f.file.name) } });
  };

  const completedCount = files.filter((f) => f.status === "complete").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Upload Documents</h1>
          <p className="text-muted-foreground">Upload PDF or DOCX files to analyze for AI-generated content</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Files</CardTitle>
            <CardDescription>Drag and drop or click to browse. Max 50MB per file.</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              animate={{ 
                scale: isDragging ? 1.02 : 1,
                borderColor: isDragging ? "hsl(var(--primary))" : "hsl(var(--border))"
              }}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                isDragging ? "bg-primary/5" : "hover:bg-muted/50"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.docx"
                multiple
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                data-testid="input-file"
              />
              <motion.div
                animate={{ y: isDragging ? -5 : 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <UploadIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-lg">
                    {isDragging ? "Drop files here" : "Drop files here or click to browse"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports PDF and DOCX files up to 50MB
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-3"
                >
                  {files.map((uploadedFile) => (
                    <motion.div
                      key={uploadedFile.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{uploadedFile.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        
                        {uploadedFile.status === "uploading" && (
                          <Progress value={uploadedFile.progress} className="h-1 mt-2" />
                        )}
                        
                        {uploadedFile.status === "error" && (
                          <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {uploadedFile.error}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0">
                        {uploadedFile.status === "complete" && (
                          <CheckCircle className="h-5 w-5 text-chart-3" />
                        )}
                        {uploadedFile.status === "uploading" && (
                          <span className="text-sm text-muted-foreground">
                            {Math.round(uploadedFile.progress)}%
                          </span>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(uploadedFile.id)}
                        data-testid={`button-remove-${uploadedFile.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {files.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {files.length} files ready
                </p>
                <Button 
                  onClick={handleAnalyze}
                  disabled={completedCount === 0}
                  data-testid="button-analyze"
                >
                  Analyze {completedCount > 0 ? `(${completedCount})` : ""}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
