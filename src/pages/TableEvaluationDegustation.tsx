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
  IonImg,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import CustomNotesInput from "../components/InputNotes";

// import { refreshOutline } from 'ionicons/dist/types/components/icon/icon';

function TableEvaluationDegustation() {
  // Récupére le numéro de candidat dans l'URL
  const { candidate } = useParams<{ candidate: string }>();

  const { store } = useStorage();
  //Récupération des informations des inputs
  const [values, setValues] = useState({
    presentation: "",
    cuissonPrincipale: "",
    cuissonGarniture: "",
    accordGlobal: "",
    total: 0,
  });
  const [total, setTotal] = useState(0);

  const handleInputChange = (key: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  // Le total final se fait en temps réel dés qu'une note est rentrée dans un champ de note
  useEffect(() => {
    let Presentation = isNaN(Number(values.presentation))
      ? 0
      : Number(values.presentation);
    let CuissonGarniture = isNaN(Number(values.cuissonGarniture))
      ? 0
      : Number(values.cuissonGarniture);
    let CuissonPrincipale = isNaN(Number(values.cuissonPrincipale))
      ? 0
      : Number(values.cuissonPrincipale);
    let AccordGlobal = isNaN(Number(values.accordGlobal))
      ? 0
      : Number(values.accordGlobal);
    let total =
      CuissonGarniture + Presentation + CuissonPrincipale + AccordGlobal;
    setTotal(total);
  }, [values, total]);

  const history = useHistory();
  // Stockage des notes dés que l'on appuie sur le bouton Valider l'évaluation
  const handleValidateClick = () => {
    if (store) {
      let candidates_notes = {
        presentation: values.presentation,
        cuissonPrincipale: values.cuissonPrincipale,
        cuissonGarniture: values.cuissonGarniture,
        accordGlobal: values.accordGlobal,
        total: total,
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
        history.push("/listingdegustation");
      });
    }
  };

  // // Permet d'afficher les notes dans les cases lorsque l'on retourne sur une fiche candidat déja remplie
  useEffect(() => {
    if (store) {
      store.get("notes").then((all_notes: any) => {
        const candidateNotes = all_notes["candidat" + candidate];
        if (candidateNotes) {
          setValues({
            presentation: candidateNotes.presentation || "",
            cuissonPrincipale: candidateNotes.cuissonPrincipale || "",
            cuissonGarniture: candidateNotes.cuissonGarniture || "",
            accordGlobal: candidateNotes.accordGlobal || "",
            total: candidateNotes.total || 0,
          });
        }
      });
    }
  }, [store]);

  return (
    <>
      <IonContent>
        <IonImg
          className="logo"
          src="../images/logo.jpg"
          alt="Logo du concours"
        ></IonImg>
        {/* <img alt="Logo du concours" src="../images/logo.jpg" /> */}
        <IonCard>
          <IonCardHeader>
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
        <p> Candidat n°{candidate}</p>
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <p>Critéres</p>
            </IonCol>
            <IonCol size-xs="2.8" size-lg="2">
              <p>Notation</p>
            </IonCol>
            <IonCol size-xs="2.7" size-lg="2">
              <p>Observations</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Présentation générale et netteté du contenant</p>
            </IonCol>
            <IonCol size-xs="2.8" size-lg="2">
              <CustomNotesInput
                min={0}
                max={9}
                onIonInput={(value) => handleInputChange("presentation", value)}
                value={values.presentation}
              ></CustomNotesInput>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Cuisson et qualité gustative de la pièce principale</p>
            </IonCol>
            <IonCol size-xs="2.8" size-lg="2">
              <CustomNotesInput
                min={0}
                max={7}
                onIonInput={(value) =>
                  handleInputChange("cuissonPrincipale", value)
                }
                value={values.cuissonPrincipale}
              ></CustomNotesInput>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Cuisson et qualité gustative des garnitures</p>
            </IonCol>
            <IonCol size-xs="2.8" size-lg="2">
              <CustomNotesInput
                min={0}
                max={7}
                onIonInput={(value) =>
                  handleInputChange("cuissonGarniture", value)
                }
                value={values.cuissonGarniture}
              ></CustomNotesInput>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="5">
              <p>Accord entre les garnitures et la pièce principale</p>
            </IonCol>
            <IonCol size-xs="2.8" size-lg="2">
              <CustomNotesInput
                min={0}
                max={7}
                onIonInput={(value) => handleInputChange("accordGlobal", value)}
                value={values.accordGlobal}
              ></CustomNotesInput>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p> Total : </p>
            </IonCol>
            <IonCol size-xs="2.8" size-lg="2">
              <p> {total} </p>
            </IonCol>
            <IonCol size="1.5">
              <p>/30</p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="ion-text-center">
          <IonButton
            type="submit"
            color={"success"}
            onClick={handleValidateClick}
          >
            {/* <IonIcon icon={refreshOutline}/> */}
            Validez l'évaluation
          </IonButton>
        </div>
      </IonContent>
    </>
  );
}

export default TableEvaluationDegustation;
