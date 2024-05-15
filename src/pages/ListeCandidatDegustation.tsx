import React, { useEffect, useState } from "react";
import {
  IonList,
  IonButton,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonFooter,
  IonToolbar,
  IonHeader,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import Alert from "../components/Alert";
import { TastingNotes } from "../types";

function ListeCandidatDegustation() {
  // Gére la récupération des données + permet l'affichage de celles-ci en dessous
  const [completeName, setCompleteName] = useState("");
  const [juryType, setJuryType] = useState("");
  const [juryNumber, setJuryNumber] = useState("");
  const [notes, setNotes] = useState<Record<string, TastingNotes>>({});
  const [sendNotes, setSendNotes] = useState(false);
  const history = useHistory();

  // Redirige la page lorsque l'on clique sur le bouton Candidat: Créer une url avec le numéro du candidat qui nous sert à stocker les données dans la bon candidat

  const handleButtonClick = (candidate: number) => {
    history.push("/evaldegustation/" + candidate);
  };

  // Boucle qui permet d'afficher le bon nombre de candidats sur le dashboard
  const nb_candidates = 22;
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (v, k) => k + start);

  const candidates = range(1, nb_candidates).map((nb) => {
    const presentation = (notes && notes["candidat" + nb]?.presentation) ?? "";
    const cuissonGarniture =
      (notes && notes["candidat" + nb]?.cuissonGarniture) ?? "";
    const cuissonPrincipale =
      (notes && notes["candidat" + nb]?.cuissonPrincipale) ?? "";
    const accordGlobal = (notes && notes["candidat" + nb]?.accordGlobal) ?? "";
    const total = (notes && notes["candidat" + nb]?.total) ?? "--";
    return (
      <IonRow>
        <IonCol size-xs="2.5" size-lg="2" sizeSm="2">
          <IonButton
            color="warning"
            onClick={() => handleButtonClick(nb)}
            expand="block"
            className="txtButton"
          >
            n° {nb}
          </IonButton>
        </IonCol>
        <IonCol>{presentation}</IonCol>
        <IonCol>{cuissonPrincipale}</IonCol>
        <IonCol>{cuissonGarniture}</IonCol>
        <IonCol>{accordGlobal}</IonCol>
        <IonCol style={{ fontWeight: "600" }}>{total} / 30</IonCol>
      </IonRow>
    );
  });

  const handleSubmitNotes = (e: any) => {
    e.preventDefault();

    const requests: any[] = [];

    // Récupération de la date + heure
    var d = new Date();
    var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + " " + hours;

    const url: string | undefined = import.meta.env
      .VITE_REACT_APP_SHEET_BEST_API_DEGUSTATION;

    const testRow = {
      date_sync: fullDate,
      jury_name: completeName,
      jury_number: juryNumber,
    };

    for (let nb = 0; nb <= nb_candidates; nb++) {
      if (notes["candidat" + nb] != null) {
        const oneRow = {
          date_sync: fullDate,
          jury_name: completeName,
          jury_number: juryNumber,
          candidate_number: nb,
          grade_presentation: notes["candidat" + nb]["presentation"],
          grade_cuisson_principale: notes["candidat" + nb]["cuissonPrincipale"],
          grade_cuisson_garniture: notes["candidat" + nb]["cuissonPrincipale"],
          grade_accord_global: notes["candidat" + nb]["accordGlobal"],
          grade_total: notes["candidat" + nb]["total"],
          observations: notes["candidat" + nb]["observations"],
        };
        if (url) {
          axios.post(url, oneRow);
        } else {
          console.error("URL is undefined");
        }
      }
    }

    // Si toutes les lignes sont traitées avec succés, envoi un message à l'utilisateur
    Promise.all(requests)
      .then((responses) => {
        responses.forEach(
          (response) => console.log(response),
          setSendNotes(true)
        );
      })
      .catch((error) => {
        console.error(error);
        alert("Une erreur s'est produite lors de l'envoi des notes.");
      });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar style={{ height: "60px", display: "flex" }} mode="ios">
          <div id="top">
            <img
              className="logo-dash-eval"
              src="/logo AG.png"
              alt="Logo du concours"
            ></img>

            <span className="black-label"> {completeName}</span>
            <span className="orange-label"> {juryType} </span>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div id="title"> Liste des candidats</div>
        <div id="instructions" style={{ textAlign: "center" }}>
          {" "}
          Cliquez sur le numéro d'un candidat pour accéder à sa grille
          d'évaluation
        </div>
        <IonList lines="full">
          <IonGrid>
            <IonRow>
              <Dashboard label="Candidat"></Dashboard>
              <Dashboard label="Présentation"></Dashboard>
              <Dashboard label="Cuisson principale"></Dashboard>
              <Dashboard label="Cuisson garniture"></Dashboard>
              <Dashboard label="Accord global plat"></Dashboard>
              <Dashboard label="Total"></Dashboard>
            </IonRow>
            {candidates}
          </IonGrid>
        </IonList>
        <div style={{ paddingBottom: "200px" }}></div>
      </IonContent>

      <IonFooter>
        <IonToolbar mode="ios">
          <div className="ion-text-center">
            <IonGrid>
              <IonRow>
                <IonCol size-xs="6">
                  <IonButton
                    color="warning"
                    expand="block"
                    onClick={handleSubmitNotes}
                    className="txtButton"
                  >
                    Envoyer les notes
                  </IonButton>
                  <Alert
                    showAlert={sendNotes}
                    setShowAlert={setSendNotes}
                    message={"Les notes ont été synchronisées avec succés"}
                  ></Alert>
                </IonCol>
                <IonCol size-xs="6">
                  <IonButton
                    color="warning"
                    expand="block"
                    // onClick={handleDeleteClick}
                    className="txtButton"
                  >
                    Supprimer les données
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <div className="header-footer" style={{ textAlign: "center" }}>
            Chaque envoi des notes remplace le précédent
          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default ListeCandidatDegustation;
