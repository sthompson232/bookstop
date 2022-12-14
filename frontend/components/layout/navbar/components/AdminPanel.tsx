import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/20/solid';
// Local component
import LogoutButton from './LogoutButton';
// Constants
import { LOGIN_URL, PORTAL_URL, PORTAL_ACCOUNTS_ROOT } from '../../../../constants/urls';
// Utils
import { useUser } from '../../../../swr/hooks';
import Button from '../../../ui/Button';
import Loader from '../../../ui/Loader';

const AdminPanel = () => {
  const { loadingUser, isAuthenticated, user } = useUser();

  const renderAdminPanel = () => (isAuthenticated
    ? (
      <div className="flex justify-between items-center">
        <Link href={PORTAL_ACCOUNTS_ROOT} passHref>
          <UserCircleIcon className="text-white w-8 h-8 hover:cursor-pointer" />
        </Link>
        <div className="flex space-x-2">
          <Link href={PORTAL_URL} passHref>
            <Button className="btn-inverse">
              Portal
            </Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    ) : (
      <div className="flex justify-end items-center">
        <Link href={LOGIN_URL} passHref>
          <Button className="btn-inverse">
            Login
          </Button>
        </Link>
      </div>
    )
  );

  return (
    <div className="bg-black p-3">
      {loadingUser
        ? (
          <div className="flex justify-center items-center">
            <Loader width={8} height={8} />
          </div>
        ) : (
          renderAdminPanel()
        )}
    </div>
  );
};

export default AdminPanel;
