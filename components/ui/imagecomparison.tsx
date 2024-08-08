import React from 'react';

const ImageComparison: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-col">

            {/* User's Drawing */}
            <div className="relative w-1/2 ml-44">
                <div className="relative bg-gray-200 border border-gray-300 rounded overflow-hidden">
                    <img
                        src="path_to_user_image"
                        alt="User's Drawing"
                        className="object-cover w-full h-64"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-xl font-bold">
                        Your Drawing
                    </div>
                </div>
            </div>
            {/* AI Generated Image */}
            <div className="relative w-1/2 mr-44 mt-[-30px]">
                <div className="relative bg-gray-200 border border-gray-300 rounded overflow-hidden">
                    <img
                        src="path_to_ai_image"
                        alt="AI Generated"
                        className="object-cover w-full h-64"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-xl font-bold">
                        AI Generated
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ImageComparison;
