import React, { useState } from "react";
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
  IonItem,
} from "@ionic/react";
import Logo from "../images/logo.jpg";
import "./TableEvaluationTechnique.css";
import { useHistory, useParams } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";

// ATTENTION : PROBLEME RESPONSIVITE SUR MOBILE
function TableEvaluationTechnique() {
  const history = useHistory();

  // Récupére le numéro de candidat dans l'URL
  const { candidate } = useParams<{ candidate: string }>();

  //   Retour liste candidats technique
  const handleBackClick = () => {
    history.push("/listingtechnique");
  };

  // TABLEAU NOTE PRODUCTION
  const [secuHygiene, setSecuHygiene] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [maitriseTech, setMaitriseTech] = useState("");
  const [timing, setTiming] = useState("");
  const [totalProduction, setTotalProduction] = useState(0);

  const handleSecuHygieneChange = (event: CustomEvent) => {
    setSecuHygiene(event.detail.value);
  };
  const handleOrganisationChange = (event: CustomEvent) => {
    setOrganisation(event.detail.value);
  };
  const handleMaitriseTechChange = (event: CustomEvent) => {
    setMaitriseTech(event.detail.value);
  };
  const handleTimingChange = (event: CustomEvent) => {
    setTiming(event.detail.value);
  };

  const [firstTotal, setFirstTotal] = useState(0);
  const [secondTotal, setSecondTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);

  // TABLEAU NOTE AUTONOMIE
  const [initiative, setInitiative] = useState("");
  const [harmonie, setHarmonie] = useState("");
  const [qualiteAccomp, setQualiteAccomp] = useState("");
  const [clarte, setClarte] = useState("");
  const [totalAutonomie, setTotalAutonomie] = useState(0);

  const handleInitiative = (event: CustomEvent) => {
    setInitiative(event.detail.value);
  };
  const handleHarmonie = (event: CustomEvent) => {
    setHarmonie(event.detail.value);
  };
  const handleQualiteAccomp = (event: CustomEvent) => {
    setQualiteAccomp(event.detail.value);
  };
  const handleClarte = (event: CustomEvent) => {
    setClarte(event.detail.value);
  };

  //   TABLEAU DEVELOPPEMENT DURABLE
  const [dechets, setDechets] = useState("");
  const [fluides, setFluides] = useState("");
  const [totalDurable, setTotalDurable] = useState(0);

  const handleDechets = (event: CustomEvent) => {
    setDechets(event.detail.value);
  };
  const handleFluides = (event: CustomEvent) => {
    setFluides(event.detail.value);
  };

  //   TABLEAU OPTIMISATION DU PANIER

  const [utilObligatoires, setUtilObligatoires] = useState("");
  const [utilLibres, setUtilLibres] = useState("");
  const [totalOptimisation, setTotalOptimisation] = useState(0);

  const handleUtilObligatoires = (event: CustomEvent) => {
    setUtilObligatoires(event.detail.value);
  };
  const handleUtilLibres = (event: CustomEvent) => {
    setUtilLibres(event.detail.value);
  };

  // Fonction qui permet de faire les calculs de totaux automatiquement lorsque l'on clique sur le bouton Validez l'évaluation.
  const handleValidateClick = () => {
    let SecuHygiene = parseFloat(secuHygiene);
    let Organisation = parseFloat(organisation);
    let MaitriseTech = parseFloat(maitriseTech);
    let Timing = parseFloat(timing);
    let totalProduct = SecuHygiene + Organisation + MaitriseTech + Timing;
    setTotalProduction(totalProduct);

    let Initiative = parseFloat(initiative);
    let Harmonie = parseFloat(harmonie);
    let QualiteAccompagnement = parseFloat(qualiteAccomp);
    let Clarte = parseFloat(clarte);
    let totalAutonomie = Initiative + Harmonie + QualiteAccompagnement + Clarte;
    setTotalAutonomie(totalAutonomie);

    let Total2tableaux = totalAutonomie + totalProduct;
    setFirstTotal(Total2tableaux);

    let Dechets = parseFloat(dechets);
    let Fluides = parseFloat(fluides);
    let totalDurable = Dechets + Fluides;
    setTotalDurable(totalDurable);

    let UtilObligatoires = parseFloat(utilObligatoires);
    let UtilLibres = parseFloat(utilLibres);
    let TotalOptimisation = UtilObligatoires + UtilLibres;
    setTotalOptimisation(TotalOptimisation);

    let Total2Tableauxbis = TotalOptimisation + totalDurable;
    setSecondTotal(Total2Tableauxbis);

    let TotalAllTableaux = Total2tableaux + Total2Tableauxbis;
    setAllTotal(TotalAllTableaux);
  };

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
          <u> Note de production</u>
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
            <IonCol size="1"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Respect des règles d'hygiène et de sécurité</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-5"
                type="number"
                value={secuHygiene}
                onIonChange={handleSecuHygieneChange}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
              <IonInput
                placeholder="0-5"
                type="number"
                value={organisation}
                onIonChange={handleOrganisationChange}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
              <IonInput
                placeholder="0-5"
                type="number"
                value={maitriseTech}
                onIonChange={handleMaitriseTechChange}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
              <IonInput
                placeholder="0-5"
                type="number"
                value={timing}
                onIonChange={handleTimingChange}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
            <IonCol size="1">
              <p>/20</p>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div id="tableau">
          <u> Note d'autonomie</u>
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
            <IonCol size="1"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Initiative laissée à la personne handicapée</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-10"
                type="number"
                value={initiative}
                onIonChange={handleInitiative}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
              <IonInput
                placeholder="0-7"
                type="number"
                value={harmonie}
                onIonChange={handleHarmonie}
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
          <IonRow>
            <IonCol size="5">
              <p>Qualité de l'accompagnement</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-7"
                type="number"
                value={qualiteAccomp}
                onIonChange={handleQualiteAccomp}
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
          <IonRow>
            <IonCol size="5">
              <p>Clarté des consignes</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-6"
                type="number"
                value={clarte}
                onIonChange={handleClarte}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
            <IonCol size="1">
              <p>/30</p>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* 1er total global des 2 tableaux précédents */}
        <IonRow class="ion-justify-content-center">
          <IonCol size="5">
            <p> Total : </p>
          </IonCol>
          <IonCol size="2">
            <p>{firstTotal}</p>
          </IonCol>
          <IonCol size="1">
            <p>/50</p>
          </IonCol>
        </IonRow>
        <IonItem lines="full" color={"warning"}></IonItem>

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
            <IonCol size="1"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Gestion des déchets</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-5"
                type="number"
                value={dechets}
                onIonChange={handleDechets}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
              <IonInput
                placeholder="0-5"
                type="number"
                value={fluides}
                onIonChange={handleFluides}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
            <IonCol size="1">
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
            <IonCol size="1"></IonCol>
            <IonCol>
              <i>Observations</i>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <p>Utilisation des produits obligatoires</p>
            </IonCol>
            <IonCol size="2">
              <IonInput
                placeholder="0-6"
                type="number"
                value={utilObligatoires}
                onIonChange={handleUtilObligatoires}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
              <IonInput
                placeholder="0-4"
                type="number"
                value={utilLibres}
                onIonChange={handleUtilLibres}
              >
                {" "}
              </IonInput>
            </IonCol>
            <IonCol size="1">
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
            <IonCol size="1">
              <p>/10</p>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* 2éme total global des 2 tableaux précédents */}
        <IonRow class="ion-justify-content-center">
          <IonCol size="5">
            <p> Total : </p>
          </IonCol>
          <IonCol size="2">
            <p>{secondTotal} </p>
          </IonCol>
          <IonCol size="1">
            <p>/20</p>
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center">
          <IonCol size="5">
            <p> Total évaluation technique : </p>
          </IonCol>
          <IonCol size="2">
            <p>{allTotal} </p>
          </IonCol>
          <IonCol size="1">
            <p>/20</p>
          </IonCol>
        </IonRow>
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

export default TableEvaluationTechnique;
