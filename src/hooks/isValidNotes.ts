  // Fonction pour valider une note avec ses limites
  export const isValidNote = (note: string, max: number) => {
    const noteValue = parseFloat(note);
    return !isNaN(noteValue) && noteValue >= 0 && noteValue <= max;
  };