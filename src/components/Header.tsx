import { useState } from 'react';
import { 
  Bell, 
  User, 
  Globe, 
  Menu,
  Search,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [language, setLanguage] = useState('en');
  const [notifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('userName') || 'User';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 min-w-64">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents, tasks, or automation..."
            className="bg-transparent border-none outline-none flex-1 text-sm placeholder:text-muted-foreground india-responsive"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'English' : 'हिंदी'}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card">
            <DropdownMenuItem 
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'bg-accent' : ''}
            >
              🇺🇸 English
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setLanguage('hi')}
              className={language === 'hi' ? 'bg-accent' : ''}
            >
              🇮🇳 हिंदी
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative"
          onClick={() => alert(`You have ${notifications} new notifications`)}
        >
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden sm:inline font-medium">{userName}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card">
            <DropdownMenuItem onClick={() => alert('Profile settings coming soon!')}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert('Billing dashboard coming soon!')}>
              Billing & Usage
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert('Help center coming soon!')}>
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};