import { useState, useEffect } from 'react';
import { toolsData } from './data/toolsData';
import { modalData } from './utils/modalContent';
import Modal from './components/Modal';
import InPageAiModal from './components/InPageAiModal';
import SubscriptionModal from './components/SubscriptionModal';
import Header from './components/Header';
import CategoriesModal from './components/CategoriesModal';
import TrendingModal from './components/TrendingModal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';
import ToolDetailsPage from './pages/ToolDetailsPage';
import LoginPage from './pages/LoginPage';

export default function App() {
    const [theme, setTheme] = useState('dark');
    const [route, setRoute] = useState<{ page: string; id?: string | null }>({ page: 'home', id: null });
    const [modalContent, setModalContent] = useState<string | null>(null);
    const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
    const [isTrendingModalOpen, setIsTrendingModalOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string; icon: string }>>([]);
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [isInPageAiOpen, setIsInPageAiOpen] = useState(false);
    const [inPagePrompt, setInPagePrompt] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        const savedBookmarks = JSON.parse(localStorage.getItem('allino-bookmarks') || '[]');
        setBookmarks(savedBookmarks);
    }, []);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const showToast = (message: string) => {
        setNotification({ show: true, message });
        setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    };

    const handleLogin = (userData: { user: { email: string }; token: string }) => {
        setUser(userData.user);
        showToast(`Welcome back, ${userData.user.email}!`);
    };

    const handleLogout = () => {
        setUser(null);
        showToast("You've been logged out.");
    };

    const startVoiceSearch = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            showToast("Voice recognition not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.start();
        showToast("Listening...");
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSearchTerm(transcript);
            handleExecuteInPage(transcript);
        };
        recognition.onerror = () => {
            showToast("Voice recognition error.");
        };
    };

    const handleExecuteInPage = (prompt: string) => {
        if (!prompt.trim()) {
            showToast("Please enter a prompt first.");
            return;
        }
        setInPagePrompt(prompt);
        setIsInPageAiOpen(true);
    };

    const toggleBookmark = (toolId: string) => {
        const newBookmarks = bookmarks.includes(toolId)
            ? bookmarks.filter(id => id !== toolId)
            : [...bookmarks, toolId];
        setBookmarks(newBookmarks);
        localStorage.setItem('allino-bookmarks', JSON.stringify(newBookmarks));
        showToast(bookmarks.includes(toolId) ? "Bookmark removed" : "Bookmark added");
    };

    const handleCategorySelect = (category: string) => {
        setFilter(category);
        setIsCategoriesModalOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        if (newSearchTerm.trim().length > 2) {
            const lowerCaseTerm = newSearchTerm.toLowerCase();
            const relevantTools = toolsData.filter(tool =>
                tool.keywords.some(keyword => lowerCaseTerm.includes(keyword))
            ).slice(0, 4);
            setSuggestions(relevantTools);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (tool: { id: string; name: string; icon: string; link?: string; urlPrompt?: string }) => {
        if (!searchTerm.trim()) return;

        const encodedPrompt = encodeURIComponent(searchTerm);

        if (tool.urlPrompt) {
            window.open(`${tool.urlPrompt}${encodedPrompt}`, '_blank', 'noopener,noreferrer');
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = searchTerm;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showToast(`Prompt copied! Opening ${tool.name}...`);
            } catch (err) {
                showToast(`Failed to copy prompt.`);
            }
            document.body.removeChild(textArea);

            const fullTool = toolsData.find(t => t.id === tool.id);
            if (fullTool?.link) {
                window.open(fullTool.link, '_blank', 'noopener,noreferrer');
            }
        }
        setSuggestions([]);
    };

    const renderPage = () => {
        switch (route.page) {
            case 'tool-details': return <ToolDetailsPage toolId={route.id || ''} setRoute={setRoute} />;
            case 'bookmarks': return <BookmarksPage setRoute={setRoute} bookmarks={bookmarks} onBookmark={toggleBookmark} />;
            case 'login': return <LoginPage setRoute={setRoute} showToast={showToast} onLogin={handleLogin} />;
            case 'home':
            default:
                return <HomePage
                            setRoute={setRoute}
                            filter={filter}
                            setFilter={setFilter}
                            bookmarks={bookmarks}
                            onBookmark={toggleBookmark}
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            onVoiceSearch={startVoiceSearch}
                            onExecuteInPage={handleExecuteInPage}
                            suggestions={suggestions}
                            onSuggestionClick={handleSuggestionClick}
                        />;
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-500">
            {modalContent && <Modal title={modalContent} content={modalData[modalContent]} onClose={() => setModalContent(null)} />}
            <CategoriesModal isOpen={isCategoriesModalOpen} onClose={() => setIsCategoriesModalOpen(false)} onSelectCategory={handleCategorySelect} />
            <TrendingModal isOpen={isTrendingModalOpen} onClose={() => setIsTrendingModalOpen(false)} setRoute={setRoute} />
            <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />
            <InPageAiModal isOpen={isInPageAiOpen} onClose={() => setIsInPageAiOpen(false)} initialPrompt={inPagePrompt} />
            {notification.show && (
                 <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-3 px-6 rounded-lg shadow-xl">
                    {notification.message}
                </div>
            )}
            <Header
                theme={theme}
                toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                setRoute={setRoute}
                onCategoriesClick={() => setIsCategoriesModalOpen(true)}
                onTrendingClick={() => setIsTrendingModalOpen(true)}
                onAboutClick={() => setModalContent('About')}
                user={user}
                onLogout={handleLogout}
                onSubscribeClick={() => setIsSubModalOpen(true)}
            />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                {renderPage()}
            </main>
            <Footer onFooterLinkClick={(content) => setModalContent(content)} />
        </div>
    );
}
