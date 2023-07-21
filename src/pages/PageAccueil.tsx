import { 
    IonItem,
    IonLabel, 
    IonThumbnail,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRadio,
    IonButton,
    IonRadioGroup,
    IonInput,
} from '@ionic/react';
import React, { useState } from 'react';
import type { RadioGroupCustomEvent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Storage } from '@ionic/storage';
import './PageAccueil.css'




function Accueil() {

     //Création de l'espace de stockage
    const store = new Storage();
    store.create();

    //Récupére les valeurs mise dans les inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [juryType, setJuryType] = useState('overlay');


    const handleFirstNameChange = (event: CustomEvent) => {
        setFirstName(event.detail.value);
    };
    
    const handleLastNameChange = (event: CustomEvent) => {
        setLastName(event.detail.value);
    };
    

    const history = useHistory();
    

    //Permet de rediriger la page quand on clique sur le bouton ainsi que stocker les données rentrées
    const handleButtonClick = () => {
        console.log(firstName);
        console.log(lastName);
        console.log(juryType)
        store.set('jury', {'lastName' : {lastName},  'firstName':{firstName}, 'juryType': {juryType}});
        if(juryType == 'degustation'){
            history.push('/listingdegustation')
        } else {

            //A changer Mettre la bonne redirection
            history.push('/evaldegustation')
        }
        
    };
    
    return(
    <>
    {/* Permet d'afficher les éléments de la toolbar */}
    <IonHeader color="light">
        <IonToolbar >
            <IonItem>
                <img alt="Logo du concours" src='../images/logo.jpg' /> 
                <IonTitle> Page d'accueil</IonTitle>
            </IonItem>
        </IonToolbar>
        </IonHeader>

    {/* Mise en place du formulaire */}
    <IonContent className="ion-padding">
    
    <h6> Merci de compléter les informations ci-dessous afin d'avoir accés à la liste des candidats et aux grilles d'évaluation</h6>

    <IonItem>
        <IonInput required value={lastName} onIonChange={handleLastNameChange} label="Nom" placeholder="A changer"></IonInput> 
    </IonItem>

    <IonItem>
        <IonInput required value={firstName} onIonChange={handleFirstNameChange} label="Prénom" placeholder="A changer"></IonInput>
    </IonItem>
        

{/* Gestion des toogles pour le choix de jury */}
        <h2>Vous êtes jury:</h2>
        <IonRadioGroup
            value={juryType}
            onIonChange={(ev: RadioGroupCustomEvent) => {setJuryType(ev.detail.value);}}>
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
        <div className="ion-text-center">
                <IonButton color='success' onClick={handleButtonClick}>Validez</IonButton>
                </div>
        </IonContent>
    </>
    )
}

export default Accueil
