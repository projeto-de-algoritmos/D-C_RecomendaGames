import { useState, useEffect } from "react";
import Game from "./components/Game/Game";

function App() {
  const [gameList, setGameList] = useState([]);
  const [myGames, setMyGames] = useState([]);

  const fetchData = async () => {
    await fetch("./games.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGameList(data.games);
      });
  };

  const handleAddGame = (game) => {
    let myGamesList = [...myGames];
    myGamesList.push({
      id: game.id,
      name: game.name,
      genre: game.genre,
    });
    setMyGames(myGamesList);
  };

  const listItems = gameList.map((game) => {
    return (
      <li key={game.id}>
        <Game name={game.name} image={game.image} genre={game.genre} />
        <button type="button" onClick={() => handleAddGame(game)}>
          +
        </button>
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
      <p>
        {myGames.map((game, index) => (
          <div key={index}>
            <p>ID: {game.id}</p>
            <p>Name: {game.name}</p>
            <p>Genre: {game.genre}</p>
          </div>
        ))}
      </p>
      <ul>{listItems}</ul>
    </>
  );
}

export default App;
