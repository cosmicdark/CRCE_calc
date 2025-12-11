"use client";

import { useState } from "react";

interface Subject {
  url: string;
  subjectName: string | null;
  marks: string[];
  totalObt: number;
  totalMax: number;
  percentage: number | null;
  grade: string;
  gradePoint: number | null;
}

interface Result {
  sgpa: number | null;
  estimatedCgpa: number | null;
  totalMarksAll: number;
  maxMarksAll: number;
  subjects: Subject[];
}

// Simple Icons
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function Home() {
  const [prn, setPrn] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use internal API route
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prn, dob }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0f2f1] flex items-center justify-center p-4 font-sans">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-emerald-600 rounded-[40px] shadow-2xl overflow-hidden min-h-[800px] relative flex flex-col">
        {/* Header Section */}
        <div className="p-8 pt-12 text-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-wide">CRCE Results</h1>
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <UserIcon />
            </div>
          </div>

          {!result ? (
            <div className="mt-4">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-emerald-50 opacity-90">
                Check your academic performance
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-emerald-100 text-sm font-medium mb-1">
                Current SGPA
              </p>
              <h2 className="text-5xl font-bold mb-2">
                {result.sgpa || "N/A"}
              </h2>
              <div className="flex gap-4 mt-4">
                <div className="bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <p className="text-xs text-emerald-50">Total Marks</p>
                  <p className="font-bold">
                    {result.totalMarksAll} / {result.maxMarksAll}
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <p className="text-xs text-emerald-50">Percentage</p>
                  <p className="font-bold">
                    {result.maxMarksAll > 0
                      ? (
                          (result.totalMarksAll / result.maxMarksAll) *
                          100
                        ).toFixed(2)
                      : "0"}
                    %
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Card */}
        <div className="flex-1 bg-[#F5F7FA] rounded-t-[40px] p-6 relative overflow-y-auto">
          {!result ? (
            <div className="space-y-6 mt-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Enter Details
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 ml-1">
                      PRN Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <UserIcon />
                      </div>
                      <input
                        type="text"
                        value={prn}
                        onChange={(e) => setPrn(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-600 transition-all"
                        placeholder="e.g. 12345678"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 ml-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <CalendarIcon />
                      </div>
                      <input
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-600 transition-all"
                        placeholder="DD-MM-YYYY"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <span className="animate-pulse">Fetching...</span>
                    ) : (
                      <>
                        <span>Get Results</span>
                        <ChevronRight />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {error && (
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 pb-8">
              <div className="flex justify-between items-center mb-2 px-2">
                <h3 className="text-xl font-bold text-gray-800">
                  Subject Wise
                </h3>
                <button
                  onClick={() => setResult(null)}
                  className="text-sm text-gray-500 hover:text-emerald-600"
                >
                  Check Another
                </button>
              </div>

              {result.subjects.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-3xl shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${
                        sub.grade === "F"
                          ? "bg-red-100 text-red-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {sub.grade}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        {sub.subjectName || "Unknown Subject"}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Marks: {sub.totalObt}/{sub.totalMax}
                      </p>
                    </div>
                  </div>
                  <div className="text-right min-w-[60px]">
                    <p className="font-bold text-gray-800">{sub.percentage}%</p>
                    <p className="text-xs text-gray-400">Score</p>
                  </div>
                </div>
              ))}

              <div className="mt-8 text-center pb-4">
                <p className="text-xs text-gray-400 font-medium">
                  Note: Result might be ±0.1 up/down
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
