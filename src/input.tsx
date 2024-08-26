"use client";

import { useCallback, type ComponentProps } from "react";
import { Button } from "./button";
import { useSpeechRecognition } from "./packages/use-speech-recognition";

export const Input = (props: ComponentProps<"input">) => {
  const { transcript, isListening, listen, stop } = useSpeechRecognition();

  const handlePress = useCallback(() => {
    //
  }, []);

  return (
    <div className="flex gap-x-2">
      <input {...props} value={transcript} />
      <Button onClick={handlePress}>Record</Button>
    </div>
  );
};
