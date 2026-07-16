export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto text-center text-sm text-text-light">
        <p>&copy; {year} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
