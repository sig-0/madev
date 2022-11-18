import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@material-ui/core';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import clsx from 'clsx';
import { ethers } from 'ethers';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import SetupContext from '../../../context/SetupContext';
import NodeService from '../../../services/nodeService/nodeService';
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { IAccountsTableProps } from './accountsTable.types';

const AccountsTable: FC<IAccountsTableProps> = () => {
  const classes = useStyles();

  const { accountParams } = useContext(SetupContext);

  const [loading, setLoading] = useState<boolean>(true);

  interface AddressInfo {
    index: number;
    address: string;
    balance: string;
  }

  const [accountInfo, setAccountInfo] = useState<{ accounts: AddressInfo[] }>({
    accounts: []
  });

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const getCompiledInfo = async () => {
      const compiledInfo: AddressInfo[] = [];

      if (accountParams != null && accountParams.accounts.length > 0) {
        for (let i = 0; i < accountParams.accounts.length; i++) {
          const address = accountParams.accounts[i];
          const response = await NodeService.getBalance(address);

          compiledInfo.push({
            index: i,
            address,
            balance: ethers.utils.formatEther(response.result)
          });
        }
      }

      return compiledInfo;
    };

    getCompiledInfo()
      .then((response) => {
        setAccountInfo({
          accounts: response
        });

        setLoading(false);
      })
      .catch((e) => {
        openSnackbar('Unable to fetch account balance', 'error');
      });
  }, [accountParams]);

  return (
    <Fragment>
      {loading && <LoadingIndicator />}
      {!loading && (
        <Box>
          <TableContainer
            component={Paper}
            classes={{
              root: classes.tableContainer
            }}
          >
            <Table className={classes.table}>
              <TableHead className={classes.tableHeadWrapper}>
                <TableRow>
                  <TableCell
                    className={clsx(classes.tableHead, classes.noBorder)}
                    align="center"
                  >
                    Index
                  </TableCell>
                  <TableCell
                    className={clsx(classes.tableHead, classes.noBorder)}
                    align="center"
                  >
                    Address
                  </TableCell>
                  <TableCell
                    className={clsx(classes.tableHead, classes.noBorder)}
                    align="center"
                  >
                    Balance
                  </TableCell>
                  <TableCell
                    className={clsx(classes.tableHead, classes.noBorder)}
                    align="center"
                  >
                    Private Key
                  </TableCell>
                  <TableCell
                    className={clsx(classes.tableHead, classes.noBorder)}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  accountInfo.accounts.map((row, index) => (
                    <TableRow key={`${row}-${index}`}>
                      <TableCell
                        className={clsx(classes.noBorder, classes.tableCell)}
                        align="center"
                      >
                        {`#${index}`}
                      </TableCell>
                      <TableCell
                        className={clsx(classes.noBorder, classes.tableCell)}
                        align="center"
                      >
                        {row.address}
                      </TableCell>
                      <TableCell
                        className={clsx(classes.noBorder, classes.tableCell)}
                        align="center"
                      >
                        {`${row.balance} ETH`}
                      </TableCell>
                      <TableCell
                        className={clsx(classes.noBorder, classes.tableCell)}
                        align="center"
                      >
                        <Button startIcon={<FileCopyRoundedIcon />}>
                          Copy
                        </Button>
                      </TableCell>
                      <TableCell
                        className={clsx(classes.noBorder, classes.tableCell)}
                        align="center"
                      >
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                        >
                          <Tooltip title={'Transfer funds'}>
                            <IconButton color={'primary'}>
                              <SendRoundedIcon />
                            </IconButton>
                          </Tooltip>
                          <Box>
                            <Tooltip title={'Activity'}>
                              <IconButton color={'primary'}>
                                <WorkRoundedIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Fragment>
  );
};

const useStyles = makeStyles(() => {
  return {
    table: {},
    tableHead: {
      fontWeight: 600
    },
    tableHeadWrapper: {
      borderBottom: '3px solid #F6F6F6'
    },
    tableContainer: {
      boxShadow: 'none !important'
    },
    noBorder: {
      border: 'none'
    },
    tableCell: {
      fontWeight: 500
    }
  };
});

export default AccountsTable;
