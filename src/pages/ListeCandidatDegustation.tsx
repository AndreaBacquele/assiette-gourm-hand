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
  const [juryNumber, setJuryNumber] = useState("");
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
    const total = (notes && notes["candidat" + nb]?.total) ?? "--";
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
        <IonCol>{presentation}</IonCol>
        <IonCol>{cuissonPrincipale}</IonCol>
        <IonCol>{cuissonGarniture}</IonCol>
        <IonCol>{accordGlobal}</IonCol>
        <IonCol style={{ fontWeight: "600" }}>{total} / 30</IonCol>
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
      jury_number: juryNumber,
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
          jury_number: juryNumber,
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
                </IonCol>
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
