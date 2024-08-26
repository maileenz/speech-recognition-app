"use client";

import { useCallback, type ComponentProps } from "react";
import { useSpeechRecognition } from "./packages/use-speech-recognition";
import { RecordIcon } from "./icons/record";
import { Button } from "@nextui-org/button";

export const Input = (props: ComponentProps<"input">) => {
  const { transcript, isListening, isBrowserSupported, listen, stop } =
    useSpeechRecognition();

  const handlePress = useCallback(async () => {
    if (isListening) stop();
    else await listen();
  }, [isListening, listen, stop]);

  return (
    <div className="flex flex-col">
      <span>
        {JSON.stringify(
          { transcript, isListening, isBrowserSupported },
          undefined,
          2,
        )}
      </span>
      <div className="flex gap-x-2">
        <input
          {...props}
          value={transcript}
          className="rounded-full"
          readOnly
        />
        <Button onPress={handlePress}>
          <RecordIcon className="size-8" /> {isListening ? "listening" : null}
        </Button>
      </div>
    </div>
  );
};
