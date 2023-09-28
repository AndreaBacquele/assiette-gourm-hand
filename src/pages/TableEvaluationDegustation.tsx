import React, { useState, useEffect } from "react";
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import CustomNotesInput from "../components/InputNotes";
import CustomFormInput from "../components/InputForm";
import { totalmem } from "os";

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
  });
  const [total, setTotal] = useState(0);
  const [observation, setObservations] = useState("");

  const handleInputChange = (key: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
    console.log(values);
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
          });
          setTotal(total);
        }
      });
    }
  }, [values]);

  return (
    <>
      <IonContent fullscreen={true}>
        <IonHeader>
          <IonToolbar>
            <div id="top">
              <p className="black-label">Grille d'évaluation</p>
              <p className="orange-label"> Candidat n°{candidate}</p>
            </div>
          </IonToolbar>
        </IonHeader>

        <div id="orga-header">
          <img
            className="logo-dash-eval"
            src="../images/logo.jpg"
            alt="Logo du concours"
          ></img>
          <div id="header-footer">
            Sous le haut patronage de Monsieur Emmanuel MACRON, Président de la
            République.
          </div>
        </div>
        <IonGrid fixed={true}>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={9}
              onIonInput={(value) => handleInputChange("presentation", value)}
              value={values.presentation}
            ></CustomNotesInput>
            <IonCol>
              <p id="note-label">
                Présentation générale et netteté du contenant
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={7}
              onIonInput={(value) =>
                handleInputChange("cuissonPrincipale", value)
              }
              value={values.cuissonPrincipale}
            ></CustomNotesInput>
            <IonCol>
              <p id="note-label">
                Cuisson et qualité gustative de la pièce principale
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={7}
              onIonInput={(value) =>
                handleInputChange("cuissonGarniture", value)
              }
              value={values.cuissonGarniture}
            ></CustomNotesInput>
            <IonCol>
              <p id="note-label">Cuisson et qualité gustative des garnitures</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={7}
              onIonInput={(value) => handleInputChange("accordGlobal", value)}
              value={values.accordGlobal}
            ></CustomNotesInput>
            <IonCol>
              <p id="note-label">
                Accord entre les garnitures et la pièce principale
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <CustomFormInput
          initial={observation}
          onInputChange={setObservations}
          placeholder="Observations (facultatif)"
        ></CustomFormInput>

        <IonFooter>
          <IonToolbar>
            {" "}
            <div className="ion-text-center">
              <div id="bottom">
                <p className="black-label"> Total évaluation dégustation </p>
                <p
                  style={{
                    fontSize: "20px",
                    color: "var(--ion-color-primary)",
                  }}
                >
                  {" "}
                  {total} / 30{" "}
                </p>
              </div>
              <IonButton
                expand="block"
                type="submit"
                color={"warning"}
                onClick={handleValidateClick}
              >
                Enregistrer
              </IonButton>
              <p id="header-footer">
                Vous pourrez revenir modifier ces notes ultérieurement.
              </p>
            </div>
          </IonToolbar>
        </IonFooter>
      </IonContent>
      {/* </IonPage> */}
    </>
  );
}

export default TableEvaluationDegustation;
