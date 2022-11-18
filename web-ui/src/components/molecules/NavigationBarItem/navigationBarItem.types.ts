import {EActiveAppTab} from '../../layouts/AppLayout/appLayout.types';

export interface INavigationBarItemProps {
  activeAppTab: EActiveAppTab;
  currentAppTab: EActiveAppTab;
  toUrl: string;

  handleTabChange: (newActive: EActiveAppTab) => void;
}
