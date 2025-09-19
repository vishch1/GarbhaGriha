import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Flower2, Camera, FileText, Wind, Moon, Headphones, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const WellnessTools = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerCount, setTimerCount] = useState(0);

  const tools = [
    {
      id: "breathing",
      title: "Breathing Exercises",
      description: "Guided breathing techniques to reduce anxiety and promote calmness",
      icon: Wind,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      id: "meditation",
      title: "Mindfulness Meditation",
      description: "Short guided meditations for stress relief and mental clarity",
      icon: Flower2,
      color: "text-success",
      bgColor: "bg-success-light"
    },
    {
      id: "journaling",
      title: "Journaling Prompts",
      description: "Thoughtful questions to help process emotions and gain insights",
      icon: FileText,
      color: "text-accent",
      bgColor: "bg-accent-light"
    },
    {
      id: "gratitude",
      title: "Gratitude Practice",
      description: "Daily gratitude exercises to improve mood and outlook",
      icon: Heart,
      color: "text-warning",
      bgColor: "bg-warning/20"
    },
    {
      id: "sleep",
      title: "Sleep Hygiene",
      description: "Tips and techniques for better sleep quality and routine",
      icon: Moon,
      color: "text-secondary",
      bgColor: "bg-secondary"
    },
    {
      id: "music",
      title: "Calming Sounds",
      description: "Nature sounds and ambient music for relaxation",
      icon: Headphones,
      color: "text-primary",
      bgColor: "bg-primary-light"
    }
  ];

  const breathingExercises = [
    {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8. Great for anxiety.",
      duration: "5 minutes"
    },
    {
      name: "Box Breathing",
      description: "Equal counts of inhale, hold, exhale, hold. Used by Navy SEALs.",
      duration: "3 minutes"
    },
    {
      name: "Deep Belly Breathing",
      description: "Focus on breathing deeply into your belly, not your chest.",
      duration: "10 minutes"
    }
  ];

  const journalPrompts = [
    "What am I grateful for today?",
    "How am I feeling right now, and why?",
    "What's one thing that brought me joy this week?",
    "What challenges am I facing, and how can I approach them?",
    "What would I tell a friend who was feeling like I am?",
    "What are three things I accomplished recently?",
    "What's one thing I learned about myself today?"
  ];

  const sleepTips = [
    "Keep a consistent sleep schedule, even on weekends",
    "Create a relaxing bedtime routine (reading, warm bath, etc.)",
    "Avoid screens for at least 1 hour before bed",
    "Keep your bedroom cool, dark, and quiet",
    "Limit caffeine after 2 PM",
    "Get natural sunlight exposure during the day",
    "If you can't sleep, get up and do a quiet activity until sleepy"
  ];

  const startTimer = (toolId: string) => {
    setActiveTimer(toolId);
    setTimerCount(0);
    
    const interval = setInterval(() => {
      setTimerCount(prev => {
        if (prev >= 300) { // 5 minutes
          clearInterval(interval);
          setActiveTimer(null);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Wellness Tools</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Hero Section */}
        <Card className="p-8 text-center mb-8 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Comprehensive Wellness Toolkit</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access evidence-based tools and techniques to support your mental wellness journey. 
            Each tool is designed to help you build healthy coping skills and improve your overall wellbeing.
          </p>
        </Card>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm hover:shadow-warm transition-all duration-300">
                <div className={`w-12 h-12 ${tool.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => tool.id === 'breathing' && startTimer(tool.id)}
                >
                  {tool.id === 'breathing' && activeTimer === tool.id 
                    ? `Breathing... ${formatTime(timerCount)}`
                    : 'Start Session'
                  }
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Breathing Exercises */}
          <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Wind className="w-6 h-6 text-primary" />
              Breathing Exercises
            </h3>
            <div className="space-y-4">
              {breathingExercises.map((exercise, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <span className="text-xs bg-primary-light text-primary px-2 py-1 rounded">{exercise.duration}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{exercise.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Journal Prompts */}
          <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-accent" />
              Today's Journal Prompts
            </h3>
            <div className="space-y-3">
              {journalPrompts.slice(0, 5).map((prompt, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/30">
                  <p className="text-sm">{prompt}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Get More Prompts
            </Button>
          </Card>

          {/* Sleep Hygiene Tips */}
          <Card className="lg:col-span-2 p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Moon className="w-6 h-6 text-secondary" />
              Sleep Hygiene Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sleepTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-6 h-6 bg-success-light rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-success text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA */}
        <Card className="p-8 text-center mt-8 shadow-soft border-0 bg-gradient-warm">
          <h3 className="text-2xl font-bold mb-4">Start Your Wellness Practice</h3>
          <p className="text-muted-foreground mb-6">
            Consistency is key to building healthy habits. Start with just 5 minutes a day.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              Set Reminders
            </Button>
            <Link to="/mood">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Track Progress
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WellnessTools;