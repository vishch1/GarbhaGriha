import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Heart, Brain, Shield, Sparkles, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AICompanion = () => {
  const [selectedSupport, setSelectedSupport] = useState<string>("");

  const supportTypes = [
    {
      id: "emotional",
      title: "Emotional Support",
      description: "Talk about feelings, process emotions, and get empathetic guidance",
      icon: Heart,
      color: "text-accent"
    },
    {
      id: "anxiety",
      title: "Anxiety & Stress",
      description: "Coping strategies for anxiety, stress management techniques",
      icon: Brain,
      color: "text-warning"
    },
    {
      id: "motivation",
      title: "Motivation & Goals",
      description: "Build confidence, set achievable goals, celebrate progress",
      icon: Sparkles,
      color: "text-success"
    },
    {
      id: "relationships",
      title: "Relationships",
      description: "Navigate friendships, family dynamics, and social situations",
      icon: Users,
      color: "text-primary"
    }
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
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">AI Companion</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero Section */}
        <Card className="p-8 text-center mb-8 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your Personal AI Companion</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            A safe, judgment-free space to share your thoughts and feelings. Our AI companion is trained 
            specifically to understand young people's mental health needs and provide personalized support.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Completely Anonymous
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Available 24/7
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Empathetic & Understanding
            </div>
          </div>
        </Card>

        {/* Support Types */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">What kind of support do you need today?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {supportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.id}
                  className={`p-6 cursor-pointer transition-all duration-300 border-0 shadow-soft hover:shadow-warm ${
                    selectedSupport === type.id 
                      ? 'bg-primary-light border-primary shadow-glow' 
                      : 'bg-card/80 backdrop-blur-sm hover:bg-card'
                  }`}
                  onClick={() => setSelectedSupport(type.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{type.title}</h4>
                      <p className="text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-semibold mb-2">Smart Understanding</h4>
            <p className="text-sm text-muted-foreground">
              AI trained on youth mental health patterns to provide relevant, age-appropriate guidance
            </p>
          </Card>

          <Card className="p-6 text-center shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-warning" />
            </div>
            <h4 className="font-semibold mb-2">Crisis Detection</h4>
            <p className="text-sm text-muted-foreground">
              Automatic recognition of crisis situations with immediate connection to professional help
            </p>
          </Card>

          <Card className="p-6 text-center shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-semibold mb-2">Personalized Care</h4>
            <p className="text-sm text-muted-foreground">
              Adapts to your communication style and remembers your preferences for consistent support
            </p>
          </Card>
        </div>

        {/* CTA */}
        <Card className="p-8 text-center shadow-soft border-0 bg-gradient-warm">
          <h3 className="text-2xl font-bold mb-4">Ready to start talking?</h3>
          <p className="text-muted-foreground mb-6">
            Your AI companion is here to listen, understand, and support you through whatever you're facing.
          </p>
          <Link to="/chat">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Conversation
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default AICompanion;