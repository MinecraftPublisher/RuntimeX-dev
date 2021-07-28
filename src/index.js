import "./styles.css";
import RuntimeX from "./runtimex/runtimex.js";

const runtime = RuntimeX();
const App = document.querySelector("#app");

App.innerHTML += `<h1>RuntimeX Developement build</h1><p>All the magic happens in this sandbox.</p>`;

if (runtime() === "loaded-RuntimeX") {
  App.innerHTML += `<p id="runtime-checker"><b>Lit way to check if RuntimeX is loaded or not! For example, right now RuntimeX is loaded correctly!</b></p>`;
} else {
  App.innerHTML += `<p id="runtime-checker"><b>Sadly, RuntimeX was not loaded correctly...</b></p>`;
}
