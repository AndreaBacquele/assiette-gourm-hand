import React, { useState } from "react";
import CustomFormInput from "../components/InputForm";
import {
  IonButton,
  IonGrid,
  IonRadioGroup,
  IonRow,
  RadioGroupCustomEvent,
} from "@ionic/react";
import axios from "axios";
import RadioOption from "../components/RadioOption";

export default function Register() {
  const [nom, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [type_epreuve_id, setJuryType] = useState();
  const [register, setRegister] = useState(false);

  // TODO : voir les paramétres à mettre (nom / numéro de table / mot de passe / email ? )

  const configuration = {
    method: "post",
    url: "http://localhost:4000/add-to-jury",
    data: {
      nom,
      mdp,
      type_epreuve_id,
    },
  };

  const handleSubmit = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    alert("Submited");
    axios(configuration)
      .then((result) => {
        setRegister(true);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CustomFormInput
        inputType="email"
        initial={nom}
        onIonInput={setEmail}
        placeholder="E-mail"
      ></CustomFormInput>
      <CustomFormInput
        inputType="password"
        initial={mdp}
        onIonInput={setPassword}
        placeholder="Mot de passe"
      ></CustomFormInput>
      <IonGrid>
        <IonRadioGroup
          value={type_epreuve_id}
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
      <IonButton
        type="submit"
        style={{ width: "75%" }}
        color="warning"
        onClick={handleSubmit}
      >
        Valider
      </IonButton>
    </>
  );
}
