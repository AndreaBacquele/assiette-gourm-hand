import React from 'react';
import { IonItem,
IonLabel, 
IonList,
IonHeader,
IonToolbar,
IonThumbnail,
IonTitle } from '@ionic/react';
import './ListeCandidat.css'

function ListCandidat() {
    return(
        <>
        <IonHeader color="light">
        <IonToolbar >
            <IonItem>
                <IonThumbnail slot="start">
                <img alt="Logo du concours" src='../images/logo.jpg' /> 
                </IonThumbnail>
                <IonTitle> Liste des candidats</IonTitle>
            </IonItem>
        </IonToolbar>
        </IonHeader>


        <IonList lines="full">
          <IonItem>
            <IonLabel>Candidat n°1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Full Lines</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Full Lines</IonLabel>
          </IonItem>
        </IonList>
    </>
    );
}

export default ListCandidat;