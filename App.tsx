
import React, { useState, useCallback } from 'react';
import { STANDARD_BANNER_SIZES } from './constants';
import { GeneratedBanner } from './types';
import { generateBannerAd } from './services/geminiService';
import InputForm from './components/InputForm';
import BannerGrid from './components/BannerGrid';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [banners, setBanners] = useState<GeneratedBanner[]>([]);
    const [apiError, setApiError] = useState<string | null>(null);
    
    const handleGenerate = useCallback(async (description: string, url: string) => {
        setIsLoading(true);
        setApiError(null);

        const initialBanners: GeneratedBanner[] = STANDARD_BANNER_SIZES.map(size => ({
            id: size.name,
            size,
            imageUrl: null,
            status: 'generating',
        }));
        setBanners(initialBanners);

        const generationPromises = STANDARD_BANNER_SIZES.map(async (size) => {
            try {
                const imageUrl = await generateBannerAd(description, url, size);
                setBanners(prev => prev.map(b => b.id === size.name ? { ...b, imageUrl, status: 'completed' } : b));
            } catch (error) {
                console.error(`Failed to generate banner for ${size.name}:`, error);
                setBanners(prev => prev.map(b => b.id === size.name ? { ...b, status: 'failed' } : b));
                setApiError("An error occurred during banner generation. Some images may have failed. Please check your API key and try again.");
            }
        });

        await Promise.allSettled(generationPromises);

        setIsLoading(false);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
                    <i className="fas fa-layer-group text-3xl text-blue-600"></i>
                    <h1 className="ml-3 text-2xl font-bold text-gray-900 tracking-tight">AI Banner Ad Generator</h1>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
                    
                    {apiError && !isLoading && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{apiError}</p>
                        </div>
                    )}
                    
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Banners</h2>
                        <BannerGrid banners={banners} />
                    </div>
                </div>
            </main>

            <footer className="bg-white mt-12 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    <p>Powered by Google Gemini API. All generated images are for demonstration purposes.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
