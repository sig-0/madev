import { Box, IconButton } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { FC } from 'react';
import Link from '../Link/Link';
import PageTitle from '../PageTitle/PageTitle';
import { IBackTitleProps } from './backTitle.types';

const BackTitle: FC<IBackTitleProps> = (props) => {
  const { title, backLink } = props;

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Link to={backLink}>
        <IconButton
          classes={{
            root: 'iconButtonRoot'
          }}
        >
          <ArrowBackRoundedIcon
            style={{
              fill: 'black'
            }}
          />
        </IconButton>
      </Link>
      <Box ml={2}>
        <PageTitle title={title} />
      </Box>
    </Box>
  );
};

export default BackTitle;
