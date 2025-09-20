import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, BookOpen, Users, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/components/UserProfile";
import { TypewriterText } from "@/components/ui/TypewriterText";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/assets/LOGO_app.PNG"   // put your image path here
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-semibold text-foreground">GarbhaGriha</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/resources">
              <Button variant="ghost" size="sm">Resources</Button>
            </Link>
            <Link to="/community">
              <Button variant="ghost" size="sm">Community</Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/chat">
                  <Button variant="outline" size="sm">Start Chat</Button>
                </Link>
                <UserProfile />
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-light/50 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Your safe space for mental wellness
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            You're not alone on 
            <div className="mt-2">
              this <TypewriterText words={["journey", "healing", "resilience", "awareness", "support"]} />
            </div>
          </h1>


          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Lean on an AI companion that understands, reflect on your emotions daily, and discover caring resources to support your mental wellness as you grow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/chat">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Confidential Chat
              </Button>
            </Link>
            <Link to="/mood">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary-light">
                <Heart className="w-5 h-5 mr-2" />
                Track Your Mood
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              100% Anonymous
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Youth-Focused
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              24/7 Available
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Everything you need to feel better
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/ai-companion">
          <Card className="group p-6 shadow-soft hover:shadow-warm transition-transform duration-300 border-0 bg-card/40 backdrop-blur-sm cursor-pointer transform hover:scale-105">
            
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary">
              <MessageCircle className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
              AI Companion
            </h3>

            <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              Chat 24/7 with an empathetic AI companion specially trained to understand young people's mental health needs. Get personalized support, coping strategies, and emotional guidance in a judgment-free space that's always available when you need it most.
            </p>

          </Card>
        </Link>


          <Link to="/mood">
          <Card className="group p-6 shadow-soft hover:shadow-warm transition-transform duration-300 border-0 bg-card/40 backdrop-blur-sm cursor-pointer transform hover:scale-105">
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-accent">
              <Heart className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-accent">
              Mood Tracking
            </h3>
            <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              Track your daily emotions with simple emoji-based logging. Visualize patterns, identify triggers, and gain insights into your mental health journey with personalized analytics and progress tracking that helps you understand yourself better.
            </p>
          </Card>
          </Link>

          <Link to="/wellness-tools">
            <Card className="group p-6 shadow-soft hover:shadow-warm transition-transform duration-300 border-0 bg-card/40 backdrop-blur-sm cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-secondary-foreground">
                <BookOpen className="w-6 h-6 text-secondary-foreground group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-secondary-foreground">
                Wellness Tools
              </h3>
              <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Access a comprehensive toolkit of mental wellness resources including guided breathing exercises, journaling prompts, gratitude practices, mindfulness meditation, sleep hygiene tips, and personalized self-care activities tailored to your needs.
              </p>
            </Card>
          </Link>

          <Link to="/peer-support">
             <Card className="group p-6 shadow-soft hover:shadow-warm transition-transform duration-300 border-0 bg-card/40 backdrop-blur-sm cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-success">
                <Users className="w-6 h-6 text-success group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-success">
                Peer Support
              </h3>
              <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Connect with peers who understand your journey in a safe, moderated community. Share experiences anonymously, offer mutual support, participate in group discussions, and find comfort knowing you're not alone in your mental health journey.
              </p>
            </Card>
          </Link>

          <Link to="/crisis-support">
            <Card className="group p-6 shadow-soft hover:shadow-warm transition-transform duration-300 border-0 bg-card/40 backdrop-blur-sm cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-warning">
                <Shield className="w-6 h-6 text-warning group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-warning">
                Crisis Support
              </h3>
              <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Get immediate help when you need it most. Access 24/7 crisis hotlines, emergency contacts, local mental health services, and professional resources. Our system recognizes crisis situations and provides instant support pathways to keep you safe.
              </p>
            </Card>
          </Link>

          <Link to="/gamification">
            <Card className="group p-6 shadow-soft hover:shadow-warm transition-transform duration-300 border-0 bg-card/40 backdrop-blur-sm cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary">
                <Sparkles className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
                Gamification
              </h3>
              <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Stay motivated with engaging stress-relief games. Play interactive activities designed to reduce anxiety, improve focus, and promote relaxation while earning achievements and tracking your wellness progress in a fun, engaging way.
              </p>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-8 text-center bg-gradient-warm border-0 shadow-warm">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to start your wellness journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Remember, seeking help is a sign of strength. Take the first step towards feeling better today.
          </p>
          <Link to="/chat">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Start Your First Chat
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">GarbhaGriha</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your mental health matters. You are valued, supported, and never alone.
        </p>
      </footer>
    </div>
  );
};

export default Index;