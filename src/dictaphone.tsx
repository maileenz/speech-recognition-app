"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <Button onPress={() => SpeechRecognition.startListening()}>Start</Button>
      <Button onPress={() => SpeechRecognition.stopListening()}>Stop</Button>
      <Button onPress={resetTranscript}>Reset</Button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;
