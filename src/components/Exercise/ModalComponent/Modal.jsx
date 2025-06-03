// components/Modal.js
export default function Modal({ children, onClose, ariaLabel }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="fixed my-5 top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-lg w-[90%]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-3xl font-bold leading-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </>
  );
}
