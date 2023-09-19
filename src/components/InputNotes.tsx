import React, { useState } from "react";
import { IonInput } from "@ionic/react";
import "./InputNotes.css";

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

  const handleChange = (event: CustomEvent) => {
    const valeur = event.detail.value as string;
    const intValue = parseFloat(valeur);

    if (intValue >= min && intValue <= max) {
      let roundedValue = (Math.round(intValue * 2) / 2).toString();
      console.log("composant ok", roundedValue);
      onIonInput(roundedValue);
      setIsValid(true);
    } else {
      console.log("composant HS", intValue);
      setIsValid(false);
      if (!isNaN(intValue)) {
        alert("Votre note n'est pas dans l'intervalle autorisé");
      }
    }
  };

  return (
    <span>
      <IonInput
        min={min}
        max={max}
        step="0.5"
        onIonInput={handleChange}
        type="number"
        value={value}
      ></IonInput>
      /{max}
    </span>
  );
};

export default CustomNotesInput;
