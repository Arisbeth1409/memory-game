import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useValidateUser } from "../hooks";
import PrimaryButton from "../components/PrimaryButton";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  const navigate = useNavigate();
  useValidateUser("/game-board");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("user", data.name);
    navigate("/game-board");
  };

  return (
    <main className="game-user flex items-center justify-center h-screen">
      <section className="game-user__section flex flex-col gap-6 p-10 max-w-lg">
        <h1 className="game-user__title text-slate-300 text-4xl text-center drop-shadow-lg font-light">
          Ingresa tu nombre para comenzar el juego
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="game-user__form relative flex flex-col gap-4"
        >
          <UserCircleIcon className="game-user__icon w-7 absolute left-2 top-1 text-slate-400" />
          <input
            className={`game-user__input h-10 w-full bg-transparent border-b-2 p-2 pl-16 rounded-md text-slate-300 ${
              errors.name && "border-red-300"
            } focus:outline-none`}
            type="text"
            placeholder="User name"
            {...register("name", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
            })}
          />
          {errors.name && (
            <span
              className={`game-user__error-message text-xs ${
                errors.name && "text-red-300"
              }`}
            >
              {errors.name.message}
            </span>
          )}
          <PrimaryButton label="Iniciar juego" />
        </form>
      </section>
    </main>
  );
}
