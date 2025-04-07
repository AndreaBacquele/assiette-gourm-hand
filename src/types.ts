export type Criteria = {
    label: string;
    description: string;
    value: string;
    min: number;
    max: number;
  };

  export type TechnicalNotes = {
    totalProduction: string;
    totalAutonomie: string;
    totalDurable: string;
    totalOptimisation: string;
    AllTotal: string;
    clarte: string;
    dechets: string;
    fluides: string;
    harmonie: string;
    initiative: string;
    maitriseTech: string;
    organisation: string;
    qualiteAccomp: string;
    secuHygiene: string;
    timing: string;
    utilLibres: string;
    utilObligatoires: string;
    observationsProduction: string;
    observationsAutonomie: string;
    observationsDurable: string;
    observationsOptimisation: string;
  }

  export type CandidateNotes = {
    presentation: number;
    cuissonPrincipale: number;
    cuissonGarniture: number;
    accordGlobal: number;
    total: number;
    observations: string;
  }

  export type NotesStore = Record<string, CandidateNotes>