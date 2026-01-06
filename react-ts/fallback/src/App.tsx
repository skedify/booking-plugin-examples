import {
	type PexipEngagePluginContextProps,
	PexipEngagePluginProvider,
	PexipEngagePlugin,
} from "@pexip-engage-public/plugin-react";

// Replace the placeholder values with your actual enterprise, and remove the `<>` brackets:
export const PLUGIN_SCRIPT_SRC =
	"<https://plugin.pexipengage.com/{YOUR-ENTERPRISE-NAME}/pexip-engage-plugin.js>";

function Playground() {
	return (
		<div>
			<PexipEngagePlugin
				// This will override the url above, making it fail on purpose.
				scriptSrc="http://failing-plugin-url"
				fallback={
					<p className="enterprise-fallback">
						Unfortunately something went wrong with the booking module. Try
						again in a couple of minutes or contacts us through{" "}
						<a href="mailto:contact@example.com">e-mail</a> or by phone{" "}
						<a href="tel:0032800000000">0800 00 00 00</a>.
					</p>
				}
			/>
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
