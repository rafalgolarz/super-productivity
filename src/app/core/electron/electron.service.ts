import {Injectable} from '@angular/core';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import {ipcRenderer, remote, shell, webFrame} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  shell: typeof shell;

  // fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      const electron = window.require('electron');
      this.ipcRenderer = electron.ipcRenderer;
      this.webFrame = electron.webFrame;
      this.remote = electron.remote;
      this.shell = electron.shell;
      window.require('source-map-support').install();
    }

    // NOTE: useful in case we want to disable the node integration
    // NOTE: global-error-handler.class.ts also needs to be adjusted
    // this.ipcRenderer = {
    //   on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    //   },
    //   send: () => {
    //   }
    // };
    // this.webFrame = {
    //   setZoomFactor(factor: number): void {
    //   },
    //   getZoomFactor: () => 1
    // };
  }

  public get isElectronApp(): boolean {
    return !!window.navigator.userAgent.match(/Electron/);
  }

  // TODO move to a better place
  public get isMacOS(): boolean {
    return this.isElectronApp && this.process && this.process.platform === 'darwin';
  }

  public get process(): any {
    return this.remote ? this.remote.process : null;
  }
}
