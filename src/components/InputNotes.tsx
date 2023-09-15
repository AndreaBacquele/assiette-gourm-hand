import React, { useState } from "react";
import { IonItem, IonInput } from "@ionic/react";
import "./InputNotes.css";

interface CustomNotesInputProps {
  placeholder: string;
  min: number;
  max: number;
  onInputChange: (value: string) => void;
}

const CustomNotesInput: React.FC<CustomNotesInputProps> = ({
  placeholder,
  min,
  max,
  onInputChange,
}) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: CustomEvent) => {
    const valeur = event.detail.value;
    const intValue = parseInt(valeur);

    if (intValue > min && intValue < max) {
      setValue(event.detail.value as string);
      onInputChange(event.detail.value as string);
      setIsValid(true);
    } else {
      setIsValid(false);
      alert("Votre note n'est pas dans l'intervalle autorisé");
      setValue("");
    }
  };

  return (
    <IonItem>
      <IonInput
        min={min}
        max={max}
        value={value}
        onIonInput={handleChange}
        placeholder={placeholder}
        type="number"
      ></IonInput>
    </IonItem>
  );
};

export default CustomNotesInput;
