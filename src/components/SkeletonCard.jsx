import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow p-4 animate-pulse">
            {/* Image/Video skeleton */}
            <div className="w-full aspect-video bg-gray-200 rounded-lg mb-3"></div>

            {/* Title skeleton */}
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>

            {/* Description skeleton */}
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>

            {/* Tags skeleton */}
            <div className="flex gap-2 mb-3">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
            </div>

            {/* Footer skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded-full w-8"></div>
            </div>
        </div>
    );
}
