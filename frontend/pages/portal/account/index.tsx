import { GetServerSideProps, NextPage } from 'next';
// Constants
import { UserType } from '../../../constants/types/accounts'

interface PropTypes {
  account: UserType
}

const AccountPage: NextPage<PropTypes> = ({ account }: PropTypes) => {
  return (
    <h1>User page</h1>
  );
};

export const getServerSideProps: GetServerSideProps = (context) => {
  return {
    props: {
      account: '',
    },
  };
};

export default AccountPage;
