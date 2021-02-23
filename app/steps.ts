import {today} from 'user-activity';
import {display} from 'display';

const CALLBACK_BUFFER = 3000; // 3s

export function steps(callback: Function) {
  let interval;

  callback(today.adjusted.steps);

  const start = () => {
    interval = setInterval(() => callback(today.adjusted.steps), CALLBACK_BUFFER);
  };
  const stop = () => clearInterval(interval);

  display.addEventListener('change', () => {
    display.on ? start() : stop();
  });

  start();
}
