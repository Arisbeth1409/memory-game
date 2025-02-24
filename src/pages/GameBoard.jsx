import { useValidateUser } from "../hooks";
export default function GameBoard() {
  useValidateUser("/game-board");
  return (
    <main>
      <h1>Game Board</h1>
    </main>
  );
}
