interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 transform transition-all text-center">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500" aria-label="Close">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <h2 className="text-2xl font-bold mb-2">Unlock All Features</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Go Pro to get unlimited access to all AI models and features.</p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg mb-6">
                    <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-300">₹799</p>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">per month</p>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all">Subscribe Now</button>
            </div>
        </div>
    );
};

export default SubscriptionModal;
