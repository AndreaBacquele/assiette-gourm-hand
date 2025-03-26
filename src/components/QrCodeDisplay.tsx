import React, { useEffect, useState } from "react";
import { generateQRCode } from "../utils/qrCode";

const QrCodeDisplay = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const qr = await generateQRCode();
        setQrCode(qr);
      } catch (error) {
        console.error("Erreur de génération du QR Code", error);
      }
    };

    fetchQrCode();
  }, []);

  return (
    <>
      <div>
        <h2>Scannez ce QR Code pour vous connecter</h2>
        {qrCode && <img src={qrCode} alt="QR Code de connexion" />}
      </div>
    </>
  );
};

export default QrCodeDisplay;
