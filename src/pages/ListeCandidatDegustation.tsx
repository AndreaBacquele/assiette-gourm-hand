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

    // Récupération de la date + heure
    var d = new Date();
    var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + " " + hours;

    // Boucle qui itére sur les candidats
    // Pour chaque candidat : création d'une row avec une valeur associée à chaque colonne
    const oneRow = {
      date_sync: fullDate,
      jury_name: lastName + " " + firstName,
      candidate_number: "",
      grade_presentation: notes["candidat1"]["presentation"],
      grade_cuisson_principale: notes["candidat1"]["cuissonPrincipale"],
      grade_cuisson_garniture: notes["candidat1"]["cuissonPrincipale"],
      grade_accord_global: notes["candidat1"]["accordGlobal"],
      grade_total: notes["candidat1"]["total"],
    };
    console.log(oneRow);

    const url: string | undefined = import.meta.env
      .VITE_REACT_APP_SHEET_BEST_API_DEGUSTATION;

    if (url) {
      axios.post(url, oneRow).then((response) => {
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
        <IonCol size-xs="2.8" size-lg="2">
          <IonButton
            color="warning"
            onClick={() => handleButtonClick(nb)}
            expand="full"
          >
            {" "}
            <div id="txtButton"> n°{nb}</div>
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
              <IonTitle id="title">
                {" "}
                Liste des candidats : <br /> Jury dégustation
              </IonTitle>
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
        <div id="title">
          Une connexion internet est nécessaire afin de valider l'envoi des
          notes
        </div>
        <div className="ion-text-center">
          <IonButton onClick={handleSubmitNotes} id="txtButton">
            Envoi des notes
          </IonButton>
        </div>

        <IonList lines="full">
          <IonGrid>
            <IonRow>
              <IonCol size-xs="2.8" size-lg="2">
                <div id="labelCol">Candidat</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">
                  Note de <br />
                  présentation
                </div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Cuisson principale</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Cuisson garniture</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Accord global plat</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Total</div>
              </IonCol>
            </IonRow>
            {candidates}
          </IonGrid>
        </IonList>
      </IonContent>
    </>
  );
}

export default ListeCandidatDegustation;
