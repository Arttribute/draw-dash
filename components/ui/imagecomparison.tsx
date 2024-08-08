import React from "react";
import Image from "next/image";

const ImageComparison: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      {/* AI Generated Image */}
      <div className="relative w-48 ml-44 border rounded-2xl p-1 bg-white">
        <div className="relative bg-gray-200 border border-gray-300 rounded-xl overflow-hidden">
          <Image
            src="/path_to_user_image"
            width={400}
            height={400}
            alt="User's Drawing"
            className=" rounded-xl object-cover w-full aspect-[1]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-xl font-bold">
            AI Generated
          </div>
        </div>
      </div>
      {/* User's Drawing */}
      <div className="relative w-48 mr-44 mt-[-30px] border rounded-2xl p-1 bg-white">
        <div className="relative bg-gray-200 border border-gray-300 rounded-xl rounded overflow-hidden">
          <Image
            src="/path_to_user_image"
            width={400}
            height={400}
            alt="User's Drawing"
            className=" rounded-xl object-cover w-full aspect-[1]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-xl font-bold">
            Your Drawing
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;
