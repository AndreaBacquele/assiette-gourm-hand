import React, { useState } from "react";
import { QrReader } from "react-qr-scanner";
import { supabase } from "../supabase/supabaseClient";
import { useHistory } from "react-router-dom";

// Types de jury
type JuryType = "technique" | "degustation";

const QRCodeScanner: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  // Gérer le scan du QR code
  const handleScan = async (data: any) => {
    if (data) {
      try {
        // Rechercher le jury avec ce token
        const { data: juryData, error } = await supabase
          .from("jury_sessions")
          .select("*")
          .eq("token", data.text)
          .single();

        if (error) throw error;

        if (!juryData) {
          setError("QR Code invalide");
          return;
        }

        // Vérifier si c'est la première connexion
        if (!juryData.is_initialized) {
          // Rediriger vers le formulaire de première connexion
          history.push(`/firstconnexion/${juryData.id}`);
        } else {
          // Rediriger vers la page d'évaluation selon le type de jury
          const redirectPath = getRedirectPath(juryData.jury_type, juryData.id);
          history.push(redirectPath);
        }
      } catch (err) {
        setError("Erreur lors de la vérification du QR Code");
        console.error(err);
      }
    }
  };

  // Fonction de redirection basée sur le type de jury
  const getRedirectPath = (type: JuryType, id: string) => {
    switch (type) {
      case "technique":
        return `/listingtechnique/${id}`;
      case "degustation":
        return `/degustation/${id}`;
      default:
        return "/evaluation/general";
    }
  };

  // Gérer les erreurs de scan
  const handleError = (err: any) => {
    console.error(err);
    setError("Erreur de scan du QR Code");
  };

  return (
    <div>
      <h2>Scanner le QR Code du Jury</h2>

      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default QRCodeScanner;
