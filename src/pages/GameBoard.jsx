import { useMemo, useState, useEffect } from "react";
import { useAnimals } from "../hooks";

import Card from "../components/Card";
import Alert from "../components/Alert";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function GameBoard() {
  const { animals } = useAnimals();

  const animalsData = useMemo(
    () =>
      Array.isArray(animals?.entries)
        ? animals.entries.map((animal) => ({
            id: animal.meta.uuid,
            image: animal.fields.image.url,
          }))
        : [],
    [animals]
  );

  const scrambledCards = useMemo(() => {
    const duplicatedCards = animalsData.flatMap((animal) => [
      { ...animal, unique: `${animal.id}-a` },
      { ...animal, unique: `${animal.id}-b` },
    ]);
    return duplicatedCards.sort(() => Math.random() - 0.5);
  }, [animalsData]);

  const [cards, setCards] = useState([]);
  const [backIndexes, setBackIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [failed, setFailed] = useState(0);
  const [succes, setSucces] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (index) => {
    if (
      backIndexes.length === 2 ||
      backIndexes.includes(index) ||
      matchedPairs.includes(index)
    ) {
      return;
    }

    const newBackIndexes = [...backIndexes, index];
    setBackIndexes(newBackIndexes);

    if (newBackIndexes.length === 2) {
      const [firstIndex, secondIndex] = newBackIndexes;
      if (cards[firstIndex]?.id === cards[secondIndex]?.id) {
        setMatchedPairs((prev) => [...prev, firstIndex, secondIndex]);
        setSucces((prev) => prev + 1);
      } else {
        setFailed((prev) => prev + 1);
      }
      setTimeout(() => setBackIndexes([]), 1000);
    }
  };

  useEffect(() => {
    setCards(scrambledCards);
  }, [scrambledCards]);

  useEffect(() => {
    if (succes === animalsData.length && succes > 0) {
      setShowModal(true);
    }
  }, [succes, animalsData.length]);

  const handleReset = () => {
    setBackIndexes([]);
    setMatchedPairs([]);
    setFailed([]);
    setSucces([]);
    setFailed(0);
    setSucces(0);
    setShowModal(false);
  };

  return (
    <main className="game-board max-w-7xl mx-auto gap-6 p-6 ">
      <section className="game-board__status flex gap-4 justify-center mb-6">
        <p className="game-board__status-element game-board__status-element--fail border-red-500 border-b-2 rounded-md h-14 text-stone-200 p-2 flex items-center justify-center gap-4">
          <XMarkIcon className="w-7" />
          {failed}
        </p>
        <p className="game-board__status-element game-board__status-element--success border-lime-600 border-b-2 rounded-md h-14 text-stone-200 p-2 flex items-center justify-center gap-4">
          <CheckCircleIcon className="w-7" /> {succes}
        </p>
      </section>
      <section className="grid grid-cols-4 sm:grid-cols-6  md:grid-cols-10 gap-2 sm:gap-4">
        {cards.length &&
          cards.map((card, index) => {
            const isFlipped =
              backIndexes.includes(index) || matchedPairs.includes(index);
            return (
              <Card
                key={card.unique}
                isFlipped={isFlipped}
                onClick={() => handleCardClick(index)}
                image={card.image}
              />
            );
          })}
      </section>
      {showModal && (
        <Alert
          onClick={() => handleReset()}
          title="¡Felicidades, haz ganado la partida!"
          buttonText="Iniciar de nuevo"
        />
      )}
    </main>
  );
}
