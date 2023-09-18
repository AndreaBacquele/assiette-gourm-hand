import React, { useState } from "react";
import { IonInput, IonCol } from "@ionic/react";
import "./InputNotes.css";

interface CustomNotesInputProps {
  min: number;
  max: number;
  onInputChange: (value: string) => void;
}

const CustomNotesInput: React.FC<CustomNotesInputProps> = ({
  min,
  max,
  onInputChange,
}) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: CustomEvent) => {
    const valeur = event.detail.value as string;
    const intValue = parseFloat(valeur);

    if (intValue >= min && intValue <= max) {
      let roundedValue = (Math.round(intValue * 2) / 2).toString();
      console.log("composant ok", roundedValue);
      setValue(roundedValue);
      onInputChange(event.detail.value as string);
      setIsValid(true);
    } else {
      console.log("composant HS", intValue);
      setIsValid(false);
      setValue("");
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
        value={value}
        onIonInput={handleChange}
        placeholder={"0-" + max}
        type="number"
      ></IonInput>
      /{max}
    </span>
  );
};

export default CustomNotesInput;
