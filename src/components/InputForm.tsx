import React, { useState } from "react";
import { IonItem, IonInput } from "@ionic/react";
import "./InputForm.css";

interface CustomFormInputProps {
  initial?: string;
  label: string;
  placeholder: string;
  onInputChange: (value: string) => void;
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({
  initial = "",
  label,
  //   placeholder,
  onInputChange,
}) => {
  const [value, setValue] = useState(initial);

  const handleChange = (event: CustomEvent) => {
    setValue(event.detail.value as string);
    onInputChange(event.detail.value as string);
  };

  return (
    <IonItem>
      <IonInput
        id="label"
        required={true}
        value={value}
        onIonChange={handleChange}
        // placeholder={placeholder}
        class="ion-float-left"
      >
        {label}
      </IonInput>
    </IonItem>
  );
};

export default CustomFormInput;
