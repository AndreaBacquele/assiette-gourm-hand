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

type Note = {
  label: string;
  value: number;
};

function TableEvaluationDegustation() {
  // Récupére le numéro de candidat dans l'URL
  const { candidat_id } = useParams<{ candidat_id: string }>();
  const [alertNoSend, setAlertNoSend] = useState(false);

  //Récupération des informations des inputs
  const [presentation, setPresentation] = useState(0);
  const [total, setTotal] = useState(0);
  const [observations, setObservations] = useState("");

  const handleInputChange = (value: number) => {
    setPresentation(value);
  };

  // Le total final se fait en temps réel dés qu'une note est rentrée dans un champ de note
  // useEffect(() => {
  //   let Presentation = isNaN(Number(values.presentation))
  //     ? 0
  //     : Number(values.presentation);
  //   let CuissonGarniture = isNaN(Number(values.cuissonGarniture))
  //     ? 0
  //     : Number(values.cuissonGarniture);
  //   let CuissonPrincipale = isNaN(Number(values.cuissonPrincipale))
  //     ? 0
  //     : Number(values.cuissonPrincipale);
  //   let AccordGlobal = isNaN(Number(values.accordGlobal))
  //     ? 0
  //     : Number(values.accordGlobal);
  //   let total =
  //     CuissonGarniture + Presentation + CuissonPrincipale + AccordGlobal;
  //   setTotal(total);
  // }, [values, total]);

  const history = useHistory();
  const [validateNote, setValidateNote] = useState(false);

  const configuration = {
    method: "post",
    url: "http://localhost:4000/add-to-notes",
    data: {},
  };

  const handleSubmit = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
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
          <CustomNotesInput
            min={0}
            max={9}
            onIonInput={(value) => handleInputChange(value)}
            value={presentation}
            noteLabel="Présentation générale et netteté du contenant"
          ></CustomNotesInput>

          {/* <CustomNotesInput
            min={0}
            max={7}
            onIonInput={(value) =>
              handleInputChange("cuissonPrincipale", value)
            }
            value={values.cuissonPrincipale}
            noteLabel="Cuisson et qualité gustative de la pièce principale"
          ></CustomNotesInput>

          <CustomNotesInput
            min={0}
            max={7}
            onIonInput={(value) => handleInputChange("cuissonGarniture", value)}
            value={values.cuissonGarniture}
            noteLabel="Cuisson et qualité gustative des garnitures"
          ></CustomNotesInput>

          <CustomNotesInput
            min={0}
            max={7}
            onIonInput={(value) => handleInputChange("accordGlobal", value)}
            value={values.accordGlobal}
            noteLabel="Accord entre les garnitures et la pièce principale"
          ></CustomNotesInput> */}

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
                // onClick={handleValidateClick}
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
