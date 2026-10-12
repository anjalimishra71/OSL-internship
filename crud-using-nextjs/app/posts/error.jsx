"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-red-500">
        {error.message}
      </p>
    </div>
  );
}