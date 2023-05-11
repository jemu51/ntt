/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable tailwindcss/no-custom-classname */
import { useRef } from "react";

import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const webcamButtonRef = useRef<any>();
  const webcamVideoRef = useRef<any>();
  const hangupButtonRef = useRef<any>();
  const videoDownloadRef = useRef<any>();

  const videoUrl = null;

  const recordedChunks: Blob[] = [];

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  console.log("servers", servers);
  const options = { mimeType: "video/webm; codecs=vp9" };
  let mediaRecorder: MediaRecorder | null = null;
  let localStream: MediaStream | null = null;

  const webCamHandler = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    webcamVideoRef.current.srcObject = localStream;
    mediaRecorder = new MediaRecorder(localStream, options);
    mediaRecorder.ondataavailable = (event: { data: Blob }) => {
      console.log("data-available");
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        console.log(recordedChunks);
      }
    };
    mediaRecorder.start();
  };

  const hangupHandler = () => {
    console.log("Hanging up the call ...");
    if (localStream) localStream.getTracks().forEach((track) => track.stop());
    if (mediaRecorder)
      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, {
          type: "video/webm",
        });

        videoDownloadRef.current.href = URL.createObjectURL(blob);
        videoDownloadRef.current.download = `${new Date().getTime()}-locastream.webm`;
      };
    console.log(videoDownloadRef);
  };

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <Meta title="Live Cam" description="Live Cam Web Application." />
      <div className="mx-auto min-h-screen max-w-screen-md">
        <div className="h-full">
          <div className="pb-8 pt-16">
            <div className="flex space-x-2">
              <div className="flex items-center justify-center">
                <img
                  className="h-4/6"
                  src={`/favicon-32x32.png`}
                  alt="Live Cam Web Application"
                />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {AppConfig.title}
              </div>
            </div>
            <div className="text-xl">{AppConfig.description}</div>
          </div>
          <div>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6 border-b border-gray-300">
                <button
                  onClick={webCamHandler}
                  ref={webcamButtonRef}
                  type="button"
                  // eslint-disable-next-line tailwindcss/no-custom-classname
                  className="align-center flex rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                >
                  Start webcam
                </button>
              </li>
              <li className="mr-6 border-b border-gray-300">
                <button
                  className="align-center flex rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  onClick={hangupHandler}
                  ref={hangupButtonRef}
                >
                  Hangup
                </button>
              </li>
              <li className="mr-6 border-b border-gray-300">
                <a
                  className="align-center flex rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  ref={videoDownloadRef}
                  href={videoUrl!}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="download"
                    className="mr-2 w-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  Download session video
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="content py-5 text-xl">
          <div className="h-full">
            <div className="flex justify-items-start">
              <div className="videos">
                <span>
                  <h1 id="subtitle">Local Stream</h1>
                  <video
                    className="webcamVideo"
                    ref={webcamVideoRef}
                    autoPlay
                    playsInline
                  ></video>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{" "}
          <a data-testid="githubLink" href="https://github.com/jemu51/ntt">
            NTT
          </a>
          .
        </div>
      </div>
    </div>
  );
};
export default Index;
