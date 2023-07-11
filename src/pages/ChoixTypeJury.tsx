import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { RadioGroupCustomEvent } from '@ionic/react';

function TypeOfJudge() {
const [menuType, setMenuType] = useState('overlay');

  return (
    <>
      <IonMenu type={menuType} contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <IonButton>Click to close the menu</IonButton>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Accés grille d'évaluation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>Vous êtes jury:</h2>
          <IonRadioGroup
            value={menuType}
            onIonChange={(ev: RadioGroupCustomEvent) => {
              setMenuType(ev.detail.value);
            }}
          >
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
      </IonPage>
    </>
  );
}
export default TypeOfJudge;