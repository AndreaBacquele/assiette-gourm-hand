import { supabase } from "../supabase/supabaseClient";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { jsPDF } from "jspdf";

const QRCodeGenerator: React.FC = () => {
  const [generatedQRCodes, setGeneratedQRCodes] = useState<
    { id: string; qrToken: string }[]
  >([]);

  // Générer des QR codes pour les jurys
  const generateJuryQRCodes = async (numberOfJurors: number = 1) => {
    const newQRCodes = [];

    for (let i = 0; i < numberOfJurors; i++) {
      // Générer un token unique
      const token = uuidv4();

      // Insérer dans Supabase
      const { data, error } = await supabase
        .from("jury_sessions")
        .insert({
          token: token,
          is_registered: false,
          first_name: null,
          last_name: null,
          jury_type: null,
        })
        .select();

      if (error) {
        console.error(`Erreur lors de la création du jury ${i + 1}:`, error);
        continue;
      }

      newQRCodes.push({
        id: data[0].id,
        qrToken: token,
      });
    }

    setGeneratedQRCodes(newQRCodes);
  };

  // Exporter les QR codes en PDF
  const exportQRCodesToPDF = () => {
    const doc = new jsPDF();

    generatedQRCodes.forEach((code, index) => {
      const canvas = document.getElementById(
        `qr-${code.id}`
      ) as HTMLCanvasElement;
      const imgData = canvas.toDataURL("image/png");

      // Calculer la position (4 QR codes par page)
      const x = (index % 2) * 100 + 20;
      const y = Math.floor(index / 2) * 100 + 20;

      doc.addImage(imgData, "PNG", x, y, 50, 50);

      // Ajouter un numéro de jury
      doc.setFontSize(10);
      doc.text(`Jury #${index + 1}`, x + 10, y + 60);
    });

    doc.save("jury-qr-codes.pdf");
  };
  return (
    <div>
      <div>
        <button onClick={() => generateJuryQRCodes(1)}>
          Générer 1 QR Code
        </button>
        <br />
        <button onClick={() => generateJuryQRCodes(5)}>
          Générer 5 QR Codes
        </button>
        <br />
        <button onClick={() => generateJuryQRCodes(30)}>
          Générer 30 QR Codes
        </button>
      </div>

      {generatedQRCodes.length > 0 && (
        <div>
          <button onClick={exportQRCodesToPDF}>
            Exporter les QR Codes en PDF
          </button>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {generatedQRCodes.map((code, index) => (
              <div
                key={code.id}
                style={{ margin: "10px", textAlign: "center" }}
              >
                <QRCodeCanvas
                  id={`qr-${code.id}`}
                  value={code.qrToken}
                  size={128}
                />
                <p>Jury #{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
