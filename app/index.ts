import document from "document";
import asap from "fitbit-asap/app"
// import {me} from "appbit";

const data = document.getElementById("Mmol")

asap.onmessage = message => {
  console.error(JSON.stringify(message))
}

// console.error(data)
// setTimeout(() => {
//   console.error("exiting");
//   me.exit();
// }, 2000);
