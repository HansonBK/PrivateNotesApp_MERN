import { useState } from "react";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();

  
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
                  onClick={() => navigate("/login")}
                  className="underline font-medium text-slate-900"
                >
                  Login
              </button> 
              {" "}
              instead.
            </p>
          </div>

          
          <div className="p-8 sm:p-10 lg:p-12 bg-white/80">
            <div className="lg:hidden mb-8">
              <h1 className="text-4xl font-extrabold text-slate-900">
                Create account
              </h1>
              <p className="mt-2 text-slate-600">
                Register to get started
              </p>
            </div>

            <form className="space-y-5">
              
              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Username
                </label>
                <input
                  placeholder="yourusername"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              
              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Full name
                </label>
                <input
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

             
              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

              
              <div>
                <label className="block text-slate-700 text-sm mb-2">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                />
              </div>

             
              <button
                type="button"
                className="w-full rounded-xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition"
              >
                Create account
              </button>

             
              <p className="text-center text-slate-600 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
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
