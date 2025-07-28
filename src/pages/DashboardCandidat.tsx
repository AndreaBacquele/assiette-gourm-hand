import { IonContent, IonPage } from "@ionic/react";
import { useStorage } from "../services/localStorage";
import { supabase } from "../services/supabaseClient";
import { useEffect, useState } from "react";
import { Candidat } from "../types";
import HeaderDashboard from "../components/HeaderDashboard";

const DashboardCandidat: React.FC = () => {
  // WORK IN PROGRESS: Goal is to add the new logic based on the new database structure(supabase) and after delete ListeCandidatDegustation and ListeCandidatTechnique.
  // The idea is to fetch the candidate's data from the storage and display it on the dashboard.
  // Same for the criteras and notes.
  const { store } = useStorage();
  const [candidat, setCandidat] = useState<Candidat[]>([]);

  async function fetchInitialData() {
    const { data: candidateData, error } = await supabase
      .from("candidat")
      .select("*");

    if (error) {
      console.error("Error fetching candidate data:", error);
    } else {
      setCandidat(candidateData);
    }
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <IonPage>
      <HeaderDashboard />
      <IonContent>
        <div>
          <h1>Dashboard Candidat</h1>
          <p>Bienvenue sur votre tableau de bord.</p>
        </div>
        {candidat.map((c) => (
          <div key={c.id}>
            <h2>Candidat {c.candidat_number}</h2>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default DashboardCandidat;
