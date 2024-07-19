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
import axios from "axios";
import CustomNotesInput from "../components/InputNotes";
import CustomFormInput from "../components/InputForm";
import Alert from "../components/Alert";

type Criteria = {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
};

function TableEvaluationDegustation() {
  // Récupére le numéro de candidat dans l'URL
  const { candidat_id } = useParams<{ candidat_id: string }>();
  const history = useHistory();
  const [presentation, setPresentation] = useState(0);
  const [cuissonPrincipale, setCuissonPrincipale] = useState(0);
  const [cuissonGarniture, setCuissonGarniture] = useState(0);
  const [accordGlobal, setAccordGlobal] = useState(0);
  const [total, setTotal] = useState(0);
  const [observations, setObservations] = useState("");
  const [alertNoSend, setAlertNoSend] = useState(false);
  const [validateNote, setValidateNote] = useState(false);

  const criteria: Criteria[] = [
    {
      label: "presentation",
      description: "Présentation générale et netteté du contenant",
      value: presentation,
      min: 0,
      max: 9,
    },
    {
      label: "cuisson_principale",
      description: "Cuisson et qualité gustative de la pièce principale",
      value: cuissonPrincipale,
      min: 0,
      max: 7,
    },
    {
      label: "cuisson_garniture",
      description: "Cuisson et qualité gustative des garnitures",
      value: cuissonGarniture,
      min: 0,
      max: 7,
    },
    {
      label: "accord_global",
      description: "Accord entre les garnitures et la pièce principale",
      value: accordGlobal,
      min: 0,
      max: 7,
    },
  ];

  const handleInputChange = (value: number) => {
    setPresentation(value);
  };

  // Le total final se fait en temps réel dés qu'une note est rentrée dans un champ de note
  useEffect(() => {
    let Presentation = isNaN(Number(presentation)) ? 0 : Number(presentation);

    let total = Presentation;
    //
    setTotal(total);
  }, [presentation, total]);

  const configuration = {
    method: "post",
    url: "http://localhost:4000/add-to-notes",
    data: {},
  };

  const dataToSend = {
    note: presentation,
    criteria_name: criteria[0].label,
    candidat_id: candidat_id,
  };

  const notesInput = criteria.map((criterion) => {
    return (
      <CustomNotesInput
        key={criterion.label}
        min={criterion.min}
        max={criterion.max}
        onIonInput={(value) => handleInputChange(value)}
        value={criterion.value}
        noteLabel={criterion.description}
      />
    );
  });

  const handleSubmit = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    e.preventDefault();
    configuration.data = dataToSend;
    axios(configuration)
      .then((result) => {
        setValidateNote(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <p className="orange-label"> Candidat n°{candidat_id}</p>
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
          {notesInput}
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
                onClick={handleSubmit}
                className="txtButton"
              >
                Enregistrer
              </IonButton>
              <Alert
                showAlert={validateNote}
                setShowAlert={setValidateNote}
                message={"Les notes ont été correctement enregistrées"}
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
