import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Upload, FileText, Image, Search, Filter, MoreVertical, 
  Eye, Trash2, Download, Calendar, AlertTriangle, CheckCircle, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockDocuments = [
  {
    id: "1",
    name: "Research_Paper_2024.pdf",
    type: "pdf",
    status: "completed",
    aiTextScore: 78,
    aiImageScore: 45,
    uploadDate: "2024-01-15",
    pages: 12,
    images: 4
  },
  {
    id: "2",
    name: "Marketing_Report.docx",
    type: "docx",
    status: "completed",
    aiTextScore: 23,
    aiImageScore: 0,
    uploadDate: "2024-01-14",
    pages: 8,
    images: 0
  },
  {
    id: "3",
    name: "Thesis_Chapter3.pdf",
    type: "pdf",
    status: "processing",
    aiTextScore: 0,
    aiImageScore: 0,
    uploadDate: "2024-01-15",
    pages: 45,
    images: 12
  },
  {
    id: "4",
    name: "Blog_Article_Draft.docx",
    type: "docx",
    status: "completed",
    aiTextScore: 92,
    aiImageScore: 100,
    uploadDate: "2024-01-13",
    pages: 3,
    images: 2
  },
];

function getScoreColor(score) {
  if (score >= 70) return "text-destructive";
  if (score >= 40) return "text-chart-4";
  return "text-chart-3";
}

function getScoreBadge(score) {
  if (score >= 70) return "destructive";
  if (score >= 40) return "secondary";
  return "outline";
}

function StatusBadge({ status }) {
  const config = {
    completed: { icon: CheckCircle, label: "Completed", variant: "outline" },
    processing: { icon: Clock, label: "Processing", variant: "secondary" },
    pending: { icon: AlertTriangle, label: "Pending", variant: "destructive" },
  };
  
  const { icon: Icon, label, variant } = config[status];
  
  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents] = useState(mockDocuments);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: documents.length,
    completed: documents.filter((d) => d.status === "completed").length,
    processing: documents.filter((d) => d.status === "processing").length,
    highRisk: documents.filter((d) => d.aiTextScore >= 70 || d.aiImageScore >= 70).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage and review your analyzed documents</p>
          </div>
          <Link to="/upload">
            <Button data-testid="button-upload-new">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {[
            { label: "Total Documents", value: stats.total, icon: FileText },
            { label: "Completed", value: stats.completed, icon: CheckCircle },
            { label: "Processing", value: stats.processing, icon: Clock },
            { label: "High Risk", value: stats.highRisk, icon: AlertTriangle },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>Recent Documents</CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search"
                  />
                </div>
                <Button variant="outline" size="icon" data-testid="button-filter">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredDocuments.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {doc.type === "pdf" ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-chart-2" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {doc.uploadDate}
                          <span>•</span>
                          {doc.pages} pages
                          {doc.images > 0 && (
                            <>
                              <span>•</span>
                              <Image className="h-3 w-3" />
                              {doc.images}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <StatusBadge status={doc.status} />
                      
                      {doc.status === "completed" && (
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Text</p>
                            <Badge variant={getScoreBadge(doc.aiTextScore)}>
                              <span className={getScoreColor(doc.aiTextScore)}>
                                {doc.aiTextScore}%
                              </span>
                            </Badge>
                          </div>
                          {doc.images > 0 && (
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Images</p>
                              <Badge variant={getScoreBadge(doc.aiImageScore)}>
                                <span className={getScoreColor(doc.aiImageScore)}>
                                  {doc.aiImageScore}%
                                </span>
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" data-testid={`button-actions-${doc.id}`}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link to={`/analysis/${doc.id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Report
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No documents found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
