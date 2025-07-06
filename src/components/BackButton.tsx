// src/components/BackButton.tsx
"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="mb-4 text-blue-600 hover:underline"
    >
      ← Geri
    </button>
  );
}
