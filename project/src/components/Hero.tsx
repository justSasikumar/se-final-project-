interface HeroProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onVoiceSearch: () => void;
    onExecuteInPage: (term: string) => void;
    suggestions: Array<{ id: string; name: string; icon: string }>;
    onSuggestionClick: (tool: { id: string; name: string; icon: string }) => void;
}

const Hero = ({ searchTerm, onSearchChange, onVoiceSearch, onExecuteInPage, suggestions, onSuggestionClick }: HeroProps) => {
    return (
        <section className="text-center py-20">
            <h1 className="text-6xl md:text-8xl font-extrabold uppercase tracking-widest mb-4">ALLINO</h1>
            <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 mb-10">Discover Every AI Tool in One Universe</p>
            <div className="mt-16 max-w-xl mx-auto">
                <div className="relative">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={onSearchChange}
                        onKeyUp={(e) => e.key === 'Enter' && onExecuteInPage(searchTerm)}
                        placeholder="Ask me to generate anything..."
                        className="w-full pl-5 pr-32 py-4 bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full shadow-lg"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button onClick={onVoiceSearch} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Search by voice">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg>
                        </button>
                        <button onClick={() => onExecuteInPage(searchTerm)} className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700">Go</button>
                    </div>
                </div>
                {suggestions.length > 0 && (
                    <div className="mt-4 max-w-xl mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg p-2 flex flex-wrap justify-center items-center gap-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">Try:</span>
                        {suggestions.map(tool => (
                            <button
                                key={tool.id}
                                onClick={() => onSuggestionClick(tool)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-sm font-semibold transition-all"
                            >
                                <span>{tool.icon}</span>
                                <span>{tool.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
