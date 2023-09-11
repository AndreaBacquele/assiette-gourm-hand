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

function ListeCandidatCuisine() {
  const { candidate } = useParams<{ candidate: string }>();
  const { store } = useStorage();
  const [notes, setNotes] = useState<Record<string, Note>>({});

  interface Note {
    totalProduction: string;
    totalAutonomie: string;
    totalDurable: string;
    totalOptimisation: string;
    AllTotal: string;
  }

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
        <IonCol>
          <IonButton
            color="warning"
            onClick={() => handleButtonClick(nb)}
            expand="full"
          >
            {" "}
            n°{nb}
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

  return (
    <>
      <IonContent>
        <IonHeader color="light">
          <IonToolbar>
            <IonItem>
              <img alt="Logo du concours" src="../images/logo.jpg" />
              <IonTitle> Liste des candidats - Jury technique</IonTitle>
              {/* <span><p>Pour avoir accés à la fiche du candidat, merci de cliquer sur le numéro</p></span> */}
            </IonItem>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol size-xs="2" size-lg="2">
              Candidat
            </IonCol>
            <IonCol size-xs="2" size-lg="2">
              {" "}
              Note totale Production
            </IonCol>
            <IonCol size-xs="2" size-lg="2">
              {" "}
              Note totale Autonomie{" "}
            </IonCol>
            <IonCol size-xs="1.84" size-lg="2">
              Note totale développement durable
            </IonCol>
            <IonCol size-xs="1.84" size-lg="2">
              Note totale optimisation du panier
            </IonCol>
            <IonCol size-xs="1.84" size-lg="2">
              Total final
            </IonCol>
          </IonRow>

          <IonList lines="full">{candidates}</IonList>
        </IonGrid>
      </IonContent>
    </>
  );
}

export default ListeCandidatCuisine;
