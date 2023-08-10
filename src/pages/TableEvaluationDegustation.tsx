import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonCol,
  IonRow,
  IonInput,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import "./TableEvaluationDegustation.css";
import { useHistory, useParams } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";

// import { refreshOutline } from 'ionicons/dist/types/components/icon/icon';

// ATTENTION : Probléme responsivité du tableau sur mobile

function TableEvaluationDegustation() {
  // Récupére le numéro de candidat dans l'URL
  const { candidate } = useParams<{ candidate: string }>();

  const { store } = useStorage();
  //Récupération des informations des inputs
  const [presentation, setPresentation] = useState("");
  const [cuissonPrincipale, setCuissonPrincipale] = useState("");
  const [cuissonGarniture, setCuissonGarniture] = useState("");
  const [accordGlobal, setAccordGlobal] = useState("");

  const handlePresentationChange = (event: CustomEvent) => {
    setPresentation(event.detail.value);
  };
  const handleCuissonPrincipaleChange = (event: CustomEvent) => {
    setCuissonPrincipale(event.detail.value);
  };
  const handleCuissonGarnitureChange = (event: CustomEvent) => {
    setCuissonGarniture(event.detail.value);
  };
  const handleAccordGlobal = (event: CustomEvent) => {
    setAccordGlobal(event.detail.value);
  };

  const [total, setTotal] = useState(0);

  // Le total final se fait en temps réel dés qu'une note est rentrée dans un champ de note
  useEffect(() => {
    let Presentation = isNaN(Number(presentation)) ? 0 : Number(presentation);
    let CuissonGarniture = isNaN(Number(cuissonGarniture))
      ? 0
      : Number(cuissonGarniture);
    let CuissonPrincipale = isNaN(Number(cuissonPrincipale))
      ? 0
      : Number(cuissonPrincipale);
    let AccordGlobal = isNaN(Number(accordGlobal)) ? 0 : Number(accordGlobal);
    let total =
      CuissonGarniture + Presentation + CuissonPrincipale + AccordGlobal;
    setTotal(total);
  }, [presentation, cuissonGarniture, cuissonPrincipale, accordGlobal]);

  // Stockage des notes dés que l'on appuie sur le bouton Valider l'évaluation
  const handleValidateClick = () => {
    if (store) {
      let candidates_notes = {
        presentation,
        cuissonPrincipale,
        cuissonGarniture,
        accordGlobal,
        total,
      };

      // Stockage des notes sans écraser les notes déja présentes dans la base de donnée
      // On récupére les notes déja présentes. Ensuite, on traite la promesse obtenue et on applique la fonction save_notes
      // La fonction save_notes permet d'ajouter une instance de notes d'un candidat
      const save_notes = (
        all_notes: Record<string, any>,
        candidate: string,
        candidates_notes: Object
      ) => {
        all_notes["candidat" + candidate] = candidates_notes;
        store.set("notes", all_notes);
      };
      store.get("notes").then((all_notes: Record<string, any>) => {
        save_notes(all_notes, candidate, candidates_notes);
      });
    }
  };

  // Permet d'afficher les notes dans les cases lorsque l'on retourne sur une fiche candidat déja remplie
  useEffect(() => {
    if (store) {
      store.get("notes").then((all_notes: Record<string, any>) => {
        const candidateNotes = all_notes["candidat" + candidate];
        if (candidateNotes) {
          setPresentation(candidateNotes.presentation || "");
          setCuissonPrincipale(candidateNotes.cuissonPrincipale || "");
          setCuissonGarniture(candidateNotes.cuissonGarniture || "");
          setAccordGlobal(candidateNotes.accordGlobal || "");
          setTotal(candidateNotes.total || 0);
        }
      });
    }
  }, [store, candidate]);

  //Redirection vers la page listingCandidatDegustation
  const history = useHistory();
  const handleBackClick = () => {
    history.push("/listingdegustation");
  };

  return (
    <>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <img alt="Logo du concours" src="../images/logo.jpg" />
            <IonCardTitle>Grille évaluation Jury Dégustation</IonCardTitle>
            <IonCardSubtitle>
              Sous le haut patronnage de Monsieur Emmanuel MACRON, Président de
              la République
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Note de présentation et de dégustation.
          </IonCardContent>
        </IonCard>
        {/* A voir si utilisation de card ou juste affichage des phrases et réglage en CSS */}
        {/* <h6>Sous le haut patronnage de Monsieur Emmanuel MACRON, Président de la République</h6>
        <h6> Note de présentation et de dégustation</h6> */}
        <p>Candidat n°{candidate}</p>
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <p>Critéres</p>
            </IonCol>
            <IonCol size="2">
              <p>Notation</p>
            </IonCol>
            <IonCol size="1"></IonCol>
            <IonCol>
              <p>Observations</p>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <p>Présentation générale et netteté du contenant</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-9"
                type="number"
                value={presentation}
                onIonChange={handlePresentationChange}
              >
                {" "}
              </IonInput>
              {presentation && <p>{presentation}</p>}
            </IonCol>
            <IonCol size="1">
              <p>/9</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <p>Cuisson et qualité gustative de la pièce principale</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-7"
                type="number"
                value={cuissonPrincipale}
                onIonChange={handleCuissonPrincipaleChange}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
              <p>/7</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <p>Cuisson et qualité gustative des garnitures</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-7"
                type="number"
                value={cuissonGarniture}
                onIonChange={handleCuissonGarnitureChange}
              ></IonInput>
            </IonCol>
            <IonCol size="1">
              <p>/7</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <p>Accord entre les garnitures et la pièce principale</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-7"
                type="number"
                value={accordGlobal}
                onIonChange={handleAccordGlobal}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
              <p>/7</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <p> Total : </p>
            </IonCol>
            <IonCol size="2">
              <p> {total} </p>
            </IonCol>
            <IonCol size="1">
              <p>/30</p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="ion-text-center">
          <IonButton color={"success"} onClick={handleValidateClick}>
            {/* <IonIcon icon={refreshOutline}/> */}
            Validez l'évaluation
          </IonButton>
          <IonButton color="warning" onClick={handleBackClick}>
            {/* <IonIcon icon={refreshOutline}/> */}
            Retour à la liste des Candidats
          </IonButton>
        </div>
      </IonContent>
    </>
  );
}

export default TableEvaluationDegustation;
