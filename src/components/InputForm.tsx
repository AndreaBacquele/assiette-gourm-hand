import React, { useState } from "react";
import { IonGrid, IonInput } from "@ionic/react";
import "../theme/globalCSS.css";

interface CustomFormInputProps {
  initial: string;
  placeholder: string;
  inputType?: string;
  onIonInput: (value: string) => void;
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({
  initial = "",
  placeholder,
  onIonInput,
  inputType = "text",
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
        required={true}
        value={initial}
        onIonInput={handleChange}
        placeholder={placeholder}
        style={{ textIndent: "10px" }}
        type={inputType as "text" | "number"}
      ></IonInput>
    </IonGrid>
  );
};

export default CustomFormInput;
