import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import MessageCard from "../components/MessageCard.jsx";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const fetchAllMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(res.data);
    } catch (err) {
      console.error(err);

      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Please login again");
        navigate("/login", { replace: true });
        return;
      }

      toast.error("Failed to load messages");
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  const handleDeleted = (id) => {
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  const handleUpdated = (updatedMsg) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === updatedMsg._id ? updatedMsg : m))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-10">
         {messages.length === 0 ? (
            <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur p-12 text-center text-slate-600 flex flex-col items-center gap-4">
              <p>No messages yet.</p>

              <button
                onClick={() => navigate("/create")}
                className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                + Create your first message
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages.map((msg) => (
                <MessageCard
                  key={msg._id}
                  message={msg}
                  onDeleted={handleDeleted}
                  onUpdated={handleUpdated}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
