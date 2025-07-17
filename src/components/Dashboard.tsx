import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Calendar,
  Users,
  ArrowUpRight,
  Bot,
  RefreshCw
} from 'lucide-react';
import dashboardHero from '../assets/dashboard-hero.jpg';
import { useBusinessData } from '../hooks/useBusinessData';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

interface DashboardProps {
  onRouteChange?: (route: string) => void;
}

export const Dashboard = ({ onRouteChange }: DashboardProps = {}) => {
  const { user } = useAuth();
  const { metrics, documents, unreadNotifications, markNotificationRead } = useBusinessData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const userName = user?.name || 'User';

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const summaryCards = [
    {
      title: 'Pending Tasks',
      value: metrics.pendingTasks.toString(),
      description: 'Need attention',
      icon: Clock,
      trend: '+2 from yesterday',
      color: 'text-warning',
      onClick: () => onRouteChange?.('tasks')
    },
    {
      title: 'Expense Summary',
      value: `₹${metrics.expenseTotal.toLocaleString()}`,
      description: 'This month',
      icon: DollarSign,
      trend: '+12% from last month',
      color: 'text-success',
      onClick: () => onRouteChange?.('expenses')
    },
    {
      title: 'Documents Processed',
      value: metrics.documentsProcessed.toString(),
      description: 'This week',
      icon: FileText,
      trend: '+8 new documents',
      color: 'text-primary',
      onClick: () => onRouteChange?.('documents')
    },
    {
      title: 'Automations Active',
      value: metrics.activeAutomations.toString(),
      description: 'Running smoothly',
      icon: Bot,
      trend: '2 new this week',
      color: 'text-secondary',
      onClick: () => onRouteChange?.('automation')
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'upload':
        onRouteChange?.('documents');
        break;
      case 'automation':
        onRouteChange?.('automation');
        break;
      case 'meeting':
        alert('Calendar integration coming soon!');
        break;
      case 'team':
        alert('Team collaboration features coming soon!');
        break;
      default:
        alert('Feature coming soon!');
    }
  };

  const handleNotificationClick = (notification: any) => {
    markNotificationRead(notification.id);
    // Route based on notification type
    if (notification.title.includes('invoice')) {
      onRouteChange?.('documents');
    } else if (notification.title.includes('report')) {
      onRouteChange?.('expenses');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-32 md:h-40 rounded-xl overflow-hidden">
        <img 
          src={dashboardHero} 
          alt="Dashboard Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-between p-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-white/90 india-responsive">
              Your business automation hub is working efficiently today
            </p>
            <p className="text-white/70 text-sm mt-1">
              Last updated: {new Date(metrics.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button 
              variant="secondary" 
              className="gap-2"
              onClick={() => alert('Analytics dashboard coming soon!')}
            >
              <TrendingUp className="w-4 h-4" />
              View Analytics
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index} 
              className="modern-card hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={card.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {card.trend}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Documents */}
        <Card className="modern-card lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Documents</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => alert('Document viewer coming soon!')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.slice(0, 4).map((doc, index) => (
                <div 
                  key={doc.id} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors duration-200 cursor-pointer"
                  onClick={() => onRouteChange?.('documents')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm truncate max-w-48">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{doc.amount}</p>
                    <Badge 
                      variant={doc.status === 'processed' ? 'default' : doc.status === 'error' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Notifications */}
        <Card className="modern-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Smart Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unreadNotifications.slice(0, 3).map((notification) => {
                const getIcon = (type: string) => {
                  switch (type) {
                    case 'warning': return AlertCircle;
                    case 'success': return CheckCircle2;
                    default: return FileText;
                  }
                };
                const Icon = getIcon(notification.type);
                
                return (
                  <div 
                    key={notification.id} 
                    className="flex gap-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200 cursor-pointer"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.type === 'warning' ? 'bg-destructive/10 text-destructive' :
                      notification.type === 'success' ? 'bg-success/10 text-success' :
                      'bg-primary/10 text-primary'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleTimeString()} ago
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              size="sm"
              onClick={() => alert('Full notifications panel coming soon!')}
            >
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              className="h-20 flex-col gap-2 bg-gradient-primary hover:opacity-90"
              onClick={() => handleQuickAction('upload')}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm">Upload Document</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleQuickAction('automation')}
            >
              <Bot className="w-6 h-6" />
              <span className="text-sm">Create Automation</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleQuickAction('meeting')}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Schedule Meeting</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleQuickAction('team')}
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Team Collaboration</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};