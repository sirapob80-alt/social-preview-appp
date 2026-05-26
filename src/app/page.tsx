"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    if (!url) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/preview?url=${encodeURIComponent(url)}`
      );

      const data = await res.json();

      setPreview(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold mt-20 mb-10">
        Social Preview App
      </h1>

      <div className="w-full max-w-xl flex gap-3">
        <input
          type="text"
          placeholder="Paste a link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-4 rounded-2xl bg-[#1c1c1c] border border-gray-700 outline-none"
        />

        <button
          onClick={handlePreview}
          className="px-6 rounded-2xl bg-blue-500"
        >
          Preview
        </button>
      </div>

      {loading && (
        <p className="mt-6 text-gray-400">Loading preview...</p>
      )}

      {preview && (
        <div className="mt-10 w-full max-w-xl bg-[#1c1c1c] rounded-3xl overflow-hidden border border-gray-800">
          {preview.image?.url && (
            <img
              src={preview.image.url}
              alt="preview"
              className="w-full h-80 object-cover"
            />
          )}

          <div className="p-5">
            <div className="text-sm text-gray-400 mb-2">
              {preview.publisher}
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {preview.title}
            </h2>

            <p className="text-gray-300">
              {preview.description}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}