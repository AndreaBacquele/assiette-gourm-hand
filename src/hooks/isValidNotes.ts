  // Fonction pour valider une note avec ses limites
  export const isValidNote = (note: number, max: number) => {
    return !isNaN(note) && note >= 0 && note <= max;
  };