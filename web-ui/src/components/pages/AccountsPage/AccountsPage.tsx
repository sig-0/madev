import { Box } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { FC } from 'react';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import PageTitle from '../../atoms/PageTitle/PageTitle';
import AccountsTable from '../../molecules/AccountsTable/AccountsTable';
import { IAccountsPageProps } from './accountsPage.types';

const AccountsPage: FC<IAccountsPageProps> = () => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box mb={4} alignItems={'center'} display={'flex'}>
        <PageTitle title={'Accounts'} />
        <Box display={'flex'} ml={'auto'}>
          <ActionButton
            startIcon={<AddRoundedIcon />}
            text={'Add accounts'}
            square={true}
          />
        </Box>
      </Box>
      <AccountsTable />
    </Box>
  );
};

export default AccountsPage;
