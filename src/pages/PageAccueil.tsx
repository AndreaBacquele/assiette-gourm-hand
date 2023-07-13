import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import Logo from '../images/image001.png';
import './PageAccueil.css'



function Accueil() {
    return(
    <>
    <IonItem>
        <IonThumbnail slot="start">
        <img alt="Silhouette of mountains" src='../images/image001.png' />
        </IonThumbnail>
        <IonLabel>Accueil</IonLabel>
    </IonItem>
    </>
    )
}

export default Accueil