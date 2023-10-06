import React, { useState } from "react";
import { IonInput, IonCol, IonRow } from "@ionic/react";

interface CustomNotesInputProps {
  min: number;
  max: number;
  value: string;
  noteLabel: string;
  onIonInput: (value: string) => void;
}

const CustomNotesInput: React.FC<CustomNotesInputProps> = ({
  min,
  max,
  onIonInput,
  value,
  noteLabel,
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
    <>
      <IonRow>
        <IonCol
          size="3"
          sizeLg="1"
          sizeMd="2"
          sizeXs="2"
          style={{ display: "flex" }}
        >
          <IonInput
            min={min}
            max={max}
            step="0.5"
            onIonInput={handleChange}
            type="number"
            value={value}
            style={isValid ? validInputStyle : invalidInputStyle}
          ></IonInput>
        </IonCol>
        <IonCol size="2">
          <div>/{max}</div>
        </IonCol>
        <IonCol className="note-label">{noteLabel}</IonCol>
      </IonRow>
    </>
  );
};

export default CustomNotesInput;
