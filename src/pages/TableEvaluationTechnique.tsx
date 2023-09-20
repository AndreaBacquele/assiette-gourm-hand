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
import "./TableEvaluationTechnique.css";
import { useHistory, useParams } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import CustomNotesInput from "../components/InputNotes";

// ATTENTION : PROBLEME RESPONSIVITE SUR MOBILE
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
        // tableau 2
        initiative: valuesAutonomie.initiative,
        qualiteAccomp: valuesAutonomie.qualiteAccomp,
        harmonie: valuesAutonomie.harmonie,
        clarte: valuesAutonomie.clarte,
        totalAutonomie,
        // tableau 3
        dechets: valuesDurable.dechets,
        fluides: valuesDurable.fluides,
        totalDurable,
        // tableau 4
        utilLibres: valuesOptimisation.utilLibres,
        utilObligatoires: valuesOptimisation.utilObligatoires,
        totalOptimisation,
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

          // Affichage éléments 2éme tableau : Autonomie
          setValuesAutonomie({
            initiative: candidateNotes.initiative || "",
            harmonie: candidateNotes.harmonie || "",
            qualiteAccomp: candidateNotes.qualiteAccomp || "",
            clarte: candidateNotes.clarte || "",
            totalAutonomie: 0,
          });
          setTotalAutonomie(candidateNotes.totalAutonomie || "");

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

          // Affichage élément 4éme tableau : Optimisation du panier
          setValuesOptimisation({
            utilObligatoires: candidateNotes.utilObligatoires || "",
            utilLibres: candidateNotes.utilLibres || "",
            totalOptimisation: 0,
          });
          setTotalOptimisation(candidateNotes.totalOptimisation || "");

          // Totaux finaux
          setAllTotal(candidateNotes.AllTotal || 0);
        }
      });
    }
  }, [store, candidate]);

  return (
    <>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <img alt="Logo du concours" src="../images/logo.jpg" />
            <IonCardTitle>Grille évaluation Jury Cuisine</IonCardTitle>
            <IonCardSubtitle>
              Sous le haut patronnage de Monsieur Emmanuel MACRON, Président de
              la République
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <p>Candidat n°{candidate}</p>

        <div id="tableau">
          <u> Notes de production</u>
        </div>
        {/*1er tableau : Note de production*/}
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <i>Critéres</i>
            </IonCol>
            <IonCol size="2">
              <i>Notation</i>
            </IonCol>
            <IonCol size="1.5"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Respect des règles d'hygiène et de sécurité</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={5}
                onIonInput={(value) => handleInputChange1("secuHygiene", value)}
                value={valuesProduction.secuHygiene}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/5</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Organisation du travail</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={5}
                onIonInput={(value) =>
                  handleInputChange1("organisation", value)
                }
                value={valuesProduction.organisation}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/5</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Maîtrise des techniques</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={5}
                onIonInput={(value) =>
                  handleInputChange1("maitriseTech", value)
                }
                value={valuesProduction.maitriseTech}
              ></CustomNotesInput>{" "}
            </IonCol>
            <IonCol size="1.5">
              <p>/5</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Envoi du plat en respectant le temps imparti</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={5}
                onIonInput={(value) => handleInputChange1("timing", value)}
                value={valuesProduction.timing}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/5</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p> Total : </p>
            </IonCol>
            <IonCol size="2">
              <p>{totalProduction}</p>
            </IonCol>
            <IonCol size="1.5">
              <p>/20</p>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div id="tableau">
          <u> Notes d'autonomie</u>
        </div>
        {/*2éme tableau : Note d'autonomie*/}
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <i>Critéres</i>
            </IonCol>
            <IonCol size="2">
              <i>Notation</i>
            </IonCol>
            <IonCol size="1.5"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Initiative laissée à la personne handicapée</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={10}
                onIonInput={(value) => handleInputChange2("initiative", value)}
                value={valuesAutonomie.initiative}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/10</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Harmonie globale du binôme</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={7}
                onIonInput={(value) => handleInputChange2("harmonie", value)}
                value={valuesAutonomie.harmonie}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/7</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Qualité de l'accompagnement</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={7}
                onIonInput={(value) =>
                  handleInputChange2("qualiteAccomp", value)
                }
                value={valuesAutonomie.qualiteAccomp}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/7</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Clarté des consignes</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={6}
                onIonInput={(value) => handleInputChange2("clarte", value)}
                value={valuesAutonomie.clarte}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/6</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p> Total : </p>
            </IonCol>
            <IonCol size="2">
              <p>{totalAutonomie} </p>
            </IonCol>
            <IonCol size="1.5">
              <p>/30</p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <br></br>
        {/* 1er total global des 2 tableaux précédents */}
        <IonRow class="ion-justify-content-center">
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
        <hr />
        <hr />
        {/* <IonItem lines="full" color={"warning"}></IonItem> */}

        {/* 3éme tableau : Note développement durable */}
        <div id="tableau">
          <u> Note développement durable</u>
        </div>
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <i>Critéres</i>
            </IonCol>
            <IonCol size="2">
              <i>Notation</i>
            </IonCol>
            <IonCol size="1.5"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Gestion des déchets</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={5}
                onIonInput={(value) => handleInputChange3("dechets", value)}
                value={valuesDurable.dechets}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/5</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Gestion des fluides (eau,gaz,électricité)</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={5}
                onIonInput={(value) => handleInputChange3("fluides", value)}
                value={valuesDurable.fluides}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/5</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p> Total : </p>
            </IonCol>
            <IonCol size="2">
              <p>{totalDurable} </p>
            </IonCol>
            <IonCol size="1.5">
              <p>/10</p>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* 4éme tableau : Note optimisation du panier */}
        <div id="tableau">
          <u> Note optimisation du panier</u>
        </div>
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="5">
              <i>Critéres</i>
            </IonCol>
            <IonCol size="2">
              <i>Notation</i>
            </IonCol>
            <IonCol size="1.5"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Utilisation des produits obligatoires</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={6}
                onIonInput={(value) =>
                  handleInputChange4("utilObligatoires", value)
                }
                value={valuesOptimisation.utilObligatoires}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/6</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Utilisation des produits libres</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                min={0}
                max={4}
                onIonInput={(value) => handleInputChange4("utilLibres", value)}
                value={valuesOptimisation.utilLibres}
              ></CustomNotesInput>
            </IonCol>
            <IonCol size="1.5">
              <p>/4</p>
            </IonCol>
            <IonCol>
              <IonInput placeholder="..."> </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p> Total : </p>
            </IonCol>
            <IonCol size="2">
              <p>{totalOptimisation}</p>
            </IonCol>
            <IonCol size="1.5">
              <p>/10</p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <br></br>

        {/* 2éme total global des 2 tableaux précédents */}
        <IonRow class="ion-justify-content-center">
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
        <hr />
        <IonRow class="ion-justify-content-center">
          <IonCol size="5">
            <p> Total évaluation technique : </p>
          </IonCol>
          <IonCol size="2">
            <p>{AllTotal} </p>
          </IonCol>
          <IonCol size="1.5">
            <p>/70</p>
          </IonCol>
        </IonRow>
        <br></br>
        <div className="ion-text-center">
          <IonButton color={"success"} onClick={handleValidateClick}>
            {/* <IonIcon icon={refreshOutline}/> */}
            Validez l'évaluation
          </IonButton>
        </div>
      </IonContent>
    </>
  );
}

export default TableEvaluationTechnique;
