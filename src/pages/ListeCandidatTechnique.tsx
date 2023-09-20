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
import "./ListeCandidatTechnique.css";
import { useHistory, useParams } from "react-router";
import { useStorage } from "../hooks/useStorage";
import "./PageAccueil";
import axios from "axios";

function ListeCandidatCuisine() {
  const { candidate } = useParams<{ candidate: string }>();
  const { store } = useStorage();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [notes, setNotes] = useState<Record<string, Note>>({});

  interface Note {
    totalProduction: string;
    totalAutonomie: string;
    totalDurable: string;
    totalOptimisation: string;
    AllTotal: string;
    clarte: string;
    dechets: string;
    fluides: string;
    harmonie: string;
    initiative: string;
    maitriseTech: string;
    organisation: string;
    qualiteAccomp: string;
    secuHygiene: string;
    timing: string;
    utilLibres: string;
    utilObligatoires: string;
    TotalOptiDurable: number;
    TotalProductAutonomie: number;
  }

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

  const handleButtonClick = (candidate: number) => {
    history.push("/evaltechnique/" + candidate);
  };

  //   Gestion de l'affichage des candidats sur le dashboard
  const nb_candidates = 20;
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
    const TotalAllTableaux = (notes && notes["candidat" + nb]?.AllTotal) ?? "";
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
        <IonCol>{totalProduction}</IonCol>
        <IonCol>{totalAutonomie} </IonCol>
        <IonCol>{totalDurable}</IonCol>
        <IonCol>{totalOptimisation}</IonCol>
        <IonCol>{TotalAllTableaux}</IonCol>
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
          jury_name: lastName + " " + firstName,
          candidate_number: nb,
          // ENREGISTREMENT TABLEAU 1
          grade_secu_hygiene: notes["candidat" + nb]["secuHygiene"],
          grade_organisation: notes["candidat" + nb]["organisation"],
          grade_maitrise_tech: notes["candidat" + nb]["maitriseTech"],
          grade_timing: notes["candidat" + nb]["timing"],
          grade_total_production: notes["candidat" + nb]["totalProduction"],
          // ENREGISTREMENT TABLEAU 2
          grade_initiative: notes["candidat" + nb]["initiative"],
          grade_harmonie: notes["candidat" + nb]["harmonie"],
          grade_qualite_accomp: notes["candidat" + nb]["qualiteAccomp"],
          grade_clarte: notes["candidat" + nb]["clarte"],
          grade_total_autonomie: notes["candidat" + nb]["totalAutonomie"],
          // ENREGISTREMENT TABLEAU 3
          grade_dechets: notes["candidat" + nb]["dechets"],
          grade_fluides: notes["candidat" + nb]["fluides"],
          grade_total_durable: notes["candidat" + nb]["totalDurable"],
          // ENREGISTREMENT TABLEAU 4
          grade_util_obligatoires: notes["candidat" + nb]["utilObligatoires"],
          grade_util_libres: notes["candidat" + nb]["utilLibres"],
          grade_total_optimisation: notes["candidat" + nb]["totalOptimisation"],

          // ENREGISTREMENT TOTAUX
          grade_total_opti_durable: notes["candidat" + nb]["TotalOptiDurable"],
          grade_total_product_autonomie:
            notes["candidat" + nb]["TotalProductAutonomie"],

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
        alert("Toutes les notes ont été envoyées avec succès !");
      })
      .catch((error) => {
        console.error(error);
        alert("Une erreur s'est produite lors de l'envoi des notes.");
      });
  };

  return (
    <>
      <IonContent>
        <IonHeader color="light">
          <IonToolbar>
            <IonItem>
              <img alt="Logo du concours" src="../images/logo.jpg" />
              <IonTitle id="title">
                {" "}
                Liste des candidats : <br />
                Jury technique
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
          <IonButton id="txtButton" onClick={handleSubmitNotes}>
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
                {" "}
                <div id="labelCol">Total Production</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                {" "}
                <div id="labelCol">Total Autonomie </div>{" "}
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Total développement durable</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Total optimisation du panier</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Total final</div>
              </IonCol>
            </IonRow>

            <IonList lines="full">{candidates}</IonList>
          </IonGrid>
        </IonList>
      </IonContent>
    </>
  );
}

export default ListeCandidatCuisine;
