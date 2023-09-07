import React, { useEffect, useState } from "react";
import {
  IonItem,
  IonList,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import "./ListeCandidatDegustation.css";
import { useHistory } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import axios from "axios";
// import { url } from "inspector";

function ListeCandidatDegustation() {
  // Gére la récupération des données + permet l'affichage de celles-ci en dessous
  const { store } = useStorage();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [notes, setNotes] = useState<Record<string, Note>>({});

  // Spécifie la structure attendu pour l'objet notes
  interface Note {
    presentation: string;
    cuissonPrincipale: string;
    cuissonGarniture: string;
    accordGlobal: string;
    total: string;
  }

  // Connexion entre le spreadsheet / l'API REST Google / l'application
  const handleSubmitNotes = (e: any) => {
    e.preventDefault();

    const objt = { notes, lastName };
    console.log(objt);
    // console.log(process.env);
    console.log(import.meta.env.VITE_REACT_APP_SHEET_BEST_API);

    const url: string | undefined = import.meta.env
      .VITE_REACT_APP_SHEET_BEST_API;

    if (url) {
      axios.post(url, objt).then((response) => {
        console.log(response);
      });
    } else {
      console.error("URL is undefined");
    }
  };

  // Permet de récuperer puis d'afficher le nom du jury en haut du listing des candidats
  const picklastNamefirstName = async () => {
    if (store) {
      const name = await store.get("jury");
      const lastName = name?.lastName;
      const firstName = name?.firstName;
      setLastName(lastName);
      setFirstName(firstName);
    }
  };
  useEffect(() => {
    picklastNamefirstName();
  }, [store]);

  const history = useHistory();

  // Redirige la page lorsque l'on clique sur le bouton Candidat: Créer une url avec le numéro du candidat qui nous sert à stocker les données dans la bon candidat

  const handleButtonClick = (candidate: number) => {
    history.push("/evaldegustation/" + candidate);
  };

  // Récupération des notes dans la base de données
  const loadNotes = async () => {
    if (store) {
      const notes = await store.get("notes");
      setNotes(notes || {});
    }
  };

  useEffect(() => {
    loadNotes();
  }, [store]);

  // Boucle qui permet d'afficher le bon nombre de candidats sur le dashboard
  const nb_candidates = 20;
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (v, k) => k + start);

  const candidates = range(1, nb_candidates).map((nb) => {
    const presentation = (notes && notes["candidat" + nb]?.presentation) ?? "";
    const cuissonGarniture =
      (notes && notes["candidat" + nb]?.cuissonGarniture) ?? "";
    const cuissonPrincipale =
      (notes && notes["candidat" + nb]?.cuissonPrincipale) ?? "";
    const accordGlobal = (notes && notes["candidat" + nb]?.accordGlobal) ?? "";
    const total = (notes && notes["candidat" + nb]?.total) ?? "";
    return (
      <IonRow>
        <IonCol>
          <IonButton
            color="warning"
            onClick={() => handleButtonClick(nb)}
            expand="full"
          >
            {" "}
            Candidat n°{nb}
          </IonButton>
        </IonCol>
        <IonCol> {presentation} </IonCol>
        <IonCol>{cuissonPrincipale} </IonCol>
        <IonCol>{cuissonGarniture}</IonCol>
        <IonCol>{accordGlobal}</IonCol>
        <IonCol>{total}</IonCol>
      </IonRow>
    );
  });

  return (
    <>
      <IonContent>
        <IonHeader color="light">
          <IonToolbar>
            <IonItem>
              <img alt="Logo du concours" src="../images/logo.jpg" />
              <IonTitle> Liste des candidats - Jury dégustation</IonTitle>
              {/* <span><p>Pour avoir accés à la fiche du candidat, merci de cliquer sur le numéro</p></span> */}
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonTitle>
            <p>
              {" "}
              Jury {firstName} {lastName}{" "}
            </p>
          </IonTitle>
        </IonItem>
        <IonButton onClick={handleSubmitNotes}>Envoi des notes</IonButton>
        <p>
          Une connexion internet est nécessaire afin de valider l'envoi des
          notes
        </p>

        <IonList lines="full">
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>Note de présentation</IonCol>
              <IonCol>Note cuisson principale</IonCol>
              <IonCol>Note cuisson garniture</IonCol>
              <IonCol>Note accord global plat</IonCol>
              <IonCol>Total</IonCol>
            </IonRow>
            {/* <form data-sheet-best= "process.env.REACT_APP_SHEET_BEST_API"></form> */}
            {candidates}
          </IonGrid>
        </IonList>
      </IonContent>
    </>
  );
}

export default ListeCandidatDegustation;
