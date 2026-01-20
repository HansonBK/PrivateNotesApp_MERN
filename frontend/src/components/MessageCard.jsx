import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const MessageCard = ({ message, onDeleted, onUpdated }) => {

const token = localStorage.getItem("token");
    
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState(message.title || "");
  const [body, setBody] = useState(message.messagebody || "");

  const handleDelete = async () => {
    const ok = window.confirm("Delete this message?");
    if (!ok) return;
    
    try {
      await api.delete(`/messages/${message._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        }); 


      toast.success("Message deleted");
      onDeleted?.(message._id);
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  const handleSave = async () => {
    const newTitle = title.trim();
    const newBody = body.trim();

    if (!newTitle || !newBody) {
      toast.error("Title and message are required");
      return;
    }

    try {
      setSaving(true);
       const res = await api.put(
      `/messages/${message._id}`,
      { title: newTitle, messagebody: newBody }, 
      { headers: { Authorization: `Bearer ${token}` } } 
    );

      toast.success("Message updated");
      onUpdated?.(res.data); 
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
      
      <div className="flex items-start justify-between gap-3">
        {!isEditing ? (
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            {message.title}
          </h2>
        ) : (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-slate-400 outline-none"
            placeholder="Title..."
          />
        )}

        <div className="flex gap-2 shrink-0">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 rounded-lg text-sm bg-white/70 border border-slate-200 text-slate-700 hover:bg-white transition"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-3 py-1.5 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTitle(message.title || "");
                  setBody(message.messagebody || "");
                }}
                disabled={saving}
                className="px-3 py-1.5 rounded-lg text-sm bg-white/70 border border-slate-200 text-slate-700 hover:bg-white transition disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1.5 rounded-lg text-sm bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </>
          )}
        </div>
      </div>

    
      <div className="mt-4">
        {!isEditing ? (
          <p className="text-slate-600 whitespace-pre-line line-clamp-5">
            {message.messagebody}
          </p>
        ) : (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-slate-400 outline-none resize-none"
            placeholder="Message..."
          />
        )}
      </div>

    
      <div className="mt-5 text-xs text-slate-400 flex justify-between">
        <span>ID: {message._id?.slice(0, 6)}...</span>
        <span>{new Date(message.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default MessageCard;
