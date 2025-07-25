import { IonPage } from "@ionic/react";
import { useStorage } from "../services/localStorage";

const DashboardCandidat: React.FC = () => {
  // WORK IN PROGRESS: Goal is to add the new logic based on the new database structure(supabase)
  // The idea is to fetch the candidate's data from the storage and display it on the dashboard.
  // Same for the criteras and notes.
  const { store } = useStorage();
  return (
    <IonPage>
      <div>
        <h1>Dashboard Candidat</h1>
        <p>Bienvenue sur votre tableau de bord.</p>
      </div>
    </IonPage>
  );
};

export default DashboardCandidat;
