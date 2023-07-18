import React from 'react';
import { 
IonCard, 
IonCardContent, 
IonCardHeader, 
IonCardSubtitle, 
IonCardTitle,
IonGrid,
IonCol,
IonRow,
IonInput, } from '@ionic/react';
import Logo from '../images/logo.jpg';
import './TableEvaluationDegustation.css';


function TableEvaluationDegustation(){
    return (
        <>
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
                <IonInput placeholder='0-9'> </IonInput>
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
                <IonInput placeholder='0-7'> </IonInput>
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
                <IonInput placeholder='0-7'></IonInput>
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
                <IonInput placeholder='0-7'> </IonInput>
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
                {/* Mettre le calcul de la note moyenne */}
            </IonCol>
            <IonCol size='1'><p>/30</p></IonCol>
        </IonRow>
    </IonGrid>
        </>
    );
}

export default TableEvaluationDegustation