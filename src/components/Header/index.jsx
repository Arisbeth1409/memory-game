import { useValidateUser } from "../../hooks";

export default function Header() {
  const user = useValidateUser();

  if (!user) return null;
  return (
    <header className="header h-16 border-b border-slate-700 flex items-center justify-end pr-6 pl-6 shadow-xl">
      <p className="header__user text-slate-300 sm:text-3xl text-2xl">
        Hola <span className="header__user--bold font-bold">{user}</span>
      </p>
    </header>
  );
}
