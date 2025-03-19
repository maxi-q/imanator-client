// components/Portal.tsx
'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector?: string;
}

export const Portal = ({ children, selector = '#modal-root' }: PortalProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalRoot = document.querySelector(selector);

    if (!portalRoot) {
      alert('!portalRoot')
    }

    setElement(portalRoot as HTMLElement);
  }, [selector]);

  return element ? createPortal(children, element) : null;
};