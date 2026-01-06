/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
	PexipEngagePluginContextProps,
	PexipEngagePluginProvider,
	PexipEngagePlugin,
	type PluginInstance,
} from "@pexip-engage-public/plugin-react";

// Replace the placeholder values with your actual enterprise, and remove the `<>` brackets:
export const PLUGIN_SCRIPT_SRC =
	"<https://plugin.pexipengage.com/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js>";

function Playground() {
	const [events, setEvents] = useState<string[]>([]);
	const [instance, setInstance] = useState<PluginInstance | null>(null);

	// Instance events
	useEffect(() => {
		const unsubscribe = instance?.addEventListener((event) => {
			let code = "";

			if ("instance" in event.detail) {
				const { instance, ...detail } = event.detail;
				code = JSON.stringify({
					timeStamp: event.timeStamp,
					detail,
					source: "instance",
				});
			} else {
				code = JSON.stringify({
					timeStamp: event.timeStamp,
					detail: event.detail,
					source: "instance",
				});
			}

			setEvents((events) => [...events, code]);
		});

		return () => unsubscribe?.();
	}, [instance]);

	return (
		<div>
			<p>Events:</p>
			{events.map((event) => (
				<code key={event}>{event}</code>
			))}
			<PexipEngagePlugin onInstanceChange={setInstance} />
		</div>
	);
}

const defaultConfig: PexipEngagePluginContextProps = {
	scriptSrc: PLUGIN_SCRIPT_SRC,
	version: "1.0.0",
};

export default function App() {
	return (
		<PexipEngagePluginProvider value={defaultConfig}>
			{/* All <PexipEngagePlugin /> components will now merge their own passed configuration with the defaultConfig value */}
			<Playground />
		</PexipEngagePluginProvider>
	);
}
