import React from "react";
import { useState, useRef } from "react";
import { FileText, Upload, Download, Trash2, Share2 } from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Pitch Deck 2024.pdf",
      type: "PDF",
      size: "2.4 MB",
      lastModified: "2024-02-15",
      shared: true,
      status: "Draft",
    },
    {
      id: 2,
      name: "Financial Projections.xlsx",
      type: "Spreadsheet",
      size: "1.8 MB",
      lastModified: "2024-02-10",
      shared: false,
      status: "In Review",
    },
    {
      id: 3,
      name: "Business Plan.docx",
      type: "Document",
      size: "3.2 MB",
      lastModified: "2024-02-05",
      shared: true,
      status: "Signed",
    },
    {
      id: 4,
      name: "Market Research.pdf",
      type: "PDF",
      size: "5.1 MB",
      lastModified: "2024-01-28",
      shared: false,
      status: "Draft",
    },
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc = {
      id: Date.now(),
      name: file.name,
      type: file.name.endsWith(".pdf") ? "PDF" : "Document",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      lastModified: new Date().toISOString().split("T")[0],
      shared: false,
      status: "Draft",
    };

    setDocuments((prev) => [newDoc, ...prev]);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<
    (typeof documents)[number] | null
  >(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <Button
          onClick={() => fileInputRef.current?.click()}
          leftIcon={<Upload size={18} />}
        >
          Upload Document
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleUpload}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-primary-600 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Quick Access
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Recent Files
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Shared with Me
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Starred
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Trash
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document list */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                All Documents
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Sort by
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <div className="p-2 bg-primary-50 rounded-lg mr-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {doc.name}
                        </h3>
                        <Badge
                          variant={
                            doc.status === "Signed"
                              ? "success"
                              : doc.status === "In Review"
                              ? "warning"
                              : "error"
                          }
                          size="sm"
                        >
                          {doc.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>Modified {doc.lastModified}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label="Download"
                      >
                        <Download size={18} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label="Share"
                      >
                        <Share2 size={18} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-error-600 hover:text-error-700"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {selectedDoc && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">{selectedDoc.name}</h2>
              <button onClick={() => setSelectedDoc(null)}>✕</button>
            </div>

            {selectedDoc.type === "PDF" ? (
              <iframe
                title="preview"
                className="w-full h-96 border"
                src="https://example.com/sample.pdf"
              />
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                Document preview not available
              </div>
            )}

            {/* Sign button */}
            {selectedDoc.status !== "Signed" && (
              <div className="mt-4 text-right">
                <Button onClick={() => alert("Document signed!")}>
                  Sign Document
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
