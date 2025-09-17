import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, MessageCircle, Heart, Plus, Shield, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: number;
  tags: string[];
  isAnonymous: boolean;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "MidnightDreamer",
      avatar: "🌙",
      content: "Having a rough week with anxiety. Anyone else find that journaling helps? I started writing down three things I'm grateful for each day and it's been surprisingly helpful.",
      timestamp: new Date(Date.now() - 3600000),
      likes: 12,
      replies: 5,
      tags: ["anxiety", "gratitude", "journaling"],
      isAnonymous: true
    },
    {
      id: "2", 
      author: "SunnyVibes",
      avatar: "☀️",
      content: "Celebrating a small win today - I went for a walk outside instead of staying in bed all day. It wasn't long, but it's progress! 🌱",
      timestamp: new Date(Date.now() - 7200000),
      likes: 18,
      replies: 8,
      tags: ["progress", "selfcare", "movement"],
      isAnonymous: true
    },
    {
      id: "3",
      author: "QuietStrength", 
      avatar: "🦋",
      content: "Reminder that healing isn't linear. Some days are harder than others, and that's okay. You're still moving forward even when it doesn't feel like it. 💙",
      timestamp: new Date(Date.now() - 14400000),
      likes: 25,
      replies: 12,
      tags: ["healing", "reminder", "encouragement"],
      isAnonymous: true
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const { toast } = useToast();

  const createPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: "Anonymous" + Math.floor(Math.random() * 1000),
      avatar: ["🌸", "🌟", "🍀", "🌊", "🦋", "🌱", "☀️", "🌙"][Math.floor(Math.random() * 8)],
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      tags: [],
      isAnonymous: true
    };

    setPosts(prev => [post, ...prev]);
    setNewPost("");
    setShowNewPost(false);
    
    toast({
      title: "Post shared!",
      description: "Your anonymous post has been added to the community.",
    });
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
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
                <Users className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Peer Support Community</h1>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowNewPost(!showNewPost)}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Community Guidelines */}
        <Card className="p-4 mb-6 bg-accent-light/30 border-accent">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-accent mb-1">Safe Space Guidelines</h3>
              <p className="text-sm text-accent/80">
                This is an anonymous, supportive community. Be kind, respect privacy, and remember that everyone's journey is different. 
                Crisis posts will be moderated and directed to professional resources.
              </p>
            </div>
          </div>
        </Card>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="p-4 mb-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <h3 className="font-semibold mb-3">Share Your Experience</h3>
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share something that might help others, celebrate a win, or ask for support..."
              className="mb-3 min-h-[100px] border-border/50 focus:border-primary"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Your post will be anonymous and can help others feel less alone.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={createPost}
                  disabled={!newPost.trim()}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Share Anonymously
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-lg">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{post.author}</span>
                    <Badge variant="secondary" className="text-xs">Anonymous</Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  
                  <p className="text-foreground mb-3 leading-relaxed">{post.content}</p>
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => likePost(post.id)}
                      className="text-muted-foreground hover:text-accent"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.replies}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-warning ml-auto"
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <Card className="p-6 mt-8 bg-gradient-warm border-0 shadow-warm text-center">
          <h3 className="text-xl font-semibold mb-4">Together We're Stronger</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">247</p>
              <p className="text-sm text-muted-foreground">Community Members</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">89</p>
              <p className="text-sm text-muted-foreground">Posts This Week</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">156</p>
              <p className="text-sm text-muted-foreground">Hearts Shared</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Every voice matters. Every story shared helps someone feel less alone. 💙
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Community;