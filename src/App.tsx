import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState, useEffect } from "react";
import Accueil from "./pages/PageAccueil";
import ListeCandidatDegustation from "./pages/ListeCandidatDegustation";
import TableEvaluationDegustation from "./pages/TableEvaluationDegustation";
import ListeCandidatTechnique from "./pages/ListeCandidatTechnique";
import TableEvaluationTechnique from "./pages/TableEvaluationTechnique";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Accueil} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          path="/listingdegustation"
          component={ListeCandidatDegustation}
        />
        <Route path="/listingtechnique" component={ListeCandidatTechnique} />
        <Route path="/evaldegustation/:candidate">
          <TableEvaluationDegustation />
        </Route>
        <Route path="/evaltechnique/:candidate">
          <TableEvaluationTechnique />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
