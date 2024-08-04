import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faQuestion, faPencilAlt, faUndo, faTrashAlt, faEraser, faRedo} from '@fortawesome/free-solid-svg-icons';

const GameScreen = () => {
    return (
        <div className="flex justify-center bg-white p-6 min-h-screen">
            <div className="w-88 flex flex-col items-center justify-center bg-white p-3">
                {/* Scores */}
                <div className="flex w-80 items-center justify-between p-3">
                    <div className="flex h-12 w-24 gap-3 p-2 font-serif">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl" />
                        <div className="text-2xl">20</div>
                    </div>
                    <div className="flex h-16 w-24 flex-col p-2 font-serif">
                        <div className="flex gap-3">
                            <FontAwesomeIcon icon={faClock} className="text-gray-500 text-xl" />
                            <div className="text-2xl">30</div>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div> {/* Progress bar */}
                        </div>
                    </div>
                </div>

                {/* Random Text and Icon */}
                <div className="flex w-80 items-center gap-3 p-3">
                    <div className="flex h-20 w-52 rounded border-2 border-black p-2">
                        Random text
                    </div>
                    <div className="flex h-20 w-20 items-center justify-center rounded border-2 border-black">
                        <div className="flex h-10 w-10 flex-col items-center justify-center bg-black font-bold text-white">
                            <FontAwesomeIcon icon={faQuestion} className="text-l" />
                        </div>
                    </div>
                </div>

                {/* Drawing and Action Icons */}
                <div className="flex w-80 items-center gap-6 p-3">
                    <div className="flex h-52 w-56 items-center justify-center rounded border-2 border-black">
                        <div className="flex h-20 w-28 rounded justify-center items-center">
                            <div className="flex text-center w-full text-black"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 24 24" width="100px" fill="black"><rect fill="none" height="24" width="24"/><path d="M18.85,10.39l1.06-1.06c0.78-0.78,0.78-2.05,0-2.83L18.5,5.09c-0.78-0.78-2.05-0.78-2.83,0l-1.06,1.06L18.85,10.39z M14.61,11.81L7.41,19H6v-1.41l7.19-7.19L14.61,11.81z M13.19,7.56L4,16.76V21h4.24l9.19-9.19L13.19,7.56L13.19,7.56z M19,17.5 c0,2.19-2.54,3.5-5,3.5c-0.55,0-1-0.45-1-1s0.45-1,1-1c1.54,0,3-0.73,3-1.5c0-0.47-0.48-0.87-1.23-1.2l1.48-1.48 C18.32,15.45,19,16.29,19,17.5z M4.58,13.35C3.61,12.79,3,12.06,3,11c0-1.8,1.89-2.63,3.56-3.36C7.59,7.18,9,6.56,9,6 c0-0.41-0.78-1-2-1C5.74,5,5.2,5.61,5.17,5.64C4.82,6.05,4.19,6.1,3.77,5.76C3.36,5.42,3.28,4.81,3.62,4.38C3.73,4.24,4.76,3,7,3 c2.24,0,4,1.32,4,3c0,1.87-1.93,2.72-3.64,3.47C6.42,9.88,5,10.5,5,11c0,0.31,0.43,0.6,1.07,0.86L4.58,13.35z"/></svg></div>
                        </div>
                    </div>
                    <div className="flex h-36 w-12 flex-col items-center justify-center gap-2 rounded border-2 border-black p-2 font-bold">
                        <div className="flex h-7 w-7 justify-center ">
                            <FontAwesomeIcon icon={faPencilAlt} className="text-gray-800" />
                        </div>
                        <div className="flex h-7 w-7 justify-center">
                            <FontAwesomeIcon icon={faEraser} className="text-gray-800" />
                        </div>
                        <div className="flex h-7 w-7 justify-center ">
                            <FontAwesomeIcon icon={faUndo} className="text-gray-800" />
                        </div>
                        <div className="flex h-7 w-7 justify-center ">
                            <FontAwesomeIcon icon={faRedo} className="text-gray-800" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex w-96 items-center justify-center border-2 border-black p-1 shadow-md shadow-black cursor-pointer">
                    Submit
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
