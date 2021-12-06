import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/Card';

const images = [
  {
    src: '/img/helmet-1.png',
    matched: false,
  },
  {
    src: '/img/potion-1.png',
    matched: false,
  },
  {
    src: '/img/ring-1.png',
    matched: false,
  },
  {
    src: '/img/scroll-1.png',
    matched: false,
  },
  {
    src: '/img/shield-1.png',
    matched: false,
  },
  {
    src: '/img/sword-1.png',
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [cardsDisabled, setCardsDisabled] = useState(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setCardsDisabled(true);
      if (choiceTwo.src === choiceOne.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 2000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const shuffleCards = () => {
    const updatedCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setCards(updatedCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  function onBackCardClick(card) {
    if (!cardsDisabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  }

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevValue) => prevValue + 1);
    setCardsDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <p>{turns}</p>
      <button disabled={choiceTwo ? true : false} onClick={shuffleCards}>
        New Game
      </button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} onHandleClick={onBackCardClick} card={card} flipped={card === choiceOne || card === choiceTwo || card.matched} />
        ))}
      </div>
    </div>
  );
}

export default App;
