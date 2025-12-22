import React, { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  AlertTriangle,
} from "lucide-react";

export default function VideoCallMock() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initMedia = async () => {
      // Guard for unsupported or restricted environments (sandboxes, iframes, http)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Media devices are not supported in this environment.");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // UI-only mock: reuse the same stream as a fake remote preview
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
        setError(
          "Camera or microphone permission denied. This is expected in sandboxed or non-HTTPS environments."
        );
      }
    };

    initMedia();

    return () => {
      // Cleanup tracks on unmount
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const toggleMic = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => (t.enabled = !micOn));
    setMicOn((v) => !v);
  };

  const toggleCam = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (!stream) return;
    stream.getVideoTracks().forEach((t) => (t.enabled = !camOn));
    setCamOn((v) => !v);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-between p-4">
      {/* Video Area */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center">
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full rounded-2xl bg-black object-cover"
        />

        {/* Local Video */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="absolute bottom-4 right-4 w-48 h-32 rounded-xl border border-white object-cover"
        />

        {/* Permission / Environment Error Overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl text-center p-6">
            <div className="max-w-md text-gray-200">
              <AlertTriangle
                className="mx-auto mb-3 text-yellow-400"
                size={32}
              />
              <p className="text-sm leading-relaxed">{error}</p>
              <p className="mt-2 text-xs text-gray-400">
                Tip: Run on <strong>https://localhost</strong> or a real browser
                tab and allow permissions.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4 bg-gray-800 px-6 py-4 rounded-2xl mt-4">
        <button
          onClick={toggleMic}
          disabled={!!error}
          className={`p-3 rounded-full ${
            micOn ? "bg-gray-700" : "bg-red-600"
          } disabled:opacity-50`}
        >
          {micOn ? (
            <Mic className="text-white" />
          ) : (
            <MicOff className="text-white" />
          )}
        </button>

        <button
          onClick={toggleCam}
          disabled={!!error}
          className={`p-3 rounded-full ${
            camOn ? "bg-gray-700" : "bg-red-600"
          } disabled:opacity-50`}
        >
          {camOn ? (
            <Video className="text-white" />
          ) : (
            <VideoOff className="text-white" />
          )}
        </button>

        <button className="p-3 rounded-full bg-red-700">
          <PhoneOff className="text-white" />
        </button>
      </div>
    </div>
  );
}
