import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
        <p className="mt-4 text-lg font-semibold text-slate-700">טוען את המיזם...</p>
      </div>
    </div>
  );
}