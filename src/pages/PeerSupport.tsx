import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, MessageSquare, Heart, Shield, Star, ThumbsUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const PeerSupport = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const supportTopics = [
    {
      id: "anxiety",
      title: "Anxiety & Stress",
      memberCount: 324,
      activeCount: 12,
      description: "Share coping strategies and support each other through anxious moments"
    },
    {
      id: "depression",
      title: "Depression Support",
      memberCount: 189,
      activeCount: 8,
      description: "A safe space to discuss depression and find hope together"
    },
    {
      id: "school",
      title: "School & Academic Pressure",
      memberCount: 267,
      activeCount: 15,
      description: "Navigate academic stress, exam anxiety, and school-related challenges"
    },
    {
      id: "relationships",
      title: "Relationships & Social Issues",
      memberCount: 156,
      activeCount: 9,
      description: "Discuss friendships, family dynamics, and social situations"
    },
    {
      id: "selfcare",
      title: "Self-Care & Wellness",
      memberCount: 203,
      activeCount: 11,
      description: "Share self-care tips and motivate each other to prioritize wellbeing"
    },
    {
      id: "identity",
      title: "Identity & Self-Discovery",
      memberCount: 142,
      activeCount: 7,
      description: "Explore identity, self-worth, and personal growth journey"
    }
  ];

  const recentStories = [
    {
      id: 1,
      title: "How I overcame my social anxiety",
      author: "Anonymous",
      timeAgo: "2 hours ago",
      likes: 24,
      replies: 8,
      preview: "It took me months to build up the courage, but I finally spoke up in class today..."
    },
    {
      id: 2,
      title: "Finding motivation during tough times",
      author: "Anonymous",
      timeAgo: "5 hours ago",
      likes: 31,
      replies: 12,
      preview: "I wanted to share some techniques that helped me when I was feeling really low..."
    },
    {
      id: 3,
      title: "Dealing with exam stress",
      author: "Anonymous",
      timeAgo: "1 day ago",
      likes: 18,
      replies: 6,
      preview: "With finals coming up, I've been struggling with anxiety. Here's what's been helping..."
    }
  ];

  const successStories = [
    {
      title: "From isolation to connection",
      summary: "How this community helped me break out of my shell and make real friends.",
      timeframe: "6 months ago"
    },
    {
      title: "Managing panic attacks",
      summary: "The breathing techniques shared here literally saved me during my worst panic attack.",
      timeframe: "3 weeks ago"
    },
    {
      title: "Building confidence",
      summary: "The encouragement from this community helped me join the debate team!",
      timeframe: "1 month ago"
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
                <Users className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Peer Support</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Hero Section */}
        <Card className="p-8 text-center mb-8 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Connect with Peers Who Understand</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Join a supportive community of young people navigating similar mental health challenges. 
            Share experiences, offer support, and find comfort in knowing you're not alone.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Safe & Moderated
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Anonymous Support
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Peer-to-Peer Help
            </div>
          </div>
        </Card>

        {/* Support Topics */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6">Support Communities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportTopics.map((topic) => (
              <Card
                key={topic.id}
                className={`p-4 cursor-pointer transition-all duration-300 border-0 shadow-soft hover:shadow-warm ${
                  selectedTopic === topic.id 
                    ? 'bg-primary-light border-primary shadow-glow' 
                    : 'bg-card/80 backdrop-blur-sm hover:bg-card'
                }`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <h4 className="font-semibold text-lg mb-2">{topic.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{topic.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{topic.memberCount} members</span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    {topic.activeCount} active now
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Stories */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Recent Stories & Discussions
              </h3>
              <div className="space-y-4">
                {recentStories.map((story) => (
                  <div key={story.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-2">{story.title}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{story.preview}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>by {story.author}</span>
                        <span>{story.timeAgo}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {story.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {story.replies}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <MessageSquare className="w-4 h-4 mr-2" />
                Share Your Story
              </Button>
            </Card>
          </div>

          {/* Success Stories */}
          <div>
            <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                Success Stories
              </h3>
              <div className="space-y-4">
                {successStories.map((story, index) => (
                  <div key={index} className="p-3 rounded-lg bg-success-light/50">
                    <h4 className="font-medium text-sm mb-1">{story.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{story.summary}</p>
                    <span className="text-xs text-success font-medium">{story.timeframe}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Guidelines */}
            <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Community Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be kind and respectful to everyone</li>
                <li>• Maintain anonymity and privacy</li>
                <li>• No personal contact information</li>
                <li>• Offer support, not medical advice</li>
                <li>• Report concerning content to moderators</li>
                <li>• Celebrate each other's progress</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="p-8 text-center mt-8 shadow-soft border-0 bg-gradient-warm">
          <h3 className="text-2xl font-bold mb-4">Join the Conversation</h3>
          <p className="text-muted-foreground mb-6">
            Your voice matters. Share your journey and help others feel less alone.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Check-ins
            </Button>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Users className="w-4 h-4 mr-2" />
              Join Community
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PeerSupport;