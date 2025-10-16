import React from 'react';
import { Fortune, FortuneCategory } from '../types';
import { categoryIcons } from './icons';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-500'}`}
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, index) => (
      <StarIcon key={index} filled={index < rating} />
    ))}
  </div>
);

const FortuneCard: React.FC<{ title: string; category: FortuneCategory; icon: string }> = ({ title, category, icon }) => (
  <div className="bg-white/10 p-5 rounded-lg border border-white/20 h-full flex flex-col">
    <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
            <img src={icon} alt={`${title} icon`} className="h-8 w-8 object-contain" />
            <h3 className="text-xl font-semibold text-purple-300">{title}</h3>
        </div>
        <StarRating rating={category.luck} />
    </div>
    <p className="text-indigo-100 flex-grow">{category.text}</p>
  </div>
);

export const FortuneResultDisplay: React.FC<{ fortune: Fortune; date: string; name: string }> = ({ fortune, date, name }) => (
  <div className="animate-fade-in space-y-8">
     <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400">
        {date}の{name}さんの運勢
      </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <FortuneCard title="総合運" category={fortune.overall} icon={categoryIcons.overall} />
      <FortuneCard title="金運" category={fortune.money} icon={categoryIcons.money} />
      <FortuneCard title="健康運" category={fortune.health} icon={categoryIcons.health} />
      <FortuneCard title="恋愛運" category={fortune.love} icon={categoryIcons.love} />
      <FortuneCard title="仕事運" category={fortune.work} icon={categoryIcons.work} />
    </div>
     <div className="mt-6">
        <div className="bg-white/10 p-5 rounded-lg border border-white/20 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img src={categoryIcons.luckyItem} alt="Lucky item icon" className="h-12 w-12 object-contain" />
            <div className="text-center sm:text-left flex-grow">
              <h3 className="text-xl font-semibold text-yellow-300">ラッキーアイテム</h3>
              <p className="text-lg text-white mt-1">{fortune.luckyItem}</p>
            </div>
        </div>
    </div>
  </div>
);

// Add fade-in animation to tailwind config if possible, or use a style tag.
// For this setup, we'll just rely on the class existing.
// In a real project, this would be in the tailwind.config.js
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}