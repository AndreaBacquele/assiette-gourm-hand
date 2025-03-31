import React from "react";
import { IonHeader, IonToolbar } from "@ionic/react";

interface HeaderProps {
  juryName: string;
  juryType: string;
}

const HeaderDashboard: React.FC<HeaderProps> = ({ juryName, juryType }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar style={{ height: "60px", display: "flex" }} mode="ios">
          <div id="top">
            <img
              className="logo-dash-eval"
              src="/logo AG.png"
              alt="Logo du concours"
            ></img>

            <span className="black-label"> {juryName}</span>
            <span className="orange-label"> {juryType} </span>
          </div>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default HeaderDashboard;
