import {
  IonHeader,
  IonContent,
  IonImg,
  IonButton,
  IonRadioGroup,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import type { RadioGroupCustomEvent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import CustomFormInput from "../components/InputForm";
import RadioOption from "../components/RadioOption";
import "../theme/globalCSS.css";

function Accueil() {
  const { store } = useStorage();

  //Récupére les valeurs mise dans les inputs
  const [completeName, setCompleteName] = useState("");
  const [juryTable, setJuryTable] = useState("");
  const [juryType, setJuryType] = useState("overlay");

  const history = useHistory();

  //Permet de rediriger la page quand on clique sur le bouton ainsi que stocker les données rentrées
  const handleButtonClick = () => {
    if (store) {
      store.set("jury", { completeName, juryTable, juryType });
      store.set("notes", {});
    }
    if (juryType == "degustation") {
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
            alert("Vous allez être redirigé vers le listing des candidats");
            if (response.juryType == "degustation") {
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
      <IonContent>
        <IonImg
          className="logo"
          src="../images/logo.jpg"
          alt="Logo du concours"
        ></IonImg>
        <div id="header">
          <p>19ème édition</p>
          <p>Samedi 14 octobre 2023</p>
        </div>
        <div id="title">
          <p>Inscription des jurys</p>
        </div>
        <br></br>
        {/* Mise en place du formulaire */}
        <div id="instructions">
          <p>
            {" "}
            Merci de compléter les informations ci-dessous afin d'avoir accés à
            la liste des candidats et aux grilles d'évaluation
          </p>
        </div>
        <CustomFormInput
          initial={juryTable}
          onInputChange={setJuryTable}
          placeholder="Numéro de table"
        ></CustomFormInput>
        <CustomFormInput
          initial={completeName}
          onInputChange={setCompleteName}
          placeholder="Prénom NOM"
        ></CustomFormInput>
        <br></br>
        {/* Gestion des toogles pour le choix de jury */}
        <div id="instructions">
          <p>Sélectionnez votre type de jury:</p>
        </div>
        <IonRadioGroup
          value={juryType}
          onIonChange={(ev: RadioGroupCustomEvent) => {
            setJuryType(ev.detail.value);
          }}
        >
          <RadioOption label="Dégustation" value="degustation" />
          <RadioOption label="Technique" value="technique" />
        </IonRadioGroup>

        <h6>
          Toute validation est définitive, merci de bien vérifier les
          informations saisies avant de continuer.
        </h6>
        <br />
        <div className="ion-text-center">
          <IonButton expand="block" color="warning" onClick={handleButtonClick}>
            Valider
          </IonButton>
        </div>
      </IonContent>
    </>
  );
}

export default Accueil;
