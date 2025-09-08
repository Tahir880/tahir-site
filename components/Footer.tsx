export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container mt-16 border-t border-white/10 py-10 text-center text-sm text-white/60">
      <p>© {year} Tahir Salami • All rights reserved.</p>
    </footer>
  );
}
