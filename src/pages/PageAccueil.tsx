import {
  IonContent,
  IonButton,
  IonPage,
  IonRadioGroup,
  IonRow,
  IonGrid,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import type { RadioGroupCustomEvent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import CustomFormInput from "../components/InputForm";
import RadioOption from "../components/RadioOption";
import Alert from "../components/Alert";
import "../theme/globalCSS.css";

function Accueil() {
  //Récupére les valeurs mise dans les inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [completeName, setCompleteName] = useState("");
  const [juryNumber, setJuryNumber] = useState("");
  const [juryType, setJuryType] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const url = "http://127.0.0.1:4000/notes_criteria";

    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <IonPage className="backgroundColor">
        <IonContent
          style={{
            width: "40%",
            display: "flex",
            left: "25%",
          }}
        >
          <Alert
            message="Vous avez été rédirigé vers la liste des candidats"
            showAlert={register}
            setShowAlert={setRegister}
          ></Alert>
          <img
            className="logo-accueil"
            src="/logo.jpg"
            alt="Logo du concours"
          ></img>
          <div className="header-footer">
            <p style={{ textAlign: "center" }}>19ème édition</p>
            <p style={{ textAlign: "center" }}>Samedi 12 octobre 2024</p>
          </div>
          <div id="title">
            <span>Inscription des jurys</span>
          </div>
          <br></br>
          {/* Mise en place du formulaire */}
          <div id="instructions">
            <p>
              Merci de compléter les informations ci-dessous afin d'avoir accés
              à la liste des candidats et aux grilles d'évaluation
            </p>
          </div>
          {/* <form onSubmit={handleSubmit}> */}
          <CustomFormInput
            inputType="email"
            initial={juryNumber}
            onIonInput={setJuryNumber}
            placeholder="E-mail"
          ></CustomFormInput>
          <CustomFormInput
            initial={completeName}
            onIonInput={setCompleteName}
            placeholder="Prénom NOM"
          ></CustomFormInput>
          <CustomFormInput
            inputType="password"
            initial={password}
            onIonInput={setPassword}
            placeholder="Mot de passe"
          ></CustomFormInput>

          {/* Gestion des toogles pour le choix de jury */}
          <div id="instructions">
            <span>Sélectionnez votre type de jury:</span>
          </div>
          <IonGrid>
            <IonRadioGroup
              value={juryType}
              style={{ display: "flex", justifyContent: "center" }}
              onIonChange={(ev: RadioGroupCustomEvent) => {
                setJuryType(ev.detail.value);
              }}
            >
              <IonRow>
                <RadioOption label="Dégustation" value={2} />
              </IonRow>
              <IonRow>
                <RadioOption label="Technique" value={1} />
              </IonRow>
            </IonRadioGroup>
          </IonGrid>

          <h6>
            Toute validation est définitive, merci de bien vérifier les
            informations saisies avant de continuer.
          </h6>
          <br />
          <div className="ion-text-center">
            <IonButton
              disabled={juryType == ""}
              type="submit"
              style={{ width: "75%" }}
              color="warning"
            >
              Valider
            </IonButton>
          </div>
          {/* </form> */}
        </IonContent>
      </IonPage>
    </>
  );
}

export default Accueil;
