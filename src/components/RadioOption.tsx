import React from "react";
import { IonItem, IonRadio } from "@ionic/react";

interface RadioOptionProps {
  label: string;
  value: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, value }) => {
  return (
    <IonItem className="ion-radiogroup">
      <IonRadio value={value}>
        <code style={{ fontSize: "12px" }}>{label}</code>
      </IonRadio>
    </IonItem>
  );
};

export default RadioOption;
