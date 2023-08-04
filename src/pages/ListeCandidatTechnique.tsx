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
    Presentation: string;
    CuissonPrincipale: string;
    CuissonGarniture: string;
    AccordGlobal: string;
    total: string;
  }

  const history = useHistory();

  const handleButtonClick = (candidate: number) => {
    history.push("/evaltechnique/" + candidate);
  };

  const nb_candidates = 20;
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (v, k) => k + start);

  const candidates = range(1, nb_candidates).map((nb) => {
    // const presentation = (notes && notes["candidat" + nb]?.Presentation) ?? "";
    // const cuissonGarniture =
    //   (notes && notes["candidat" + nb]?.CuissonGarniture) ?? "";
    // const cuissonPrincipale =
    //   (notes && notes["candidat" + nb]?.CuissonPrincipale) ?? "";
    // const accordGlobal = (notes && notes["candidat" + nb]?.AccordGlobal) ?? "";
    // const total = (notes && notes["candidat" + nb]?.total) ?? "";
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
        <IonCol> </IonCol>
        <IonCol> </IonCol>
        <IonCol></IonCol>
        <IonCol></IonCol>
        <IonCol></IonCol>
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

        <IonList lines="full">{candidates}</IonList>
      </IonContent>
    </>
  );
}

export default ListeCandidatCuisine;
