import { expect } from "chai";
import { LOG_STRINGS, tLog } from "./i18n-logs";

describe("tLog", () => {
  it("returns the EN template for the requested key", () => {
    expect(tLog("en", "connectionRestored")).to.equal("Connection restored");
  });

  it("returns the DE template for known German locale", () => {
    expect(tLog("de", "apiTimeout")).to.equal("API-Anfrage-Timeout — Wiederholung im nächsten Zyklus");
  });

  it("falls back to EN for unknown languages", () => {
    expect(tLog("klingon", "connectionRestored")).to.equal("Connection restored");
  });

  it("substitutes {token} placeholders from params", () => {
    const msg = tLog("en", "trackingStarted", { minutes: 10 });
    expect(msg).to.equal("Parcel tracking started — polling every 10 minutes");
  });

  it("renders null params as '(none)' so callers don't need to branch", () => {
    const msg = tLog("en", "pollFailed", { error: null });
    expect(msg).to.equal("Poll failed: (none)");
  });

  it("keeps undefined token literal so caller-bug surfaces in the log", () => {
    const msg = tLog("en", "rateLimitHit", {});
    expect(msg).to.equal("Rate limit hit — pausing API requests for {minutes} minute(s)");
  });

  it("keeps EN template when params is omitted", () => {
    expect(tLog("en", "noApiKey")).to.contain("No valid API key");
  });

  it("covers all 11 ioBroker languages for every key", () => {
    const expectedLangs = ["en", "de", "ru", "pt", "nl", "fr", "it", "es", "pl", "uk", "zh-cn"];
    for (const [key, bundle] of Object.entries(LOG_STRINGS)) {
      for (const lang of expectedLangs) {
        const value = (bundle as Record<string, string>)[lang];
        expect(value, `${key} missing ${lang}`).to.be.a("string");
        expect(value.length, `${key}.${lang} empty`).to.be.greaterThan(0);
      }
    }
  });
});
