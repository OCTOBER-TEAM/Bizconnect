import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

const categories = [
  "All Categories",
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
  "Other",
];

export default function RegisterBusinessForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactType: "email",
    contactInfo: "",
    location: "",
    city: "",
    province: "",
    businessName: "",
    businessType: "",
    servicesInterested: "",
    consent: false,
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uniqueId = uuidv4();
    const payload = {
      id: uniqueId,
      ...formData,
      status: "New Business",
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/php-service/submit.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          contactType: "email",
          contactInfo: "",
          location: "",
          city: "",
          province: "",
          businessName: "",
          businessType: "",
          servicesInterested: "",
          consent: false,
          email: "",
          phone: "",
        });
      } else {
        const errorData = await response.json();
        alert("Submission failed: " + errorData.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-green-600 text-center text-xl font-semibold p-4">
        Thank you for registering your business with ITDF BizConnect!
      </div>
    );
  }

  return (
    <><Card className="max-w-3xl mx-auto mt-10 p-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-primary">
          Register Your Business
        </CardTitle>
        <CardDescription className="text-center">
          Fill in the form below to list your business with ITDF BizConnect.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <Input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required />

          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formData.contactType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, contactType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Contact Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>

            <Input
              name="contactInfo"
              placeholder={formData.contactType === "email"
                ? "Email Address"
                : "Phone Number"}
              value={formData.contactInfo}
              onChange={handleChange}
              required />
          </div>

          <Input
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required />

          <Input
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="location"
              placeholder="Location / Township"
              value={formData.location}
              onChange={handleChange}
              required />

            <Input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required />

            <Select
              value={formData.province}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, province: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent>
                {["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"].map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            required />

          <Select
            value={formData.businessType}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Business Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            name="servicesInterested"
            placeholder="What services are you interested in?"
            value={formData.servicesInterested}
            onChange={handleChange}
            rows={3} />

          <div className="flex items-start gap-2">
            <Checkbox
              name="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consent: checked === true }))}
              required />
            <Label htmlFor="consent">
              I agree to receive communications from ITDF BizConnect
            </Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Register Business"}
          </Button>
        </form>
      </CardContent>
    </Card><section className="py-16 px-4 sm:px-6 lg:px-8">
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
      </section></>
  );
}
