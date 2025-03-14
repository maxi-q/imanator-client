'use client'

import { useMutation } from '@tanstack/react-query';
import { useProfile } from '../../hooks/useProfile';
import { logout } from '@/utils/server/logout';
import { useRouter } from 'next/navigation'
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useTransition } from 'react';


const Header = () => {
  const { push } = useRouter()
  const { user, isLoading } = useProfile();

  const [isPending, startTransition] = useTransition()

  const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logout(),
		onSuccess() {
			startTransition(() => {
				push(PUBLIC_PAGES.LOGIN)
			})
		}
	})
  const isLogoutLoading = isLogoutPending || isPending

  return (
    <header className='bg-black' style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        {isLoading && <p>Loading...</p>}
        {user && <p>Welcome, {user.firstName} {user.lastName}</p>}
      </div>
      <div>
        <button
          onClick={() => mutateLogout()}
          disabled={isLogoutLoading}
          style={{
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;