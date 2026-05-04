export default function Footer() {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-xs text-gray-600">
          © {currentYear} RT 05 Kel. Pandaan · Dibuat dengan ❤ untuk warga
        </p>
      </div>
    </footer>
  );
}