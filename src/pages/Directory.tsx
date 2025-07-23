import { useMemo, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, Mail, Building } from "lucide-react";
import clsx from "clsx";

const businesses = [
  {
    id: 1,
    name: "Mama's Kitchen",
    type: "Fast Food",
    province: "Gauteng",
    city: "Sandton",
    township: "Alexandra",
    description: "Traditional South African cuisine and catering services",
    contact: "+27 12 345 6789",
    email: "mamas@kitchen.co.za",
    services: ["Catering", "Traditional Food", "Events"]
  },
  {
    id: 2,
    name: "TechFix Solutions",
    type: "Tech Repairs",
    province: "Gauteng",
    city: "Johannesburg",
    township: "Soweto",
    description: "Computer repair and IT support services",
    contact: "+27 87 654 3210",
    email: "info@techfix.co.za",
    services: ["Computer Repair", "IT Support", "Software Installation"]
  },
  {
    id: 3,
    name: "Beautiful You Salon",
    type: "Barbers & Hair Salons",
    province: "Gauteng",
    city: "Midrand",
    township: "Thembisa",
    description: "Full service hair and beauty salon",
    contact: "+27 76 543 2109",
    email: "beauty@salon.co.za",
    services: ["Hair Styling", "Manicures", "Makeup"]
  }
];

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
  "Other"
];

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [filterType, setFilterType] = useState("All Categories");

  const filteredBusinesses = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const lowerLocation = locationSearch.toLowerCase();
    return businesses.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(lowerSearch) ||
        b.description.toLowerCase().includes(lowerSearch);
      const matchesType = filterType === "All Categories" || b.type === filterType;
      const matchesLocation =
          b.province.toLowerCase().includes(lowerLocation) ||
          b.city.toLowerCase().includes(lowerLocation) ||
          b.township.toLowerCase().includes(lowerLocation);

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchTerm, filterType, locationSearch]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-primary mb-4">
            Business Directory
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover and connect with registered township businesses in your area.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by location (e.g. Soweto)"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((type) => (
            <Badge
              key={type}
              variant={filterType === type ? "default" : "outline"}
              onClick={() => setFilterType(type)}
              className={clsx("cursor-pointer", {
                "border-primary text-primary": filterType === type
              })}
            >
              {type}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground mb-4">
          Showing {filteredBusinesses.length} of {businesses.length} businesses
        </p>

        {/* Business Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-poppins text-primary">
                      {business.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {business.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{business.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {business.province} {", "} {business.township}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {business.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a href={`tel:${business.contact}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        {business.contact}
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a href={`mailto:${business.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No businesses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
