import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
    return (
        <div className="w-screen">
            <div className='pr-[1000px] pt-10'>
                    <Skeleton height={50} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 pt-11">
                <div>
                    <Skeleton height={200} />
                </div>
                <div>
                    <Skeleton height={150} />
                    <div className="pt-4">
                        <Skeleton count={3} height={50} />
                    </div>
                </div>
            </div>
        </div>
    );
}

