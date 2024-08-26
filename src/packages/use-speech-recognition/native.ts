export const NativeSpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export const isNative = (SpeechRecognition: unknown) =>
  SpeechRecognition === NativeSpeechRecognition;
