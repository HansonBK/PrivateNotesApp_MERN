import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const CreatePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    messagebody: "",
  });

  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    const title = form.title.trim();
    const messagebody = form.messagebody.trim();

    if (!title || !messagebody) {
      toast.error("Please fill in title and message");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/messages",
        { title, messagebody },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Message created");

      // If your backend returns the created message, you can use it if needed:
      // console.log(res.data);

      navigate("/home", { replace: true });
    } catch (err) {
      console.error(err);

      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Please login again");
        navigate("/login", { replace: true });
        return;
      }

      const msg =
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        "Failed to create message";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    Create a new message
                  </h1>
                  <p className="mt-2 text-slate-600">
                    Write a private message and save it to your dashboard.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  className="px-4 py-2 rounded-xl bg-white/70 border border-white/30 text-slate-900 hover:bg-white transition"
                >
                  Back
                </button>
              </div>

              <form onSubmit={handleCreate} className="mt-8 space-y-5">
                <div>
                  <label className="block text-slate-700 text-sm mb-2">
                    Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. My next goal"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    value={form.messagebody}
                    onChange={(e) =>
                      setForm({ ...form, messagebody: e.target.value })
                    }
                    placeholder="Write your message here..."
                    rows={8}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="px-5 py-3 rounded-xl bg-white/70 border border-white/30 text-slate-900 hover:bg-white transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-60"
                  >
                    {loading ? "Creating..." : "Create message"}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-xs text-slate-500">
                Tip: Keep titles short and clear.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreatePage;
