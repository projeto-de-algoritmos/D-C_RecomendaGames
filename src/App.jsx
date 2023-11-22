import { useState, useEffect } from "react";
import Game from "./components/Game/Game";
import "./styleApp.css";
import countAndSortInversions from "./utils/inversion_count";

function App() {
  const [gameList, setGameList] = useState([]);
  const [myGames, setMyGames] = useState([]);
  const [recomended, setRecomended] = useState(false)

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
    if (
      myGamesList.length < 5 &&
      !myGamesList.find((element) => element.id == game.id)
    ) {
      myGamesList.push({
        id: game.id,
        name: game.name,
        genre: game.genre,
      });
    }
    setMyGames(myGamesList);
    setRecomended(false)
  };

  const handleRemoveGame = (game) => {
    let myGamesList = [...myGames];
    let newGameList = myGamesList.filter((element) => {
      return element !== game;
    });
    setMyGames(newGameList);
    setRecomended(false)
  };

  const listItems = gameList.map((game) => {
    return (
      <li key={game.id}>
        <div className="gameContainer" onClick={() => handleAddGame(game)}>
          <Game name={game.name} image={game.image} genre={game.genre} />
        </div>
      </li>
    );
  });

  const generateRecomendedGames = () => {
    let mySelection = [...myGames];
    const result = countAndSortInversions([...myGames]); // Recebe a contagem de inversão
    let gamesMatched = result.sameidElements; // Passamos os jogos que não mudaram de posição após a inversão - Gostos Similares

    // Loop e recomendação
    let recomendedGames = [];
    let j = 0;

    let index_fps = 0;
    let index_aa = 0;
    let index_rpg = 0;
    let index_corr = 0;

    // Percorrendo todos os jogos para recomendarmos ao jogador
    for (let i = 0; i < 28; i++) {
      // Jogo que eu recomendar tem que ser do mesmo gênero do jogo que está no gamesMatched
      if (!(gamesMatched[j].genre === gameList[i].genre)) {
        continue;
      }

      // Jogo que queremos da Lista e que não pode ser o mesmo do gamesMatched
      if (gamesMatched.find((element) => element.id == gameList[i].id)) {

        switch (gamesMatched[j].genre) {
          case "FPS":
            index_fps++;
            break;

          case "Ação/Aventura":
            index_aa++;
            break;

          case "RPG":
            index_rpg++;
            break;

          case "Corrida":
            index_corr++;
            break;
        }
      } else {

        let max_value = Math.max(index_fps, index_aa, index_rpg, index_corr);
        let index;

        if (max_value == index_fps) {
          index = 0;
        } else if (max_value == index_aa) {
          index = 7;
        } else if (max_value == index_rpg) {
          index = 14;
        } else if (max_value == index_corr) {
          index = 21;
        }

        for (let z = index; z < index + 7; z++) {
          if (!mySelection.find((element) => element.id == gameList[z].id)) {
            recomendedGames.push(gameList[z]);
            j++;
            if (recomendedGames.length == 2) {
              break;
            }
          }
        }
        break;
      }
    }

    setMyGames(recomendedGames);
    setRecomended(true)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header>
        <h1>RecomendaGames</h1>
      </header>
      <div className="myGames">
        {recomended ? <h4 className="myGamesTitle">Recomendações:</h4> : <h4 className="myGamesTitle">Seus jogos favoritos:</h4> }
        <p>
          {myGames.map((game, index) => (
            <div
              key={index}
              className="favoritegame"
              onClick={() => handleRemoveGame(game)}
            >
              <p>
                {game.name}
              </p>
            </div>
          ))}
        </p>
        <button className="botao" onClick={() => generateRecomendedGames()}>
          Recomendar jogos
        </button>
      </div>
      <ul>{listItems}</ul>
    </>
  );
}

export default App;
