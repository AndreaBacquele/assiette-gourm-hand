import React from "react";
import { IonCol, IonRadio } from "@ionic/react";

interface RadioOptionProps {
  label: string;
  value: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, value }) => {
  return (
    <IonCol size="6" className="ion-radiogroup">
      <IonRadio value={value}>
        <code style={{ fontSize: "12px" }}>{label}</code>
      </IonRadio>
    </IonCol>
  );
};

export default RadioOption;
