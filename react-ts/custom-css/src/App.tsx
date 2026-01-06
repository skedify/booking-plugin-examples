import { useState, useEffect } from "react";
import {
	type PexipEngagePluginContextProps,
	type PluginInstance,
	PexipEngagePluginProvider,
	PexipEngagePlugin,
} from "@pexip-engage-public/plugin-react";
import pluginCss from "./plugin.css?inline";

// Replace the placeholder values with your actual enterprise, and remove the `<>` brackets:
export const PLUGIN_SCRIPT_SRC =
	"<https://plugin.pexipengage.com/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js>";

function Playground() {
	const [instance, setInstance] = useState<PluginInstance | null>(null);

	useEffect(() => {
		instance?.setCustomCSS(pluginCss);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pluginCss, instance]);

	return <PexipEngagePlugin onInstanceChange={setInstance} />;
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
