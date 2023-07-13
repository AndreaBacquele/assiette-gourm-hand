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

    {/* Mise en place du formulaire */}
    <IonContent className="ion-padding">
    
    <h6> Merci de compléter les informations ci-dessous afin d'avoir accés aux grilles de notation</h6>

    <IonItem>
        <IonInput label="Nom" placeholder="A changer"></IonInput> 
    </IonItem>

    <IonItem>
        <IonInput label="Prénom" placeholder="A changer"></IonInput>
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
                <IonButton>Validez</IonButton>
        </IonContent>
    </>
    )
}

export default Accueil