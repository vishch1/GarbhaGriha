import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, ExternalLink, Heart, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      description: "24/7 free and confidential support for people in distress",
      contact: "Call 988 or 1-800-273-8255",
      available: "24/7",
      type: "crisis"
    },
    {
      name: "Crisis Text Line",
      description: "Free 24/7 support for those in crisis via text",
      contact: "Text HOME to 741741",
      available: "24/7",
      type: "crisis"
    },
    {
      name: "National Eating Disorders Association",
      description: "Support for eating disorders and body image issues",
      contact: "1-800-931-2237",
      available: "Mon-Thu 11am-9pm, Fri 11am-5pm EST",
      type: "specialized"
    },
    {
      name: "LGBT National Hotline",
      description: "Peer support for LGBTQ+ youth and adults",
      contact: "1-888-843-4564",
      available: "Mon-Fri 4pm-12am, Sat 12pm-5pm EST",
      type: "specialized"
    }
  ];

  const localResources = [
    {
      name: "Teen Mental Health First Aid",
      description: "Online courses to help recognize mental health challenges",
      type: "Educational",
      location: "Online",
      website: "https://www.mentalhealthfirstaid.org/"
    },
    {
      name: "National Alliance on Mental Illness (NAMI)",
      description: "Local support groups and educational resources",
      type: "Support Groups",
      location: "Nationwide",
      website: "https://www.nami.org/"
    },
    {
      name: "Psychology Today Therapist Directory",
      description: "Find mental health professionals in your area",
      type: "Professional Help",
      location: "Local Search",
      website: "https://www.psychologytoday.com/"
    }
  ];

  const selfCareActivities = [
    {
      title: "5-4-3-2-1 Grounding Technique",
      description: "Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      icon: "🌟",
      category: "Anxiety Relief"
    },
    {
      title: "Box Breathing",
      description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat 4 times.",
      icon: "🫁",
      category: "Breathing"
    },
    {
      title: "Gratitude Journal",
      description: "Write down 3 things you're grateful for each day, no matter how small",
      icon: "📝",
      category: "Mindfulness"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and relax each muscle group from toes to head",
      icon: "💆",
      category: "Relaxation"
    },
    {
      title: "Nature Walk",
      description: "Spend 10-15 minutes outside, even if it's just around the block",
      icon: "🌳",
      category: "Movement"
    },
    {
      title: "Creative Expression",
      description: "Draw, write, sing, or create something just for you",
      icon: "🎨",
      category: "Creativity"
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
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Mental Health Resources</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Crisis Alert */}
        <Card className="p-4 mb-6 bg-destructive/10 border-destructive border-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-destructive mb-2">In Crisis? Get Help Now</h2>
              <p className="text-sm text-destructive/80 mb-3">
                If you're having thoughts of suicide or self-harm, please reach out immediately. You are not alone.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  <Phone className="w-4 h-4 mr-1" />
                  Call 988
                </Button>
                <Button size="sm" variant="outline" className="border-destructive text-destructive">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Text 741741
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Crisis Resources */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Crisis Support</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="p-4 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    resource.type === 'crisis' ? 'bg-destructive/20' : 'bg-warning/20'
                  }`}>
                    <Phone className={`w-5 h-5 ${
                      resource.type === 'crisis' ? 'text-destructive' : 'text-warning'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary">{resource.contact}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {resource.available}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Professional Help */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Find Professional Help</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {localResources.map((resource, index) => (
              <Card key={index} className="p-4 shadow-soft border-0 bg-card/80 backdrop-blur-sm hover:shadow-warm transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="font-medium">{resource.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {resource.location}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-primary border-primary">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Self-Care Activities */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Self-Care Toolkit</h2>
          <p className="text-muted-foreground mb-6">
            Simple techniques you can try when you need support. Remember, these complement but don't replace professional help.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selfCareActivities.map((activity, index) => (
              <Card key={index} className="p-4 shadow-soft border-0 bg-card/80 backdrop-blur-sm hover:shadow-warm transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl mb-3">{activity.icon}</div>
                  <h3 className="font-semibold mb-2">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                  <span className="inline-block px-2 py-1 bg-primary-light text-primary text-xs rounded-full">
                    {activity.category}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <Card className="p-6 bg-gradient-warm border-0 shadow-warm">
          <h3 className="text-xl font-semibold mb-4 text-center">Remember</h3>
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div>
              <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
              <h4 className="font-semibold mb-1">You Matter</h4>
              <p className="text-sm text-muted-foreground">
                Your life has value. Even in dark moments, there is hope and help available.
              </p>
            </div>
            <div>
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">You're Not Alone</h4>
              <p className="text-sm text-muted-foreground">
                Many people understand what you're going through. Reaching out is a sign of strength.
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link to="/chat">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Talk to AI Companion
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resources;