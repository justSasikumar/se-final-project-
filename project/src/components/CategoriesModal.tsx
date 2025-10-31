import { toolsData } from '../data/toolsData';

interface CategoriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCategory: (category: string) => void;
}

const CategoriesModal = ({ isOpen, onClose, onSelectCategory }: CategoriesModalProps) => {
    const categories = ['All', ...new Set(toolsData.map(t => t.category).sort())];
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Explore Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => onSelectCategory(cat)} className="p-4 text-center font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-300">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesModal;
