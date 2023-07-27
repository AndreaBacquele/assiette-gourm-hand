import React, {useState} from 'react';
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
IonContent} from '@ionic/react';
import Logo from '../images/logo.jpg';
import './TableEvaluationDegustation.css';
import { useHistory } from 'react-router-dom';
import { Storage } from '@ionic/storage';
import {useStorage} from '../hooks/useStorage'

// import { refreshOutline } from 'ionicons/dist/types/components/icon/icon';

// ATTENTION : Probléme responsivité du tableau sur mobile


function TableEvaluationDegustation(){

    const {store} = useStorage();
    //Récupération des informations des inputs
    const [presentation, setPresentation] = useState('');
    const [cuissonPrincipale, setCuissonPrincipale] = useState('');
    const [cuissonGarniture, setCuissonGarniture] = useState('');
    const [accordGlobal, setAccordGlobal] = useState('');

    const handlePresentationChange = (event: CustomEvent) => {
        setPresentation(event.detail.value);
    };
    const handleCuissonPrincipaleChange = (event: CustomEvent) => {
        setCuissonPrincipale(event.detail.value);
    };
    const handleCuissonGarnitureChange = (event: CustomEvent) => {
        setCuissonGarniture(event.detail.value);
    };
    const handleAccordGlobal = (event: CustomEvent) => {
        setAccordGlobal(event.detail.value);
    };


    //Permet de faire le calcul du total quand on appuie sur le bouton validez l'évaluation

    const [total, setTotal] = useState(0);
    const handleValidateClick = () => {
        let floatPresentation = parseFloat(presentation)
        let floatCuissonGarniture = parseFloat(cuissonGarniture)
        let floatCuissonPrincipale = parseFloat(cuissonPrincipale)
        let floatAccordGlobal = parseFloat(accordGlobal)
        let total = floatCuissonGarniture + floatPresentation + floatCuissonPrincipale + floatAccordGlobal
        console.log(total)
        setTotal(total)
        if(store){
            store.set('noteDegustation', {floatPresentation, floatCuissonGarniture,  floatCuissonPrincipale, floatAccordGlobal, total });
            }
        }

        
    //Redirection vers la page listingCandidatDegustation
    const history = useHistory();
    const handleBackClick = () => {
    history.push('/listingdegustation');
    }

    return (
        <>
    <IonContent>
        <IonCard>
            <IonCardHeader>
            <img alt="Logo du concours" src="../images/logo.jpg" />
                <IonCardTitle>Grille évaluation Jury Dégustation</IonCardTitle>
                <IonCardSubtitle>Sous le haut patronnage de Monsieur Emmanuel MACRON, Président de la République</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>Note de présentation et de dégustation.</IonCardContent>
        </IonCard>
        {/* A voir si utilisation de card ou juste affichage des phrases et réglage en CSS */}
        {/* <h6>Sous le haut patronnage de Monsieur Emmanuel MACRON, Président de la République</h6>
        <h6> Note de présentation et de dégustation</h6> */}

    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><p>Critéres</p></IonCol>
            <IonCol size="2"><p>Notation</p></IonCol>
            <IonCol size="1"></IonCol>
            <IonCol><p>Observations</p></IonCol>
        </IonRow>
    </IonGrid>

    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><p>Présentation générale et netteté du contenant</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-9' type='number' value={presentation} onIonChange={handlePresentationChange}> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/9</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
    </IonGrid>

    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><p>Cuisson et qualité gustative de la pièce principale</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-7' type='number' value={cuissonPrincipale} onIonChange={handleCuissonPrincipaleChange}> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/7</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
    </IonGrid>

    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><p>Cuisson et qualité gustative des garnitures</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-7' type='number' value={cuissonGarniture} onIonChange={handleCuissonGarnitureChange}></IonInput>
            </IonCol>
            <IonCol size="1"><p>/7</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
    </IonGrid>

    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><p>Accord entre les garnitures et la pièce principale</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-7' type="number" value={accordGlobal} onIonChange={handleAccordGlobal}> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/7</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
    </IonGrid>

    <IonGrid  fixed={true}>
        <IonRow>
            <IonCol size='5'>
                <p> Total : </p>
            </IonCol>
            <IonCol size='2'>
                <p> {total} </p> 
            </IonCol>
            <IonCol size='1'><p>/30</p></IonCol>
        </IonRow>
    </IonGrid>
    <div className="ion-text-center">
    <IonButton color={'success'} onClick={handleValidateClick}>
        {/* <IonIcon icon={refreshOutline}/> */}
            Validez l'évaluation
    </IonButton>
    <IonButton color='warning' onClick={handleBackClick}>
        {/* <IonIcon icon={refreshOutline}/> */}
            Retour à la liste des Candidats
    </IonButton>
    </div>
    </IonContent>
        </>
    );
}

export default TableEvaluationDegustation