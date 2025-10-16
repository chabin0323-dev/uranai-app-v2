import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

export const ShareButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (isModalOpen && canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, window.location.href, { width: 256, margin: 2 }, (error) => {
                if (error) console.error(error);
            });
        }
    }, [isModalOpen]);

    const handleShareClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('URLをコピーしました！');
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('URLのコピーに失敗しました。');
        }
    };

    return (
        <>
            <div className="text-center mt-8">
                <button
                    onClick={handleShareClick}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    この占いをシェアする
                </button>
            </div>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in-fast"
                    onClick={handleCloseModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="share-modal-title"
                >
                    <div 
                        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20 w-full max-w-sm m-4 text-center"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        <h3 id="share-modal-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 mb-4">
                            この占いをシェア
                        </h3>
                        <div className="bg-white p-4 rounded-lg inline-block">
                             <canvas ref={canvasRef} />
                        </div>
                        <p className="mt-4 text-indigo-200 text-sm break-all bg-gray-900/50 p-3 rounded-lg">
                            {window.location.href}
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                           <button
                                onClick={handleCopyUrl}
                                className="w-full flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                URLをコピー
                            </button>
                             <button
                                onClick={handleCloseModal}
                                className="w-full flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Add fade-in animation for the modal backdrop
if (typeof window !== 'undefined') {
    const styleId = 'modal-animation-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            @keyframes fadeInFast {
            from { opacity: 0; }
            to { opacity: 1; }
            }
            .animate-fade-in-fast {
            animation: fadeInFast 0.3s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }
}
