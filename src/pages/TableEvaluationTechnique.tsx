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
IonContent,
IonItem} from '@ionic/react';
import Logo from '../images/logo.jpg';
import './TableEvaluationTechnique.css';
import { useHistory } from 'react-router-dom';
// ATTENTION : PROBLEME RESPONSIVITE SUR MOBILE
function TableEvaluationTechnique(){


    return(
    <>
<IonContent>
    <IonCard>
        <IonCardHeader>
            <img alt="Logo du concours" src="../images/logo.jpg" />
            <IonCardTitle>Grille évaluation Jury Cuisine</IonCardTitle>
            <IonCardSubtitle>Sous le haut patronnage de Monsieur Emmanuel MACRON, Président de la République</IonCardSubtitle>
        </IonCardHeader>
    </IonCard>

        <div id='tableau'><u> Note de production</u></div>
        {/*1er tableau : Note de production*/}
    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><i>Critéres</i></IonCol>
            <IonCol size="2"><i>Notation</i></IonCol>
            <IonCol size="1"></IonCol>
            <IonCol><i>Observations</i></IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Respect des règles d'hygiène et de sécurité</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-5' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/5</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Organisation du travail</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-5' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/5</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Maîtrise des techniques</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-5' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/5</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Envoi du plat en respectant le temps imparti</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-5' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/5</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'>
                <p> Total : </p>
            </IonCol>
            <IonCol size='2'>
                <p>  </p> 
            </IonCol>
            <IonCol size='1'><p>/20</p></IonCol>
        </IonRow>
    </IonGrid>

        <div id='tableau'><u> Note d'autonomie</u></div>
        {/*2éme tableau : Note d'autonomie*/}
        <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><i>Critéres</i></IonCol>
            <IonCol size="2"><i>Notation</i></IonCol>
            <IonCol size="1"></IonCol>
            <IonCol><i>Observations</i></IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Initiative laissée à la personne handicapée</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-10' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/10</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Harmonie globale du binôme</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-7' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/7</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Qualité de l'accompagnement</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-7' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/7</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Clarté des consignes</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-6' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/6</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'>
                <p> Total : </p>
            </IonCol>
            <IonCol size='2'>
                <p>  </p> 
            </IonCol>
            <IonCol size='1'><p>/30</p></IonCol>
        </IonRow>
    </IonGrid>

        {/* 1er total global des 2 tableaux précédents */}
        <IonRow class="ion-justify-content-center">
            <IonCol size='5' >
                <p> Total : </p>
            </IonCol>
            <IonCol size='2'>
                <p>  </p> 
            </IonCol>
            <IonCol size='1'><p>/50</p></IonCol>
        </IonRow>
        <IonItem lines="full" color={'warning'}></IonItem>

        {/* 3éme tableau : Note développement durable */}
        <div id='tableau'><u> Note développement durable</u></div>
    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><i>Critéres</i></IonCol>
            <IonCol size="2"><i>Notation</i></IonCol>
            <IonCol size="1"></IonCol>
            <IonCol><i>Observations</i></IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Gestion des déchets</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-5' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/5</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Gestion des fluides (eau,gaz,électricité)</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-5' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/5</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'>
                <p> Total : </p>
            </IonCol>
            <IonCol size='2'>
                <p>  </p> 
            </IonCol>
            <IonCol size='1'><p>/10</p></IonCol>
        </IonRow>
    </IonGrid>

    {/* 4éme tableau : Note optimisation du panier */}
    <div id='tableau'><u> Note optimisation du panier</u></div>
    <IonGrid fixed={true}>
        <IonRow>
            <IonCol size='5'><i>Critéres</i></IonCol>
            <IonCol size="2"><i>Notation</i></IonCol>
            <IonCol size="1"></IonCol>
            <IonCol><i>Observations</i></IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Utilisation des produits obligatoires</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-6' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/6</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'><p>Utilisation des produits libres</p></IonCol>
            <IonCol size="2">
                <IonInput placeholder='0-4' type='number'> </IonInput>
            </IonCol>
            <IonCol size="1"><p>/4</p></IonCol>
            <IonCol>
                <IonInput placeholder='...'> </IonInput>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size='5'>
                <p> Total : </p>
            </IonCol>
            <IonCol size='2'>
                <p>  </p> 
            </IonCol>
            <IonCol size='1'><p>/10</p></IonCol>
        </IonRow>
        </IonGrid>

        {/* 2éme total global des 2 tableaux précédents */}
        <IonRow class="ion-justify-content-center">
            <IonCol size='5' >
                <p> Total : </p>
            </IonCol>
            <IonCol size='2'>
                <p>  </p> 
            </IonCol>
            <IonCol size='1'><p>/20</p></IonCol>
        </IonRow>
    
        
</IonContent>
    </>
    );
}

export default TableEvaluationTechnique