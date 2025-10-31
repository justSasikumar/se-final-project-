interface FooterProps {
    onFooterLinkClick: (content: string) => void;
}

const Footer = ({ onFooterLinkClick }: FooterProps) => {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">&copy; 2025 ALLINO. All rights reserved.</p>
                <div className="flex items-center gap-6 text-sm font-medium">
                    <button onClick={() => onFooterLinkClick('About')} className="hover:text-indigo-500">About</button>
                    <button onClick={() => onFooterLinkClick('Terms')} className="hover:text-indigo-500">Terms</button>
                    <button onClick={() => onFooterLinkClick('Privacy')} className="hover:text-indigo-500">Privacy</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
