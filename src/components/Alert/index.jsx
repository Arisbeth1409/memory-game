import PrimaryButton from "../PrimaryButton";

export default function Alert({ title, buttonText, onClick }) {
  return (
    <section className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="modal__content bg-white p-6 rounded-lg m-5 text-center">
        <h2 className="modal__title text-2xl mb-5">{title} 🎉</h2>
        <PrimaryButton
          className="modal__button"
          label={buttonText}
          onClick={onClick}
        />
      </div>
    </section>
  );
}
