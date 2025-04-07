/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import CustomNotesInput from "../components/InputNotes";
import CustomFormInput from "../components/InputForm";
import Alert from "../components/Alert";
import { isValidNote } from "../hooks/isValidNotes";
import { CandidateNotes, NotesStore } from "../types";

function TableEvaluationDegustation() {
  // Récupére le numéro de candidat dans l'URL
  const { candidate } = useParams<{ candidate: string }>();
  const [alertNoSend, setAlertNoSend] = useState(false);
  const [alertInvalideNotes, setAlertInvalideNotes] = useState(false);

  const { store } = useStorage();
  //Récupération des informations des inputs
  const [values, setValues] = useState({
    presentation: 0,
    cuissonPrincipale: 0,
    cuissonGarniture: 0,
    accordGlobal: 0,
    total: 0,
  });
  const [total, setTotal] = useState(0);
  const [observations, setObservations] = useState("");

  const handleInputChange = (key: string, value: number) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  // Le total final se fait en temps réel dés qu'une note est rentrée dans un champ de note
  useEffect(() => {
    const total =
      values.presentation +
      values.cuissonGarniture +
      values.cuissonPrincipale +
      values.accordGlobal;
    setTotal(total);
  }, [values]);

  const history = useHistory();
  const [validateNote, setValidateNote] = useState(false);
  // Stockage des notes dés que l'on appuie sur le bouton Valider l'évaluation
  const noteLimits = {
    presentation: { max: 9 },
    cuissonPrincipale: { max: 7 },
    cuissonGarniture: { max: 7 },
    accordGlobal: { max: 7 },
  };

  // Fonction de validation pour toutes les notes
  const validateNotes = () => {
    return (
      isValidNote(values.presentation, noteLimits.presentation.max) &&
      isValidNote(values.cuissonPrincipale, noteLimits.cuissonPrincipale.max) &&
      isValidNote(values.cuissonGarniture, noteLimits.cuissonGarniture.max) &&
      isValidNote(values.accordGlobal, noteLimits.accordGlobal.max)
    );
  };

  // Gestion de la validation et de l'enregistrement des notes
  const handleValidateClick = () => {
    if (validateNotes()) {
      if (store) {
        const candidates_notes = {
          presentation: values.presentation,
          cuissonPrincipale: values.cuissonPrincipale,
          cuissonGarniture: values.cuissonGarniture,
          accordGlobal: values.accordGlobal,
          total: total,
          observations: observations,
        };

        const save_notes = (
          all_notes: NotesStore,
          candidate: string,
          candidates_notes: CandidateNotes
        ) => {
          all_notes["candidat" + candidate] = candidates_notes;
          store.set("notes", all_notes);
        };

        store.get("notes").then((all_notes: NotesStore) => {
          save_notes(all_notes, candidate, candidates_notes);
          setValidateNote(true);
          history.push("/listingdegustation");
        });
      }
    } else {
      setAlertInvalideNotes(true); // Affiche l'alerte si une note est invalide
    }
  };

  // // Permet d'afficher les notes dans les cases lorsque l'on retourne sur une fiche candidat déja remplie
  useEffect(() => {
    if (store) {
      store.get("notes").then((all_notes: NotesStore) => {
        const candidateNotes = all_notes["candidat" + candidate];
        if (candidateNotes) {
          setValues({
            presentation: Number(candidateNotes.presentation) || 0,
            cuissonPrincipale: Number(candidateNotes.cuissonPrincipale) || 0,
            cuissonGarniture: Number(candidateNotes.cuissonGarniture) || 0,
            accordGlobal: Number(candidateNotes.accordGlobal) || 0,
            total: Number(candidateNotes.total) || 0,
          });
          setObservations(candidateNotes.observations || "");
        }
      });
    }
  }, [store]);

  return (
    <>
      <IonHeader>
        <IonToolbar mode="ios">
          <div id="top">
            <IonButton
              color={"white"}
              type="submit"
              onClick={() => setAlertNoSend(true)}
            >
              <IonIcon src="/chevron-back-outline.svg"></IonIcon>
            </IonButton>
            <IonAlert
              isOpen={alertNoSend}
              onDidDismiss={() => setAlertNoSend(false)}
              header={"Attention"}
              message={
                "Les notes ne seront pas enregistrées en cliquant sur ce bouton"
              }
              buttons={[
                {
                  text: "Retour liste candidat",
                  handler: () => {
                    history.push("/listingdegustation");
                  },
                },
                {
                  text: "Rester sur cette page",
                },
              ]}
              mode="ios"
            ></IonAlert>

            <p className="black-label">Grille d'évaluation</p>
            <p className="orange-label"> Candidat n°{candidate}</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-evaluation">
        <div id="orga-header">
          <img
            className="logo-dash-eval"
            src="/logo AG.png"
            alt="Logo du concours"
          ></img>
          <div className="header-footer">
            Sous le haut patronage de Monsieur Emmanuel MACRON, Président de la
            République.
          </div>
        </div>
        <IonGrid fixed={true}>
          <CustomNotesInput
            max={noteLimits.presentation.max}
            onIonInput={(value) => handleInputChange("presentation", value)}
            value={values.presentation}
            noteLabel="Présentation générale et netteté du contenant"
          ></CustomNotesInput>

          <CustomNotesInput
            max={noteLimits.cuissonPrincipale.max}
            onIonInput={(value) =>
              handleInputChange("cuissonPrincipale", value)
            }
            value={values.cuissonPrincipale}
            noteLabel="Cuisson et qualité gustative de la pièce principale"
          ></CustomNotesInput>

          <CustomNotesInput
            max={noteLimits.cuissonGarniture.max}
            onIonInput={(value) => handleInputChange("cuissonGarniture", value)}
            value={values.cuissonGarniture}
            noteLabel="Cuisson et qualité gustative des garnitures"
          ></CustomNotesInput>

          <CustomNotesInput
            max={noteLimits.accordGlobal.max}
            onIonInput={(value) => handleInputChange("accordGlobal", value)}
            value={values.accordGlobal}
            noteLabel="Accord entre les garnitures et la pièce principale"
          ></CustomNotesInput>

          <IonRow>
            <CustomFormInput
              initial={observations}
              onIonInput={setObservations}
              placeholder="Observations (facultatif)"
            ></CustomFormInput>
          </IonRow>
        </IonGrid>

        <IonFooter style={{ position: "relative" }}>
          <IonToolbar mode="ios">
            <div className="ion-text-center">
              <div id="bottom">
                <span className="black-label">
                  Total évaluation dégustation
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    color: "var(--ion-color-primary)",
                  }}
                >
                  {total} / 30{" "}
                </span>
              </div>
              <IonButton
                expand="block"
                type="submit"
                color={"warning"}
                onClick={handleValidateClick}
                className="txtButton"
              >
                Enregistrer
              </IonButton>
              <Alert
                showAlert={validateNote}
                setShowAlert={setValidateNote}
                message={"Les notes ont été correctement enregistrées"}
              ></Alert>
              <Alert
                showAlert={alertInvalideNotes}
                setShowAlert={setAlertInvalideNotes}
                message={
                  "Attention, une des notes n'est pas valide et n'est pas prise en compte dans le calcul. Merci de la corriger."
                }
              ></Alert>
              <span
                className="header-footer"
                // style={{ textAlign: "center", padding: "10px 0px" }}
              >
                Vous pourrez revenir modifier ces notes ultérieurement.
              </span>
            </div>
          </IonToolbar>
        </IonFooter>
        <div style={{ paddingBottom: "80px" }}></div>
      </IonContent>
    </>
  );
}

export default TableEvaluationDegustation;
