import { useState } from 'react';
import { Mail, Upload, Brain, Clock, CheckCircle2, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

interface EmailSummary {
  id: string;
  fileName: string;
  subject: string;
  sender: string;
  recipient: string;
  date: string;
  summary: string;
  keyTakeaways: string[];
  actionItems: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  priority: 'high' | 'medium' | 'low';
  meetingDetails?: {
    date: string;
    time: string;
    duration: string;
    participants: string[];
  };
}

export const EmailSummarizer = () => {
  const [emailSummaries, setEmailSummaries] = useState<EmailSummary[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const sampleSummaries: EmailSummary[] = [
    {
      id: '1',
      fileName: 'project_discussion.eml',
      subject: 'Q1 Project Timeline Discussion',
      sender: 'priya.sharma@clientcompany.com',
      recipient: 'rajesh.kumar@yourcompany.com',
      date: '2024-03-12 14:30',
      summary: 'Client discussion about Q1 project deliverables and timeline adjustments. They are requesting a 2-week extension for the mobile app development phase due to additional feature requirements.',
      keyTakeaways: [
        'Client needs 2-week extension for mobile development',
        'Additional features: push notifications and offline sync',
        'Budget increase of ₹50,000 approved',
        'New deadline: April 30th, 2024'
      ],
      actionItems: [
        'Update project timeline in system',
        'Prepare revised proposal by March 15th',
        'Schedule team meeting to discuss resource allocation',
        'Send updated contract to client'
      ],
      sentiment: 'positive',
      priority: 'high',
      meetingDetails: {
        date: '2024-03-15',
        time: '10:00 AM',
        duration: '1 hour',
        participants: ['Priya Sharma', 'Rajesh Kumar', 'Development Team Lead']
      }
    },
    {
      id: '2',
      fileName: 'vendor_invoice_query.eml',
      subject: 'Invoice Payment Query - ABC Suppliers',
      sender: 'accounts@abcsuppliers.com',
      recipient: 'accounts@yourcompany.com',
      date: '2024-03-11 16:45',
      summary: 'Vendor inquiry about delayed payment for Invoice #INV-2024-089. They are requesting clarification on payment status and expected processing date.',
      keyTakeaways: [
        'Invoice #INV-2024-089 payment is overdue',
        'Amount: ₹25,000 due since March 1st',
        'Vendor relationship at risk if not resolved soon',
        'Need immediate payment processing'
      ],
      actionItems: [
        'Check invoice status in accounts system',
        'Process payment immediately if approved',
        'Send payment confirmation to vendor',
        'Review payment automation rules'
      ],
      sentiment: 'negative',
      priority: 'high'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setEmailSummaries(sampleSummaries);
      setIsProcessing(false);
      toast({
        title: 'Emails Processed',
        description: `Successfully analyzed ${files.length} email file(s)`,
      });
    }, 2000);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Email & Meeting Summarizer</h1>
          <p className="text-muted-foreground india-responsive">
            AI-powered email analysis with automatic action item extraction
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Brain className="w-4 h-4" />
          AI Settings
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Upload Email Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="upload-zone">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Email Files</h3>
            <p className="text-muted-foreground mb-4 india-responsive">
              Supports .eml, .msg, and .txt email formats
            </p>
            <input
              type="file"
              multiple
              accept=".eml,.msg,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="email-upload"
              disabled={isProcessing}
            />
            <label htmlFor="email-upload">
              <Button disabled={isProcessing} className="gap-2">
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Choose Email Files
                  </>
                )}
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Email Summaries */}
      {emailSummaries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Email Analysis Results</h2>
          
          {emailSummaries.map((email) => (
            <Card key={email.id} className="modern-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{email.subject}</CardTitle>
                      <Badge className={getPriorityColor(email.priority)}>
                        {email.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>From: {email.sender}</span>
                      <span>•</span>
                      <span>{email.date}</span>
                      <span>•</span>
                      <span className={getSentimentColor(email.sentiment)}>
                        {email.sentiment} sentiment
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* AI Summary */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      AI Summary
                    </h4>
                    <p className="text-muted-foreground india-responsive">
                      {email.summary}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  <div>
                    <h4 className="font-medium mb-3">Key Takeaways</h4>
                    <div className="space-y-2">
                      {email.keyTakeaways.map((takeaway, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h4 className="font-medium mb-3">Action Items</h4>
                    <div className="space-y-2">
                      {email.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-muted/50 rounded-lg">
                          <Clock className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-sm flex-1">{item}</span>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Create Task
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meeting Details */}
                  {email.meetingDetails && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Meeting Details
                      </h4>
                      <div className="bg-accent/50 rounded-lg p-4">
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <p className="text-sm font-medium">Date & Time</p>
                            <p className="text-sm text-muted-foreground">
                              {email.meetingDetails.date} at {email.meetingDetails.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                              {email.meetingDetails.duration}
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium mb-2">Participants</p>
                            <div className="flex flex-wrap gap-2">
                              {email.meetingDetails.participants.map((participant, index) => (
                                <Badge key={index} variant="outline" className="gap-1">
                                  <Users className="w-3 h-3" />
                                  {participant}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button className="mt-3 w-full md:w-auto">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button className="gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Create Automation
                    </Button>
                    <Button variant="outline">Export Summary</Button>
                    <Button variant="outline">Share Analysis</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {emailSummaries.length === 0 && !isProcessing && (
        <Card className="modern-card">
          <CardContent className="p-12 text-center">
            <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No emails analyzed yet</h3>
            <p className="text-muted-foreground india-responsive">
              Upload your email files to get AI-powered summaries and action items
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};