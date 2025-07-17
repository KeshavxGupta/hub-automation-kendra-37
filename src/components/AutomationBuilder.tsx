import { useState } from 'react';
import { 
  Bot, 
  Plus, 
  Play, 
  Settings, 
  Zap,
  Mail,
  FileText,
  DollarSign,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AutomationBlock {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  title: string;
  description: string;
  icon: any;
  color: string;
  config?: any;
}

interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  blocks: AutomationBlock[];
  executions: number;
  lastRun: string;
}

const availableBlocks: AutomationBlock[] = [
  // Triggers
  {
    id: 'invoice-received',
    type: 'trigger',
    title: 'Invoice Received',
    description: 'When a new invoice is uploaded',
    icon: FileText,
    color: 'bg-primary'
  },
  {
    id: 'email-received',
    type: 'trigger',
    title: 'Email Received',
    description: 'When email matches criteria',
    icon: Mail,
    color: 'bg-primary'
  },
  {
    id: 'amount-threshold',
    type: 'trigger',
    title: 'Amount Threshold',
    description: 'When amount exceeds limit',
    icon: DollarSign,
    color: 'bg-primary'
  },
  
  // Conditions
  {
    id: 'amount-greater',
    type: 'condition',
    title: 'Amount Greater Than',
    description: 'Check if amount > threshold',
    icon: DollarSign,
    color: 'bg-warning'
  },
  {
    id: 'vendor-check',
    type: 'condition',
    title: 'Vendor Verification',
    description: 'Verify vendor in approved list',
    icon: Users,
    color: 'bg-warning'
  },
  {
    id: 'time-check',
    type: 'condition',
    title: 'Time Condition',
    description: 'Check business hours/days',
    icon: Clock,
    color: 'bg-warning'
  },
  
  // Actions
  {
    id: 'send-approval',
    type: 'action',
    title: 'Send for Approval',
    description: 'Route to approval workflow',
    icon: CheckCircle2,
    color: 'bg-success'
  },
  {
    id: 'auto-pay',
    type: 'action',
    title: 'Auto Payment',
    description: 'Process automatic payment',
    icon: Zap,
    color: 'bg-success'
  },
  {
    id: 'send-notification',
    type: 'action',
    title: 'Send Notification',
    description: 'Email/SMS/Slack notification',
    icon: Mail,
    color: 'bg-success'
  }
];

const sampleFlows: AutomationFlow[] = [
  {
    id: '1',
    name: 'Invoice Auto-Processing',
    description: 'Automatically process invoices under ₹10,000 from verified vendors',
    status: 'active',
    executions: 156,
    lastRun: '2 hours ago',
    blocks: [
      availableBlocks[0], // Invoice Received
      availableBlocks[3], // Amount Greater Than
      availableBlocks[4], // Vendor Check
      availableBlocks[7]  // Auto Pay
    ]
  },
  {
    id: '2',
    name: 'High-Value Approval',
    description: 'Route high-value invoices (>₹50,000) for manual approval',
    status: 'active',
    executions: 23,
    lastRun: '1 day ago',
    blocks: [
      availableBlocks[0], // Invoice Received
      availableBlocks[3], // Amount Greater Than
      availableBlocks[6], // Send for Approval
      availableBlocks[8]  // Send Notification
    ]
  }
];

export const AutomationBuilder = () => {
  const [flows, setFlows] = useState<AutomationFlow[]>(sampleFlows);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [buildMode, setBuildMode] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'inactive': return 'bg-muted';
      default: return 'bg-warning';
    }
  };

  const templates = [
    {
      name: 'Invoice Processing',
      description: 'Auto-process invoices with approval workflow',
      icon: FileText,
      popular: true
    },
    {
      name: 'Expense Management',
      description: 'Categorize and route expense reports',
      icon: DollarSign,
      popular: true
    },
    {
      name: 'Email Response',
      description: 'Auto-respond to common customer queries',
      icon: Mail,
      popular: false
    },
    {
      name: 'Document Routing',
      description: 'Smart document classification and routing',
      icon: Bot,
      popular: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Automation Builder</h1>
          <p className="text-muted-foreground india-responsive">
            Create no-code automation workflows for your business processes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setBuildMode(!buildMode)}>
            {buildMode ? 'View Flows' : 'Build New'}
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Flow
          </Button>
        </div>
      </div>

      {!buildMode ? (
        <>
          {/* Active Flows */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Active Automation Flows
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {flows.map((flow) => (
                <Card key={flow.id} className="modern-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {flow.name}
                          <Badge className={getStatusColor(flow.status)}>
                            {flow.status}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1 india-responsive">
                          {flow.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Flow Visualization */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {flow.blocks.map((block, index) => {
                          const Icon = block.icon;
                          return (
                            <div key={index} className="flex items-center gap-2 flex-shrink-0">
                              <div className={`w-8 h-8 rounded-lg ${block.color} flex items-center justify-center`}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              {index < flow.blocks.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Statistics */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">
                            <strong className="text-foreground">{flow.executions}</strong> executions
                          </span>
                          <span className="text-muted-foreground">
                            Last run: {flow.lastRun}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Templates */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Popular Templates</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {templates.map((template, index) => {
                const Icon = template.icon;
                return (
                  <Card key={index} className="modern-card hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2 justify-center">
                        {template.name}
                        {template.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                      </h3>
                      <p className="text-sm text-muted-foreground india-responsive">
                        {template.description}
                      </p>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Visual Builder */
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Block Palette */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-base">Building Blocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Triggers */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-primary">Triggers</h4>
                  <div className="space-y-2">
                    {availableBlocks.filter(b => b.type === 'trigger').map((block) => {
                      const Icon = block.icon;
                      return (
                        <div key={block.id} className="automation-block p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded ${block.color} flex items-center justify-center`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{block.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{block.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-warning">Conditions</h4>
                  <div className="space-y-2">
                    {availableBlocks.filter(b => b.type === 'condition').map((block) => {
                      const Icon = block.icon;
                      return (
                        <div key={block.id} className="automation-block p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded ${block.color} flex items-center justify-center`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{block.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{block.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-success">Actions</h4>
                  <div className="space-y-2">
                    {availableBlocks.filter(b => b.type === 'action').map((block) => {
                      const Icon = block.icon;
                      return (
                        <div key={block.id} className="automation-block p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded ${block.color} flex items-center justify-center`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{block.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{block.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canvas */}
          <Card className="modern-card lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Workflow Canvas</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Test Flow</Button>
                  <Button size="sm">Save Flow</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Drag blocks here to build your automation</h3>
                  <p className="text-muted-foreground india-responsive">
                    Start with a trigger, add conditions if needed, then define actions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};