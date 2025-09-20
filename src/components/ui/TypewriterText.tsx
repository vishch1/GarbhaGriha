import { useState, useEffect } from "react";

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 80,
  pauseTime = 1500,
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, typingSpeed);
    }

    // Move to next word
    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return <span className="bg-gradient-primary bg-clip-text text-transparent">{text}</span>;
};
