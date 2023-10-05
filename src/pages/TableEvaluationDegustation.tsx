import React, { useState, useEffect } from "react";
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonCol,
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
  const [observations, setObservations] = useState("");

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
  const [showAlert1, setShowAlert1] = useState(false);
  // Stockage des notes dés que l'on appuie sur le bouton Valider l'évaluation
  const handleValidateClick = () => {
    if (store) {
      let candidates_notes = {
        presentation: values.presentation,
        cuissonPrincipale: values.cuissonPrincipale,
        cuissonGarniture: values.cuissonGarniture,
        accordGlobal: values.accordGlobal,
        total: total,
        observations: observations,
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
        setShowAlert1(true);
      });
    }
  };

  //  A INCORPORER
  // return (
  //   <IonAlert
  //     trigger="validate-notes-click"
  //     subHeader="Notes enregistrées avec succés"
  //     message="Vous allez être redirigé vers la liste des candidats "
  //     buttons={["OK"]}
  //   ></IonAlert>
  // );

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
            total: total || 0,
          });
          setObservations(candidateNotes.observations || "");
        }
      });
    }
  }, [store]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div id="top">
            <IonButton
              type="submit"
              color={"white"}
              onClick={handleValidateClick}
            >
              <IonIcon src="/chevron-back-outline.svg"></IonIcon>
            </IonButton>

            <p className="black-label">Grille d'évaluation</p>
            <p className="orange-label"> Candidat n°{candidate}</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="content-evaluation">
        <div id="orga-header">
          <img
            className="logo-dash-eval"
            src="/logo.jpg"
            alt="Logo du concours"
          ></img>
          <div className="header-footer">
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
              <p className="note-label">
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
              <p className="note-label">
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
              <p className="note-label">
                Cuisson et qualité gustative des garnitures
              </p>
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
              <p className="note-label">
                Accord entre les garnitures et la pièce principale
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <CustomFormInput
          initial={observations}
          onInputChange={setObservations}
          placeholder="Observations (facultatif)"
        ></CustomFormInput>
        <p>{observations}</p>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          {" "}
          <div className="ion-text-center">
            <div id="bottom">
              <span className="black-label">
                {" "}
                Total évaluation dégustation{" "}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                {" "}
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
            <IonAlert
              isOpen={showAlert1}
              onDidDismiss={() => setShowAlert1(false)}
              message={"Les notes ont été correctement enregistrées"}
              buttons={["OK"]}
            />
            <span
              className="header-footer"
              style={{ textAlign: "center", padding: "10px 0px" }}
            >
              Vous pourrez revenir modifier ces notes ultérieurement.
            </span>
          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default TableEvaluationDegustation;
