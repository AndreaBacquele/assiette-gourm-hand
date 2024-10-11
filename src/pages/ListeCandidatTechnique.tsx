import React, { useEffect, useState } from "react";
import {
  IonList,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonButton,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { useStorage } from "../hooks/useStorage";
import "./PageAccueil";
import Alert from "../components/Alert";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import { TechnicalNotes } from "../types";

function ListeCandidatCuisine() {
  const { store } = useStorage();
  const [completeName, setCompleteName] = useState("");
  const [juryNumber, setJuryNumber] = useState("");
  const [juryType, setJuryType] = useState("");
  const [notes, setNotes] = useState<Record<string, TechnicalNotes>>({});
  const [sendNotes, setSendNotes] = useState(false);

  // Permet de récuperer puis d'afficher le nom du jury en haut du listing des candidats
  const picklastNamefirstName = async () => {
    if (store) {
      const name = await store.get("jury");
      const completeName = name?.completeName;
      const juryNumber = name?.juryNumber;
      const juryType = name?.juryType;
      setCompleteName(completeName);
      setJuryNumber(juryNumber);
      setJuryType(juryType);
    }
  };
  useEffect(() => {
    picklastNamefirstName();
  }, [store]);

  const history = useHistory();

  const handleButtonClick = (candidate: number) => {
    history.push("/evaltechnique/" + candidate);
  };

  const handleDeleteClick = () => {
    if (store) {
      store.remove("jury");
      alert("Jury supprimé");
      history.push("/home");
    }
  };
  //   Gestion de l'affichage des candidats sur le dashboard
  const nb_candidates = 22;
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (v, k) => k + start);

  const candidates = range(1, nb_candidates).map((nb) => {
    const totalProduction =
      (notes && notes["candidat" + nb]?.totalProduction) ?? "";
    const totalAutonomie =
      (notes && notes["candidat" + nb]?.totalAutonomie) ?? "";
    const totalDurable = (notes && notes["candidat" + nb]?.totalDurable) ?? "";
    const totalOptimisation =
      (notes && notes["candidat" + nb]?.totalOptimisation) ?? "";
    const TotalAllTableaux =
      (notes && notes["candidat" + nb]?.AllTotal) ?? "--";
    return (
      <IonRow>
        <IonCol size-xs="2.8" size-lg="2">
          <IonButton
            color="warning"
            onClick={() => handleButtonClick(nb)}
            expand="block"
            className="txtButton"
          >
            n° {nb}
          </IonButton>
        </IonCol>
        <IonCol>{totalProduction}</IonCol>
        <IonCol>{totalAutonomie} </IonCol>
        <IonCol>{totalDurable}</IonCol>
        <IonCol>{totalOptimisation}</IonCol>
        <IonCol style={{ fontWeight: "600" }}>{TotalAllTableaux} / 70</IonCol>
      </IonRow>
    );
  });

  const loadNotes = async () => {
    if (store) {
      const notes = await store.get("notes");
      setNotes(notes || {});
    }
  };

  useEffect(() => {
    loadNotes();
  }, [store]);

  // Connexion entre le spreadsheet / l'API REST Google / l'application
  // Envoi les notes vers le spreasheet dés que l'on appuie sur le bouton envoyé

  const handleSubmitNotes = (e: any) => {
    e.preventDefault();

    const requests: any = [];

    // Récupération de la date + heure
    var d = new Date();
    var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + " " + hours;

    const url: string | undefined = import.meta.env
      .VITE_REACT_APP_SHEET_BEST_API_TECHNIQUE;

    for (let nb = 0; nb <= nb_candidates; nb++) {
      if (notes["candidat" + nb] != null) {
        const oneRow = {
          date_sync: fullDate,
          jury_name: completeName,
          jury_number: juryNumber,
          candidate_number: nb,
          // ENREGISTREMENT TABLEAU 1
          grade_secu_hygiene: notes["candidat" + nb]["secuHygiene"],
          grade_organisation: notes["candidat" + nb]["organisation"],
          grade_maitrise_tech: notes["candidat" + nb]["maitriseTech"],
          grade_timing: notes["candidat" + nb]["timing"],
          grade_total_production: notes["candidat" + nb]["totalProduction"],
          observations_production:
            notes["candidat" + nb]["observationsProduction"],
          // ENREGISTREMENT TABLEAU 2
          grade_initiative: notes["candidat" + nb]["initiative"],
          grade_harmonie: notes["candidat" + nb]["harmonie"],
          grade_qualite_accomp: notes["candidat" + nb]["qualiteAccomp"],
          grade_clarte: notes["candidat" + nb]["clarte"],
          grade_total_autonomie: notes["candidat" + nb]["totalAutonomie"],
          observations_autonomie:
            notes["candidat" + nb]["observationsAutonomie"],
          // ENREGISTREMENT TABLEAU 3
          grade_dechets: notes["candidat" + nb]["dechets"],
          grade_fluides: notes["candidat" + nb]["fluides"],
          grade_total_durable: notes["candidat" + nb]["totalDurable"],
          observations_durable: notes["candidat" + nb]["observationsDurable"],
          // ENREGISTREMENT TABLEAU 4
          grade_util_obligatoires: notes["candidat" + nb]["utilObligatoires"],
          grade_util_libres: notes["candidat" + nb]["utilLibres"],
          grade_total_optimisation: notes["candidat" + nb]["totalOptimisation"],
          observations_optimisation:
            notes["candidat" + nb]["observationsOptimisation"],

          grade_total: notes["candidat" + nb]["AllTotal"],
        };
        console.log(oneRow);
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
        responses.forEach((response) => console.log(response));
        setSendNotes(true);
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

      <IonContent className="content-listing">
        <div id="title"> Liste des candidats</div>
        <div id="instructions" style={{ textAlign: "center" }}>
          Cliquez sur le numéro d'un candidat pour accéder à sa grille
          d'évaluation
        </div>

        <IonList lines="full">
          <IonGrid>
            <IonRow>
              <Dashboard label="Candidat"></Dashboard>
              <Dashboard label="Production"></Dashboard>
              <Dashboard label="Autonomie"></Dashboard>
              <Dashboard label="Dévelop. durable"></Dashboard>
              <Dashboard label="Optim. du panier"></Dashboard>
              <Dashboard label="Total"></Dashboard>
            </IonRow>

            <IonList lines="full">{candidates}</IonList>
          </IonGrid>
        </IonList>
        <div style={{ paddingBottom: "200px" }}></div>
      </IonContent>

      <IonFooter>
        <IonToolbar mode="ios">
          <div className="ion-text-center">
            <IonCol
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <IonButton
                color="warning"
                expand="block"
                onClick={handleSubmitNotes}
                className="txtButton"
                style={{
                  width: "50%",
                }}
              >
                Envoyer les notes
              </IonButton>
              <Alert
                showAlert={sendNotes}
                setShowAlert={setSendNotes}
                message={"Les notes ont été synchronisées avec succés"}
              ></Alert>
            </IonCol>
          </div>

          <div className="header-footer" style={{ textAlign: "center" }}>
            Chaque envoi des notes remplace le précédent
          </div>
          <IonCol size-xs="6">
            <IonButton
              color="warning"
              expand="block"
              onClick={handleDeleteClick}
              className="txtButton"
            >
              Supprimer les données
            </IonButton>
          </IonCol>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default ListeCandidatCuisine;
