import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-base-100 px-6 text-center">
      <div className="relative">
        <h1 className="text-9xl font-extrabold tracking-widest text-green-500/20">
          404
        </h1>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-green-700">
            Page Not Found
          </span>
        </div>
      </div>

      

      <p className="mt-4 max-w-md text-base-content/60">
        The page you are looking for doesn't exist or may have been moved.
        Let's get you back on track!
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700"
      >
        <span>←</span>
        Back to Home
      </Link>

      <p className="mt-10 text-sm text-base-content/40">
        Error Code: 404
      </p>
    </div>
  );
};

export default NotFound;
