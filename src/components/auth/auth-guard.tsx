'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/paths';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.replace(paths.auth.signIn);
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
