import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WordCard from "./components/WordCard";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  const fetchWord = async (searchTerm?: string) => {
    const query = (searchTerm ?? word).trim();
    if (!query) {
      setError("Type or say a word to search.");
      setData(null);
      return;
    }

    setError("");
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          query
        )}`
      );

      if (!res.ok) {
        throw new Error("Word not found");
      }

      const result = await res.json();
      setData(result[0]);
    } catch {
      setError("Sorry, that word was not found. Try another one.");
    } finally {
      setLoading(false);
    }
  };

  const startVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    setListening(true);
    setError("");

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript;
      setWord(spoken);
      fetchWord(spoken);
    };

    recognition.onerror = () => {
      setError("Voice input failed. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
        <div className="rounded-[24px] sm:rounded-[36px] border border-white/10 bg-slate-900/90 p-6 sm:p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4 text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-cyan-500/15 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-cyan-200 blur-none">
              Learn faster with voice search
            </span>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              🌈 Speak and Learn
            </h1>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300">
              Search words instantly by typing or speaking and get clear meanings, examples, and fast pronunciation.
            </p>
          </div>

          <SearchBar
            word={word}
            setWord={setWord}
            onSearch={() => fetchWord()}
            onVoice={startVoice}
            onClear={() => {
              setWord("");
              setData(null);
              setError("");
            }}
            loading={loading}
            listening={listening}
          />

          <div className="mt-4 sm:mt-5 min-h-[2rem] rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-4 sm:px-5 py-3 sm:py-4 text-center text-sm text-slate-300 shadow-inner shadow-white/5">
            {loading && <span>Loading meaning…</span>}
            {!loading && error && <span className="text-rose-300">{error}</span>}
            {!loading && !error && !data && (
              <span>Try typing a word or press 🎤 to speak it aloud.</span>
            )}
          </div>

          <WordCard data={data} setWord={setWord} />
        </div>
      </div>
    </div>
  );
}

export default App;