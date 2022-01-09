export interface IFilters {
  key: string;
  value: string;
  type?: string;
}

export interface ISort {
  key: string;
  order: 1 | -1;
}

export interface IPipeline {
  projection: object;
  filters: IFilters[];
  sort?: ISort[];
}
