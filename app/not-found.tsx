import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
      <h1 className="text-6xl font-extrabold text-amber-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-slate-400 mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
