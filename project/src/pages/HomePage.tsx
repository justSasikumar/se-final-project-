import { useState } from 'react';
import { toolsData } from '../data/toolsData';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';

interface HomePageProps {
    setRoute: (route: { page: string; id?: string | null }) => void;
    filter: string;
    setFilter: (filter: string) => void;
    bookmarks: string[];
    onBookmark: (id: string) => void;
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onVoiceSearch: () => void;
    onExecuteInPage: (term: string) => void;
    suggestions: Array<{ id: string; name: string; icon: string }>;
    onSuggestionClick: (tool: { id: string; name: string; icon: string }) => void;
}

const HomePage = ({ setRoute, filter, setFilter, bookmarks, onBookmark, searchTerm, onSearchChange, onVoiceSearch, onExecuteInPage, suggestions, onSuggestionClick }: HomePageProps) => {
    const [sort, setSort] = useState('dateAdded');
    const categories = ['All', ...new Set(toolsData.map(t => t.category).sort())];

    const filteredAndSortedTools = toolsData
        .filter(tool => {
            const matchesCategory = filter === 'All' || tool.category === filter;
            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearch = searchTermLower === '' || tool.name.toLowerCase().includes(searchTermLower) || tool.desc.toLowerCase().includes(searchTermLower) || tool.category.toLowerCase().includes(searchTermLower);
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sort === 'name') return a.name.localeCompare(b.name);
            return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        });

    return (
        <>
            <Hero
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                onVoiceSearch={onVoiceSearch}
                onExecuteInPage={onExecuteInPage}
                suggestions={suggestions}
                onSuggestionClick={onSuggestionClick}
            />
            <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map(category => (
                         <button key={category} onClick={() => setFilter(category)} className={`px-3 py-1.5 text-sm font-medium rounded-full ${filter === category ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                            {category}
                        </button>
                    ))}
                </div>
                 <div>
                    <select value={sort} onChange={e => setSort(e.target.value)} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium">
                        <option value="dateAdded">Sort by: Newest</option>
                        <option value="name">Sort by: Name (A-Z)</option>
                    </select>
                </div>
            </div>
            <section id="app-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
                 {filteredAndSortedTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} setRoute={setRoute} isBookmarked={bookmarks.includes(tool.id)} onBookmark={onBookmark} />
                ))}
            </section>
        </>
    );
};

export default HomePage;
