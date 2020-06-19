export interface IWebWorkerEvent<T> {
  type: string;
  payload: T;
}
