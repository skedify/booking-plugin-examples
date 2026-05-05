import type { PluginInstance } from "@pexip-engage-public/plugin/instance";
import type { JSConfig } from "@pexip-engage-public/plugin/configuration-parser";

// Make sure the HTML element has `data-pexip-auto-init="false"` as we're initialising in the `ngAfterViewInit` function
class PexipEngagePlugin {
  instance: PluginInstance | null = null;
  async ngAfterViewInit() {
    try {
      // Loads pexip-engage-script, is deduplicated so safe to call multiple times.
      window.PexipEngage("init");
      const element = document.querySelector(".pexip-engage-plugin");
      if (!element) return;

      const options: JSConfig = {
        config: {
          office: {
            ids: ["58"],
            type: "externalId",
          },
          version: "1.0.0",
        },
      };

      this.instance = await window.PexipEngage("create", { element, options });
    } catch (e) {
      console.error("Failed to load Pexip Engage plugin", e);
    }
  }

  ngOnDestroy() {
    if (this.instance) {
      this.instance.dispose();
    }
  }

}
