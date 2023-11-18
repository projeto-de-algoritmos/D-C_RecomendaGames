function Game(props){
    return (
        <div className="gameContainer">
            <img src={props.image}/>
            <p>{props.name}</p>
            <p>{props.genre}</p>
        </div>
    )
}

export default Game