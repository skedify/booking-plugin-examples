/** @typedef {import('@pexip-engage-public/plugin/dist/instance')} */
import "./style.css";

let events = [];

console.log("Setting up listeners..");
window.PexipEngage("get-instance").then((instance) => {
	instance.addEventListener((event) => {
		const { instance, ...detail } = event.detail;
		const code = JSON.stringify({ timeStamp: event.timeStamp, detail });
		addEvent(code);

		if (event.detail.type === instance.EVENT_APPOINTMENT_CREATED) {
			addEvent(
				JSON.stringify({
					appointment: instance.appointment,
					meta: instance.meta.getAll(),
				}),
			);
		}
	});
});

function addEvent(event) {
	events.push(event);
	render();
}

const app = document.querySelector("#app");

function render() {
	const eventsEl = document.createElement("div");
	eventsEl.style = "display:grid;";

	app.innerHTML = "";
	app.appendChild(eventsEl);

	events.forEach((event) => {
		const element = document.createElement("code");
		element.innerText = event;
		eventsEl.appendChild(element);
	});
}
