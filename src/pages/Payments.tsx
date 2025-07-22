import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, QrCode, CreditCard, Smartphone, Shield, Clock } from "lucide-react";
import { useState } from "react";

const Payments = () => {
  const [snapScanImage, setSnapScanImage] = useState<string | null>(null);
  const [yocoImage, setYocoImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'snapscan' | 'yoco') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'snapscan') {
          setSnapScanImage(reader.result as string);
        } else {
          setYocoImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const paymentMethods = [
    {
      title: "SnapScan",
      description: "Instant payments using SnapScan QR codes",
      icon: QrCode,
      color: "bg-blue-500",
      features: [
        "Instant payment confirmation",
        "Low transaction fees",
        "Wide acceptance",
        "Easy integration"
      ]
    },
    {
      title: "Yoco",
      description: "Professional card payments and QR codes",
      icon: CreditCard,
      color: "bg-purple-500",
      features: [
        "Accept all major cards",
        "Real-time notifications",
        "Business analytics",
        "Secure transactions"
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Bank-level security for all transactions"
    },
    {
      icon: Clock,
      title: "Instant Processing",
      description: "Payments processed immediately"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Pay easily from any mobile device"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-primary mb-4">
            Payment Options
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We make it easy to pay for our services with multiple secure payment options. 
            Simply scan the QR code to complete your payment instantly.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* SnapScan Card */}
          <Card className="border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-primary">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-poppins text-primary">SnapScan Payment</CardTitle>
                  <CardDescription>Scan to pay instantly with SnapScan</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* QR Code Display */}
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                  {snapScanImage ? (
                    <img 
                      src={snapScanImage} 
                      alt="SnapScan QR Code" 
                      className="max-w-full h-48 mx-auto object-contain"
                    />
                  ) : (
                    <div className="space-y-4">
                      <QrCode className="w-16 h-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">SnapScan QR Code will appear here</p>
                    </div>
                  )}
                </div>

                {/* Upload Button (Admin use) */}
                <div className="border-t pt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'snapscan')}
                    className="hidden"
                    id="snapscan-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('snapscan-upload')?.click()}
                    className="w-full"
                  >
                    {/*<Upload className="w-4 h-4 mr-2" />
                    Upload SnapScan QR Code*/}
                  </Button>
                </div>

                {/* Instructions */}
                <div className="bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">How to pay with SnapScan:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Open your SnapScan app</li>
                    <li>2. Scan the QR code above</li>
                    <li>3. Enter the payment amount</li>
                    <li>4. Confirm payment</li>
                    <li>5. Send proof of payment via WhatsApp</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yoco Card */}
          <Card className="border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-primary">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-poppins text-primary">Yoco Payment</CardTitle>
                  <CardDescription>Pay with card or Yoco QR code</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* QR Code Display */}
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                  {yocoImage ? (
                    <img 
                      src={yocoImage} 
                      alt="Yoco QR Code" 
                      className="max-w-full h-48 mx-auto object-contain"
                    />
                  ) : (
                    <div className="space-y-4">
                      <CreditCard className="w-16 h-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Yoco QR Code will appear here</p>
                    </div>
                  )}
                </div>

                {/* Upload Button (Admin use) */}
                <div className="border-t pt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'yoco')}
                    className="hidden"
                    id="yoco-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('yoco-upload')?.click()}
                    className="w-full"
                  >
                    {/*<Upload className="w-4 h-4 mr-2" />
                    Upload Yoco QR Code*/}
                  </Button>
                </div>

                {/* Instructions */}
                <div className="bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">How to pay with Yoco:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Open your banking app or Yoco app</li>
                    <li>2. Scan the QR code above</li>
                    <li>3. Enter payment details</li>
                    <li>4. Authorize the payment</li>
                    <li>5. Save your payment confirmation</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-primary text-center mb-8">
            Why Choose Our Payment Options?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {paymentMethods.map((method, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {method.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Section */}
        <Card className="bg-hero-gradient">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-poppins font-bold text-primary mb-4">
              Need Payment Support?
            </h3>
            <p className="text-muted-foreground mb-6">
              Having trouble with payments? Our support team is here to help you complete your transaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="https://wa.me/27XXXXXXXXX?text=Hi! I need help with making a payment for ITDF BizConnect services." target="_blank" rel="noopener noreferrer">
                  WhatsApp Support
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:payments@itdfbizconnect.co.za">
                  Email Support
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;