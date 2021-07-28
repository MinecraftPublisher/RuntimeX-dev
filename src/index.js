import "./styles.css";
import RuntimeX from "./runtimex/runtimex.js";

const runtime = RuntimeX();
const App = document.querySelector("#app");

App.innerHTML += `<h1>RuntimeX Developement build</h1><p>All the magic happens in this sandbox.  Check the source code for more info. If you like, you could also check out <a style="text-decoration: none; color: rgb(52, 169, 247)" href="https://medium.com/@mforoud86/list/runtimex-ed887dcb2b87">my reading list about RuntimeX</a>.</p>`;

if (runtime() === "loaded-RuntimeX") {
  App.innerHTML += `<p id="runtime-checker"><b>Lit way to check if RuntimeX is loaded or not! For example, right now RuntimeX is loaded correctly!</b></p>`;
} else {
  App.innerHTML += `<p id="runtime-checker"><b>Sadly, RuntimeX was not loaded correctly...</b></p>`;
}
