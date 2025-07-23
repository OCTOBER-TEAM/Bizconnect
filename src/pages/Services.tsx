import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MessageCircle, FileText, Palette, Calculator, Users, Building, Briefcase } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Business Support Services",
      description: "Complete company registration with CIPC including name reservation, registration certificate, and compliance documentation.",
      price: "R850",
      duration: "3-5 business days",
      icon: Building,
      features: [
        "Help with business registration (CIPC, SARS, BEE, COID)",
        "Assistance with branding, compliance, and operations",
        "BEE compliance certificate",
        "Access to shared admin tools and proposal templates"
      ],
      whatsappMessage: "Hi! I'm interested in CIPC Business Registration services. Can you help me get started?"
    },
    {
      id: 2,
      title: "Township Business Directory App",
      description: "Custom logo design that represents your brand identity with multiple concepts and unlimited revisions.",
      price: "R500",
      duration: "2-3 business days",
      icon: Palette,
      features: [
        "Local app to list your business and be discovered by more customers",
        "Includes business reviews, contact info, and social media links",
        "Listings only available to paid-up ITDF members",
      ],
      whatsappMessage: "Hi! I'd like to get add my business on your platform?"
    },
    {
      id: 3,
      title: "Workshops & Training",
      description: "Provided content.",
      price: "R650",
      duration: "1-2 business days",
      icon: Calculator,
      features: [
        "Learn about marketing, budgeting, digital tools and more",
        "Free and discounted access to members",
        "Focused on spaza shops, vendors, youth and women entrepreneurs",
      ],
      whatsappMessage: "Hi! I need help with tax compliance for my business. Can you assist with SARS registration and ongoing support?"
    },
    {
      id: 4,
      title: "Market Access",
      description: "Social media setup, basic website creation, and digital marketing strategy for township businesses.",
      price: "R1,200",
      duration: "5-7 business days",
      icon: Briefcase,
      features: [
        "Priority access to community market days",
        "Upcoming Youth Market Square for young entrepreneurs",
        "Referrals to community and institutional buyers",
      ],
      whatsappMessage: "Hi! I'm looking for help with market access"
    },
    
    {
      id: 5,
      title: "Networking & Referrals",
      description: "Essential legal documents for your business including contracts, terms of service, and compliance documentation.",
      price: "R750",
      duration: "2-4 business days",
      icon: FileText,
      features: [
        "Connect with other local business owners",
        "Join a WhatsApp support group for updates and advice",
        "Be part of a trusted township business network",
      ],
      whatsappMessage: "Hi! I need help with Networking and referrals"
    }
  ];

  const handleWhatsAppClick = (message: string) => {
    const phoneNumber = "27795146870"; // Replace with actual WhatsApp Business number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-primary mb-4">
            Business Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional services designed specifically for township entrepreneurs. 
            Get everything you need to start, grow, and formalize your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-poppins text-primary">
                        {service.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-accent">
                          {service.price}
                        </Badge>
                        <Badge variant="outline">
                          {service.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-3">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => handleWhatsAppClick(service.whatsappMessage)}
                  className="w-full bg-accent hover:bg-accent/90 transition-all duration-300"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book Now via WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-secondary rounded-lg p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-primary mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Don't see exactly what you need? We offer custom business solutions tailored to your specific requirements. 
            Let's discuss how we can help your business succeed.
          </p>
          <Button 
            onClick={() => handleWhatsAppClick("Hi! I'm looking for custom business services that aren't listed on your website. Can we discuss my specific needs?")}
            size="lg"
            className="bg-primary-gradient shadow-primary hover:shadow-glow transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Us for Custom Solutions
          </Button>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <div className="bg-hero-gradient rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Need Help Choosing?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our business advisors are here to help you select the right services for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline"
                onClick={() => handleWhatsAppClick("Hi! I need help choosing the right services for my business. Can you provide some guidance?")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Get Free Consultation
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:info@itdfbizconnect.co.za">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;