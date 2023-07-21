import React from 'react';
import { IonItem, 
IonList,
IonHeader,
IonToolbar,
IonTitle,
IonButton,
IonContent,
IonGrid,
IonCol,
IonRow } from '@ionic/react';
import './ListeCandidatTechnique.css'
import { useHistory } from 'react-router';

// Voir comment gérer le fait que ce soit le jury dégustation ou cuisine (cookies?)
function ListeCandidatCuisine(){

const history = useHistory();

const handleButtonClick = () => {
history.push('/evaltechnique');
}

return(
    <>
<IonContent>
    <IonHeader color="light">
    <IonToolbar >
        <IonItem>
            <img alt="Logo du concours" src='../images/logo.jpg' /> 
            <IonTitle> Liste des candidats - Jury technique</IonTitle>
            {/* <span><p>Pour avoir accés à la fiche du candidat, merci de cliquer sur le numéro</p></span> */}
        </IonItem>
    </IonToolbar>
    </IonHeader>

<IonList lines="full">
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°1
        </IonButton>
    </IonItem>

    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°2
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°3
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°4
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°5
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°6
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°7
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°8
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°9
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°10
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°11
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°12
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°13
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°14
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°15
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°16
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°17
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°18
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°19
        </IonButton>
    </IonItem>
    <IonItem>
        <IonButton color='warning' onClick={handleButtonClick} expand='full'>
    Candidat n°20
        </IonButton>
    </IonItem>

</IonList>
</IonContent>
    </>
    );
}

export default ListeCandidatCuisine;