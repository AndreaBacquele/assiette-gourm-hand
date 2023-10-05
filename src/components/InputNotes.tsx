import React, { useState } from "react";
import { IonInput, IonCol } from "@ionic/react";

interface CustomNotesInputProps {
  min: number;
  max: number;
  value: string;
  onIonInput: (value: string) => void;
}

const CustomNotesInput: React.FC<CustomNotesInputProps> = ({
  min,
  max,
  onIonInput,
  value,
}) => {
  const [isValid, setIsValid] = useState(true);

  // Change la couleur du background si la valeur entrée n'est pas dans l'intervalle autorisée
  const validInputStyle = { backgroundColor: "var(--ion-color-step-50)" };
  const invalidInputStyle = { backgroundColor: "rgb(200,42,25)" };

  const handleChange = (event: CustomEvent) => {
    const valeur = event.detail.value as string;
    const intValue = parseFloat(valeur);
    // Vérifie que la note est dans l'intervalle autorisée. Arrondie à 0.5 une note.
    if (intValue >= min && intValue <= max) {
      let roundedValue = (Math.round(intValue * 2) / 2).toString();
      console.log("valeur arrondie" + roundedValue);
      onIonInput(roundedValue);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <IonCol size="3" style={{ display: "flex" }}>
      <IonInput
        min={min}
        max={max}
        step="0.5"
        onIonInput={handleChange}
        type="number"
        value={value}
        style={isValid ? validInputStyle : invalidInputStyle}
      ></IonInput>
      <div
        style={{
          paddingTop: "14px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        /{max}
      </div>
    </IonCol>
  );
};

export default CustomNotesInput;
