import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface MoodEntry {
  id: string;
  mood: string;
  emoji: string;
  date: Date;
  note?: string;
}

const moodOptions = [
  { emoji: "😄", label: "Amazing", value: "amazing", color: "bg-success" },
  { emoji: "😊", label: "Good", value: "good", color: "bg-primary" },
  { emoji: "😐", label: "Okay", value: "okay", color: "bg-warning" },
  { emoji: "😔", label: "Low", value: "low", color: "bg-accent" },
  { emoji: "😢", label: "Struggling", value: "struggling", color: "bg-destructive" },
];

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    {
      id: "1",
      mood: "good",
      emoji: "😊",
      date: new Date(Date.now() - 86400000),
      note: "Had a nice chat with a friend"
    },
    {
      id: "2", 
      mood: "okay",
      emoji: "😐",
      date: new Date(Date.now() - 172800000),
    },
    {
      id: "3",
      mood: "amazing",
      emoji: "😄", 
      date: new Date(Date.now() - 259200000),
      note: "Finished a project I was working on!"
    }
  ]);
  const { toast } = useToast();

  const saveMood = () => {
    if (!selectedMood) return;

    const moodOption = moodOptions.find(m => m.value === selectedMood);
    if (!moodOption) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      emoji: moodOption.emoji,
      date: new Date(),
    };

    setMoodHistory(prev => [newEntry, ...prev]);
    setSelectedMood("");
    
    toast({
      title: "Mood logged!",
      description: `Thanks for checking in. Remember, all feelings are valid. ${moodOption.emoji}`,
    });
  };

  const getMoodStreak = () => {
    // Simple streak calculation - count consecutive days with mood entries
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today.getTime() - (i * 86400000));
      const hasEntry = moodHistory.some(entry => 
        entry.date.toDateString() === checkDate.toDateString()
      );
      
      if (hasEntry) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
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
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Mood Tracker</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Today's Mood Check-in */}
        <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm mb-6">
          <h2 className="text-2xl font-bold mb-2">How are you feeling today?</h2>
          <p className="text-muted-foreground mb-6">
            Check in with yourself. There's no right or wrong answer - just honesty.
          </p>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedMood === mood.value
                    ? 'border-primary bg-primary-light shadow-glow'
                    : 'border-border hover:border-primary/50 hover:shadow-soft'
                }`}
              >
                <span className="text-3xl mb-2">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>

          <Button 
            onClick={saveMood}
            disabled={!selectedMood}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 w-full sm:w-auto"
          >
            Log My Mood
          </Button>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Check-in Streak</p>
                <p className="text-2xl font-bold">{getMoodStreak()} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl font-bold">{moodHistory.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {moodHistory.filter(entry => 
                    entry.date > new Date(Date.now() - 7 * 86400000)
                  ).length} entries
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mood History */}
        <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">Your Recent Check-ins</h3>
          
          {moodHistory.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No mood entries yet. Start by checking in above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {moodHistory.slice(0, 10).map((entry) => {
                const moodOption = moodOptions.find(m => m.value === entry.mood);
                return (
                  <div key={entry.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <span className="text-2xl">{entry.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{entry.mood}</span>
                        <span className={`w-2 h-2 rounded-full ${moodOption?.color || 'bg-muted'}`}></span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {entry.note && (
                        <p className="text-sm text-foreground mt-1 italic">"{entry.note}"</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Encouragement */}
        <Card className="p-6 mt-6 bg-gradient-warm border-0 shadow-warm text-center">
          <h3 className="text-xl font-semibold mb-2">Remember</h3>
          <p className="text-muted-foreground">
            Every feeling is valid. Tracking your mood helps you understand patterns and celebrate progress. 
            You're doing great by taking care of your mental health! 💙
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Mood;