/// <reference lib="webworker" />

import { IWebWorkerEvent } from "./interfaces/worker-event.interface";
import { testFunc } from './utils/functions';
import { ITestInterface } from './interfaces/test.interface';

addEventListener('message', (message) => {
  const request = message.data as unknown as IWebWorkerEvent<any>
  console.log(
    `%c Request received in webworker `,
    `background-color: pink; padding: 10px; border-radius: 5px`,
    request
  );

  switch (request.type) {
    case 'NUM_STRING':
      const numStringRequest = request.payload as ITestInterface

      const result = testFunc(numStringRequest.num, numStringRequest.str)
      postMessage(result);
      break;

    default:
      postMessage('No Match');
      break;
  }
});
