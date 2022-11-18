import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackTitle from '../../atoms/BackTitle/BackTitle';
import FormTitle from '../../atoms/FormTitle/FormTitle';
import { IContractViewProps } from './contractView.types';

const ContractView: FC<IContractViewProps> = () => {
  const { contractAddress } = useParams();

  const classes = useStyles();

  const methods: string[] = ['execMethod1', 'execMethod2', 'execMethod3'];

  const fields: string[] = ['valueOne', 'valueTwo', 'valueThree'];

  const [valueOne, setValueOne] = useState<string>('');
  const [valueTwo, setValueTwo] = useState<number>(0);
  const [valueThree, setValueThree] = useState<string>('');

  const generateRandomValues = () => {
    setValueOne(generateRandomString);
    setValueTwo(generateRandomNumber);
    setValueThree(generateRandomString);
  };

  const generateRandomString = (): string => {
    return (Math.random() + 1).toString(36).substring(7);
  };

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * (872348264 + 1));
  };

  useEffect(() => {
    generateRandomValues();

    const intFunc = setInterval(() => {
      generateRandomValues();
    }, 2000);

    return () => clearInterval(intFunc);
  }, []);

  const renderValue = (index: number) => {
    switch (index) {
      case 0:
        return valueOne;
      case 1:
        return valueTwo;
      default:
        return valueThree;
    }
  };

  const [logLines, setLogLines] = useState<string[]>([]);

  const renderDeviceLogs = () => {
    if (logLines.length < 1) {
      return (
        <Typography className={classes.logLine}>
          No execution results.
        </Typography>
      );
    }

    const now = moment();
    return (
      <Fragment>
        {logLines.map((logLine, id) => {
          return (
            <Typography key={`log-id-${id}`} className={classes.logLine}>
              {`${now.format('YYYY-MM-DD')}T${now.format(
                'HH:mm:ss'
              )} - ${logLine}`}
            </Typography>
          );
        })}
      </Fragment>
    );
  };

  const appendLogLine = () => {
    const newLines = logLines;
    newLines.push(
      `exec_result = ${
        Math.floor(Math.random() * 10) % 2 == 0
          ? generateRandomString()
          : generateRandomNumber()
      }`
    );

    setLogLines(newLines);
  };

  return (
    <Box>
      <BackTitle
        title={`Contract ${contractAddress}`}
        backLink={'/contracts'}
      />
      <Box display={'flex'} width={'100%'} mt={4}>
        <Box display={'flex'} flexDirection={'column'} width={'30%'}>
          <Box mb={4}>
            <FormTitle title={'Methods'} />
          </Box>
          <Box mt={-2} display={'flex'} flexDirection={'column'}>
            {methods.map((method, index) => {
              return (
                <Box key={index} display={'flex'} alignItems={'center'} mt={2}>
                  <Box width={'100px'}>{method}</Box>
                  <Box ml={4}>
                    <Button
                      variant={'outlined'}
                      onClick={() => {
                        appendLogLine();
                      }}
                    >
                      Execute
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} width={'30%'} ml={4}>
          <Box mb={4}>
            <FormTitle title={'Fields'} />
          </Box>
          <Box mt={-2} display={'flex'} flexDirection={'column'}>
            {fields.map((method, index) => {
              return (
                <Box key={index} display={'flex'} alignItems={'center'} mt={2}>
                  <Box width={'100px'}>{method}</Box>
                  <Box ml={4}>{renderValue(index)}</Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box className={classes.dataLogs} mt={4}>
        {renderDeviceLogs()}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => {
  return {
    dataLogs: {
      overflowY: 'auto',
      height: '350px',
      backgroundColor: '#F6F6F6',
      borderRadius: '15px',
      border: '1px solid #A7A7A7',
      padding: '25px 30px'
    },
    logLine: {
      color: '#A7A7A7',
      fontFamily: 'Source Code Pro !important'
    }
  };
});

export default ContractView;
