import Grade from "src/app/models/Grade";

// order is important, moviesSeenNb DESC
const grades: Grade[] = [
  { name: "Légende vivante du cinéma", moviesSeenNb: 5000 },
  { name: "Maître cinéaste", moviesSeenNb: 3000 },
  { name: "Producteur éclairé", moviesSeenNb: 1500 },
  { name: "Réalisateur en herbe", moviesSeenNb: 800 },
  { name: "Critique de cinéma", moviesSeenNb: 400 },
  { name: "Cinéphile confirmé", moviesSeenNb: 200 },
  { name: "Cinéphile passionné", moviesSeenNb: 100 },
  { name: "Cinéphile averti", moviesSeenNb: 50 },
  { name: "Cinéphile néophyte ", moviesSeenNb: 25 },
  { name: "Cinéphile Aspirant", moviesSeenNb: 0 },
]

export default grades;