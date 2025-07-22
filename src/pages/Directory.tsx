import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, Mail, Building } from "lucide-react";

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Sample business data - this would come from your Google Sheets
  const businesses = [
    {
      id: 1,
      name: "Mama's Kitchen",
      type: "Food & Beverage",
      ward: "Ward 3",
      description: "Traditional South African cuisine and catering services",
      contact: "+27 12 345 6789",
      email: "mamas@kitchen.co.za",
      services: ["Catering", "Traditional Food", "Events"]
    },
    {
      id: 2,
      name: "TechFix Solutions", 
      type: "Technology/Digital",
      ward: "Ward 7",
      description: "Computer repair and IT support services",
      contact: "+27 87 654 3210",
      email: "info@techfix.co.za",
      services: ["Computer Repair", "IT Support", "Software Installation"]
    },
    {
      id: 3,
      name: "Beautiful You Salon",
      type: "Services (Hair, Beauty, etc.)",
      ward: "Ward 2",
      description: "Full service hair and beauty salon",
      contact: "+27 76 543 2109",
      email: "beauty@salon.co.za",
      services: ["Hair Styling", "Manicures", "Makeup"]
    }
  ];

  const businessTypes = [
    "all",
    "Retail/Shop",
    "Food & Beverage", 
    "Services (Hair, Beauty, etc.)",
    "Construction/Maintenance",
    "Transport/Logistics",
    "Technology/Digital",
    "Arts & Crafts",
    "Healthcare/Wellness",
    "Education/Training"
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || business.type === filterType;
    return matchesSearch && matchesType;
  });

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

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="md:w-64">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === "all" ? "All Business Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredBusinesses.length} of {businesses.length} businesses
          </p>
        </div>

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
                    {business.ward}
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