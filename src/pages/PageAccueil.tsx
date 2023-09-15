import {
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
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

function Accueil() {
  const { store } = useStorage();

  //Récupére les valeurs mise dans les inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [juryType, setJuryType] = useState("overlay");

  const history = useHistory();

  //Permet de rediriger la page quand on clique sur le bouton ainsi que stocker les données rentrées
  const handleButtonClick = () => {
    if (store) {
      store.set("jury", { lastName, firstName, juryType });
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
      <IonContent className="ion-padding">
        {/* Permet d'afficher les éléments de la toolbar */}
        <IonHeader color="light">
          <IonToolbar>
            <IonImg
              className="logo"
              src="../images/logo.jpg"
              alt="Logo du concours"
            ></IonImg>
            <IonTitle> Page d'accueil</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Mise en place du formulaire */}
        <h6>
          {" "}
          Merci de compléter les informations ci-dessous afin d'avoir accés à la
          liste des candidats et aux grilles d'évaluation
        </h6>
        <IonItem>
          <CustomFormInput
            initial={lastName}
            onInputChange={setLastName}
            label="Nom"
            placeholder="Champ à remplir"
          ></CustomFormInput>
        </IonItem>
        <IonItem>
          <CustomFormInput
            initial={firstName}
            onInputChange={setFirstName}
            label="Prénom"
            placeholder="Champ à remplir"
          ></CustomFormInput>
        </IonItem>
        {/* Gestion des toogles pour le choix de jury */}
        <h2>Vous êtes jury:</h2>
        <IonRadioGroup
          value={juryType}
          onIonChange={(ev: RadioGroupCustomEvent) => {
            setJuryType(ev.detail.value);
          }}
        >
          <RadioOption label="Dégustation" value="degustation" />
          <RadioOption label="Technique" value="technique" />
        </IonRadioGroup>
        <br />
        <div className="ion-text-center">
          <IonButton color="success" onClick={handleButtonClick}>
            Validez
          </IonButton>
        </div>
      </IonContent>
    </>
  );
}

export default Accueil;
