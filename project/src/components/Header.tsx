import { useState } from 'react';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
    setRoute: (route: { page: string; id?: string | null }) => void;
    onCategoriesClick: () => void;
    onTrendingClick: () => void;
    onAboutClick: () => void;
    user: { email: string } | null;
    onLogout: () => void;
    onSubscribeClick: () => void;
}

const Header = ({ theme, toggleTheme, setRoute, onCategoriesClick, onTrendingClick, onAboutClick, user, onLogout, onSubscribeClick }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (action: () => void) => {
        action();
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ page: 'home' }); }} className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">ALLINO</a>
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={onCategoriesClick} className="font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500">Categories</button>
                        <button onClick={() => setRoute({ page: 'bookmarks'})} className="font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500">Bookmarks</button>
                        <button onClick={onTrendingClick} className="font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500">Trending</button>
                        <button onClick={onAboutClick} className="font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500">About</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Toggle theme">
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                        <button onClick={onSubscribeClick} className="hidden md:inline-block px-4 py-2 text-sm font-semibold bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all shadow-sm">Go Pro ✨</button>
                        {user ? (
                            <button onClick={onLogout} className="hidden md:inline-block px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
                        ) : (
                            <button onClick={() => setRoute({ page: 'login' })} className="hidden md:inline-block px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Login</button>
                        )}
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md" aria-label="Open menu">
                                {isMobileMenuOpen ?
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> :
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden pt-2 pb-3 space-y-1">
                        <button onClick={() => handleNavClick(onCategoriesClick)} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium">Categories</button>
                        <button onClick={() => handleNavClick(() => setRoute({ page: 'bookmarks' }))} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium">Bookmarks</button>
                        <button onClick={() => handleNavClick(onTrendingClick)} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium">Trending</button>
                        <button onClick={() => handleNavClick(onAboutClick)} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium">About</button>
                        <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                         {user ? (
                            <button onClick={() => handleNavClick(onLogout)} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                        ) : (
                            <button onClick={() => handleNavClick(() => setRoute({ page: 'login' }))} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium">Login</button>
                        )}
                        <button onClick={() => handleNavClick(onSubscribeClick)} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-yellow-500">Go Pro ✨</button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
