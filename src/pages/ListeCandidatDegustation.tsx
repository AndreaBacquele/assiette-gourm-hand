import React, {useEffect, useState} from 'react';
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
import './ListeCandidatDegustation.css'
import { useHistory } from 'react-router-dom';
import {useStorage} from '../hooks/useStorage'


function ListeCandidatDegustation() {

  // Gére la récupération des données + permet l'affichage de celles-ci en dessous
const {store} = useStorage();
const [lastName, setLastName] = useState('');
const [firstName, setFirstName] = useState('');

const test = async() => {
  if(store){
      const name = await store.get('jury');
      const lastName = name?.lastName;
      const firstName = name?.firstName;
      setLastName(lastName);
      setFirstName(firstName);
  }
}

useEffect(() => {
  test();
}, [store]);


  const history = useHistory();

    const handleButtonClick = () => {
    history.push('/evaldegustation');
    }



    return(
        <>
<IonContent>
        <IonHeader color="light">
        <IonToolbar >
            <IonItem>
                <img alt="Logo du concours" src='../images/logo.jpg' /> 
                <IonTitle> Liste des candidats - Jury dégustation</IonTitle>
                {/* <span><p>Pour avoir accés à la fiche du candidat, merci de cliquer sur le numéro</p></span> */}
            </IonItem>
        </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonTitle> 
            <p> Jury {firstName} {lastName}  </p>
          </IonTitle>
        </IonItem>

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

export default ListeCandidatDegustation;