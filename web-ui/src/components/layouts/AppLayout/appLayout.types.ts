import { ReactNode } from 'react';

export interface IAppLayoutProps {
  children?: ReactNode;
}

export enum EActiveAppTab {
  ACCOUNTS = 'Accounts',
  LOGS = 'Logs',
  CONTRACTS = 'Contracts',
  BLOCKSCOUT = 'Blockscout',
  QUIT = 'Quit'
}
