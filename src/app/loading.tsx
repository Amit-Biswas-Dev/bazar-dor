
const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-base-100 px-4">
      {/* Animated Spinner */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />

        <div className="h-10 w-10 animate-pulse rounded-full bg-green-500/15" />
      </div>

      {/* Loading Text */}
      <h2 className="mt-7 text-xl font-bold text-base-content">
        Loading<span className="text-green-600">...</span>
      </h2>

      <p className="mt-2 text-center text-sm text-base-content/60">
        Please wait while we prepare everything for you.
      </p>

      {/* Animated Progress Bar */}
      <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-green-100">
        <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-green-600" />
      </div>
    </div>
  );
};

export default Loading;
