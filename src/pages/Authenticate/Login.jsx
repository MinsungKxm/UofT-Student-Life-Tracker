import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-6"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg mb-4">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>

          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Welcome back
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Sign in to your student portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-8 py-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-card-foreground mb-1.5"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@mail.utoronto.ca"
                  className="block w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-card-foreground"
                  >
                    Password
                  </label>

                  <a
                    href="#"
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-xl bg-muted border border-border px-4 py-2.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm"
              >
                Sign in
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-muted/40 border-t border-border flex items-center justify-center gap-1.5">
            <span className="text-sm text-muted-foreground">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Create one
            </Link>
          </div>
        </div>

        {/* Bottom caption */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          University of Toronto &mdash; Student Information System
        </p>
      </div>
    </div>
  );
}

export default Login;