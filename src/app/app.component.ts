import { Component } from '@angular/core';
import { IWebWorkerEvent } from './interfaces/worker-event.interface';
import { NumStringEvent } from './classes/num-string-worker-event.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private webWorker: Worker;

  public submittedData: any;
  public receivedData: any;

  ngOnInit() {
    if (typeof Worker !== 'undefined') {

      this.webWorker = new Worker('./app.worker', { type: 'module' });

      this.webWorker.onmessage = (data: MessageEvent) => {
        this.receivedData = JSON.stringify(data.data);
        console.log(
          `%c Data here In the app component is  `,
          `background-color: yellow; padding: 10px; border-radius: 5px`,
          data
        );
      };
      
    } else {
      console.log(
        `%c ERROR: Web worker not available`,
        `background-color: red`
      );
    }
  }

  sendData(): void {
    const dataPacket = new NumStringEvent({
      arr: [1, 2, 4],
      bool: false,
      num: 1234,
      obj: {
        kaka: 'psst',
      },
      str: 'TEXT',
    });
    console.log(
      `%c Sending to the WEB WORKER  `,
      `background-color: blue; padding: 10px; border-radius: 5px`,
      dataPacket
    );
    this.sendMessageToWorker(dataPacket);
  }

  private sendMessageToWorker(event: IWebWorkerEvent<any>): void {
    this.submittedData = JSON.stringify(event.payload);
    this.webWorker.postMessage(event);
  }
}
