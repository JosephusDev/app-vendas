import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '~/context/AuthContext';

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.replace('/sign-in');
  }, []);

  return null;
}
