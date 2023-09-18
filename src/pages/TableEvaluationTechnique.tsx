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

  // TABLEAU NOTE PRODUCTION
  const [secuHygiene, setSecuHygiene] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [maitriseTech, setMaitriseTech] = useState("");
  const [timing, setTiming] = useState("");
  const [totalProduction, setTotalProduction] = useState(0);

  const handleSecuHygieneChange = (value: string) => {
    setSecuHygiene(value);
  };
  const handleOrganisationChange = (value: string) => {
    setOrganisation(value);
  };
  const handleMaitriseTechChange = (value: string) => {
    setMaitriseTech(value);
  };
  const handleTimingChange = (value: string) => {
    setTiming(value);
  };

  // TABLEAU NOTE AUTONOMIE
  const [initiative, setInitiative] = useState("");
  const [harmonie, setHarmonie] = useState("");
  const [qualiteAccomp, setQualiteAccomp] = useState("");
  const [clarte, setClarte] = useState("");
  const [totalAutonomie, setTotalAutonomie] = useState(0);

  const handleInitiative = (value: string) => {
    setInitiative(value);
  };
  const handleHarmonie = (value: string) => {
    setHarmonie(value);
  };
  const handleQualiteAccomp = (value: string) => {
    setQualiteAccomp(value);
  };
  const handleClarte = (value: string) => {
    setClarte(value);
  };

  //   TABLEAU DEVELOPPEMENT DURABLE
  const [dechets, setDechets] = useState("");
  const [fluides, setFluides] = useState("");
  const [totalDurable, setTotalDurable] = useState(0);

  const handleDechets = (value: string) => {
    setDechets(value);
  };
  const handleFluides = (value: string) => {
    setFluides(value);
  };

  //   TABLEAU OPTIMISATION DU PANIER

  const [utilObligatoires, setUtilObligatoires] = useState("");
  const [utilLibres, setUtilLibres] = useState("");
  const [totalOptimisation, setTotalOptimisation] = useState(0);

  const handleUtilObligatoires = (value: string) => {
    setUtilObligatoires(value);
  };
  const handleUtilLibres = (value: string) => {
    setUtilLibres(value);
  };

  // Affichage-calcul en temps réel du calcul du total 1ER TABLEAU : Production
  useEffect(() => {
    let SecuHygiene = secuHygiene === "" ? 0 : parseFloat(secuHygiene);
    let Organisation = organisation === "" ? 0 : parseFloat(organisation);
    let Timing = timing === "" ? 0 : parseFloat(timing);
    let MaitriseTech = maitriseTech === "" ? 0 : parseFloat(maitriseTech);
    let TotalProduct = SecuHygiene + Organisation + Timing + MaitriseTech;
    setTotalProduction(TotalProduct);
  }, [secuHygiene, organisation, maitriseTech, timing, totalProduction]);

  // Affichage-calcul en temps réel du calcul du total 2EME TABLEAU : Autonomie
  useEffect(() => {
    let Initiative = initiative === "" ? 0 : parseFloat(initiative);
    let Harmonie = harmonie === "" ? 0 : parseFloat(harmonie);
    let QualiteAccompagnement =
      qualiteAccomp === "" ? 0 : parseFloat(qualiteAccomp);
    let Clarte = clarte === "" ? 0 : parseFloat(clarte);
    let totalAutonomie = Initiative + Harmonie + QualiteAccompagnement + Clarte;
    setTotalAutonomie(totalAutonomie);
  }, [initiative, harmonie, qualiteAccomp, clarte, totalAutonomie]);

  // Affichage-calcul en temps réel du calcul du total intermédiaire
  useEffect(() => {
    let TotalProductAutonomie = totalAutonomie + totalProduction;
    setTotalProductAutonomie(TotalProductAutonomie);
  }, [totalAutonomie, totalProduction]);

  // Affichage-calcul en temps réel du calcul du total 3EME TABLEAU : Développement durable
  useEffect(() => {
    let Dechets = dechets === "" ? 0 : parseFloat(dechets);
    let Fluides = fluides === "" ? 0 : parseFloat(fluides);
    let totalDurable = Dechets + Fluides;
    setTotalDurable(totalDurable);
  }, [dechets, fluides, totalDurable]);

  // Affichage-calcul en temps réel du calcul du total 4EME TABLEAU : Optimisation du panier
  useEffect(() => {
    let UtilObligatoires =
      utilObligatoires === "" ? 0 : parseFloat(utilObligatoires);
    let UtilLibres = utilLibres === "" ? 0 : parseFloat(utilLibres);
    let totalOptimisation = UtilObligatoires + UtilLibres;
    setTotalOptimisation(totalOptimisation);
  }, [utilObligatoires, utilLibres, totalOptimisation]);

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
        secuHygiene,
        organisation,
        maitriseTech,
        timing,
        totalProduction,
        initiative,
        qualiteAccomp,
        harmonie,
        clarte,
        totalAutonomie,
        dechets,
        fluides,
        totalDurable,
        utilLibres,
        utilObligatoires,
        totalOptimisation,
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
          setSecuHygiene(candidateNotes.secuHygiene || "");
          setOrganisation(candidateNotes.organisation || "");
          setMaitriseTech(candidateNotes.maitriseTech || "");
          setTiming(candidateNotes.timing || "");
          setTotalProduction(candidateNotes.totalProduction || "");

          // Affichage éléments 2éme tableau : Autonomie
          setInitiative(candidateNotes.initiative || "");
          setHarmonie(candidateNotes.harmonie || "");
          setQualiteAccomp(candidateNotes.qualiteAccomp || "");
          setClarte(candidateNotes.clarte || "");
          setTotalAutonomie(candidateNotes.totalAutonomie || "");

          // Affichage total intermédiaire
          setTotalProductAutonomie(candidateNotes.TotalProductAutonomie || "");
          setTotalOptiDurable(candidateNotes.TotalDurableOpti || "");

          // Affichage éléments 3éme tableau : Développement durable
          setDechets(candidateNotes.dechets || "");
          setFluides(candidateNotes.fluides || "");
          setTotalDurable(candidateNotes.totalDurable || "");

          // Affichage élément 4éme tableau : Optimisation du panier
          setUtilObligatoires(candidateNotes.utilObligatoires || "");
          setUtilLibres(candidateNotes.utilLibres || "");
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
                placeholder="0-5"
                min={0}
                max={5}
                onInputChange={handleSecuHygieneChange}
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
                placeholder="0-5"
                min={0}
                max={5}
                onInputChange={handleOrganisationChange}
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
                placeholder="0-5"
                min={0}
                max={5}
                onInputChange={handleMaitriseTechChange}
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
              <p>Envoi du plat en respectant le temps imparti</p>
            </IonCol>
            <IonCol size="2">
              <CustomNotesInput
                placeholder="0-5"
                min={0}
                max={5}
                onInputChange={handleTimingChange}
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
                placeholder="0-10"
                min={0}
                max={10}
                onInputChange={handleInitiative}
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
                placeholder="0-7"
                min={0}
                max={7}
                onInputChange={handleHarmonie}
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
                placeholder="0-7"
                min={0}
                max={7}
                onInputChange={handleQualiteAccomp}
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
                placeholder="0-6"
                min={0}
                max={6}
                onInputChange={handleClarte}
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
                placeholder="0-5"
                min={0}
                max={5}
                onInputChange={handleDechets}
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
                placeholder="0-5"
                min={0}
                max={5}
                onInputChange={handleFluides}
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
                placeholder="0-6"
                min={0}
                max={6}
                onInputChange={handleUtilObligatoires}
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
                placeholder="0-4"
                min={0}
                max={4}
                onInputChange={handleUtilLibres}
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
