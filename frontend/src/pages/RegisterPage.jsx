import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  

  const register = async (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const fullname = form.fullname.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    
    if (!username || !fullname || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/register", {
        username,
        fullname,
        email,
        password,
      });

      
      

      toast.success("Registered successfully");
      navigate("/", { replace: true });
    } catch (error) {
      const msg =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="hidden lg:flex flex-col justify-between p-12 bg-white/40">
            <div>
              <h1 className="text-5xl font-extrabold text-slate-900">
                Create your account
              </h1>
              <p className="mt-3 text-slate-600 text-lg">
                Join and start using your private messages & notes
              </p>

              <div className="mt-10 space-y-4 text-slate-600">
                <p>• Save your private notes</p>
                <p>• Secure authentication</p>
                <p>• Clean modern dashboard</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="underline font-medium text-slate-900"
              >
                Login
              </button>{" "}
              instead.
            </p>
          </div>

          {/* Right side */}
          <div className="p-8 sm:p-10 lg:p-12 bg-white/80">
            <div className="lg:hidden mb-8">
              <h1 className="text-4xl font-extrabold text-slate-900">
                Create account
              </h1>
              <p className="mt-2 text-slate-600">Register to get started</p>
            </div>

            
            <form className="space-y-5" onSubmit={register}>
              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Username
                </label>
                <input
                  placeholder="yourusername"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Full name
                </label>
                <input
                  placeholder="John Doe"
                  value={form.fullname}
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition"
              >
                Create account
              </button>

              <p className="text-center text-slate-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="underline font-medium text-slate-900"
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
