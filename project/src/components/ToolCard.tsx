import { useState, useEffect, useRef } from 'react';

interface Tool {
    id: string;
    name: string;
    icon: string;
    desc: string;
    link: string;
}

interface ToolCardProps {
    tool: Tool;
    setRoute: (route: { page: string; id?: string }) => void;
    isBookmarked: boolean;
    onBookmark: (id: string) => void;
}

const ToolCard = ({ tool, setRoute, isBookmarked, onBookmark }: ToolCardProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                    </button>
                    {isMenuOpen && (
                        <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                            <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ page: 'tool-details', id: tool.id }); }} className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">Learn More</a>
                        </div>
                    )}
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 h-10">{tool.desc}</p>
            <div className="flex justify-between items-center">
                <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Visit Site</a>
                <button onClick={() => onBookmark(tool.id)} className={`p-2 rounded-full ${isBookmarked ? 'text-yellow-400 bg-yellow-400/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default ToolCard;
