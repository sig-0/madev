export interface ICounterProps {
  title: string;
  minimum: number;

  setValue: (value: number) => void;
  count: number;
}
