import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignUpPage = ({ onSignUp }) => {
   const [users, setUsers] = useState([]); // ← هنا بنخزن كل المستخدمين
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

   useEffect(() => {
      fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(data => {
          setUsers(data); // ← تخزين البيانات في الحالة
          console.log("Users from server:", data);
        })
        .catch(error => {
          console.error("فشل جلب البيانات:", error);
        });
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);



    if (users.find(u => u.email === email)) {
      toast({
        title: "Account Already Exists",
        description: "An account with this email is already registered. Please log in.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  email, password })
      });

      const data = await response.json();

      if (response.ok) {

        toast({
          title: "Account Created Successfully!",
          description: "Welcome to SmartTile Analytics! Redirecting...",
          className: "bg-primary text-primary-foreground"
        });
        onSignUp();
        navigate("/dashboard", { replace: true });
        setIsLoading(false);
      } else {
        toast({
          title: "Signup Failed",
          description: data.message || "Something went wrong.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Could not connect to server.",
        variant: "destructive"
      });
    }

    setIsLoading(false);

  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="w-full max-w-md auth-form-container">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 120 }}
            className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-primary-foreground shadow-lg"
          >
            <UserPlus className="h-8 w-8" />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join SmartTile Analytics and unlock energy insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Label htmlFor="email-signup" className="text-foreground/90">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 text-foreground"
                />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Label htmlFor="password-signup" className="text-foreground/90">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password-signup"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Label htmlFor="confirm-password-signup" className="text-foreground/90">Confirm Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirm-password-signup"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button type="submit" className="w-full font-semibold py-3 btn-primary-glow text-base" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up & Get Started"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors">
              Log In Instead
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;