import {
  IonContent,
  IonButton,
  IonRadioGroup,
  IonGrid,
  IonRow,
  IonPage,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import type { RadioGroupCustomEvent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import CustomFormInput from "../components/InputForm";
import RadioOption from "../components/RadioOption";
import Alert from "../components/Alert";
import "../theme/globalCSS.css";

function Accueil() {
  const { store } = useStorage();

  //Récupére les valeurs mise dans les inputs
  const [completeName, setCompleteName] = useState("");
  const [juryNumber, setJuryNumber] = useState("");
  const [juryType, setJuryType] = useState("");
  const [register, setRegister] = useState(false);

  const history = useHistory();

  //Permet de rediriger la page quand on clique sur le bouton ainsi que stocker les données rentrées
  const handleButtonClick = () => {
    if (store) {
      store.set("jury", { completeName, juryNumber, juryType });
      store.set("notes", {});
    }
    if (juryType == "Dégustation") {
      history.push("/listingdegustation");
    } else {
      history.push("/listingtechnique");
    }
  };

  // Permet de vérifier si la personne a déja enregistré des notes ou non.
  useEffect(() => {
    const isJuryRegister = () => {
      if (store) {
        store.get("jury").then(function (response: any) {
          console.log(response);
          if (response != null) {
            setRegister(true);
            if (response.juryType == "Dégustation") {
              history.push("/listingdegustation");
            } else {
              history.push("/listingtechnique");
            }
          }
        });
      }
    };
    isJuryRegister();
  }, [store]);

  return (
    <>
      <IonPage>
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
          <div className="header-footer">
            <p style={{ textAlign: "center" }}>20ème édition</p>
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
          <form onSubmit={handleButtonClick}>
            <CustomFormInput
              inputType="number"
              initial={juryNumber}
              onIonInput={setJuryNumber}
              placeholder="Numéro de jury"
            ></CustomFormInput>
            <CustomFormInput
              initial={completeName}
              onIonInput={setCompleteName}
              placeholder="Prénom NOM"
            ></CustomFormInput>

            {/* Gestion des toogles pour le choix de jury */}
            <div id="instructions">
              <span>Sélectionnez votre type de jury:</span>
            </div>
            <div id="radio">
              <IonGrid>
                <IonRadioGroup
                  value={juryType}
                  style={{ display: "flex", justifyContent: "center" }}
                  onIonChange={(ev: RadioGroupCustomEvent) => {
                    setJuryType(ev.detail.value);
                  }}
                >
                  <IonRow style={{ width: "143px" }}>
                    <RadioOption label="Dégustation" value="Dégustation" />
                  </IonRow>

                  <IonRow style={{ width: "143px" }}>
                    <RadioOption label="Technique" value="Technique" />
                  </IonRow>
                </IonRadioGroup>
              </IonGrid>
            </div>
            <h6>
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
      </IonPage>
    </>
  );
}

export default Accueil;
