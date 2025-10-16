
import React, { useState } from 'react';
import { getOmikuji } from '../services/geminiService';
import { Loader } from './Loader';

export const Omikuji: React.FC = () => {
    const [modalContent, setModalContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDrawOmikuji = async () => {
        setIsLoading(true);
        setError(null);
        setModalContent(null);
        try {
            const result = await getOmikuji();
            setModalContent(result);
        } catch (err) {
            setError('おみくじの取得に失敗しました。時間をおいて再度お試しください。');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setModalContent(null);
        setError(null);
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 mb-6">
                今日のおみくじ
            </h2>
            <p className="text-center text-indigo-200 mb-6">
                今日の運勢をサクッと占ってみましょう。
            </p>
            <button
                onClick={handleDrawOmikuji}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLoading ? '念を送っています...' : 'おみくじを引く'}
            </button>

            {(modalContent || error) && !isLoading && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in-fast"
                    onClick={handleCloseModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="omikuji-title"
                >
                    <div
                        className="bg-gradient-to-b from-purple-800 to-indigo-950 rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20 w-full max-w-lg m-4 text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {modalContent && (
                            <>
                                <h3 id="omikuji-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 mb-4 text-center">
                                    おみくじの結果
                                </h3>
                                <div className="bg-white/5 p-4 rounded-lg">
                                  <p className="text-indigo-100 whitespace-pre-line">{modalContent}</p>
                                </div>
                            </>
                        )}
                        {error && (
                            <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>
                        )}
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
            
            {isLoading && (
                 <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in-fast"
                    role="alert"
                    aria-live="assertive"
                >
                    <Loader />
                </div>
            )}
        </div>
    );
};
