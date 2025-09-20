import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Send, ArrowLeft, AlertTriangle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  // Frontend commands
  const handleCommand = (command: string): string | null => {
    switch (command.toLowerCase()) {
      case "joke":
        return "Why don’t scientists trust atoms? Because they make up everything! 😄";
      case "motivate":
        return "Remember, every small step you take is progress. You’ve got this! 💪";
      case "breathe":
        return "Let's take a deep breath together… Inhale… Exhale… 🌬️";
      case "resource":
        return "You can check out mental health resources here: https://www.mentalhealth.gov/ 📚";
      default:
        return null;
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const commandResponse = handleCommand(inputValue.trim());
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Crisis detection toast
    if (detectCrisisKeywords(userMessage.content)) {
      toast({
        title: "Crisis Support Available",
        description:
          'I detected you might be in distress. Please call 988 or text "HELLO" to 741741 for immediate help.',
        variant: "destructive",
      });
    }

    // Instant command response
    if (commandResponse) {
      const aiCommandMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: commandResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setTimeout(() => {
        setMessages((prev) => [...prev, aiCommandMessage]);
        setIsTyping(false);
      }, 500);
      return;
    }

    // Call backend OpenRouter API
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      const aiResponse: Message = {
        id: (Date.now() + 2).toString(),
        content: data.reply || "Sorry, I couldn't respond. 😅",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 3).toString(),
        content: "Oops! Something went wrong. 😢",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chat frontend error:", err);
    } finally {
      setIsTyping(false);
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
                <p className="text-xs text-muted-foreground">Always here to listen</p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive"
          >
            <Phone className="w-4 h-4 mr-2" />
            Crisis Help
          </Button>
        </div>
      </header>

      {/* Crisis Alert */}
      <div className="bg-destructive/10 border-l-4 border-destructive px-4 py-3">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-destructive font-medium">
              If you're in crisis: Call 988 or text "HELLO" to 741741
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-xs sm:max-w-md p-4 shadow-soft border-0 ${
                  message.isUser
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.isUser
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Card>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Card className="max-w-xs p-4 shadow-soft border-0 bg-card">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
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
              placeholder='Type a message or command: "joke", "motivate", "breathe", "resource"'
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
            This conversation is private and anonymous. I'm here to support you. 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
