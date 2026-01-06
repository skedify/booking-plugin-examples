/** @typedef {import('@pexip-engage-public/plugin/dist/instance')} */
import "./style.css";

// The main logic of our tracking application.
async function init() {
	const instance = await window.PexipEngage("get-instance");

	// We use the global constant definition to map to our own identifiers for GTM, as the global constants of Plugin.X are not guaranteed to stay the same.
	const EVENT_TYPES = {
		[instance.EVENT_LOADED]: "plugin-loaded",
		[instance.EVENT_APPOINTMENT_CREATED]: "appointment-created",
		[instance.EVENT_APPOINTMENT_EDITED]: "appointment-edited",
		[instance.EVENT_APPOINTMENT_CANCELLED]: "appointment-cancelled",
		[instance.EVENT_APPOINTMENT_COMPLETED]: "appointment-completed",
		[instance.EVENT_INVITE_ACCEPTED]: "invite-accepted",
		/**
     * This event has an additional payload, it can be used to track user progress.
     * See https://{YOUR-ENTERPRISE-NAME}.plugin.skedify.io/{YOUR-ENTERPRISE-NAME}/docs/docs/guides/events#event_step_shown
      interface StepShownPayload {
        step: "office" | "timetable" | "customer" | "questions" | "subject" | "employee" | "meeting-type";
        employee?: { id: string; firstName: string | null; lastName: string | null };
        meetingType?: "VIDEO" | "PHONE" | "ON_LOCATION" | "OFFICE";
        office?: { id: string; title: string };
        subject?: { id: string; title: string };
      }
     */
		[instance.EVENT_STEP_SHOWN]: "user-progress",
	};

	instance.addEventListener((event) => {
		/**
		 * Check if the received event is one we wish to track.
		 * To ignore certain events, simply remove them from the EVENT_TYPES object.
		 */
		if (event.detail.type in EVENT_TYPES) {
			// Get the GTM_KEY we wish to use in our own tracking.
			const GTM_KEY = EVENT_TYPES[event.detail.type];

			if (GTM_KEY !== "user-progress")
				return window.dataLayer.push({ event: GTM_KEY });

			/**
			 * For the user-progress event, we receive additional information we also want to track in GTM, so we enrich that specific event.
			 */
			const { step, ...currentSelection } = event.detail.payload;

			window.dataLayer.push({
				event: GTM_KEY,
				activeStep: step,
				currentSelection,
			});
		} else {
			// In this example, we add this warning here for clarity, to see which events we're ignoring.
			console.warn("Ignoring event: ", event.detail);

			return null;
		}
	});
}

init();
