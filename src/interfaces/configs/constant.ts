type newInterface = { [key: string | number]: string | number | RegExp | string[] };

export interface IConstant {
  [key: string | number]: newInterface;
}
