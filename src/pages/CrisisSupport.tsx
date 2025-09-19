import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, Shield, Heart, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const CrisisSupport = () => {
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress",
      type: "call"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Text-based crisis support available 24/7",
      type: "text"
    },
    {
      name: "Teen Line",
      number: "1-800-852-8336",
      description: "Teen-to-teen support, evenings and weekends",
      type: "call"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse treatment referral service",
      type: "call"
    }
  ];

  const localServices = [
    {
      name: "Community Mental Health Center",
      address: "123 Main St, Downtown",
      phone: "(555) 123-4567",
      services: ["Individual Therapy", "Group Therapy", "Crisis Intervention"],
      hours: "Mon-Fri 8AM-6PM, Emergency 24/7"
    },
    {
      name: "Youth Counseling Services",
      address: "456 Oak Ave, University District",
      phone: "(555) 234-5678",
      services: ["Teen Counseling", "Family Therapy", "Support Groups"],
      hours: "Mon-Sat 9AM-8PM"
    },
    {
      name: "Crisis Response Center",
      address: "789 Pine St, Medical District",
      phone: "(555) 345-6789",
      services: ["24/7 Crisis Support", "Emergency Assessment", "Safety Planning"],
      hours: "24/7 Walk-in Available"
    },
    {
      name: "Student Counseling Center",
      address: "University Campus, Building A",
      phone: "(555) 456-7890",
      services: ["Student Support", "Academic Counseling", "Stress Management"],
      hours: "Mon-Fri 8AM-5PM, Crisis Line 24/7"
    }
  ];

  const warningSigns = [
    "Thoughts of self-harm or suicide",
    "Feeling hopeless or trapped",
    "Extreme mood changes",
    "Withdrawing from friends and activities",
    "Increased use of alcohol or drugs",
    "Difficulty sleeping or sleeping too much",
    "Feeling like a burden to others",
    "Talking about wanting to die"
  ];

  const safetyTips = [
    "Remove any means of self-harm from your environment",
    "Reach out to a trusted friend, family member, or counselor",
    "Create a safety plan with coping strategies",
    "Stay in public places or with others when feeling unsafe",
    "Use crisis resources immediately when needed",
    "Practice grounding techniques (5-4-3-2-1 method)",
    "Keep emergency numbers easily accessible",
    "Remember that crises are temporary"
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-destructive-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Crisis Support</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Emergency Alert */}
        <Card className="p-6 mb-8 shadow-soft border-destructive bg-destructive/10">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-destructive mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-destructive mb-2">If this is an emergency, get help now</h2>
              <p className="text-muted-foreground mb-4">
                If you or someone you know is in immediate danger, call 911 or go to your nearest emergency room.
                For mental health crises, call or text 988 for the Suicide & Crisis Lifeline.
              </p>
              <div className="flex gap-4">
                <Button className="bg-destructive hover:bg-destructive/90">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 911
                </Button>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 988
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-primary" />
            24/7 Crisis Hotlines
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    {contact.type === 'call' ? (
                      <Phone className="w-6 h-6 text-primary" />
                    ) : (
                      <MessageCircle className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{contact.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-2">{contact.number}</p>
                    <p className="text-muted-foreground text-sm">{contact.description}</p>
                    <Button className="mt-3 w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      <Clock className="w-4 h-4 mr-2" />
                      Available 24/7
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Local Mental Health Services */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-success" />
            Local Mental Health Services
          </h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {localServices.map((service, index) => (
              <Card key={index} className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
                <h4 className="font-semibold text-lg mb-2">{service.name}</h4>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{service.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{service.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{service.hours}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h5 className="font-medium mb-2">Services:</h5>
                  <div className="flex flex-wrap gap-2">
                    {service.services.map((svc, i) => (
                      <span key={i} className="bg-success-light text-success px-2 py-1 rounded-full text-xs">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Warning Signs */}
          <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Warning Signs to Watch For
            </h3>
            <div className="space-y-2">
              {warningSigns.map((sign, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <span className="text-sm">{sign}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-warning/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Remember:</strong> If you notice these signs in yourself or others, 
                it's important to seek help immediately. Early intervention can save lives.
              </p>
            </div>
          </Card>

          {/* Safety Tips */}
          <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              Safety Planning Tips
            </h3>
            <div className="space-y-2">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-success/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Creating a safety plan</strong> helps you prepare for difficult moments. 
                Work with a counselor to develop your personalized plan.
              </p>
            </div>
          </Card>
        </div>

        {/* Support CTA */}
        <Card className="p-8 text-center mt-8 shadow-soft border-0 bg-gradient-warm">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">You Are Not Alone</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Crisis situations are temporary, but recovery is possible. There are people who care about you 
            and want to help. Reaching out for support is a sign of strength, not weakness.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/chat">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <MessageCircle className="w-4 h-4 mr-2" />
                Talk to AI Companion
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Find Support Community
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CrisisSupport;