import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, CheckCircle } from "lucide-react";

const Register = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactType: "",
    contactInfo: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    province: "",
    businessName: "",
    businessType: "",
    servicesInterested: "",
    consent: false,
  });

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Western Cape"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const uniqueId = uuidv4();

    const payload = {
      id: uniqueId,
      ...formData,
      status: "New Business",
      timestamp: new Date().toISOString(),
    };

    try {
      // Google Sheets integration
      await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      // Send confirmation email to user
      await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          to: formData.email,
          subject: "BizConnect Application Received",
          message: `Hi ${formData.fullName},\n\nWe have received your business registration. Your ID is: ${uniqueId}.\n\nRegards,\nITDF BizConnect Team`,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // Send notification email to admi
      await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          to: "admin@itdfbizconnect.co.za",
          subject: "New Business Registration",
          message: `New business application from ${formData.fullName}.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBusiness Name: ${formData.businessName}\nStatus: New Business`,
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast({
        title: "Registration Successful!",
        description: "Your business registration has been submitted. We'll contact you soon.",
      });

      setFormData({
        fullName: "",
        contactType: "",
        contactInfo: "",
        email: "",
        phone: "",
        location: "",
        city: "",
        province: "",
        businessName: "",
        businessType: "",
        servicesInterested: "",
        consent: false,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessTypes = [
    "Plumbers",
    "Electricians",
    "Lawyers",
    "Doctors",
    "Nurses & Clinics",
    "Painters",
    "Drivers",
    "Accountants & Tax Services",
    "Mechanics",
    "Builders & Renovators",
    "Grocery Shops / Spaza Shops",
    "Fast Food",
    "Vendors",
    "Barbers & Hair Salons",
    "Car Washes",
    "Butchers",
    "Clothing & Tailors",
    "DJs & Event Planners",
    "Security Companies",
    "Tech Repairs",
    "Tutors & Teachers",
    "Childcare / Creches",
    "Internet Cafés",
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-hero-gradient">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-primary mb-4">
            Register Your Business
          </h1>
          <p className="text-lg text-muted-foreground">
            Join the ITDF BizConnect community and unlock opportunities for your township business.
          </p>
        </div>

        <Card className="shadow-primary">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins text-primary">Business Registration Form</CardTitle>
            <CardDescription>
              Please fill out all required fields to register your business with ITDF BizConnect.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">Personal Information</h3>

                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactType">Preferred Contact Method *</Label>
                    <Select
                      value={formData.contactType}
                      onValueChange={(value) => setFormData({ ...formData, contactType: value })}
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="contactInfo">Contact Info *</Label>
                    <Input
                      id="contactInfo"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="Your contact info"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="location">Location / Township *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <Select
                      value={formData.province}
                      onValueChange={(value) => setFormData({ ...formData, province: value })}
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((prov) => (
                          <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">Business Information</h3>

                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="servicesInterested">Services You're Interested In</Label>
                  <Textarea
                    id="servicesInterested"
                    value={formData.servicesInterested}
                    onChange={(e) => setFormData({ ...formData, servicesInterested: e.target.value })}
                    className="mt-1 min-h-[100px]"
                    placeholder="Tell us about the services you need help with..."
                  />
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                  required
                />
                <Label htmlFor="consent" className="text-sm leading-5">
                  I consent to ITDF BizConnect contacting me and using my info to connect me with support.
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.consent}
                className="w-full bg-primary-gradient shadow-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                {isSubmitting ? "Submitting..." : (<><CheckCircle className="w-5 h-5 mr-2" />Register Business</>)}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Need help with registration? Contact us at {" "}
            <a href="mailto:info@itdfbizconnect.co.za" className="text-primary hover:underline">
              info@itdfbizconnect.co.za
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
