import React from "react";
import { IonCol } from "@ionic/react";

interface DashboardProps {
  label: string;
}

const Dashboard: React.FC<DashboardProps> = ({ label = "" }) => {
  return (
    <IonCol>
      <div id="labelCol">{label}</div>
    </IonCol>
  );
};

export default Dashboard;
