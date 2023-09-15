import React from "react";
import { IonItem, IonLabel, IonRadio } from "@ionic/react";

interface RadioOptionProps {
  label: string;
  value: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, value }) => {
  return (
    <IonItem>
      <IonLabel>
        <code>{label}</code>
      </IonLabel>
      <IonRadio value={value}></IonRadio>
    </IonItem>
  );
};

export default RadioOption;
