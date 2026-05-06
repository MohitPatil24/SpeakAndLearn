import React from "react";

interface Props {
  word: string;
  setWord: (word: string) => void;
  onSearch: () => void;
  onVoice: () => void;
  onClear: () => void;
  loading: boolean;
  listening: boolean;
}

const SearchBar: React.FC<Props> = ({
  word,
  setWord,
  onSearch,
  onVoice,
  onClear,
  loading,
  listening,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full max-w-2xl">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Type or speak a word..."
          className="w-full rounded-[28px] border border-white/10 bg-slate-950/80 py-4 pl-12 pr-5 text-lg font-medium text-slate-100 shadow-xl shadow-black/20 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onSearch}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Searching…" : "Search"}
        </button>

        <button
          onClick={onVoice}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {listening ? "Listening…" : "🎤 Speak"}
        </button>

        <button
          onClick={onClear}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-white/10"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;