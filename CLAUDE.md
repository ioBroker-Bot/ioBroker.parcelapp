# CLAUDE.md — ioBroker.parcelapp

> Gemeinsame ioBroker-Wissensbasis: `../CLAUDE.md` (lokal, nicht im Git). Standards dort, Projekt-Spezifisches hier.

## Projekt

**ioBroker Parcel Tracking Adapter** — Paketverfolgung über [parcel.app](https://parcelapp.net) API. Alle Carrier die parcel.app unterstützt, ein API-Key (Premium).

- **Version:** 0.4.4 (2026-05-14, npm latest) — testClient cancelAll-Latency-Fix: short-lived `testClient` aus `checkConnection` admin-message wird jetzt in `this.testClients = new Set<ParcelClient>()` getrackt + im `onUnload` mit aborted. Vorher konnte ein gleichzeitig laufender Test-Connection-Klick den Adapter über js-controller's 4s-Kill-Deadline halten. Cross-Adapter parallel zu beszel v0.4.5 (gleiches Pattern). Identified during beszel v0.4.4 audit als out-of-scope-future-Note — Krobi-Korrektur: „nimm zusätzliche findings mit in den release". v0.4.3 (2026-05-14) Debug-Coverage-Welle nach 8-Klassen-Audit (1786 LOC + 21 Sites). Score 4.6→9.0, 7/8 Klassen auf 9/10. Reine `log.debug`-Inserts plus optionaler `ParcelClientLogger`-Param im `ParcelClient` (2nd positional, class-member `this.log?`). A0-A12 (ohne A6) HTTPS-Trace inkl. elapsed-ms + body-snippet + cancelAll-inflight-count; B1 poll entry; C1 per-delivery entry; C2 parseStatus drift; C3 packageId collision; D1-D4 Carrier-Resolution; E1-E3 State-Manager rare ops; F1-F7 sendTo (war 0/10); G1-G4 Lifecycle. Plus README header-icon raw→jsdelivr (CSP sandbox-Fix), CHANGELOG_OLD 10 Tooling-Einträge konsolidiert, Issue #12 mit Forum-Link 84304 closed. v0.4.2 (2026-05-10) 17-Finding Hardening-Welle nach 4-Pass-Audit: M1 terminate(11), M4 parallel updateDelivery, M5 coerceClampedInt (NaN-trap-fix), M6 named const, M9 RATE_LIMITED clamp, M10 explicit catch, M11 cancelAll, P1 AbortController, P3 403→FORBIDDEN distinct, P6 Retry-After parser clamp, P9 body-size cap, E3 URL validate, S1 cleanupDeliveries parallel, S2 defensive Set-iter, S3 packageId collision-suffix via FNV-1a, X5 shared coerceClampedInt. v0.4.1 (2026-05-09) Logs revert to English. v0.4.0 (2026-05-06) Multi-Language + lib/coerce.ts + state-creation cache.
- **GitHub:** https://github.com/krobipd/ioBroker.parcelapp
- **npm:** https://www.npmjs.com/package/iobroker.parcelapp
- **Repository PR:** ioBroker/ioBroker.repositories#5667 (re-review pending bei mcm1957)
- **Runtime-Deps:** nur `@iobroker/adapter-core` (HTTPS via Node.js built-in)
- **Test-Setup:** offizieller ioBroker.example/TypeScript-Standard — Tests unter `src/**/*.test.ts` direkt mit `ts-node/register`, kein separater Build (siehe globales `reference_iobroker_test_setup_standard`)
- **`@types/node` + `@tsconfig/nodeXX` an `engines.node`-Min gekoppelt:** `^22.x` / `@tsconfig/node22` weil `engines.node: ">=22"`. Dependabot ignoriert Major-Bumps.

## API

- **Base URL:** `https://api.parcel.app/external/`
- **Auth:** Header `api-key: <key>` (Premium-Abo nötig)
- **Rate Limits:** GET 20/Stunde, POST 20/Tag
- **Doku:** https://parcelapp.net/help/api.html
- **Kein DELETE-Endpoint** — nur über parcel.app UI löschbar

## Architektur

```
src/main.ts              → Adapter (Polling, Lifecycle, sendTo, systemLang)
src/lib/types.ts         → Interfaces, Status-Labels (11 Sprachen)
src/lib/coerce.ts        → errText, coerceFiniteNumber strict, coerceString, coerceBoolean, isPlainObject, isTrueish
src/lib/parcel-client.ts → HTTPS-Client (Node.js built-in)
src/lib/state-manager.ts → State CRUD + Cleanup + Berechnungen + createdIds-Cache
src/lib/i18n-states.ts   → 14 STATE_NAMES × 11 Sprachen + tName(key) für common.name
```

## Design-Entscheidungen

1. **Polling mit Guard** — `isPolling` Flag + `MIN_POLL_GAP_MS` (60s) Throttle
2. **autoRemoveDelivered** — true: API `active` + filter status 0; false: API `recent`, zugestellte bleiben
3. **Carrier-Cache** — Geladen beim ersten `getCarrierName()`, bei Fehler leere Map (Retry nächster Aufruf)
4. **Error-Dedup** — `classifyError()` + `lastErrorCode` (RATE_LIMITED, INVALID_API_KEY, NETWORK, TIMEOUT)
5. **Rate Limit** — Retry-After Header, Cooldown-Timer, Polls übersprungen
6. **sendTo** — `checkConnection` (Admin-UI Button), `addDelivery` (triggert sofortigen Poll)
7. **pkgId** — `sanitize(tracking_number)` + optional `_sanitize(extra_information)`
8. **Sprache** — `system.config.language` einmalig in `onReady` gelesen und an `StateManager` übergeben. Unbekannte Codes fallen via `resolveLanguage()` auf `en` zurück. Kein per-Instanz Language-Setting.
9. **Intermediate Objects** — `deliveries` (folder) + `summary` (channel) sind in io-package.json `instanceObjects` deklariert; `StateManager` legt nur die States darunter an.

## Status-Codes

0=Zugestellt, 1=Eingefroren, 2=Unterwegs, 3=Abholung, 4=In Zustellung, 5=Nicht gefunden, 6=Zustellversuch, 7=Ausnahme, 8=Registriert

## Tests (175 unit + 57 package + 1 integration = 233)

```
src/lib/coerce.test.ts         → errText, coerceFiniteNumber strict (HEX/Exp rejected), coerceString, coerceBoolean, isPlainObject, isTrueish (~25)
src/lib/parcel-client.test.ts  → API client gegen lokalen HTTP-Mock-Server, errors, rate limiting, API-drift (36)
src/lib/state-manager.test.ts  → Deliveries, summary, cleanup, formatting, API-drift, multilang, translation-objects (T1), createdIds cache (T4) (105)
test/package.js                → @iobroker/testing packageFiles
test/integration.js            → @iobroker/testing integration
test/mocharc.custom.json       → Mocha-Config mit ts-node/register (lädt mocha.setup.js)
test/mocha.setup.js            → chai/sinon-Setup
test/tsconfig.json             → für integration.js + package.js JSDoc-Type-Check
```

Run: `npm test` (mocha auf src/\*_/_.test.ts via ts-node + @iobroker/testing packageFiles, kein separater Build).

## Versionshistorie (letzte 7)

| Version | Highlights                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.4.4   | **testClient cancelAll-Latency-Fix:** short-lived `testClient` aus `checkConnection` admin-message wird in `this.testClients = new Set<ParcelClient>()` getrackt + im `onUnload` mit aborted. Vorher: nur `this.client.cancelAll()` aktiv, testClient-inflight blieb hängen → konnte Adapter über js-controller's 4s-Kill-Deadline halten. Try/finally um `testConnection()`-await so dass register/deregister-Symmetrie auch bei throw bleibt. Cross-Adapter parallel zu beszel v0.4.5 (identisches Pattern, identischer Fix). Identified during beszel v0.4.4 audit als out-of-scope — Krobi-Korrektur: „nimm zusätzliche findings mit in den release", Lesson festgehalten in `feedback_low_ist_kein_skip` (Verstoß 4) |
| 0.4.3   | **Debug-Coverage-Welle** nach 8-Klassen-Audit (1786 LOC + 21 Sites). Score 4.6→9.0, 7/8 Klassen auf 9/10 (H bleibt 9, kein Padding). Reine `log.debug`-Inserts in 3 Files + optionaler `ParcelClientLogger`-Param: A0 startedAt + A1-A12 (ohne A6 wg. Doppellog zu A7) HTTPS-Layer-Trace via class-member `this.log?`, inkl. cancelAll-inflight-count + 4xx/5xx body-snippet + elapsed-ms; D1-D4 Carrier-Resolution; B1 poll entry; C1 per-delivery entry (~1440 lines/day); C2 parseStatus drift; C3 packageId collision-suffix; E1 updateSummary entry; E2 cleanupDeliveries no-op; E3 unknown status-code drift; F1-F7 onMessage komplett (war 0/10) — F1 **vor** early-return; G1 onReady start; G2 system language; G3 always-log resolved pollInterval (Advisor: drift-Detection fragil); G4 onUnload catch ersetzt silent ignore. Logger an beide ParcelClient-Sites (prod + checkConnection-test). 5 Patches gestrichen per Wert-Sanity-Check. README header-icon `raw.githubusercontent.com` → `cdn.jsdelivr.net` (CSP-sandbox-Fix), CHANGELOG_OLD 10 Tooling-Einträge konsolidiert, README v0.3.2-Meta-Doku-Bullet gekürzt. Issue #12 closed mit Forum-Link 84304. Test count unchanged (175+57+1=233) |
| 0.4.2   | 17-Finding 4-Pass-Hardening: M1 terminate(11) on unhandled-rejection/uncaughtException, M4 per-delivery updateDelivery parallel, M5 `coerceClampedInt` shared helper (string-typed pollInterval no longer NaN-traps to tight loop), M6 `MIN_API_KEY_LENGTH` named const, M9 RATE_LIMITED retryAfter clamp [60s, 24h], M10 explicit catch on onUnload setState, M11 `client.cancelAll()` in onUnload, P1 per-request AbortController + cancelAll(), P3 403→`FORBIDDEN` distinct error class (Premium-expired/API-key-revoked-Hint statt Reauth-Loop), P6 Retry-After parser clamp, P9 1 MiB response body cap, E3 URL-shape validation, S1 cleanupDeliveries Promise.all, S2 defensive Set-iter, S3 packageId collision-suffix via FNV-1a-hash + per-poll `idOwner`-Map + `resetPollState()`, X5 `coerceClampedInt` extracted to lib/coerce.ts shared. **Hardcore-Regel angewandt — alle 17 Findings umgesetzt, kein Filter.** |
| 0.4.1   | Adapter logs zurück auf Englisch (mcm1957-Linie aus ioBroker.repositories#5667 — „log messages must be in english"). `lib/i18n-logs.ts` + `lib/i18n-logs.test.ts` gelöscht, 13 `tLog(...)`-Aufrufe in `main.ts` durch direkte EN-Template-Strings ersetzt. `systemLang`-Property bleibt für `i18n-states` / `tName`. Datapoint-Namen (11 Sprachen) unverändert. Tests 174→166 (-8 = entfernte i18n-logs Tests). |
| 0.4.0   | Multi-Language komplett: 14 user-facing info/warn/error logs und 14 datapoint-Namen (`lib/i18n-states.ts` + `tName(key)`) in 11 Sprachen. NEU `lib/coerce.ts` mit `errText`, `coerceFiniteNumber` strict (DECIMAL_NUMBER_RE), `coerceString`, `coerceBoolean`, `isPlainObject`, `isTrueish` (Helper aus 3 Files konsolidiert). `state-manager.ts` mit `createdIds`-Set für Hot-Path-Cache (~110 setObjectNotExists-Calls/Poll gespart). May-2026-Baseline: Node 22 + Admin 7.8.23 + @tsconfig/node22. README-Subtitle gestrafft, Multi-Language-Bullet aus Features raus (UX-Polish, kein Feature). Tests 137 → 174 unit (+37). Erstes Tag deploy-failed wegen Node 22+npm@latest MODULE_NOT_FOUND, Workflow auf Node 24 für deploy-Step gefixt. *Log-Lokalisierung wurde in 0.4.1 zurückgebaut.* |
| 0.3.0   | DRY-Cleanup: tote `STATUS_LABELS_DE`/`STATUS_LABELS_EN`-Aliases aus `types.ts` raus, Tests auf `STATUS_LABELS.de`/`STATUS_LABELS.en` direkt umgestellt. `format` + `format:check` npm-scripts ergänzt (analog hassemu). Master-Sync: `.github/dependabot.yml` (ignore-Block für `actions/checkout` + `actions/setup-node` Major-Bumps) + `repochecker-version-gate` Job-Block in `test-and-release.yml` von M1000-Logik auf sources-dist-stable Master-Snippet umgestellt. |
| 0.2.18  | Audit-Cleanup gegen ioBroker.example/TypeScript-Vollstandard: `@types/node` von `^25.6.0` auf `^20.19.24` zurück (an `engines.node: ">=20"` gekoppelt), dependabot blockt Major-Bumps für `@types/node` + `typescript` + `eslint`, `nyc`-Config + `coverage`-Script ergänzt, `prettier.config.mjs` analog hassemu, verwaiste `auto-merge.yml` gelöscht                                                                                                                     |
| 0.2.17  | Test-Setup auf upstream `ioBroker.example/TypeScript`-Standard zurückgeführt: `tsconfig.test.json` + `build-test/` raus, Tests unter `src/**/*.test.ts` direkt mit `ts-node/register`, neue `test/mocharc.custom.json` + `test/mocha.setup.js` + `test/tsconfig.json` + `test/.eslintrc.json`                                                                                                                                                                              |
| 0.2.16  | Hotfix js-controller-Min in 0.2.15 versehentlich auf `>=7.0.23` gesetzt (Recherche-Synthese statt Repochecker-Source). Korrigiert auf `>=6.0.11` (`recommendedJsControllerVersion`)                                                                                                                                                                                                                                                                                        |
| 0.2.15  | Process-level `unhandledRejection`/`uncaughtException`-Handler als last-line-of-defence. `manual-review`-release-script-Plugin raus. Audit-driven Konsistenz-Cleanup                                                                                                                                                                                                                                                                                                       |
| 0.2.14  | Latest-repo review round 2: separate `build-test/` from `build/` (später durch v0.2.17 vollständig ersetzt), `deliveries`+`summary` als instanceObjects, 11 Sprachen via `system.config.language`, async-handler `.catch()`-Hardening                                                                                                                                                                                                                                      |
| 0.2.13  | Latest-repo review round 1: `common.messagebox=true`                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 0.2.12  | API-Drift-Härtung in parcel-client + state-manager: typeof-Guards, Array.isArray, coerceNumber, +38 Regression-Tests                                                                                                                                                                                                                                                                                                                                                       |

## Befehle

```bash
npm run build        # Production (esbuild)
npm test             # mocha src/**/*.test.ts (via ts-node) + @iobroker/testing packageFiles
npm run lint         # ESLint + Prettier
npm run check        # tsc --noEmit (Type-Check)
```
