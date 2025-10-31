import { useState, FormEvent } from 'react';

interface LoginPageProps {
    setRoute: (route: { page: string; id?: string | null }) => void;
    showToast: (message: string) => void;
    onLogin: (userData: { user: { email: string }; token: string }) => void;
}

const LoginPage = ({ setRoute, showToast, onLogin }: LoginPageProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
                onLogin({ user: { email: 'test@example.com' }, token: 'fake-jwt-token' });
                showToast('Login successful!');
                setRoute({ page: 'home' });
            } else {
                showToast('Invalid email or password.');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-extrabold text-center">Sign in</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (test@example.com)" required className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-transparent focus:ring-2 focus:ring-indigo-500"/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (password)" required className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-transparent focus:ring-2 focus:ring-indigo-500"/>
                    <button type="submit" disabled={isLoading} className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-indigo-400">
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
