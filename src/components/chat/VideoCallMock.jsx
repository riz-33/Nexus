import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

export default function VideoCallMock() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const timerRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let stream;

    const startCall = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;

      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    };

    startCall();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      clearInterval(timerRef.current);
    };
  }, []);

  const toggleMic = () => {
    const stream = localVideoRef.current.srcObject;
    stream.getAudioTracks().forEach((t) => (t.enabled = !micOn));
    setMicOn(!micOn);
  };

  const toggleCam = () => {
    const stream = localVideoRef.current.srcObject;
    stream.getVideoTracks().forEach((t) => (t.enabled = !camOn));
    setCamOn(!camOn);
  };

  const endCall = () => {
    clearInterval(timerRef.current);
    navigate(`/chat/${userId}`);
  };

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="h-full bg-gray-50 border border-gray-200 rounded-lg  overflow-hidden  flex flex-col">
      {/* Video Area */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-black"
        />

        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="absolute bottom-4 right-4 w-40 h-28 object-cover rounded-lg border"
        />

        {/* Call Timer */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
          {formatTime()}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 bg-gray-800 p-4 ">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full ${micOn ? "bg-gray-700" : "bg-red-600"}`}
        >
          {micOn ? (
            <Mic className="text-white" />
          ) : (
            <MicOff className="text-white" />
          )}
        </button>

        <button
          onClick={toggleCam}
          className={`p-3 rounded-full ${camOn ? "bg-gray-700" : "bg-red-600"}`}
        >
          {camOn ? (
            <Video className="text-white" />
          ) : (
            <VideoOff className="text-white" />
          )}
        </button>

        <button onClick={endCall} className="p-3 rounded-full bg-red-700">
          <PhoneOff className="text-white" />
        </button>
      </div>
    </div>
  );
}
