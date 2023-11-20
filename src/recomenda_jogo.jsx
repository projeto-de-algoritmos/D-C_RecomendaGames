import { useState } from "react";
import inversion_count from "./utils/inversion_count";

function RecomendaJogos() {
  const [orderedPreferences, setOrderedPreferences] = useState([]);
  
  const [yourPreferences, setYourPreferences] = useState([
    { title: "Spider Man 2", genre: "Ação/Aventura", preference: 3 },
    { title: "DOOM Eternal", genre: "FPS", preference: 2 },
    { title: "God Of War Ragnarok", genre: "Ação/Aventura", preference: 4 },
    { title: "Elden Ring", genre: "RPG", preference: 5 },
    { title: "F1 2023", genre: "Corrida", preference: 1 },
  ]);

  const generateOrderedPreferences = () => {
    const result = inversion_count([...yourPreferences]);
    setOrderedPreferences(result.samePreferenceElements);
  };
  
  return (
    <div className="container">
      <button onClick={() => generateOrderedPreferences()}>Gerar a preferência ordenada dos meus jogos</button>
      <div>
        <h2>Preferências Desordenadas:</h2>
        {yourPreferences.map((game) => (
          <p key={game.title}>{`${game.title} - Preferência: ${game.preference}`}</p>
        ))}
      </div>
      <div>
        <h2>Preferências Ordenadas:</h2>
        {orderedPreferences.map((game) => (
          <p key={game.title}>{`${game.title} - Preferência: ${game.preference}`}</p>
        ))}
      </div>
    </div>
  );
}

export default RecomendaJogos;
