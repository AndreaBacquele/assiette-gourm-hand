import React, { useState } from "react";
import CustomFormInput from "../components/InputForm";
import { IonButton } from "@ionic/react";
import axios from "axios";

export default function Register() {
  const [nom, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  // TODO : voir les paramétres à mettre (nom / numéro de table / mot de passe / email ? )

  const configuration = {
    method: "post",
    url: "http://localhost:4000/add-to-jury",
    data: {
      nom,
      // mdp,
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
