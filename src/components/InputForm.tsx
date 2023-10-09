import React, { useState } from "react";
import { IonInput } from "@ionic/react";
import "../theme/globalCSS.css";

interface CustomFormInputProps {
  initial: string;
  placeholder: string;
  onIonInput: (value: string) => void;
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({
  initial = "",
  placeholder,
  onIonInput,
}) => {
  const [value, setValue] = useState(initial);

  const handleChange = (event: CustomEvent) => {
    setValue(event.detail.value as string);
    onIonInput(event.detail.value as string);
  };

  return (
    <IonInput
      required={true}
      value={initial}
      onIonInput={handleChange}
      placeholder={placeholder}
      style={{ textIndent: "5px" }}
    ></IonInput>
  );
};

export default CustomFormInput;
