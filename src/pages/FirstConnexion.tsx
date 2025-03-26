/* eslint-disable react/no-unescaped-entities */
import {
  IonContent,
  IonButton,
  IonRadioGroup,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import type { RadioGroupCustomEvent } from "@ionic/react";

import CustomFormInput from "../components/InputForm";
import RadioOption from "../components/RadioOption";
import Alert from "../components/Alert";
import "../theme/globalCSS.css";

function FirstConnexion() {
  //Récupére les valeurs mise dans les inputs
  const [jurySurname, setJurySurname] = useState("");
  const [juryName, setJuryName] = useState("");
  const [juryType, setJuryType] = useState("");
  const [register, setRegister] = useState(false);

  const handleButtonClick = () => {
    console.log(juryName, jurySurname);
  };

  return (
    <>
      <IonContent>
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
        <div id="title">
          <span>Inscription des jurys</span>
        </div>
        <br></br>
        {/* Mise en place du formulaire */}
        <div id="instructions">
          <p>
            Merci de compléter les informations ci-dessous afin d'avoir accés à
            la liste des candidats et aux grilles d'évaluation
          </p>
        </div>
        <form onSubmit={handleButtonClick}>
          <div id="input-text">
            <CustomFormInput
              initial={juryName}
              onIonInput={setJuryName}
              label="NOM du jury"
              placeholder="NOM"
            ></CustomFormInput>
          </div>
          <div id="input-text">
            <CustomFormInput
              initial={jurySurname}
              onIonInput={setJurySurname}
              label="Prénom du jury"
              placeholder="Prénom"
            ></CustomFormInput>
          </div>

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
              <IonRow style={{ width: "150px" }}>
                <RadioOption label="Dégustation" value="Dégustation" />
              </IonRow>

              <IonRow style={{ width: "150px" }}>
                <RadioOption label="Technique" value="Technique" />
              </IonRow>
            </IonRadioGroup>
          </IonGrid>
          <h6 id="instructions">
            Toute validation est définitive, merci de bien vérifier les
            informations saisies avant de continuer.
          </h6>
          <br />
          <div className="ion-text-center">
            <IonButton
              disabled={juryType == ""}
              type="submit"
              style={{ width: "50%" }}
              color="warning"
            >
              Valider
            </IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
}

export default FirstConnexion;
