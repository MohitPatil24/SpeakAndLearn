const SpeakButton = ({
  word,
  onSpeak,
}: {
  word: string;
  onSpeak?: (newWord: string) => void;
}) => {
  const speak = () => {
    if (onSpeak) {
      onSpeak(word);
    }

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 min-h-[44px] touch-manipulation"
    >
      🔊 Listen
    </button>
  );
};

export default SpeakButton;