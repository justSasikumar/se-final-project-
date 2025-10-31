import { useEffect, useRef } from 'react';

interface ModalProps {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ title, content, onClose }: ModalProps) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div ref={modalRef} className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 transform transition-all">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200" aria-label="Close modal">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="text-slate-600 dark:text-slate-300 space-y-4 max-h-[70vh] overflow-y-auto pr-4">{content}</div>
            </div>
        </div>
    );
};

export default Modal;
