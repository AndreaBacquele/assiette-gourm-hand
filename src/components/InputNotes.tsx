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
      if (!isNaN(intValue)) {
        // A modifier pour que la case devienne rouge si erreur
        alert("Votre note n'est pas dans l'intervalle autorisé");
      }
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
