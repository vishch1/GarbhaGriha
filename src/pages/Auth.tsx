import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if user is already authenticated and redirect
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    
    try {
      if (isSignUp) {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });

        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Please check your email to confirm your account.",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">GarbhaGriha</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isSignUp ? "Join GarbhaGriha" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp 
              ? "Create your safe space for mental wellness" 
              : "Sign in to continue your wellness journey"
            }
          </p>
        </div>

        <Card className="p-6 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="bg-background pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </Button>
            </p>
          </div>

          {!isSignUp && (
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Your mental health journey is private and secure
              </p>
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;