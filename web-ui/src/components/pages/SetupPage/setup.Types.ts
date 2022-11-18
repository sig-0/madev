export interface ISetupPageProps {}

export enum ESetupStep {
  PROVIDER = 'Provider Select',
  NETWORK_PARAMS = 'Network Parameters',
  CLUSTER_PARAMS = 'Cluster Parameters',
  ACCOUNTS_SETUP = 'Accounts Setup',
  ADDITIONAL_SERVICES = 'Additional Services',
  DONE = 'Done'
}

export interface ISetupItemProps {
  next: () => void;
}
