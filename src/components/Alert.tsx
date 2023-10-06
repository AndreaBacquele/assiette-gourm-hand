import { IonAlert } from "@ionic/react";

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
  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      message={message}
      buttons={["OK"]}
      mode="ios"
    />
  );
};

export default Alert;
