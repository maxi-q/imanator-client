'use client'
import { useProfile } from "@/app/hooks/useProfile";
import { useState } from "react";
import { Card, openTopUpModal } from "./modules/openTopUpModal";


export default function TopUpPage() {
  const { profile, isLoading } = useProfile();

  if (!profile || isLoading) return <div className="text-gray-400">Загрузка...</div>;

  const paymentHistory = [
    { id: 1, date: '2024-01-15', amount: 5000, status: 'Успешно' },
    { id: 2, date: '2024-01-10', amount: 2000, status: 'Отменен' },
    { id: 3, date: '2024-01-05', amount: 1500, status: 'Ожидает' },
  ];


  const cards = [
    { id: '1', brand: 'Visa', last4: '4242' },
    { id: '2', brand: 'MasterCard', last4: '1881' }
  ];

  const handleTopUp = async () => {
    try {
      await openTopUpModal(cards);
      // Показать уведомление об успехе
      // toast.success('Баланс успешно пополнен');
    } catch (error) {
      // Ошибка уже обработана в модалке
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl w-full">
      {/* Карточка баланса */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-100">Текущий баланс</h2>
          <div className="text-3xl font-bold text-green-400">
            {profile.balance.toFixed(2)} ₽
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors w-fit"
            onClick={handleTopUp}
          >
            Пополнить баланс
          </button>
        </div>
      </div>

      {/* Привязанные карты */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Привязанные карты</h2>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md" />
                <div>
                  <div className="text-gray-100 font-medium">•••• 4242</div>
                  <div className="text-sm text-gray-400">Срок: 12/25</div>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-300 text-sm">
                Удалить
              </button>
            </div>
          </div>

          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
            <PlusIcon className="w-5 h-5" />
            Добавить новую карту
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">История операций</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-gray-400 text-sm border-b border-gray-700">
              <tr>
                <th className="pb-3 text-left">Дата</th>
                <th className="pb-3 text-left">Сумма</th>
                <th className="pb-3 text-left">Статус</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-700/50">
                  <td className="py-4 text-gray-300">
                    {new Date(payment.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="py-4">
                    <span className={`${
                      payment.status === 'Успешно' ? 'text-green-400' : 'text-gray-300'
                    } font-medium`}>
                      +{payment.amount.toFixed(2)} ₽
                    </span>
                  </td>
                  <td className="py-4">
                    <StatusBadge status={payment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paymentHistory.length === 0 && (
            <div className="text-gray-400 py-6 text-center">
              Нет операций за выбранный период
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    'Успешно': 'bg-green-800/30 text-green-400',
    'Отменен': 'bg-red-800/30 text-red-400',
    'Ожидает': 'bg-yellow-800/30 text-yellow-400',
  }[status];

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${statusStyles}`}>
      {status}
    </span>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v 6m0-6h6m-6 0H6"
    />
  </svg>
);