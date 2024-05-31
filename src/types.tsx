export type TechnicalNotes = {
  totalProduction: number;
  totalAutonomie: number;
  totalDurable: number;
  totalOptimisation: number;
  clarte: number;
  dechets: number;
  fluides: number;
  harmonie: number;
  initiative: number;
  maitriseTech: number;
  organisation: number;
  qualiteAccomp: number;
  secuHygiene: number;
  timing: number;
  utilLibres: number;
  utilObligatoires: number;
  allTotal: number;
  observationsProduction: string;
  observationsAutonomie: string;
  observationsDurable: string;
  observationsOptimisation: string;
};

export type TastingNotes = {
  presentation: number;
  cuissonPrincipale: number;
  cuissonGarniture: number;
  accordGlobal: number;
  total: number;
  observations: string;
};

export type ProductionValues = {
  secuHygiene: number;
  organisation: number;
  maitriseTech: number;
  timing: number;
};
