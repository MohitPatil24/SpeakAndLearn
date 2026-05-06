import SpeakButton from "./SpeakButton";

const WordCard = ({ data, setWord }: any) => {
  if (!data) return null;

  const primaryMeaning = data.meanings?.[0];
  const primaryDefinition = primaryMeaning?.definitions?.[0];

  return (
    <div className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 text-left text-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300/80">
            New word
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            {data.word}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
              {primaryMeaning?.partOfSpeech || "Word"}
            </span>
            {data.phonetics?.[0]?.text && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                {data.phonetics[0].text}
              </span>
            )}
          </div>
        </div>

        <SpeakButton word={data.word} onSpeak={setWord} />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-3xl bg-white/5 p-5 shadow-inner shadow-white/5">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Meaning
          </div>
          <p className="text-slate-200 leading-relaxed">
            {primaryDefinition?.definition || "No definition available."}
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 p-5 shadow-inner shadow-white/5">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Example
          </div>
          <p className="text-slate-200 leading-relaxed">
            {primaryDefinition?.example || "No example available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
