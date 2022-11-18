import {LinkProps} from '@material-ui/core';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';

export interface ILinkProps extends LinkProps<typeof RouterLink, RouterLinkProps> {
}