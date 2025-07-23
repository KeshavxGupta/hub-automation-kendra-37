import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowRight, 
  CheckCircle, 
  Bot, 
  FileText, 
  Zap, 
  Star,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Globe,
  Mail,
  Database,
  BarChart3,
  Workflow,
  MessageSquare,
  Smartphone,
  Calendar,
  Target,
  Award,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Chat Assistant",
      description: "Get instant help with your business automation needs through our intelligent chat system."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Document Processing",
      description: "Upload and process documents automatically with AI-powered analysis and extraction."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Workflow Automation",
      description: "Build custom automation workflows to streamline your business processes effortlessly."
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Automation",
      description: "Summarize emails, auto-respond, and manage your inbox with AI-powered assistance."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Track performance metrics and get insights into your automated workflows."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with encryption and compliance standards for your data."
    }
  ];

  const advancedFeatures = [
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "Smart Workflows",
      description: "Create complex automation sequences with conditional logic and triggers.",
      badge: "Popular"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Integration",
      description: "Connect with 500+ apps and services including CRM, accounting, and project management tools.",
      badge: "New"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "AI Chat Bots",
      description: "Deploy intelligent chatbots for customer service and internal team communications.",
      badge: "Pro"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Automation",
      description: "Automate appointments, reminders, and recurring tasks with smart scheduling.",
      badge: ""
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: <Users className="h-6 w-6" /> },
    { number: "2M+", label: "Tasks Automated", icon: <Target className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "500+", label: "Integrations", icon: <Globe className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      company: "Johnson's Bakery",
      content: "AutoHub saved me 15 hours per week on administrative tasks. I can now focus on growing my business instead of paperwork.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Marketing Manager",
      company: "TechStart Inc",
      content: "The email automation features are incredible. Our response time improved by 80% and customer satisfaction is at an all-time high.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Operations Director",
      company: "Creative Agency",
      content: "From document processing to workflow automation, AutoHub transformed our entire operation. ROI was achieved in just 2 months.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses getting started with automation",
      features: [
        "Up to 1,000 automated tasks/month",
        "Basic workflow builder",
        "Email support",
        "5 integrations",
        "Document processing (100 docs/month)"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing businesses with complex automation needs",
      features: [
        "Up to 10,000 automated tasks/month",
        "Advanced workflow builder",
        "Priority support",
        "50 integrations",
        "Document processing (1,000 docs/month)",
        "AI chat assistant",
        "Analytics dashboard"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organizations requiring enterprise-grade features",
      features: [
        "Unlimited automated tasks",
        "Custom workflow builder",
        "24/7 dedicated support",
        "Unlimited integrations",
        "Unlimited document processing",
        "Advanced AI features",
        "Custom analytics",
        "White-label options"
      ],
      popular: false
    }
  ];

  const useCases = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Sales & CRM",
      description: "Automate lead capture, follow-ups, and customer onboarding processes."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Document Management",
      description: "Process invoices, contracts, and reports automatically with AI extraction."
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Marketing",
      description: "Create personalized email campaigns and automated customer journeys."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Financial Operations",
      description: "Automate expense tracking, invoicing, and financial reporting tasks."
    }
  ];

  const faqs = [
    {
      question: "How quickly can I set up automation workflows?",
      answer: "Most users can create their first automation within 15 minutes using our intuitive drag-and-drop builder. Our AI assistant guides you through the process."
    },
    {
      question: "Do I need technical skills to use AutoHub?",
      answer: "No technical skills required! AutoHub is designed for business users with a user-friendly interface and pre-built templates for common business processes."
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "Yes! AutoHub connects with 500+ popular business tools including Salesforce, QuickBooks, Slack, Gmail, and many more through our integration library."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-grade encryption, comply with GDPR and SOC 2 standards, and never share your data with third parties. Your security is our top priority."
    },
    {
      question: "What if I need help getting started?",
      answer: "We offer comprehensive onboarding support, video tutorials, documentation, and our AI chat assistant is available 24/7 to help you succeed."
    }
  ];

  const benefits = [
    "Save 80% of time on repetitive tasks",
    "Reduce human error with AI automation",
    "Scale your business operations efficiently",
    "24/7 automated workflow execution"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AutoHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Automate Your Small Business with{' '}
            <span className="text-primary">AI-Powered Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Streamline your operations, boost productivity, and scale your business 
            with our comprehensive automation platform designed for small businesses.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link to="/signup">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need to Automate Your Business
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools designed to help small businesses thrive in the digital age
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Advanced Features */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Advanced Automation Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Unlock the full potential of your business with our advanced automation tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    {feature.badge && (
                      <Badge variant={feature.badge === "Popular" ? "default" : feature.badge === "New" ? "secondary" : "outline"}>
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Perfect for Every Business Need
          </h2>
          <p className="text-lg text-muted-foreground">
            See how AutoHub transforms different aspects of your business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    {useCase.icon}
                  </div>
                </div>
                <CardTitle className="text-lg">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm">
                  {useCase.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from businesses that transformed their operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                    <div className="text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your business needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-shadow ${plan.popular ? 'border-primary border-2' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/signup">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers to help you get started with confidence.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-left">
                    {faq.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Why Choose AutoHub?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of small businesses already using AutoHub to automate 
            their workflows and increase productivity.
          </p>
          <Link to="/signup">
            <Button size="lg" className="px-8 py-3 text-lg">
              Start Your Free Trial Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 AutoHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;