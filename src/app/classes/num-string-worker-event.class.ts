import { IWebWorkerEvent } from '../interfaces/worker-event.interface';
import { ITestInterface } from '../interfaces/test.interface';


export class NumStringEvent implements IWebWorkerEvent<ITestInterface> {
  type = "NUM_STRING";
  constructor(public payload: ITestInterface) { }
}
