import { useState, useEffect } from "react";
import Game from "./components/Game/Game";

function App() {
  const [gameList, setGameList] = useState([]);

  const fetchData = async () => {
    await fetch("./games.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setGameList(data.games);
      });
  };

  const listItems = gameList.map((game) => {
    return (
      <li key={game.id}>
        <Game name={game.name} image={game.image} genre={game.genre}/>
        <button type="button">+</button>
      </li>
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>RecomendaGames</h1>
      <p>Seus jogos favoritos:</p>

      <ul>{listItems}</ul>
    </>
  );
}

export default App;
