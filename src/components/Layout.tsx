import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AIChatWidget } from './AIChatWidget';

interface LayoutProps {
  children: ReactNode;
  activeRoute: string;
  onRouteChange: (route: string) => void;
}

export const Layout = ({ children, activeRoute, onRouteChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeRoute={activeRoute}
        onRouteChange={onRouteChange}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
      
      <AIChatWidget />
    </div>
  );
};