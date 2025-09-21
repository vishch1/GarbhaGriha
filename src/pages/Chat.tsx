import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Send, ArrowLeft, AlertTriangle, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { usePrivacy } from "../context/PrivacyContext";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  mood?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your AI wellness companion. I'm here to listen without judgment and support you on your mental health journey. How are you feeling today? 💙",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { localOnly, toggleLocalOnly } = usePrivacy();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mood detection
  const detectMood = (message: string): string => {
    const moodKeywords: Record<string, string[]> = {
      sad: ["sad", "down", "depressed", "unhappy", "cry"],
      anxious: ["anxious", "worried", "nervous", "panic"],
      happy: ["happy", "excited", "joy", "glad"],
      angry: ["angry", "mad", "frustrated"],
    };

    for (const mood in moodKeywords) {
      if (
        moodKeywords[mood].some((word) =>
          message.toLowerCase().includes(word)
        )
      ) {
        return mood;
      }
    }
    return "neutral";
  };

  // Crisis detection
  const detectCrisisKeywords = (message: string): boolean => {
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end it all",
      "self-harm",
      "hurt myself",
      "want to die",
    ];
    return crisisKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );
  };

  // Command responses
  const commandResponses: Record<string, string> = {
    joke: "Why don't scientists trust atoms? Because they make up everything! 😂",
    motivate: "You are stronger than you think 💪. Every small step counts.",
    resource:
      "Here’s a useful site: https://www.mhanational.org — packed with mental health resources.",
    breathe:
      "Okay, let’s try: 🌬️ Inhale for 4 sec... hold for 4... exhale for 4. Repeat 3 times.",
  };

  // ✅ Local Mode dynamic reply function
  const generateLocalModeReply = (message: string): string => {
    const lower = message.toLowerCase();

    // Crisis keywords
    const crisisKeywords = ["suicide", "kill myself", "end it all", "self-harm", "hurt myself", "want to die"];
    if (crisisKeywords.some((k) => lower.includes(k))) {
      return "It sounds like you're in serious distress 💔. Please reach out immediately to trained professionals. Call 988 or text HELLO to 741741. I'm here to listen too.";
    }

    const sadReplies = [
      "I'm really sorry you're feeling this way 💙. Do you want to talk about it or try a quick breathing exercise?",
      "Feeling low can be heavy 😔. I'm here to listen, would you like to share more?",
      "I hear you 💙. Want to do a small grounding activity together?"
    ];

    const anxiousReplies = [
      "I understand things feel tense 😟. Want to try a calming breathing exercise?",
      "Feeling anxious can be overwhelming 💙. Do you want to talk about what's worrying you?",
      "It's okay to feel this way 😌. Let's take a moment to breathe together."
    ];

    const happyReplies = [
      "That's wonderful to hear! 😄 What’s making you feel good today?",
      "Yay! 😊 I love hearing that. Want to share more?",
      "Your happiness is contagious 😄. Tell me more!"
    ];

    const angryReplies = [
      "It sounds frustrating 😡. Want to talk about it or try a calming exercise?",
      "I hear your anger 💙. Sometimes expressing it helps. Want to share?",
      "Feeling mad is natural 😔. We can do a grounding exercise if you like."
    ];

    // Neutral / unknown
    const neutralReplies = [
      "Thanks for sharing 💙. Can you tell me a bit more about how you’re feeling right now?",
      "I'm listening 😌. Would you like to tell me more?",
      "I'm here to support you 💙. Want to continue talking?"
    ];

    // Detect mood
    const mood = detectMood(message);
    switch (mood) {
      case "sad":
        return sadReplies[Math.floor(Math.random() * sadReplies.length)];
      case "anxious":
        return anxiousReplies[Math.floor(Math.random() * anxiousReplies.length)];
      case "happy":
        return happyReplies[Math.floor(Math.random() * happyReplies.length)];
      case "angry":
        return angryReplies[Math.floor(Math.random() * angryReplies.length)];
      default:
        return neutralReplies[Math.floor(Math.random() * neutralReplies.length)];
    }
  };

  // Fetch AI response from backend
  const fetchAIResponse = async (userMessage: string, mood: string) => {
    try {
      if (commandResponses[userMessage.toLowerCase()]) {
        return commandResponses[userMessage.toLowerCase()];
      }

      if (localOnly) {
        return `🔒 [Local Mode] ${generateLocalModeReply(userMessage)}`;
      }

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      return data.reply || "Sorry, I didn't understand that.";
    } catch (err) {
      console.error(err);
      return "Oops! Something went wrong.";
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    if (detectCrisisKeywords(userMessage.content)) {
      toast({
        title: "Crisis Support Available",
        description:
          "I've detected you might be in distress. Professional help is available 24/7.",
        variant: "destructive",
      });
    }

    const mood = detectMood(userMessage.content);
    const aiContent = await fetchAIResponse(userMessage.content, mood);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiContent,
      isUser: false,
      timestamp: new Date(),
      mood,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);

    if (localOnly) {
      localStorage.setItem("chatHistory", JSON.stringify([...messages, userMessage, aiMessage]));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col">
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
              <div>
                <h1 className="font-semibold">AI Wellness Companion</h1>
                <p className="text-xs text-muted-foreground">
                  {localOnly ? "Private: Local-only mode" : "Always here to listen"}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant={localOnly ? "default" : "outline"}
            size="sm"
            onClick={toggleLocalOnly}
          >
            <Shield className="w-4 h-4 mr-2" />
            {localOnly ? "Local-only ON" : "Local-only OFF"}
          </Button>
        </div>
      </header>

      {/* Crisis Alert */}
      <div className="bg-destructive/10 border-l-4 border-destructive px-4 py-3">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-destructive font-medium">
              If you're in crisis: Call 988 (Suicide & Crisis Lifeline) or text "HELLO" to 741741
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages?.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-xs sm:max-w-md p-4 shadow-soft border-0 ${
                  message.isUser ? "bg-gradient-primary text-primary-foreground" : "bg-card"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </Card>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Card className="max-w-xs p-4 shadow-soft border-0 bg-card">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-card/80 backdrop-blur-sm border-t border-border px-4 py-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... (try 'joke', 'motivate', 'breathe', 'resource')"
              className="flex-1 border-border/50 focus:border-primary"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {localOnly
              ? "🔒 Local-only mode: Your messages stay on this device."
              : "This conversation is private and anonymous. I'm here to support you. 💙"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
