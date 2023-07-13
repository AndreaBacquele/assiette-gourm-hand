import { 
    IonItem,
    IonLabel, 
    IonThumbnail,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRadio,
    IonButton,
    IonRadioGroup,
    IonPage,
    IonMenuToggle,
    IonInput,
    IonTextarea,
} from '@ionic/react';
import Logo from '../images/logo.jpg';
import React, { useState } from 'react';
import type { RadioGroupCustomEvent } from '@ionic/react';
import './PageAccueil.css'



function Accueil() {
    const [menuType, setMenuType] = useState('overlay');
    return(
    <>
    {/* Permet d'afficher les éléments de la toolbar */}
    <IonHeader color="light">
        <IonToolbar >
            <IonItem>
                <IonThumbnail slot="start">
                <img alt="Logo du concours" src='../images/logo.jpg' /> 
                </IonThumbnail>
                <IonTitle> Page d'accueil</IonTitle>
            </IonItem>
        </IonToolbar>
        </IonHeader>

    <IonContent className="ion-padding">
    <IonItem>
        <IonTextarea readonly={true}> Merci de remplir les informations suivantes afin d'avoir accés à la grille de notation.</IonTextarea>
    </IonItem>

    <IonItem>
        <IonInput label="Nom du Jury" placeholder="Nom de famille"></IonInput>
    </IonItem>

    <IonItem>
        <IonInput label="Prénom" placeholder="Prénom"></IonInput>
    </IonItem>
        

{/* Gestion des toogles pour le choix de jury */}
        <h2>Vous êtes jury:</h2>
        <IonRadioGroup
            value={menuType}
            onIonChange={(ev: RadioGroupCustomEvent) => {setMenuType(ev.detail.value);}}>
            <IonItem>
            <IonLabel>
                <code>Dégustation</code>
            </IonLabel>
            <IonRadio value="degustation"></IonRadio>
            </IonItem>
            <IonItem>
            <IonLabel>
                <code>Technique</code>
            </IonLabel>
            <IonRadio value="technique"></IonRadio>
            </IonItem>
        </IonRadioGroup> <br />
            <IonMenuToggle>
                <IonButton>Validez</IonButton>
            </IonMenuToggle>
        </IonContent>
    </>
    )
}

export default Accueil