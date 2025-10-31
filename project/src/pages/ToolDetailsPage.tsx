import { toolsData } from '../data/toolsData';

interface ToolDetailsPageProps {
    toolId: string;
    setRoute: (route: { page: string; id?: string | null }) => void;
}

const ToolDetailsPage = ({ toolId, setRoute }: ToolDetailsPageProps) => {
    const tool = toolsData.find(t => t.id === toolId);
    if (!tool) return <div>Tool not found.</div>;

    return (
        <div className="py-16">
            <button onClick={() => setRoute({ page: 'home' })} className="font-semibold text-indigo-500 mb-8">← Back to Home</button>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-8 mb-12">
                    <div className="text-8xl">{tool.icon}</div>
                    <div>
                        <h1 className="text-5xl font-bold">{tool.name}</h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400">{tool.category}</p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Description</h2>
                        <p className="leading-relaxed">{tool.desc}</p>
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold mb-4">Specification</h2>
                        <p className="leading-relaxed">{tool.specification}</p>
                    </div>
                </div>
                <a href={tool.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-12 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700">Visit {tool.name}</a>
            </div>
        </div>
    );
};

export default ToolDetailsPage;
