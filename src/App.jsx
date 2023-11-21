import { useState, useEffect } from "react";
import Game from "./components/Game/Game";
import "./styleApp.css";
import countAndSortInversions from "./utils/inversion_count";

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
    if(myGamesList.length < 5 && !myGamesList.find((element) => element.id == game.id)){
      myGamesList.push({
        id: game.id,
        name: game.name,
        genre: game.genre,
      });
    } 
    setMyGames(myGamesList);
  };

  const handleRemoveGame = (game) => {
    let myGamesList = [...myGames];
    let newGameList = myGamesList.filter((element) => {
      return element !== game
    })
    setMyGames(newGameList)
  }

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
    const result = countAndSortInversions([...myGames]); // Recebe a contagem de inversão
    let favoriteGames = result.sameidElements; // Passamos os elementos que não mudaram de posição após a inversão - Gostos Similares
    // Loop e recomendação
    let recomendedGames = [];
    let j = 0;

    console.log("Veja o seu primeiro jogo com gosto semelhante:", favoriteGames[0]);
    console.log("Veja o seu segundo jogo com gosto semelhante:", favoriteGames[1]);

    // Percorrendo todos os jogos para recomendarmos ao jogador
    for (let i = 0; i < 28; i++) {

      if (j == 2) {
        break;
      }
      // Percorrendo jogos de FPS
      if (favoriteGames[j].genre == "FPS" && gameList[i].genre == "FPS") {

        // Se o jogo encontrado for diferente dos que estão na minha lista de jogos favoritos, então ele será recomendado!
        if (!favoriteGames[j].name.includes(gameList[i]) ) {
          recomendedGames.push(gameList[i]);
          j++;
        }
      }
      // Percorrendo jogos de Ação/Aventura
      if (favoriteGames[j].genre == "Ação/Aventura" && gameList[i].genre == "Ação/Aventura") {

        // Se o jogo encontrado for diferente dos que estão na minha lista de jogos favoritos, então ele será recomendado!
        if (!favoriteGames[j].name.includes(gameList[i]) ) {
          recomendedGames.push(gameList[i]);
          j++;
        }
      }

      // Percorrendo jogos de RPG
      if (favoriteGames[j].genre == "RPG" && gameList[i].genre == "RPG") {

        // Se o jogo encontrado for diferente dos que estão na minha lista de jogos favoritos, então ele será recomendado!
        if (!favoriteGames[j].name.includes(gameList[i]) ) {
          recomendedGames.push(gameList[i]);
          j++;
        }
      }
      // Percorrendo jogos de Corrida
      if (favoriteGames[j].genre == "Corrida" && gameList[i].genre == "Corrida") {
        
        // Se o jogo encontrado for diferente dos que estão na minha lista de jogos favoritos, então ele será recomendado!
        if (!favoriteGames[j].name.includes(gameList[i]) ) {
          recomendedGames.push(gameList[i]);
          j++;
        }
      }
    }

    console.log("Aqui está os jogo recomendados:", recomendedGames);
      
    
    setMyGames(recomendedGames);
    console.log(result.sameidElements);
    console.log(result.inversions);
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
        <h4 className="myGamesTitle">Seus jogos favoritos:</h4>
          <p>
            {myGames.map((game, index) => (
              <div key={index} className="favoritegame" onClick={() => handleRemoveGame(game)}>
                <p>Name: {game.name}<br/>Id: {game.id} </p>
              </div>
            ))}
          </p>
        <button className="botao" onClick={() => generateRecomendedGames()}>Recomendar jogos</button>
      </div>
      <ul>{listItems}</ul>
    </>
  );
}

export default App;
