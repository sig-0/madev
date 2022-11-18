import {ReactNode} from 'react';

export interface IAppLayoutProps {
  children?: ReactNode;
}

export enum EActiveAppTab {
  DEVICES = 'Devices',
  REQUESTS = 'Requests',
  INFRASTRUCTURE = 'Infrastructure',
  SETTINGS = 'Settings',
}