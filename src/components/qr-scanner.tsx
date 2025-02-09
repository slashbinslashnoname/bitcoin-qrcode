'use client';

import React, { useRef, useState, useEffect } from 'react';
import jsqr from 'jsqr';

function QrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erreur d'accès à la caméra : ", error);
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    const scanQrCode = () => {
      if (videoRef.current && !videoRef.current.paused && videoRef.current.readyState === 4) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsqr(imageData.data, imageData.width, imageData.height);

        if (code) {
          setScanResult(code.data);
          video.pause(); // Mettre en pause la vidéo après la lecture du QR code
        } else {
          requestAnimationFrame(scanQrCode); // Continuer à scanner si aucun QR code n'est détecté
        }
      } else {
        requestAnimationFrame(scanQrCode); // Réessayer si la vidéo n'est pas prête
      }
    };

    requestAnimationFrame(scanQrCode);
  }, []);


  return (
    <div className="flex flex-col items-center justify-center">
      <video ref={videoRef} className="hidden" autoPlay playsInline muted />
      <canvas ref={canvasRef} className="w-full max-w-md" style={{ maxWidth: '80vw' }} />
      {scanResult && (
        <div className="mt-4 p-4 bg-white text-black rounded-md shadow-md">
          Scan result: <p className="font-bold break-all">{scanResult}</p>
        </div>
      )}
       {!scanResult && (
        <div className="mt-4 p-4 text-white">
          Scan a QR code...
        </div>
      )}
    </div>
  );
}

export default QrScanner; 