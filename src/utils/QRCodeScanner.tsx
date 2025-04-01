import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLoading,
  IonToast,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { closeCircle, camera, cameraReverse } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const QRScannerPage: React.FC = () => {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  const history = useHistory();

  // Gérer le résultat du scan
  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    // Prendre le premier code détecté
    const detectedCode = detectedCodes[0];
    if (!detectedCode) {
      console.error("Aucun QR code détecté");
      return;
    }

    try {
      setLoading(true);
      setShowScanner(false);

      // Utiliser la valeur brute du QR code
      const qrToken = detectedCode.rawValue;
      console.log("QR Code scanné:", qrToken);

      // Votre logique existante pour vérifier le token dans Supabase
      const { data, error } = await supabase
        .from("jury_sessions")
        .select("id, is_registered, jury_type")
        .eq("token", qrToken)
        .single();

      if (error || !data) {
        console.error("Erreur ou QR code non valide:", error);
        setErrorMessage("QR code non valide ou expiré");
        setShowError(true);
        setLoading(false);
        return;
      }

      // ... reste de votre logique d'authentification ...
    } catch (error) {
      console.error("Erreur lors du traitement du QR code:", error);
      setErrorMessage(
        "Une erreur s'est produite lors du traitement du QR code"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  // Gérer les erreurs de scan
  const handleError = (error: any) => {
    console.error("Erreur du scanner:", error);
    setErrorMessage(
      "Erreur d'accès à la caméra. Veuillez vérifier les permissions."
    );
    setShowError(true);
  };

  // Basculer entre caméra avant et arrière
  const toggleCamera = () => {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Scanner le QR Code du jury</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {!showScanner ? (
          <div className="scanner-container">
            <div className="scanner-instructions">
              <h2>Instructions</h2>
              <p>Scannez le QR code pour accéder à votre espace jury</p>
              <p>
                Assurez-vous que le QR code est bien visible et dans le cadre
              </p>
            </div>

            <IonButton
              expand="block"
              onClick={() => setShowScanner(true)}
              className="start-scan-button"
            >
              <IonIcon icon={camera} slot="start" />
              Démarrer le scan
            </IonButton>
          </div>
        ) : (
          <div className="scanner-view">
            <Scanner
              onScan={handleScan}
              onError={handleError}
              scanDelay={1000}
              constraints={{
                facingMode: facingMode,
              }}
              styles={{
                container: {
                  width: "100%",
                  height: "100%",
                },
              }}
            />

            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => setShowScanner(false)}>
                <IonIcon icon={closeCircle} />
              </IonFabButton>
            </IonFab>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={toggleCamera}>
                <IonIcon icon={cameraReverse} />
              </IonFabButton>
            </IonFab>
          </div>
        )}

        <IonLoading isOpen={loading} message="Vérification du QR code..." />

        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          message={errorMessage}
          duration={3000}
          position="top"
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default QRScannerPage;
