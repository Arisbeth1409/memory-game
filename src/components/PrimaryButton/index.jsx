export default function PrimaryButton({ label }) {
  return (
    <button className="primary-button bg-blue-500 h-12 rounded-md transition-colors duration-300 hover:bg-blue-600 focus:outline-none">
      <span className="primary-button__label bold text-white text-lg">
        {label}
      </span>
    </button>
  );
}
