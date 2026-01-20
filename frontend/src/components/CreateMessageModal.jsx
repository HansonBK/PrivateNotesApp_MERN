import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreateMessageModal = ({ isOpen, onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and message are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/messages", {
        title: title.trim(),
        messagebody: body.trim(),
      });

      toast.success("Message created");

      onCreated(res.data); 
      setTitle("");
      setBody("");
      onClose();
    } catch (err) {
      toast.error("Failed to create message");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        
        <h2 className="text-xl font-bold mb-4">Create new message</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 rounded-xl border px-4 py-2"
        />

        <textarea
          placeholder="Message..."
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mb-4 rounded-xl border px-4 py-2 resize-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleCreate}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMessageModal;
