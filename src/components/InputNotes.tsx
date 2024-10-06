import React, { useState, useEffect } from "react";
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
    const valeur = event.detail.value as string;
    setLocalValue(valeur);

    if (valeur === "") {
      setIsValid(true);
      onIonInput(valeur);
    }
    const intValue = parseFloat(valeur);
    // Vérifie que la note est dans l'intervalle autorisée. Arrondie à 0.5 une note.
    if (intValue >= min && intValue <= max) {
      let roundedValue = (Math.round(intValue * 2) / 2).toString();
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
