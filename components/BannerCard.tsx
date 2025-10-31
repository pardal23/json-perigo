
import React from 'react';
import { GeneratedBanner } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface BannerCardProps {
    banner: GeneratedBanner;
}

const BannerCard: React.FC<BannerCardProps> = ({ banner }) => {
    const { size, imageUrl, status } = banner;

    const downloadImage = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `banner_${size.width}x${size.height}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
            <div
                className="relative bg-gray-200 flex items-center justify-center"
                style={{
                    width: '100%',
                    paddingBottom: `${(size.height / size.width) * 100}%`,
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    {status === 'generating' && (
                        <div className="text-center text-gray-500">
                            <LoadingSpinner className="w-8 h-8 mx-auto text-blue-500" />
                            <p className="mt-2 text-sm">Generating...</p>
                        </div>
                    )}
                    {status === 'completed' && imageUrl && (
                        <img
                            src={imageUrl}
                            alt={`${size.name} Banner`}
                            className="w-full h-full object-cover"
                        />
                    )}
                    {status === 'failed' && (
                        <div className="text-center text-red-500 p-4">
                            <i className="fas fa-exclamation-triangle text-3xl"></i>
                            <p className="mt-2 text-sm font-semibold">Generation Failed</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 mt-auto flex justify-between items-center">
                <div>
                    <p className="font-bold text-gray-800 text-sm">{size.name}</p>
                    <p className="text-xs text-gray-500">{`${size.width} x ${size.height}`}</p>
                </div>
                {status === 'completed' && imageUrl && (
                    <button
                        onClick={downloadImage}
                        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label="Download banner"
                    >
                        <i className="fas fa-download"></i>
                    </button>
                )}
                 {status !== 'completed' && (
                     <div className="p-2 rounded-full bg-gray-300 text-gray-500 cursor-not-allowed">
                        <i className="fas fa-download"></i>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default BannerCard;
