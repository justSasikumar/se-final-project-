import { toolsData } from '../data/toolsData';

interface TrendingModalProps {
    isOpen: boolean;
    onClose: () => void;
    setRoute: (route: { page: string; id?: string }) => void;
}

const TrendingModal = ({ isOpen, onClose, setRoute }: TrendingModalProps) => {
    const trendingTools = toolsData.filter(t => t.isTrending);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Trending Tools 🔥</h2>
                <div className="space-y-4">
                    {trendingTools.map(tool => (
                        <a href="#" key={tool.id} onClick={(e) => { e.preventDefault(); setRoute({ page: 'tool-details', id: tool.id }); onClose(); }} className="block p-4 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
                            <h3 className="font-bold">{tool.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{tool.desc}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingModal;
