import React from "react";
import { IonGrid, IonRadio } from "@ionic/react";

interface RadioOptionProps {
  label: string;
  value: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, value }) => {
  return (
    <IonGrid style={{ width: "50%" }} className="ion-radiogroup">
      <IonRadio value={value} mode="ios">
        <code
          style={{
            fontSize: "12px",
            paddingLeft: "10px",
            display: "flex",
          }}
        >
          {label}
        </code>
      </IonRadio>
    </IonGrid>
  );
};

export default RadioOption;
