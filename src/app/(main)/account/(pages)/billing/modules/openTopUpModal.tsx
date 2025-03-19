// utils/top-up-modal.tsx
import { Providers } from '@/app/Providers';
import { createRoot } from 'react-dom/client';
import { TopUpModal } from './TopUpModal';

export interface Card {
  id: string;
  brand: string;
  last4: string;
}


export const openTopUpModal = (cards: Card[]) => {
  const modalRoot = document.getElementById('modal-root')!;

  const root = createRoot(modalRoot);

  return new Promise((resolve) => {
    const handleClose = () => {
      root.unmount();
      // document.body.removeChild(modalRoot);
      resolve(null);
    };

    root.render(
      <Providers>
        <TopUpModal
          cards={cards}
          onClose={handleClose}
          onSuccess={(result: any) => {
            root.unmount();
            // document.body.removeChild(modalRoot);
            resolve(result);
          }}
        />
      </Providers>
    );
  });
};