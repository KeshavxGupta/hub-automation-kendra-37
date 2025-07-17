import { Dashboard } from './Dashboard';
import { DocumentUpload } from './DocumentUpload';
import { EmailSummarizer } from './EmailSummarizer';
import { AutomationBuilder } from './AutomationBuilder';

interface RouterProps {
  activeRoute: string;
  onRouteChange?: (route: string) => void;
}

export const Router = ({ activeRoute, onRouteChange }: RouterProps) => {
  switch (activeRoute) {
    case 'dashboard':
      return <Dashboard onRouteChange={onRouteChange} />;
    case 'documents':
      return <DocumentUpload />;
    case 'email':
      return <EmailSummarizer />;
    case 'automation':
      return <AutomationBuilder />;
    case 'expenses':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
            <p className="text-muted-foreground india-responsive">
              Track and categorize your business expenses automatically
            </p>
          </div>
          <div className="h-96 bg-muted/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧾</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expense Tracker Coming Soon</h3>
              <p className="text-muted-foreground">
                Advanced expense categorization and reporting features
              </p>
            </div>
          </div>
        </div>
      );
    case 'tasks':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold">Task Routing</h1>
            <p className="text-muted-foreground india-responsive">
              Intelligent task assignment and workflow management
            </p>
          </div>
          <div className="h-96 bg-muted/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Task Routing Coming Soon</h3>
              <p className="text-muted-foreground">
                Smart task assignment and priority management
              </p>
            </div>
          </div>
        </div>
      );
    case 'integrations':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold">Integrations</h1>
            <p className="text-muted-foreground india-responsive">
              Connect with your favorite tools and services
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Gmail', icon: '📧', status: 'Connected' },
              { name: 'Google Drive', icon: '📁', status: 'Connected' },
              { name: 'Slack', icon: '💬', status: 'Available' },
              { name: 'Zapier', icon: '⚡', status: 'Available' },
              { name: 'WhatsApp Business', icon: '📱', status: 'Available' },
              { name: 'Zoho Books', icon: '📊', status: 'Available' }
            ].map((integration, index) => (
              <div key={index} className="modern-card p-6 text-center">
                <div className="text-4xl mb-3">{integration.icon}</div>
                <h3 className="font-semibold mb-2">{integration.name}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-xs ${
                  integration.status === 'Connected' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {integration.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'settings':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground india-responsive">
              Manage your account and system preferences
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="modern-card p-6">
              <h3 className="font-semibold mb-4">Account Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Profile Information</span>
                  <button className="text-primary hover:underline">Edit</button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Security Settings</span>
                  <button className="text-primary hover:underline">Configure</button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Notification Preferences</span>
                  <button className="text-primary hover:underline">Manage</button>
                </div>
              </div>
            </div>
            <div className="modern-card p-6">
              <h3 className="font-semibold mb-4">System Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Language</span>
                  <span className="text-muted-foreground">English</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Zone</span>
                  <span className="text-muted-foreground">Asia/Kolkata</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Currency</span>
                  <span className="text-muted-foreground">₹ INR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <Dashboard />;
  }
};