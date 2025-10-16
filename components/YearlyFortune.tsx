
import React, { useState } from 'react';
import { YEARLY_FORTUNE_DATA } from '../constants';
import { YearlyFortuneContent } from '../types';

const fortuneCategories = [
    { key: 'overall', label: '総合運' },
    { key: 'money', label: '金運' },
    { key: 'love', label: '恋愛運' },
    { key: 'work', label: '仕事運' },
    { key: 'health', label: '健康運' },
];

export const YearlyFortune: React.FC = () => {
    const [modalContent, setModalContent] = useState<YearlyFortuneContent | null>(null);

    const handleOpenModal = (categoryKey: string) => {
        setModalContent(YEARLY_FORTUNE_DATA[categoryKey]);
    };

    const handleCloseModal = () => {
        setModalContent(null);
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 mb-6">
                今年の運勢
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {fortuneCategories.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => handleOpenModal(key)}
                        className="col-span-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        今年の{label}
                    </button>
                ))}
            </div>

            {modalContent && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in-fast"
                    onClick={handleCloseModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="yearly-fortune-title"
                >
                    <div
                        className="bg-gradient-to-b from-purple-800 to-indigo-950 rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20 w-full max-w-lg m-4 text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 id="yearly-fortune-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 mb-4">
                            {modalContent.title}
                        </h3>
                        <p className="text-indigo-100 whitespace-pre-line">{modalContent.text}</p>
                        <div className="mt-6 text-right">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
