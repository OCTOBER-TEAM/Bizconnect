import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Briefcase, TrendingUp, MapPin, Phone, Mail } from "lucide-react";
import Directory from "./Directory";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Community Focused",
      description: "Connecting township entrepreneurs with local opportunities and resources."
    },
    {
      icon: Briefcase,
      title: "Business Services",
      description: "Access CIPC registration, logo design, tax help, and more professional services."
    },
    {
      icon: TrendingUp,
      title: "Growth Support",
      description: "Tools and guidance to help your township business thrive and expand."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-poppins font-bold text-primary mb-6">
              ITDF BizConnect
            </h1>
            <p className="text-xl sm:text-2xl font-inter text-muted-foreground mb-8 max-w-3xl mx-auto">
              Empowering Township Entrepreneurs
            </p>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Discover and connect with local businesses in your township. From plumbers to painters, 
              find trusted services right in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary-gradient shadow-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/register" className="flex items-center gap-2">
                  Register Your Business
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">  
                <Link to="/directory">Explore Businesses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Directory />

      {/* CTA Section */}
      <section className="bg-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-primary mb-6">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of township entrepreneurs who are building successful businesses with ITDF BizConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary-gradient shadow-primary">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/directory">Browse Businesses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-poppins font-bold text-primary mb-8">
            Get in Touch
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Location</h3>
              <p className="text-muted-foreground">Meadowlands Primary (Classroom Office), Meadowlands Zone 7</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Phone</h3>
              <p className="text-muted-foreground">068 218 5005 | 079 514 6870</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Email</h3>
              <p className="text-muted-foreground">helloitdf@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;