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
      className="bg-purple-400 text-white px-4 py-2 rounded-xl shadow hover:scale-105"
    >
      🔊 Listen
    </button>
  );
};

export default SpeakButton;