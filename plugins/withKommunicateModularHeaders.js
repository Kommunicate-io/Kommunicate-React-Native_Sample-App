const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");
 
/**
 * Ensures `use_modular_headers!` is present in ios/Podfile inside the app target.
 * This fixes CocoaPods error:
 * KommunicateChatUI-iOS-SDK depends on KommunicateCore-iOS-SDK which does not define modules.
 *
 * We patch the generated Podfile during `expo prebuild` so the fix persists across `--clean`.
 */
function ensureModularHeaders(podfileContents) {
  if (podfileContents.includes("use_modular_headers!")) {
    return podfileContents;
  }
 
  // Insert right after `use_expo_modules!` inside the target block.
  const marker = "  use_expo_modules!";
  if (podfileContents.includes(marker)) {
    return podfileContents.replace(
      marker,
      `${marker}\n\n  # Required for Kommunicate Swift pod (KommunicateChatUI-iOS-SDK) depending on KommunicateCore-iOS-SDK\n  use_modular_headers!`
    );
  }
 
  // Fallback: add globally at top if the marker isn't found.
  return `use_modular_headers!\n${podfileContents}`;
}
 
module.exports = function withKommunicateModularHeaders(config) {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, "Podfile");
      if (fs.existsSync(podfilePath)) {
        const contents = fs.readFileSync(podfilePath, "utf8");
        const next = ensureModularHeaders(contents);
        if (next !== contents) {
          fs.writeFileSync(podfilePath, next);
        }
      }
      return config;
    },
  ]);
};

