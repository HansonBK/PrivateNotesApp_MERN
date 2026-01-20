import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("token");
  }, []);

  const login = async (e) => {

    
  
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successfully");

      navigate("/home", {replace: true});
    } catch (error) {
      const msg =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          
          <div className="hidden lg:flex flex-col justify-between p-12 bg-white/40">
            <div>
              <h1 className="text-5xl font-extrabold text-slate-900">
                Welcome back
              </h1>
              <p className="mt-3 text-slate-600 text-lg">
                Login to continue to your account
              </p>

              <div className="mt-10 space-y-4 text-slate-600">
                <p>• Secure authentication </p>
                <p>• Access your private notes</p>
                <p>• Fast modern UI</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm">
              &copy; 2024 PrivateNotes. All rights reserved.
            </p>
          </div>

          
          <div className="p-8 sm:p-10 lg:p-12 bg-white/80">
            <div className="lg:hidden mb-8">
              <h1 className="text-4xl font-extrabold text-slate-900">
                Welcome back
              </h1>
              <p className="mt-2 text-slate-600">
                Login to continue
              </p>
            </div>

            <form onSubmit={login} className="space-y-6">
              
              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-slate-700 text-sm">Password</label>
                  <button
                    type="button"
                    className="text-sm text-slate-500 hover:underline"
                  >
                    Forgot? 
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

            
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              
              <p className="text-center text-slate-600 text-sm">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="underline font-medium text-slate-900"
                >
                  Create one
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
