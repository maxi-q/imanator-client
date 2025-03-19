import { UserRole } from "@/services/auth/auth.types";


export const RoleBadge = ({ role }: { role: UserRole }) => {
  const roleStyles = {
    [UserRole.ADMIN]: 'bg-red-800/30 text-red-400',
    [UserRole.USER]: 'bg-blue-800/30 text-blue-400',
    // Добавьте другие роли при необходимости
  }[role];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-sm ${roleStyles || 'bg-gray-700'}`}>
      {role}
    </span>
  );
};