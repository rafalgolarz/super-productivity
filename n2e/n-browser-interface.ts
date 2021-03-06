import {NightwatchBrowser} from 'nightwatch';

export interface NBrowser extends NightwatchBrowser {
  addTask: (taskTitle: string) => NBrowser;
  openPanelForTask: (taskSel: string) => NBrowser;
  addTaskWithReminder: (taskTitle: string, taskSel?: string) => NBrowser;
}
