import "./Card.css";

export const Card = ({card, onHandleClick, flipped}) => {
    return <div className="card">
    <div className={flipped ? "flipped" : ""}>
      <img className="front" src={card.src} alt="card front" />
      <img className="back" onClick={() => onHandleClick(card)} src="/img/cover.png" alt="card back" />
    </div>
  </div>
}