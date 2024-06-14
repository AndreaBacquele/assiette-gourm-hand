import React, { useState } from "react";
import CustomFormInput from "../components/InputForm";
import { IonButton } from "@ionic/react";
import axios from "axios";

export default function Login() {
  const [nom, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const configuration = {
    method: "post",
    url: "http://localhost:4000/login-jury",
    data: {
      nom,
      mdp,
    },
  };

  const handleSubmit = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    axios(configuration)
      .then((result) => {
        alert("Vous êtes bien identifié");
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
