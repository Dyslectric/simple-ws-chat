/*
import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/

let socket: WebSocket | undefined;
const log = document.getElementById("log") as HTMLElement;

document.getElementById("connectBtn")?.addEventListener("click", () => {
  socket = new WebSocket("ws://localhost:4500/chatroom-api/ws");

  socket.onopen = function () {
    logMessage("WebSocket connection opened");
  };

  socket.onmessage = function (event) {
    logMessage("Message from server: " + event.data);
  };

  socket.onclose = function () {
    logMessage("WebSocket connection closed");
  };

  socket.onerror = function (error: Event) {
    logMessage("WebSocket error: " + (error as ErrorEvent).message);
  };
});

document.getElementById("sendMsgBtn")?.addEventListener("click", () => {
  const message = (document.getElementById("messageInput") as HTMLInputElement)
    .value;
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    logMessage("Sent message: " + message);
  } else {
    logMessage("WebSocket is not connected.");
  }
});

function logMessage(message: string) {
  const logEntry = document.createElement("p");
  logEntry.textContent = message;
  log.appendChild(logEntry);
}
