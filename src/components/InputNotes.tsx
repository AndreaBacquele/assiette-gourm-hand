import React, { useState, useEffect } from "react";
import { IonInput, IonCol, IonRow } from "@ionic/react";

interface CustomNotesInputProps {
  max: number;
  value: number;
  noteLabel: string;
  onIonInput: (value: number) => void;
}

const CustomNotesInput: React.FC<CustomNotesInputProps> = ({
  max,
  onIonInput,
  value,
  noteLabel,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [localValue, setLocalValue] = useState<number | undefined>(value);
  console.log(typeof localValue + localValue);

  // Change la couleur du background si la valeur entrée n'est pas dans l'intervalle autorisée
  const validInputStyle = { backgroundColor: "#F5F5F5" };
  const invalidInputStyle = { backgroundColor: "rgb(232,51,0)" };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (event: CustomEvent) => {
    // ❗️ Toujours une string ou null, même si type="number"
    const rawValue = event.detail.value;

    // Ionic ne fournit pas de number ici, on doit parser manuellement
    // Si on ne fait pas ça, on risque des bugs avec des comparaisons comme "5" < 3
    const parsedValue = parseFloat(rawValue);

    if (rawValue === "") {
      setLocalValue(undefined);
      setIsValid(false);
      return;
    }

    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= max) {
      const roundedValue = Math.round(parsedValue * 2) / 2;
      setLocalValue(roundedValue);
      setIsValid(true);
      onIonInput(roundedValue);
    } else {
      setLocalValue(parsedValue);
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
            max={max}
            step="0.5"
            onIonInput={handleChange}
            type="number"
            value={localValue ?? ""}
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
