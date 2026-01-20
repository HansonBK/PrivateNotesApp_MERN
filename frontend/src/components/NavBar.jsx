import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur border-b border-white/30">
      
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
       
        <h1
          onClick={() => navigate("/home")}
          className="text-xl font-extrabold tracking-tight text-slate-900 cursor-pointer hover:opacity-80"
        >
          PrivateNotes
        </h1>

        
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            + New
          </button>

          <button
            onClick={logout}
            className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
