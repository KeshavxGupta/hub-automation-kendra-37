import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Eye, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'processing' | 'completed' | 'error';
  extractedFields?: ExtractedField[];
  documentType?: string;
}

export const DocumentUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const processFile = (file: File): UploadedFile => {
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'processing'
    };

    // Simulate processing
    setTimeout(() => {
      const isInvoice = file.name.toLowerCase().includes('invoice');
      const isReceipt = file.name.toLowerCase().includes('receipt');
      const isContract = file.name.toLowerCase().includes('contract');

      let documentType = 'Unknown';
      let extractedFields: ExtractedField[] = [];

      if (isInvoice) {
        documentType = 'Invoice';
        extractedFields = [
          { label: 'Vendor Name', value: 'ABC Technologies Pvt Ltd', confidence: 0.98 },
          { label: 'Invoice Number', value: 'INV-2024-001', confidence: 0.95 },
          { label: 'Amount', value: '₹45,000', confidence: 0.99 },
          { label: 'Due Date', value: '15th March 2024', confidence: 0.92 },
          { label: 'GST Number', value: '27ABCDE1234F1Z5', confidence: 0.89 }
        ];
      } else if (isReceipt) {
        documentType = 'Receipt';
        extractedFields = [
          { label: 'Merchant', value: 'Office Depot India', confidence: 0.97 },
          { label: 'Amount', value: '₹2,500', confidence: 0.99 },
          { label: 'Date', value: '12th March 2024', confidence: 0.95 },
          { label: 'Category', value: 'Office Supplies', confidence: 0.88 }
        ];
      } else if (isContract) {
        documentType = 'Contract';
        extractedFields = [
          { label: 'Party 1', value: 'Your Company Name', confidence: 0.96 },
          { label: 'Party 2', value: 'XYZ Solutions Ltd', confidence: 0.94 },
          { label: 'Contract Value', value: '₹1,20,000', confidence: 0.97 },
          { label: 'Duration', value: '12 months', confidence: 0.91 }
        ];
      }

      setFiles(prev => prev.map(f => 
        f.id === uploadedFile.id 
          ? { ...f, status: 'completed', documentType, extractedFields }
          : f
      ));

      toast({
        title: "Document Processed",
        description: `Successfully extracted data from ${file.name}`,
      });
    }, 2000);

    return uploadedFile;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const processedFiles = droppedFiles.map(processFile);
    setFiles(prev => [...prev, ...processedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const processedFiles = selectedFiles.map(processFile);
      setFiles(prev => [...prev, ...processedFiles]);
    }
  };

  const routingOptions = [
    { id: 'approval', label: 'Send for Approval', color: 'bg-warning' },
    { id: 'payment', label: 'Process Payment', color: 'bg-success' },
    { id: 'archive', label: 'Archive Only', color: 'bg-muted' },
    { id: 'review', label: 'Manual Review', color: 'bg-destructive' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Analyzer</h1>
          <p className="text-muted-foreground india-responsive">
            Upload documents for AI-powered data extraction and smart routing
          </p>
        </div>
        <Button 
          className="gap-2"
          onClick={() => alert('Document templates coming soon!')}
        >
          <FileText className="w-4 h-4" />
          View Templates
        </Button>
      </div>

      {/* Upload Zone */}
      <Card className="modern-card">
        <CardContent className="p-8">
          <div
            className={`upload-zone ${dragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop your documents here</h3>
            <p className="text-muted-foreground mb-4 india-responsive">
              or click to browse files. Supports PDF, images, and scanned documents
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.tiff"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Choose Files
              </Button>
            </label>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Badge variant="outline">Invoices</Badge>
              <Badge variant="outline">Receipts</Badge>
              <Badge variant="outline">Contracts</Badge>
              <Badge variant="outline">Bills</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processed Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Processing Results</h2>
          
          {files.map((file) => (
            <Card key={file.id} className="modern-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{file.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {file.documentType && (
                          <Badge variant="secondary">{file.documentType}</Badge>
                        )}
                        <Badge 
                          variant={
                            file.status === 'completed' ? 'default' :
                            file.status === 'error' ? 'destructive' : 'secondary'
                          }
                        >
                          {file.status === 'processing' && (
                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                          )}
                          {file.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {file.status === 'error' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {file.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => alert(`Viewing ${file.name}`)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {file.status === 'completed' && file.extractedFields && (
                <CardContent>
                  <div className="space-y-4">
                    {/* Extracted Fields */}
                    <div>
                      <h4 className="font-medium mb-3">Extracted Information</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {file.extractedFields.map((field, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">{field.label}</p>
                              <p className="text-sm text-muted-foreground">{field.value}</p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                field.confidence > 0.9 ? 'text-success' : 
                                field.confidence > 0.8 ? 'text-warning' : 'text-destructive'
                              }`}
                            >
                              {Math.round(field.confidence * 100)}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Smart Routing Suggestions */}
                    <div>
                      <h4 className="font-medium mb-3">Smart Routing Suggestions</h4>
                      <div className="flex flex-wrap gap-2">
                        {routingOptions.map((option) => (
                          <Button key={option.id} variant="outline" size="sm" className="gap-2">
                            <div className={`w-3 h-3 rounded-full ${option.color}`} />
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="gap-2"
                        onClick={() => {
                          toast({
                            title: "Automation Applied",
                            description: `Processing ${file.name} with automation rules`,
                          });
                        }}
                      >
                        <Send className="w-4 h-4" />
                        Apply Automation
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => alert('Field editor coming soon!')}
                      >
                        Edit Fields
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Template Saved",
                            description: `Saved ${file.documentType} template`,
                          });
                        }}
                      >
                        Save Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};