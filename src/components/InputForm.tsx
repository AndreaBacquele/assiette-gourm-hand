import React, { useState } from "react";
import { IonGrid, IonInput } from "@ionic/react";
import "../theme/globalCSS.css";

interface CustomFormInputProps {
  initial: string;
  placeholder: string;
  label: string;
  onIonInput: (value: string) => void;
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({
  initial = "",
  placeholder,
  label,
  onIonInput,
}) => {
  const [value, setValue] = useState(initial);

  const handleChange = (event: CustomEvent) => {
    setValue(event.detail.value as string);
    onIonInput(event.detail.value as string);
  };

  return (
    <IonGrid
      style={{
        marginLeft: "20px",
        marginRight: "20px",
        width: "75%",
      }}
    >
      <IonInput
        label={label}
        labelPlacement="floating"
        fill="solid"
        required={true}
        onIonInput={handleChange}
        placeholder={placeholder}
        style={{ textIndent: "10px" }}
        type="text"
      ></IonInput>
    </IonGrid>
  );
};

export default CustomFormInput;
