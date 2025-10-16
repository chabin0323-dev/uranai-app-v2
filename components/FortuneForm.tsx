
import React from 'react';
import { BLOOD_TYPES, ZODIAC_SIGNS, YEARS, MONTHS, DAYS } from '../constants';

interface SelectProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    label: string;
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ id, value, onChange, options, label, disabled }) => (
    <div className="flex-1 min-w-[80px]">
        <label htmlFor={id} className="block text-sm font-medium text-indigo-200 mb-1">{label}</label>
        <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-gray-900/50 border border-purple-400/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-800"
        >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);


interface FortuneFormProps {
    name: string;
    setName: (value: string) => void;
    year: string;
    setYear: (value: string) => void;
    month: string;
    setMonth: (value: string) => void;
    day: string;
    setDay: (value: string) => void;
    bloodType: string;
    setBloodType: (value: string) => void;
    zodiacSign: string;
    setZodiacSign: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    isLocked: boolean;
    setIsLocked: (value: boolean) => void;
    isFortuneForOthers: boolean;
    onStartFortuneForOthers: () => void;
    onReturnToMyInfo: () => void;
}

export const FortuneForm: React.FC<FortuneFormProps> = ({
    name, setName, year, setYear, month, setMonth, day, setDay, bloodType, setBloodType, zodiacSign, setZodiacSign, handleSubmit, isLoading, isLocked, setIsLocked, isFortuneForOthers, onStartFortuneForOthers, onReturnToMyInfo
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 mb-6">
                {isFortuneForOthers ? '占う相手の情報を入力してください' : 'あなたの情報を入力してください'}
            </h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-indigo-200 mb-1">氏名（ニックネーム可）</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例：山田 太郎"
                    disabled={isLocked}
                    className="w-full bg-gray-900/50 border border-purple-400/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-800"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                    <p className="block text-sm font-medium text-indigo-200 mb-1">生年月日</p>
                    <div className="flex space-x-2">
                        <Select id="year" value={year} onChange={(e) => setYear(e.target.value)} options={YEARS} label="年" disabled={isLocked} />
                        <Select id="month" value={month} onChange={(e) => setMonth(e.target.value)} options={MONTHS} label="月" disabled={isLocked} />
                        <Select id="day" value={day} onChange={(e) => setDay(e.target.value)} options={DAYS} label="日" disabled={isLocked} />
                    </div>
                </div>

                <div className="md:col-span-1">
                    <Select id="bloodType" value={bloodType} onChange={(e) => setBloodType(e.target.value)} options={BLOOD_TYPES} label="血液型" disabled={isLocked} />
                </div>
                
                <div className="md:col-span-2">
                    <Select id="zodiacSign" value={zodiacSign} onChange={(e) => setZodiacSign(e.target.value)} options={ZODIAC_SIGNS} label="星座" disabled={isLocked} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                {isFortuneForOthers ? (
                    <button
                        type="button"
                        onClick={onReturnToMyInfo}
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        自分の情報に戻る
                    </button>
                ) : (
                    <>
                        {isLocked ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsLocked(false)}
                                    className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                                >
                                    固定を解除
                                </button>
                                <button
                                    type="button"
                                    onClick={onStartFortuneForOthers}
                                    className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                                >
                                    他人を占う
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsLocked(true)}
                                className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                入力を固定する
                            </button>
                        )}
                    </>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLoading ? '占っています...' : '運勢を占う'}
            </button>
        </form>
    )
}
