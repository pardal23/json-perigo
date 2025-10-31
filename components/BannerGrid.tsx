
import React from 'react';
import { GeneratedBanner } from '../types';
import BannerCard from './BannerCard';

interface BannerGridProps {
    banners: GeneratedBanner[];
}

const BannerGrid: React.FC<BannerGridProps> = ({ banners }) => {
    if (banners.length === 0) {
        return (
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow-md">
                <i className="fas fa-image text-5xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700">Ready to create some ads?</h3>
                <p className="text-gray-500 mt-2">
                    Fill out the product details above and click "Generate Banners" to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {banners.map((banner) => (
                <BannerCard key={banner.id} banner={banner} />
            ))}
        </div>
    );
};

export default BannerGrid;
