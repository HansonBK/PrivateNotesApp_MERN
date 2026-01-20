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
  <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl flex flex-col">
    {/* soft background blobs */}
    <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-slate-200/40 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-slate-300/30 blur-3xl" />

    {/* Content */}
    <div className="relative flex flex-col flex-1">
      {/* Title */}
      {!isEditing ? (
        <h2 className="text-xl font-bold text-slate-900 leading-tight line-clamp-2">
          {message.title}
        </h2>
      ) : (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
          placeholder="Title..."
        />
      )}

      {/* Date */}
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          {new Date(message.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Body (flex-1 so it takes remaining space) */}
      <div className="mt-4 flex-1">
        {!isEditing ? (
          <div className="relative h-full rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line line-clamp-6">
              {message.messagebody}
            </p>
            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-2xl bg-gradient-to-t from-slate-50/90 to-transparent" />
          </div>
        ) : (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60 resize-none"
            placeholder="Message..."
          />
        )}
      </div>

      {/* Actions (mt-auto pushes it to the bottom) */}
      <div className="mt-auto pt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white active:scale-[0.99] sm:w-auto"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-red-700 hover:to-red-600 active:scale-[0.99] sm:w-auto"
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
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] sm:w-auto"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] sm:w-auto"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);
;


};

export default MessageCard;
