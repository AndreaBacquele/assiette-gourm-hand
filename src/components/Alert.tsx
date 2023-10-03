import { IonAlert } from "@ionic/react";
import { useState } from "react";

interface AlertFormProps {
  message: string;
  showAlert: boolean;
  setShowAlert: any;
}
const Alert: React.FC<AlertFormProps> = ({
  message = "",
  showAlert,
  setShowAlert,
}) => {
  //   const [showAlert, setShowAlert] = useState(false);

  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      message={message}
      buttons={["OK"]}
    />
  );
};

export default Alert;
