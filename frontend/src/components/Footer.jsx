const Footer = () => {
  return (
    <footer className="mt-10 border-t border-white/30 bg-white/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} PrivateNotes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
