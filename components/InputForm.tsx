
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface InputFormProps {
    onGenerate: (description: string, url: string) => void;
    isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim() || !url.trim()) {
            setError('Both product description and URL are required.');
            return;
        }
        try {
            new URL(url); // Validate URL format
        } catch (_) {
            setError('Please enter a valid URL (e.g., https://example.com).');
            return;
        }
        setError('');
        onGenerate(description, url);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., An innovative smart-watch with a long-lasting battery and a sleek, modern design."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                        Product URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="https://example.com/product"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm">
                        <p>{error}</p>
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner className="w-5 h-5 mr-3" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-magic mr-2"></i>
                                Generate Banners
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InputForm;
