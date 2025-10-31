import { toolsData } from '../data/toolsData';
import ToolCard from '../components/ToolCard';

interface BookmarksPageProps {
    setRoute: (route: { page: string; id?: string | null }) => void;
    bookmarks: string[];
    onBookmark: (id: string) => void;
}

const BookmarksPage = ({ setRoute, bookmarks, onBookmark }: BookmarksPageProps) => {
    const bookmarkedTools = toolsData.filter(tool => bookmarks.includes(tool.id));
    return (
        <div className="py-16">
            <button onClick={() => setRoute({ page: 'home' })} className="font-semibold text-indigo-500 mb-8">← Back to Home</button>
            <h1 className="text-4xl font-bold mb-8">Your Bookmarks</h1>
            {bookmarkedTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {bookmarkedTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} setRoute={setRoute} isBookmarked={bookmarks.includes(tool.id)} onBookmark={onBookmark} />
                    ))}
                </div>
            ) : (
                <p>You haven't bookmarked any tools yet.</p>
            )}
        </div>
    );
};

export default BookmarksPage;
