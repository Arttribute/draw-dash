import React from 'react';

const MatchScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-slate-300 p-10 h-screen">
      <div className="flex flex-col items-center justify-center gap-3 font-semibold">
        <h1 className="text-2xl">Great Job!</h1>
        <h4>75% Match</h4>
      </div>

      <div className="flex flex-col">
        <div className="w-88 ml-6 flex flex-row gap-24">
          <div className="flex font-semibold text-black">
            <h2 className="text-2xl flex items-center gap-2">
                +120
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2.5 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z"
                />
              </svg>

            </h2>
          </div>

          <div className="flex h-44 w-48 items-center justify-center border-2 border-black">
            <div className="flex h-32 w-36 rounded border-4 bg-purple-100 items-center justify-center">
              Image
            </div>
          </div>
        </div>
        <div className="flex w-48">
          <div className="flex h-44 w-48 items-center justify-center border-2 border-black">
            <div className="flex h-32 w-36 rounded border-4 bg-purple-100 items-center justify-center">
              Image
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <button className="w-96 justify-center border-2 border-black bg-blue-200 p-2 shadow-md shadow-black">
          Next
        </button>
      </div>
    </div>
  );
};

export default MatchScreen;
