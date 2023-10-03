import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonFooter,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import CustomNotesInput from "../components/InputNotes";
import CustomFormInput from "../components/InputForm";

function TableEvaluationTechnique() {
  const history = useHistory();
  const { store } = useStorage();

  // Récupére le numéro de candidat dans l'URL
  const { candidate } = useParams<{ candidate: string }>();

  const [TotalProductAutonomie, setTotalProductAutonomie] = useState(0);
  const [TotalOptiDurable, setTotalOptiDurable] = useState(0);
  const [AllTotal, setAllTotal] = useState(0);

  // TABLEAU 1 : NOTE PRODUCTION

  const [valuesProduction, setValuesProduction] = useState({
    secuHygiene: "",
    organisation: "",
    maitriseTech: "",
    timing: "",
    totalProduction: 0,
  });
  const [totalProduction, setTotalProduction] = useState(0);
  const [observationsProduction, setObservationsProduction] = useState("");

  // Récupération de la valeur des inputs
  const handleInputChange1 = (key: string, value: string) => {
    setValuesProduction((prevValues) => ({ ...prevValues, [key]: value }));
  };

  // Affichage-calcul en temps réel du calcul du total 1ER TABLEAU : Production
  useEffect(() => {
    let SecuHygiene =
      valuesProduction.secuHygiene === ""
        ? 0
        : parseFloat(valuesProduction.secuHygiene);
    let Organisation =
      valuesProduction.organisation === ""
        ? 0
        : parseFloat(valuesProduction.organisation);
    let Timing =
      valuesProduction.timing === "" ? 0 : parseFloat(valuesProduction.timing);
    let MaitriseTech =
      valuesProduction.maitriseTech === ""
        ? 0
        : parseFloat(valuesProduction.maitriseTech);
    let TotalProduct = SecuHygiene + Organisation + Timing + MaitriseTech;
    setTotalProduction(TotalProduct);
  }, [valuesProduction, totalProduction]);

  // TABLEAU 2 : NOTES AUTONOMIE

  const [valuesAutonomie, setValuesAutonomie] = useState({
    initiative: "",
    harmonie: "",
    qualiteAccomp: "",
    clarte: "",
    totalAutonomie: 0,
  });
  const [totalAutonomie, setTotalAutonomie] = useState(0);
  const [observationsAutonomie, setObservationsAutonomie] = useState("");

  // Récupération de la valeur des inputs
  const handleInputChange2 = (key: string, value: string) => {
    setValuesAutonomie((prevValues) => ({ ...prevValues, [key]: value }));
  };

  // Affichage-calcul en temps réel du calcul du total 2EME TABLEAU : Autonomie
  useEffect(() => {
    let Initiative =
      valuesAutonomie.initiative === ""
        ? 0
        : parseFloat(valuesAutonomie.initiative);
    let Harmonie =
      valuesAutonomie.harmonie === ""
        ? 0
        : parseFloat(valuesAutonomie.harmonie);
    let QualiteAccompagnement =
      valuesAutonomie.qualiteAccomp === ""
        ? 0
        : parseFloat(valuesAutonomie.qualiteAccomp);
    let Clarte =
      valuesAutonomie.clarte === "" ? 0 : parseFloat(valuesAutonomie.clarte);
    let totalAutonomie = Initiative + Harmonie + QualiteAccompagnement + Clarte;
    setTotalAutonomie(totalAutonomie);
  }, [valuesAutonomie, totalAutonomie]);

  //   TABLEAU 3 : DEVELOPPEMENT DURABLE

  const [valuesDurable, setValuesDurable] = useState({
    dechets: "",
    fluides: "",
    totalDurable: 0,
  });
  const [totalDurable, setTotalDurable] = useState(0);
  const [observationsDurable, setObservationsDurable] = useState("");

  // Récupération de la valeur des inputs
  const handleInputChange3 = (key: string, value: string) => {
    setValuesDurable((prevValues) => ({ ...prevValues, [key]: value }));
  };

  // Affichage-calcul en temps réel du calcul du total 3EME TABLEAU : Développement durable
  useEffect(() => {
    let Dechets =
      valuesDurable.dechets === "" ? 0 : parseFloat(valuesDurable.dechets);
    let Fluides =
      valuesDurable.fluides === "" ? 0 : parseFloat(valuesDurable.fluides);
    let totalDurable = Dechets + Fluides;
    setTotalDurable(totalDurable);
  }, [valuesDurable, totalDurable]);

  //   TABLEAU OPTIMISATION DU PANIER

  const [valuesOptimisation, setValuesOptimisation] = useState({
    utilObligatoires: "",
    utilLibres: "",
    totalOptimisation: 0,
  });
  const [totalOptimisation, setTotalOptimisation] = useState(0);
  const [observationsOptimisation, setObservationsOptimisation] = useState("");

  const handleInputChange4 = (key: string, value: string) => {
    setValuesOptimisation((prevValues) => ({ ...prevValues, [key]: value }));
  };

  // Affichage-calcul en temps réel du calcul du total intermédiaire
  useEffect(() => {
    let TotalProductAutonomie = totalAutonomie + totalProduction;
    setTotalProductAutonomie(TotalProductAutonomie);
  }, [totalAutonomie, totalProduction]);

  // Affichage-calcul en temps réel du calcul du total 4EME TABLEAU : Optimisation du panier
  useEffect(() => {
    let UtilObligatoires =
      valuesOptimisation.utilObligatoires === ""
        ? 0
        : parseFloat(valuesOptimisation.utilObligatoires);
    let UtilLibres =
      valuesOptimisation.utilLibres === ""
        ? 0
        : parseFloat(valuesOptimisation.utilLibres);
    let totalOptimisation = UtilObligatoires + UtilLibres;
    setTotalOptimisation(totalOptimisation);
  }, [valuesOptimisation, totalOptimisation]);

  // Affichage-calcul en temps réel du calcul du total 1er tableau + 2éme tableau : Optimisation du panier
  useEffect(() => {
    let TotalDurableOpti = totalOptimisation + totalDurable;
    setTotalOptiDurable(TotalDurableOpti);
  }, [totalOptimisation, totalProduction]);

  useEffect(() => {
    let TotalAllTableaux = TotalProductAutonomie + TotalOptiDurable;
    setAllTotal(TotalAllTableaux);
  });

  // Fonction qui permet de stocker les données lorsque l'on clique sur le bouton Validez l'évaluation.
  const handleValidateClick = () => {
    if (store) {
      let candidates_notes = {
        // tableau 1
        secuHygiene: valuesProduction.secuHygiene,
        organisation: valuesProduction.organisation,
        maitriseTech: valuesProduction.maitriseTech,
        timing: valuesProduction.timing,
        totalProduction,
        observationsProduction: observationsProduction,
        // tableau 2
        initiative: valuesAutonomie.initiative,
        qualiteAccomp: valuesAutonomie.qualiteAccomp,
        harmonie: valuesAutonomie.harmonie,
        clarte: valuesAutonomie.clarte,
        totalAutonomie,
        observationsAutonomie: observationsAutonomie,
        // tableau 3
        dechets: valuesDurable.dechets,
        fluides: valuesDurable.fluides,
        totalDurable,
        observationsDurable: observationsDurable,
        // tableau 4
        utilLibres: valuesOptimisation.utilLibres,
        utilObligatoires: valuesOptimisation.utilObligatoires,
        totalOptimisation,
        observationsOptimistion: observationsOptimisation,
        // totaux
        TotalProductAutonomie,
        TotalOptiDurable,
        AllTotal,
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
        history.push("/listingtechnique");
      });
    }
  };

  //  Affichage des élements dans chaque case dés que la grille a été sauvegardée
  useEffect(() => {
    if (store) {
      store.get("notes").then((all_notes: Record<string, any>) => {
        const candidateNotes = all_notes["candidat" + candidate];
        if (candidateNotes) {
          // Affichage éléments 1er tableau : Production
          setValuesProduction({
            secuHygiene: candidateNotes.secuHygiene || "",
            organisation: candidateNotes.organisation || "",
            maitriseTech: candidateNotes.maitriseTech || "",
            timing: candidateNotes.timing || "",
            totalProduction: candidateNotes.totalProduction || "",
          });

          setObservationsProduction(observationsProduction);

          // Affichage éléments 2éme tableau : Autonomie
          setValuesAutonomie({
            initiative: candidateNotes.initiative || "",
            harmonie: candidateNotes.harmonie || "",
            qualiteAccomp: candidateNotes.qualiteAccomp || "",
            clarte: candidateNotes.clarte || "",
            totalAutonomie: 0,
          });
          setTotalAutonomie(candidateNotes.totalAutonomie || "");
          setObservationsAutonomie(observationsAutonomie);

          // Affichage total intermédiaire
          setTotalProductAutonomie(candidateNotes.TotalProductAutonomie || "");
          setTotalOptiDurable(candidateNotes.TotalDurableOpti || "");

          // Affichage éléments 3éme tableau : Développement durable
          setValuesDurable({
            dechets: candidateNotes.dechets || "",
            fluides: candidateNotes.fluides || "",
            totalDurable: 0,
          });
          setTotalDurable(candidateNotes.totalDurable || "");
          setObservationsDurable(observationsDurable);

          // Affichage élément 4éme tableau : Optimisation du panier
          setValuesOptimisation({
            utilObligatoires: candidateNotes.utilObligatoires || "",
            utilLibres: candidateNotes.utilLibres || "",
            totalOptimisation: 0,
          });
          setTotalOptimisation(candidateNotes.totalOptimisation || "");
          setObservationsOptimisation(observationsOptimisation);

          // Totaux finaux
          setAllTotal(candidateNotes.AllTotal || 0);
        }
      });
    }
  }, [store, candidate]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div id="top">
            <IonIcon src="/chevron-back-outline.svg"></IonIcon>
            <p className="black-label">Grille d'évaluation</p>
            <p className="orange-label"> Candidat n°{candidate}</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-evaluation">
        <div id="orga-header" style={{ padding: "5px", alignItems: "center" }}>
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

        {/*1er tableau : Note de production*/}
        <p className="orange-label"> Notes de production</p>

        <IonGrid fixed={true}>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={5}
              onIonInput={(value) => handleInputChange1("secuHygiene", value)}
              value={valuesProduction.secuHygiene}
            ></CustomNotesInput>
            <IonCol>
              <span className="note-label">
                Respect des règles d'hygiène et de sécurité
              </span>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={5}
              onIonInput={(value) => handleInputChange1("organisation", value)}
              value={valuesProduction.organisation}
            ></CustomNotesInput>
            <IonCol>
              <span className="note-label">Organisation du travail</span>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={5}
              onIonInput={(value) => handleInputChange1("maitriseTech", value)}
              value={valuesProduction.maitriseTech}
            ></CustomNotesInput>
            <IonCol>
              <span className="note-label">Maîtrise des techniques</span>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={5}
              onIonInput={(value) => handleInputChange1("timing", value)}
              value={valuesProduction.timing}
            ></CustomNotesInput>
            <IonCol>
              <span className="note-label">
                Envoi du plat en respectant le temps imparti
              </span>
            </IonCol>
          </IonRow>

          <IonRow>{totalProduction} / 20 Total</IonRow>
          <IonRow>
            <CustomFormInput
              initial={observationsProduction}
              onInputChange={setObservationsProduction}
              placeholder="Observations (facultatif)"
            ></CustomFormInput>
          </IonRow>
        </IonGrid>
        <br></br>

        {/*2éme tableau : Note d'autonomie*/}
        <p className="orange-label"> Notes d'autonomie</p>

        <IonGrid fixed={true}>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={10}
              onIonInput={(value) => handleInputChange2("initiative", value)}
              value={valuesAutonomie.initiative}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">
                Initiative laissée à la personne handicapée
              </p>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={7}
              onIonInput={(value) => handleInputChange2("harmonie", value)}
              value={valuesAutonomie.harmonie}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">Harmonie globale du binôme</p>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={7}
              onIonInput={(value) => handleInputChange2("qualiteAccomp", value)}
              value={valuesAutonomie.qualiteAccomp}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">Qualité de l'accompagnement</p>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={6}
              onIonInput={(value) => handleInputChange2("clarte", value)}
              value={valuesAutonomie.clarte}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">Clarté des consignes</p>
            </IonCol>
          </IonRow>
          <IonRow>{totalAutonomie} / 30 Total</IonRow>
          <IonRow>
            <CustomFormInput
              initial={observationsAutonomie}
              onInputChange={setObservationsAutonomie}
              placeholder="Observations (facultatif)"
            ></CustomFormInput>
          </IonRow>
        </IonGrid>
        <br></br>

        {/* VOIR SI AFFICHAGE TOTAL INTERMEDIAIRE */}
        {/* 1er total global des 2 tableaux précédents */}
        {/* <IonRow class="ion-justify-content-center">
          <IonCol size="5">
            <p> Total : </p>
          </IonCol>
          <IonCol size="2">
            <p>{TotalProductAutonomie}</p>
          </IonCol>
          <IonCol size="1.5">
            <p>/50</p>
          </IonCol>
        </IonRow>
        <br></br>
        <hr /> */}
        {/* 3éme tableau : Note développement durable */}

        <p className="orange-label"> Note développement durable</p>

        <IonGrid fixed={true}>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={5}
              onIonInput={(value) => handleInputChange3("dechets", value)}
              value={valuesDurable.dechets}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">Gestion des déchets</p>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={5}
              onIonInput={(value) => handleInputChange3("fluides", value)}
              value={valuesDurable.fluides}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">
                Gestion des fluides (eau,gaz,électricité)
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            {/* TODO: faire pareil pour l'aligner dans tous les tableaux */}
            <IonCol size="3">{totalDurable} / 10</IonCol>
            <IonCol className="note-total">Total</IonCol>
          </IonRow>
          <IonRow>
            <CustomFormInput
              initial={observationsDurable}
              onInputChange={setObservationsDurable}
              placeholder="Observations (facultatif)"
            ></CustomFormInput>
          </IonRow>
        </IonGrid>
        <br></br>

        {/* 4éme tableau : Note optimisation du panier */}
        {/* <div id="tableau"> */}
        <p className="orange-label"> Note optimisation du panier</p>
        {/* </div> */}
        <IonGrid fixed={true}>
          <IonRow>
            <CustomNotesInput
              min={0}
              max={6}
              onIonInput={(value) =>
                handleInputChange4("utilObligatoires", value)
              }
              value={valuesOptimisation.utilObligatoires}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">
                Utilisation des produits obligatoires
              </p>
            </IonCol>
          </IonRow>

          <IonRow>
            <CustomNotesInput
              min={0}
              max={4}
              onIonInput={(value) => handleInputChange4("utilLibres", value)}
              value={valuesOptimisation.utilLibres}
            ></CustomNotesInput>
            <IonCol>
              <p className="note-label">Utilisation des produits libres</p>
            </IonCol>
          </IonRow>

          <IonRow>{totalOptimisation} / 10 Total</IonRow>
          <IonRow>
            <CustomFormInput
              initial={observationsOptimisation}
              onInputChange={setObservationsOptimisation}
              placeholder="Observations (facultatif)"
            ></CustomFormInput>
          </IonRow>
        </IonGrid>
        <br></br>

        {/* VOIR SI AFFICHAGE TOTAL INTERMEDIAIRE */}

        {/* 2éme total global des 2 tableaux précédents */}
        {/* <IonRow class="ion-justify-content-center">
          <IonCol size="5">
            <p> Total : </p>
          </IonCol>
          <IonCol size="2">
            <p>{TotalOptiDurable} </p>
          </IonCol>
          <IonCol size="1.5">
            <p>/20</p>
          </IonCol>
        </IonRow>
        <br></br>
        <hr />
        <hr /> */}
      </IonContent>

      <IonFooter>
        <IonToolbar>
          {" "}
          <div className="ion-text-center">
            <div id="bottom">
              <span className="black-label"> Total évaluation technique </span>
              <span
                style={{
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                {" "}
                {AllTotal} / 70{" "}
              </span>
            </div>
            <IonButton
              expand="block"
              type="submit"
              color={"warning"}
              onClick={handleValidateClick}
            >
              Enregistrer
            </IonButton>
            <span className="header-footer">
              Vous pourrez revenir modifier ces notes ultérieurement.
            </span>
          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default TableEvaluationTechnique;
