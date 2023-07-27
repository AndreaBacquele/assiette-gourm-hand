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


// Récupére les notations de la table évaluation dégustation
const pickNotes = async() => {
  if(store){
      const notes = await store.get('noteDegustation');
      const presentation = notes?.floatPresentation;
      const cuissonGarniture = notes?.floatCuissonGarniture;
      const cuissonPrincipale = notes?.floatCuissonPrincipale;
      const accordGlobal = notes?.floatAccordGlobal;
      const total = notes?.total
      setPresentation(presentation);
      setCuissonPrincipale(cuissonPrincipale);
      setCuissonGarniture(cuissonGarniture);
      setAccordGlobal(accordGlobal);
      setTotal(total)
  }
}
useEffect(() => {
  pickNotes();
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
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol> Note de présentation  </IonCol>
          <IonCol>Note cuisson principale </IonCol>
          <IonCol>Note cuisson garniture</IonCol>
          <IonCol>Note accord global plat</IonCol>
          <IonCol>Total</IonCol>
        </IonRow>
      {/* </IonGrid> */}
    {/* </IonItem> */}
  
    {/* <IonItem>
      <IonGrid> */}
        <IonRow>
          <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°1
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem> */}
    
    {/* <IonItem>
      <IonGrid> */}
        <IonRow>
          <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°2
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem>
      
      <IonGrid> */}
        <IonRow>
          <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
            Candidat n°3
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
    
      {/* <IonGrid> */}
        <IonRow>
          <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°4
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°5
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°6
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°7
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°8
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°9
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°10
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°11
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°12
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°13
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°14
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°15
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°16
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°17
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
          <IonButton color='warning' onClick={handleButtonClick} expand='full'>
          Candidat n°18
          </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
        <IonCol>
            <IonButton color='warning' onClick={handleButtonClick} expand='full'>
            Candidat n°19
            </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      {/* </IonGrid>
    </IonItem>
    <IonItem> */}
      {/* <IonGrid> */}
        <IonRow>
          <IonCol>
            <IonButton color='warning' onClick={handleButtonClick} expand='full'>
            Candidat n°20
            </IonButton>
          </IonCol>
          <IonCol> {presentation}  </IonCol>
          <IonCol>{cuissonPrincipale} </IonCol>
          <IonCol>{cuissonGarniture}</IonCol>
          <IonCol>{accordGlobal}</IonCol>
          <IonCol>{total}</IonCol>
        </IonRow>
      
    {/* </IonItem> */}
    </IonGrid>
  </IonList>
</IonContent>
    </>
    );
}

export default ListeCandidatDegustation;