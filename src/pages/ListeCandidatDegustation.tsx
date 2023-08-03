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
const [presentation, setPresentation] = useState('');
const [cuissonPrincipale, setCuissonPrincipale] = useState('');
const [cuissonGarniture, setCuissonGarniture] = useState('');
const [accordGlobal, setAccordGlobal] = useState('');
const [total, setTotal] = useState('')

const picklastNamefirstName = async() => {
  if(store){
      const name = await store.get('jury');
      const lastName = name?.lastName;
      const firstName = name?.firstName;
      setLastName(lastName);
      setFirstName(firstName);
  }
}
useEffect(() => {
  picklastNamefirstName();
}, [store]);


  const history = useHistory();

    const handleButtonClick = (candidate : number) => {
    history.push('/evaldegustation/'+candidate);
    }

    // Boucle qui permet d'afficher le bon nombre de candidats sur le dashboard
    const nb_candidates = 20;
    const range = (start:number, end:number) => Array.from({length: (end - start + 1)}, (v, k) => k + start);
    const candidates = range(1, nb_candidates).map(nb =>
      <IonRow>
        <IonCol>
        <IonButton color='warning' onClick={() => handleButtonClick(nb)} expand='full'> Candidat n°{nb}</IonButton>
        </IonCol>
        <IonCol> {presentation}  </IonCol>
        <IonCol>{cuissonPrincipale} </IonCol>
        <IonCol>{cuissonGarniture}</IonCol>
        <IonCol>{accordGlobal}</IonCol>
        <IonCol>{total}</IonCol>
      </IonRow>
    );


// Récupére les notations de la table évaluation dégustation
const pickNotes = async(candidate:number) => {
  if(store){
      const notes = await store.get('notes');

      if (notes && notes['candidat' + candidate]) {

        // ? derriére la clé, permet d'émettre une erreur si la clé est undefined ou null; ?? fait la même chose est renvoi une chaine de caractére vide si le champ est vide
        const presentation = notes['candidat' + candidate]?.Presentation ?? '';
        const cuissonGarniture = notes['candidat' + candidate]?.CuissonGarniture ?? '';
        const cuissonPrincipale = notes['candidat' + candidate]?.CuissonPrincipale ?? '';
        const accordGlobal = notes['candidat' + candidate]?.AccordGlobal ?? '';
        const total = notes['candidat' + candidate]?.total ?? '';

      setPresentation(presentation);
      setCuissonPrincipale(cuissonPrincipale);
      setCuissonGarniture(cuissonGarniture);
      setAccordGlobal(accordGlobal);
      setTotal(total)
  }
}
}
useEffect(() => {
  const AllNotes = async() => {
    for (let i = 0; i<=nb_candidates; i++){
      await pickNotes(i);
    }
  }
  AllNotes()
  
}, [store]);


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
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>Note de présentation</IonCol>
          <IonCol>Note cuisson principale</IonCol>
          <IonCol>Note cuisson garniture</IonCol>
          <IonCol>Note accord global plat</IonCol>
          <IonCol>Total</IonCol>
        </IonRow>
        {candidates}
    </IonGrid>
  </IonList>
</IonContent>
    </>
    );
}

export default ListeCandidatDegustation;