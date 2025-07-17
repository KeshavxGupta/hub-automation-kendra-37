import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Mail, 
  Receipt, 
  GitBranch, 
  Settings, 
  Zap,
  ChevronLeft,
  Bot,
  Building2
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeRoute: string;
  onRouteChange: (route: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '#dashboard' },
  { id: 'documents', label: 'Document Analyzer', icon: FileText, href: '#documents' },
  { id: 'email', label: 'Email & Meeting Summarizer', icon: Mail, href: '#email' },
  { id: 'expenses', label: 'Expense Tracker', icon: Receipt, href: '#expenses' },
  { id: 'tasks', label: 'Task Routing', icon: GitBranch, href: '#tasks' },
  { id: 'automation', label: 'Automation Rules', icon: Bot, href: '#automation' },
  { id: 'integrations', label: 'Integrations', icon: Zap, href: '#integrations' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
];

export const Sidebar = ({ isOpen, onToggle, activeRoute, onRouteChange }: SidebarProps) => {

  return (
    <div className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div className="flex-1">
              <h2 className="font-semibold text-sm gradient-text">Small Business</h2>
              <p className="text-xs text-muted-foreground">Automation Hub</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onRouteChange(item.id)}
                className={`sidebar-nav-item w-full ${isActive ? 'active' : ''}`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : ''}`} />
                {isOpen && (
                  <span className="font-medium india-responsive">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 hover:bg-accent rounded-lg transition-colors duration-200"
          title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};