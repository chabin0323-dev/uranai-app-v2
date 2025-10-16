
import React, { useState, useCallback, useEffect } from 'react';
import { Fortune } from './types';
import { BLOOD_TYPES, ZODIAC_SIGNS, YEARS, MONTHS, DAYS } from './constants';
import { getFortune } from './services/geminiService';
import { FortuneResultDisplay } from './components/FortuneResultDisplay';
import { FortuneForm } from './components/FortuneForm';
import { Loader } from './components/Loader';
import { ShareButton } from './components/ShareButton';
import { Logo } from './components/Logo';
import { YearlyFortune } from './components/YearlyFortune';
import { Omikuji } from './components/Omikuji';

const App: React.FC = () => {
  const [name, setName] = useState<string>(() => localStorage.getItem('fortune-app-name') || '');
  const [year, setYear] = useState<string>(() => localStorage.getItem('fortune-app-year') || new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>(() => localStorage.getItem('fortune-app-month') || (new Date().getMonth() + 1).toString());
  const [day, setDay] = useState<string>(() => localStorage.getItem('fortune-app-day') || new Date().getDate().toString());
  const [bloodType, setBloodType] = useState<string>(() => localStorage.getItem('fortune-app-bloodType') || BLOOD_TYPES[0]);
  const [zodiacSign, setZodiacSign] = useState<string>(() => localStorage.getItem('fortune-app-zodiacSign') || ZODIAC_SIGNS[0]);
  const [isLocked, setIsLocked] = useState<boolean>(() => JSON.parse(localStorage.getItem('fortune-app-isLocked') || 'false'));
  const [isFortuneForOthers, setIsFortuneForOthers] = useState<boolean>(false);

  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  useEffect(() => {
    if (!isFortuneForOthers) {
      localStorage.setItem('fortune-app-name', name);
      localStorage.setItem('fortune-app-year', year);
      localStorage.setItem('fortune-app-month', month);
      localStorage.setItem('fortune-app-day', day);
      localStorage.setItem('fortune-app-bloodType', bloodType);
      localStorage.setItem('fortune-app-zodiacSign', zodiacSign);
    }
  }, [name, year, month, day, bloodType, zodiacSign, isFortuneForOthers]);

  useEffect(() => {
    localStorage.setItem('fortune-app-isLocked', JSON.stringify(isLocked));
  }, [isLocked]);


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError('氏名を入力してください。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFortune(null);
    try {
      const result = await getFortune({ name, year, month, day, bloodType, zodiacSign });
      setFortune(result);
    } catch (err) {
      setError('占いの取得に失敗しました。時間をおいて再度お試しください。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [name, year, month, day, bloodType, zodiacSign]);

  const handleStartFortuneForOthers = () => {
    setIsFortuneForOthers(true);
    setIsLocked(false);
    setName('');
    setYear(new Date().getFullYear().toString());
    setMonth((new Date().getMonth() + 1).toString());
    setDay(new Date().getDate().toString());
    setBloodType(BLOOD_TYPES[0]);
    setZodiacSign(ZODIAC_SIGNS[0]);
  };

  const handleReturnToMyInfo = () => {
    setIsFortuneForOthers(false);
    setIsLocked(true);
    setName(localStorage.getItem('fortune-app-name') || '');
    setYear(localStorage.getItem('fortune-app-year') || new Date().getFullYear().toString());
    setMonth(localStorage.getItem('fortune-app-month') || (new Date().getMonth() + 1).toString());
    setDay(localStorage.getItem('fortune-app-day') || new Date().getDate().toString());
    setBloodType(localStorage.getItem('fortune-app-bloodType') || BLOOD_TYPES[0]);
    setZodiacSign(localStorage.getItem('fortune-app-zodiacSign') || ZODIAC_SIGNS[0]);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-indigo-950 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center relative">
      <Logo />
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 tracking-wider">
          AI Fortune Teller
        </h1>
        <p className="text-indigo-200 mt-2 text-lg">
          世界一良く当たるAI占い師
        </p>
      </header>

      <main className="w-full max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
          <FortuneForm
            name={name}
            setName={setName}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            bloodType={bloodType}
            setBloodType={setBloodType}
            zodiacSign={zodiacSign}
            setZodiacSign={setZodiacSign}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isLocked={isLocked}
            setIsLocked={setIsLocked}
            isFortuneForOthers={isFortuneForOthers}
            onStartFortuneForOthers={handleStartFortuneForOthers}
            onReturnToMyInfo={handleReturnToMyInfo}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <YearlyFortune />
          <Omikuji />
        </div>

        <div className="mt-10">
          {isLoading && <Loader />}
          {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
          {fortune && !isLoading && <FortuneResultDisplay fortune={fortune} date={formattedDate} name={name} />}
        </div>
        {fortune && !isLoading && <ShareButton />}
      </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Fortune Teller. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default App;
