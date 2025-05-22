import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";


const LoginPage = ({  onLogin }) => {
  const [users, setUsers] = useState([]); // ← هنا بنخزن كل المستخدمين
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    setIsLoading(true);

    // await new Promise(resolve => setTimeout(resolve, 1000)); 

    // const users = JSON.parse(localStorage.getItem("smartTileUsers")) || [];
    const user = users.find(u => u.email === email && u.password === password);

if (user) {
      localStorage.setItem("smartTileUser", JSON.stringify({ email: user.email }));
      toast({
        title: "Login Successful!",
        description: "Redirecting to your dashboard...",
        className: "bg-primary text-primary-foreground"
      });
      onLogin();
      navigate("/dashboard", { replace: true });
    } else {
   
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please check your credentials.",
        variant: "destructive",
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
      <Card className="w-full max-w-md auth-form-container" >
        <CardHeader className="text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 120 }}
            className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg"
          >
            <LogIn className="h-8 w-8" />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-foreground">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Access your SmartTile Analytics dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div initial={{opacity:0, x: -20}} animate={{opacity:1, x: 0}} transition={{delay:0.2}}>
              <Label htmlFor="email-login" className="text-foreground/90">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email-login"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 text-foreground"
                />
              </div>
            </motion.div>
            <motion.div initial={{opacity:0, x: -20}} animate={{opacity:1, x: 0}} transition={{delay:0.3}}>
              <Label htmlFor="password-login" className="text-foreground/90">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password-login"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
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
             <motion.div initial={{opacity:0, y: 20}} animate={{opacity:1, y: 0}} transition={{delay:0.4}}>
              <Button type="submit" className="w-full font-semibold py-3 btn-primary-glow text-base" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Log In"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3 pt-6">
          <Link to="#" className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors">
            Forgot your password?
          </Link>
          <p className="text-sm text-muted-foreground">
            New to SmartTiles?{" "}
            <Link to="/signup" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginPage;