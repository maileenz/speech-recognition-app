import { useCallback, useEffect, useReducer, useRef } from "react";
import type { SpeechRecognitionState } from "./types";

const reducer = (
  state: SpeechRecognitionState,
  newState:
    | Partial<SpeechRecognitionState>
    | ((state: SpeechRecognitionState) => Partial<SpeechRecognitionState>),
) => ({
  ...state,
  ...(typeof newState === "function" ? newState(state) : newState),
});

export function useSpeechRecognition() {
  const [state, setState] = useReducer(reducer, {
    transcript: "",
    access: false,
    isListening: false,
    isBrowserSupported: false,
  });

  const { transcript, access, isListening, isBrowserSupported } = state;

  const recognitionRef = useRef<SpeechRecognition>();

  useEffect(() => {
    let runEffect = false;

    if (!runEffect)
      return () => {
        runEffect = true;
      };

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      return;
    }

    setState({ isBrowserSupported: true });

    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;

    recognitionInstance.onstart = () => setState({ isListening: true });

    recognitionInstance.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i]?.[0]?.transcript;
        if (event.results[i]?.isFinal) {
          finalTranscript += transcriptSegment;
        } else {
          setState((prevState) => ({
            ...prevState,
            transcript: prevState.transcript + transcriptSegment,
          }));
        }
      }
      setState((prevState) => ({
        ...prevState,
        transcript: prevState.transcript + finalTranscript,
      }));
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition error", event.error);
      setState({ isListening: false });
    };

    recognitionInstance.onend = () => setState({ isListening: false });

    // Save the recognition instance in the state
    recognitionRef.current = recognitionInstance;

    // Cleanup function to stop recognition on unmount
    return () => recognitionInstance.stop();
  }, []);

  const requestMicrophoneAccess = useCallback(async () => {
    try {
      if (access) return;
      await navigator.mediaDevices.getUserMedia({ audio: true });

      setState({ access: true });
    } catch {
      //
    }
  }, [access]);

  const listen = useCallback(async () => {
    await requestMicrophoneAccess();
    recognitionRef.current?.start();
  }, [requestMicrophoneAccess]);

  // Memoized function to stop listening
  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return {
    transcript,
    isListening,
    isBrowserSupported,
    requestMicrophoneAccess,
    listen,
    stop,
  };
}
