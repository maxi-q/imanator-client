'use client'

import { useProfile } from "@/app/hooks/useProfile";
import { LabelValue } from "./components/LabelValue";
import { RoleBadge } from "./components/RoleBadge";

export default function AccountPage() {
  const { profile, isLoading } = useProfile();

  if ( isLoading  ) return <div className="text-gray-400">Загрузка...</div>;

  if (!profile) return <div className="text-red-400">Ошибка загрузки данных</div>;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-100">Профиль пользователя</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <LabelValue label="Имя" value={`${profile.firstName} ${profile.lastName}`} />
        </div>

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <LabelValue label="Email" value={profile.email} />
        </div>

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <LabelValue
            label="Баланс"
            value={`${profile.balance.toFixed(2)} ₽`}
            valueClassName="text-green-400 font-semibold"
          />
        </div>

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <LabelValue
            label="Роль"
            value={<RoleBadge role={profile.role} />}
          />
        </div>

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <LabelValue
            label="Дата регистрации"
            value={new Date(profile.createdAt!).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          />
        </div>

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <LabelValue
            label="ID аккаунта"
            value={profile.id}
            valueClassName="text-sm font-mono text-gray-400"
          />
        </div>

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 col-span-full">
          <LabelValue
            label="Webhook URL"
            value={profile.defaultWebhookUrl || 'Не указан'}
            valueClassName={profile.defaultWebhookUrl ? 'text-blue-400 underline' : 'text-gray-500'}
          />
        </div>
      </div>
    </div>
  );
}
