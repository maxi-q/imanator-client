// components/TopUpModal.tsx
'use client';
import { useBilling } from '@/app/hooks/useBilling';
import { useState, useEffect, useRef } from 'react';
import { Portal } from './Portal';

interface Card {
  id: string;
  brand: string;
  last4: string;
}

interface TopUpModalProps {
  cards: Card[];
  onClose: () => void;
  onSuccess: (result: { amount: number; cardId: string }) => void;
}

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const TopUpModal = ({ cards, onClose, onSuccess }: TopUpModalProps) => {
  const [amount, setAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState(cards[0]?.id || '');
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const { initPayment, isPending } = useBilling();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError('Введите корректную сумму');
      return;
    }

    if (!selectedCard) {
      setError('Выберите карту для оплаты');
      return;
    }

    initPayment(
      { amount: numericAmount },
      {
        onSuccess: () => {
          onSuccess({ amount: numericAmount, cardId: selectedCard });
          handleClose();
        },
        onError: (err: any) => {
          setError(err.message || 'Ошибка при проведении платежа');
        },
      }
    );
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={isPending ? undefined : handleClose}
      >
        <div
          ref={modalRef}
          className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            disabled={isPending}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors disabled:opacity-50"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-xl font-bold mb-6">Пополнение баланса</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Выберите карту</label>
              <div className="space-y-3">
                {cards.map((card) => (
                  <label
                    key={card.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                      selectedCard === card.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentCard"
                      value={card.id}
                      checked={selectedCard === card.id}
                      onChange={() => setSelectedCard(card.id)}
                      className="accent-blue-500"
                      disabled={isPending}
                    />
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-6 rounded-md ${
                        card.brand === 'Visa' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-400'
                          : 'bg-gradient-to-r from-purple-600 to-pink-400'
                      }`} />
                      <div>
                        <div className="font-medium">
                          {card.brand} •••• {card.last4}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Сумма пополнения (₽)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Введите сумму"
                min="1"
                step="1"
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                disabled={isPending}
                required
              />
              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors flex-1 disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors flex-1 disabled:opacity-50 relative"
              >
                {isPending && (
                  <span className="absolute left-3 top-2.5">
                    <Spinner />
                  </span>
                )}
                {isPending ? 'Обработка...' : 'Пополнить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};