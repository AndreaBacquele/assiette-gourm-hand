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
import { useStorage } from "../hooks/useStorage";
import axios from "axios";

function ListeCandidatDegustation() {
  // Gére la récupération des données + permet l'affichage de celles-ci en dessous
  const { store } = useStorage();
  const [completeName, setCompleteName] = useState("");
  const [juryType, setJuryType] = useState("");
  const [juryTable, setJuryTable] = useState("");
  const [notes, setNotes] = useState<Record<string, Note>>({});
  const history = useHistory();

  // Spécifie la structure attendu pour l'objet notes
  interface Note {
    presentation: string;
    cuissonPrincipale: string;
    cuissonGarniture: string;
    accordGlobal: string;
    total: string;
    observation: string;
  }

  // Permet de récuperer puis d'afficher le nom du jury en haut du listing des candidats
  const picklastNamefirstName = async () => {
    if (store) {
      const name = await store.get("jury");
      const completeName = name?.completeName;
      const juryTable = name?.juryTable;
      const juryType = name?.juryType;
      setCompleteName(completeName);
      setJuryTable(juryTable);
      setJuryType(juryType);
    }
  };
  useEffect(() => {
    picklastNamefirstName();
  }, [store]);

  // Supprime le jury en cas d'erreur
  const handleDeleteClick = () => {
    if (store) {
      store.remove("jury");
      alert("Jury supprimé");
      history.push("/home");
    }
  };

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
            expand="block"
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
      .VITE_REACT_APP_SHEET_BEST_API_DEGUSTATION;

    const testRow = {
      date_sync: fullDate,
      jury_name: completeName,
      table_number: juryTable,
    };

    // Permet de tester la connexion API même si aucune note n'a été rentré dans une fiche candidat
    if (url && notes["candidat"] == null) {
      axios.post(url, testRow);
      alert("Test de connexion ok");
    } else {
      console.error("Probléme de connexion");
    }

    for (let nb = 0; nb <= nb_candidates; nb++) {
      if (notes["candidat" + nb] != null) {
        const oneRow = {
          date_sync: fullDate,
          jury_name: completeName,
          table_number: juryTable,
          candidate_number: nb,
          grade_presentation: notes["candidat" + nb]["presentation"],
          grade_cuisson_principale: notes["candidat" + nb]["cuissonPrincipale"],
          grade_cuisson_garniture: notes["candidat" + nb]["cuissonPrincipale"],
          grade_accord_global: notes["candidat" + nb]["accordGlobal"],
          grade_total: notes["candidat" + nb]["total"],
          observations: notes["candidat" + nb]["observation"],
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
          alert("Toutes les notes ont été envoyées avec succès !")
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
        <IonToolbar>
          <div id="top">
            <img
              className="logo-dash-eval"
              src="../images/logo.jpg"
              alt="Logo du concours"
            ></img>

            <p className="black-label"> {completeName}</p>
            <p className="orange-label"> {juryType} </p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ height: "calc(100% - 220px)" }}>
        <div id="title"> Liste des candidats</div>
        <div id="instructions">
          {" "}
          Cliquez sur le numéro d'un candidat pour accéder à sa grille
          d'évaluation
        </div>
        <IonList lines="full">
          <IonGrid>
            <IonRow>
              <IonCol size-xs="2.8" size-lg="2">
                <div id="labelCol">Candidat</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">PrésentatO</div>
              </IonCol>
              <IonCol size-xs="1.84" size-lg="2">
                <div id="labelCol">Cuisson p'pale</div>
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

      <IonFooter>
        <IonToolbar>
          <div className="ion-text-center">
            <IonButton
              color="warning"
              onClick={handleDeleteClick}
              id="txtButton"
            >
              Supprimer les données
            </IonButton>

            <div className="header-footer">
              <IonButton
                color="warning"
                expand="block"
                onClick={handleSubmitNotes}
                id="txtButton"
              >
                Envoyer les notes
              </IonButton>
            </div>
          </div>

          <div className="black-label" id="bottom">
            Chaque envoi des notes remplace le précédent
          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default ListeCandidatDegustation;
