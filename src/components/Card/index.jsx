import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function Card({ image, onClick, isFlipped }) {
  return (
    <button
      className={`card group flex justify-center w-full h-14 sm:h-24 bg-white rounded-lg border border-stone-950 ${
        isFlipped ? "flipped" : ""
      }`}
      onClick={onClick}
    >
      {isFlipped ? (
        <img
          className="card__image w-full h-14 sm:h-24 object-cover rounded-lg"
          src={image}
          alt="card"
        />
      ) : (
        <QuestionMarkCircleIcon className="card__question w-14 transition-transform duration-200  group-hover:scale-125" />
      )}
    </button>
  );
}
