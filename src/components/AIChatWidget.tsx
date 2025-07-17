import { useState } from 'react';
import { Bot, X, Send, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. I can help you with document analysis, automation setup, expense tracking, and more. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(message),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('invoice') || lowerMessage.includes('bill')) {
      return "I can help you process invoices! Upload your invoice document and I'll extract key details like vendor name, amount, due date, and suggest the best automation workflow for approval and payment.";
    } else if (lowerMessage.includes('expense') || lowerMessage.includes('receipt')) {
      return "Great! For expense tracking, I can analyze your receipts, categorize expenses automatically, and set up rules for different expense types. Would you like me to create an automation for expense approvals?";
    } else if (lowerMessage.includes('automation') || lowerMessage.includes('workflow')) {
      return "I can help you build automation workflows! You can create rules like: 'When invoice > ₹10,000 → Send for approval → Auto-pay after approval'. What kind of business process would you like to automate?";
    } else if (lowerMessage.includes('email') || lowerMessage.includes('summary')) {
      return "I can summarize your emails and extract action items! Upload your email files (.eml) and I'll provide key takeaways, meeting schedules, and pending tasks. Want to set up automatic email processing?";
    } else {
      return "I understand you need help with your business automation. I can assist with document processing, expense tracking, email summarization, and creating automation workflows. Could you be more specific about what you'd like to accomplish?";
    }
  };

  if (!isOpen) {
    return (
      <div className="ai-bubble" onClick={() => setIsOpen(true)}>
        <Bot className="w-6 h-6 animate-bounce-subtle" />
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      <Card className="modern-card glass-card h-full flex flex-col">
        <CardHeader className="p-4 pb-2 border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              AI Assistant
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-4 overflow-y-auto scrollbar-thin">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-64 p-3 rounded-lg text-sm ${
                        msg.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything about your business automation..."
                  className="flex-1 px-3 py-2 text-sm bg-muted rounded-lg border-none outline-none placeholder:text-muted-foreground india-responsive"
                />
                <Button size="sm" onClick={sendMessage} className="px-3">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};