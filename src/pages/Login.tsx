
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { navItems } from "@/lib/data";
import { User, Lock, Mail } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      // Registration validation
      if (!formData.email || !formData.username || !formData.password) {
        setError("All fields are required");
        return;
      }
      
      if (formData.email !== "bob@bobbieberry.com") {
        setError("Email not recognized");
        return;
      }
      
      // If all validation passes for registration
      toast.success("Registration successful!");
      setIsRegistering(false);
    } else {
      // Login validation
      if (
        formData.username === "Admin-Miracle" &&
        formData.password === "onlyBusiness2019..."
      ) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar items={navItems} />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <h1 className="text-3xl font-display font-bold mb-6 text-center">
              {isRegistering ? "Create Account" : "Login"}
            </h1>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegistering && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="bob@bobbieberry.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    name="username"
                    placeholder={isRegistering ? "Choose a username" : "Admin-Miracle"}
                    className="pl-10"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="password"
                    name="password"
                    placeholder={isRegistering ? "Choose a password" : "••••••••••••••"}
                    className="pl-10"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-[#e6c300] text-black"
              >
                {isRegistering ? "Create Account" : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-gray-600 hover:text-[#FFD700] transition-colors"
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </button>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-[#FFD700] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Login;
