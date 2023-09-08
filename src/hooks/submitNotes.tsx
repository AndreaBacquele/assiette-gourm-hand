// import axios from "axios";
// import notes from "../pages/ListeCandidatDegustation";
// // Connexion entre le spreadsheet / l'API REST Google / l'application
// const handleSubmitNotes = (e: any) => {
//   e.preventDefault();

//   // Boucle qui itére sur les candidats
//   // Pour chaque candidat : création d'une row avec une valeur associée à chaque colonne
//   const oneRow = {
//     grade_presentation: notes["candidat1"]["presentation"],
//     grade_cuisson_principale: notes["candidat1"]["cuissonPrincipale"],
//     grade_cuisson_garniture: notes["candidat1"]["cuissonPrincipale"],
//     grade_accord_global: notes["candidat1"]["accordGlobal"],
//     grade_total: notes["candidat1"]["total"],
//     jury_name: lastName + firstName,
//   };
//   console.log(oneRow);

//   const url: string | undefined = import.meta.env
//     .VITE_REACT_APP_SHEET_BEST_API_DEGUSTATION;

//   if (url) {
//     axios.post(url, oneRow).then((response) => {
//       console.log(response);
//     });
//   } else {
//     console.error("URL is undefined");
//   }
// };
