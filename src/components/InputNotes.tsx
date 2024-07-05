import React, { useState, useEffect } from "react";
import { IonInput, IonCol, IonRow } from "@ionic/react";

interface CustomNotesInputProps {
  min: number;
  max: number;
  value: number;
  noteLabel: string;
  onIonInput: (value: number) => void;
}

const CustomNotesInput: React.FC<CustomNotesInputProps> = ({
  min,
  max,
  onIonInput,
  value: propValue,
  noteLabel,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [localValue, setLocalValue] = useState(propValue);

  // Change la couleur du background si la valeur entrée n'est pas dans l'intervalle autorisée
  const validInputStyle = { backgroundColor: "#F5F5F5" };
  const invalidInputStyle = { backgroundColor: "rgb(232,51,0)" };

  useEffect(() => {
    setLocalValue(propValue);
  }, [propValue]);

  const handleChange = (event: CustomEvent) => {
    const valeur = event.detail.value as number;
    setLocalValue(valeur);

    if (valeur === 0) {
      setIsValid(true);
      onIonInput(valeur);
    }

    // Vérifie que la note est dans l'intervalle autorisée. Arrondie à 0.5 une note.
    if (valeur >= min && valeur <= max) {
      let roundedValue = Math.round(valeur * 2) / 2;
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
            value={localValue}
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
