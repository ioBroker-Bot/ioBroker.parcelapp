"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var i18n_logs_exports = {};
__export(i18n_logs_exports, {
  LOG_STRINGS: () => LOG_STRINGS,
  tLog: () => tLog
});
module.exports = __toCommonJS(i18n_logs_exports);
const SUPPORTED_LANGS = ["en", "de", "ru", "pt", "nl", "fr", "it", "es", "pl", "uk", "zh-cn"];
function fmt(template, params) {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const v = params[key];
    if (v === null) {
      return "(none)";
    }
    if (v === void 0) {
      return `{${key}}`;
    }
    return String(v);
  });
}
const LOG_STRINGS = {
  // ──────── Adapter lifecycle / crash defense ────────
  onReadyFailed: {
    en: "onReady failed: {error}",
    de: "onReady fehlgeschlagen: {error}",
    ru: "onReady \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439: {error}",
    pt: "onReady falhou: {error}",
    nl: "onReady is mislukt: {error}",
    fr: "onReady a \xE9chou\xE9 : {error}",
    it: "onReady non riuscito: {error}",
    es: "onReady fall\xF3: {error}",
    pl: "onReady nie powi\xF3d\u0142 si\u0119: {error}",
    uk: "onReady \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0432\u0441\u044F \u0437 \u043F\u043E\u043C\u0438\u043B\u043A\u043E\u044E: {error}",
    "zh-cn": "onReady \u5931\u8D25\uFF1A{error}"
  },
  onMessageFailed: {
    en: "onMessage failed: {error}",
    de: "onMessage fehlgeschlagen: {error}",
    ru: "onMessage \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439: {error}",
    pt: "onMessage falhou: {error}",
    nl: "onMessage is mislukt: {error}",
    fr: "onMessage a \xE9chou\xE9 : {error}",
    it: "onMessage non riuscito: {error}",
    es: "onMessage fall\xF3: {error}",
    pl: "onMessage nie powi\xF3d\u0142 si\u0119: {error}",
    uk: "onMessage \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0432\u0441\u044F \u0437 \u043F\u043E\u043C\u0438\u043B\u043A\u043E\u044E: {error}",
    "zh-cn": "onMessage \u5931\u8D25\uFF1A{error}"
  },
  unhandledRejection: {
    en: "Unhandled rejection: {error}",
    de: "Unbehandelte Promise-Rejection: {error}",
    ru: "\u041D\u0435\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u044B\u0439 rejection: {error}",
    pt: "Rejei\xE7\xE3o n\xE3o tratada: {error}",
    nl: "Onafgehandelde rejection: {error}",
    fr: "Rejet non g\xE9r\xE9 : {error}",
    it: "Rejection non gestita: {error}",
    es: "Rechazo no manejado: {error}",
    pl: "Nieobs\u0142u\u017Cone odrzucenie: {error}",
    uk: "\u041D\u0435\u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0438\u0439 rejection: {error}",
    "zh-cn": "\u672A\u5904\u7406\u7684 rejection\uFF1A{error}"
  },
  uncaughtException: {
    en: "Uncaught exception: {error}",
    de: "Nicht abgefangene Exception: {error}",
    ru: "\u041D\u0435\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u043E\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435: {error}",
    pt: "Exce\xE7\xE3o n\xE3o capturada: {error}",
    nl: "Niet-opgevangen exception: {error}",
    fr: "Exception non captur\xE9e : {error}",
    it: "Eccezione non catturata: {error}",
    es: "Excepci\xF3n no capturada: {error}",
    pl: "Nieprzechwycony wyj\u0105tek: {error}",
    uk: "\u041D\u0435\u043F\u0435\u0440\u0435\u0445\u043E\u043F\u043B\u0435\u043D\u0435 \u0432\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044F: {error}",
    "zh-cn": "\u672A\u6355\u83B7\u7684\u5F02\u5E38\uFF1A{error}"
  },
  // ──────── Configuration / startup ────────
  noApiKey: {
    en: "No valid API key configured \u2014 please enter your parcel.app API key in the adapter settings",
    de: "Kein g\xFCltiger API-Key konfiguriert \u2014 bitte trage deinen parcel.app API-Key in den Adapter-Einstellungen ein",
    ru: "API-\u043A\u043B\u044E\u0447 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u2014 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 parcel.app API-\u043A\u043B\u044E\u0447 \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u0430\u0434\u0430\u043F\u0442\u0435\u0440\u0430",
    pt: "Nenhuma chave de API v\xE1lida configurada \u2014 insira a sua chave parcel.app nas configura\xE7\xF5es do adaptador",
    nl: "Geen geldige API-sleutel geconfigureerd \u2014 voer je parcel.app API-sleutel in de adapter-instellingen in",
    fr: "Aucune cl\xE9 API valide configur\xE9e \u2014 saisissez votre cl\xE9 parcel.app dans les param\xE8tres de l'adaptateur",
    it: "Nessuna chiave API valida configurata \u2014 inserisci la tua chiave parcel.app nelle impostazioni dell'adattatore",
    es: "Ninguna clave API v\xE1lida configurada \u2014 introduce tu clave parcel.app en los ajustes del adaptador",
    pl: "Nie skonfigurowano poprawnego klucza API \u2014 wprowad\u017A sw\xF3j klucz parcel.app w ustawieniach adaptera",
    uk: "\u041D\u0435\u043C\u0430\u0454 \u043D\u0430\u043B\u0430\u0448\u0442\u043E\u0432\u0430\u043D\u043E\u0433\u043E API-\u043A\u043B\u044E\u0447\u0430 \u2014 \u0432\u0432\u0435\u0434\u0456\u0442\u044C \u0432\u0430\u0448 parcel.app API-\u043A\u043B\u044E\u0447 \u0443 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F\u0445 \u0430\u0434\u0430\u043F\u0442\u0435\u0440\u0430",
    "zh-cn": "\u672A\u914D\u7F6E\u6709\u6548\u7684 API \u5BC6\u94A5 \u2014 \u8BF7\u5728\u9002\u914D\u5668\u8BBE\u7F6E\u4E2D\u8F93\u5165\u60A8\u7684 parcel.app API \u5BC6\u94A5"
  },
  trackingStarted: {
    en: "Parcel tracking started \u2014 polling every {minutes} minutes",
    de: "Paketverfolgung gestartet \u2014 Abfrage alle {minutes} Minuten",
    ru: "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0441\u044B\u043B\u043E\u043A \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E \u2014 \u043E\u043F\u0440\u043E\u0441 \u043A\u0430\u0436\u0434\u044B\u0435 {minutes} \u043C\u0438\u043D",
    pt: "Monitoriza\xE7\xE3o de encomendas iniciada \u2014 sondagem a cada {minutes} minutos",
    nl: "Pakketvolg-systeem gestart \u2014 pollen elke {minutes} minuten",
    fr: "Suivi des colis d\xE9marr\xE9 \u2014 interrogation toutes les {minutes} minutes",
    it: "Tracciamento pacchi avviato \u2014 interrogazione ogni {minutes} minuti",
    es: "Seguimiento de paquetes iniciado \u2014 consulta cada {minutes} minutos",
    pl: "\u015Aledzenie paczek uruchomione \u2014 odpytywanie co {minutes} minut",
    uk: "\u0412\u0456\u0434\u0441\u0442\u0435\u0436\u0435\u043D\u043D\u044F \u043F\u043E\u0441\u0438\u043B\u043E\u043A \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E \u2014 \u043E\u043F\u0438\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u043E\u0436\u043D\u0456 {minutes} \u0445\u0432",
    "zh-cn": "\u5305\u88F9\u8DDF\u8E2A\u5DF2\u542F\u52A8 \u2014 \u6BCF {minutes} \u5206\u949F\u8F6E\u8BE2\u4E00\u6B21"
  },
  // ──────── Connection / poll ────────
  connectionRestored: {
    en: "Connection restored",
    de: "Verbindung wiederhergestellt",
    ru: "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",
    pt: "Conex\xE3o restabelecida",
    nl: "Verbinding hersteld",
    fr: "Connexion r\xE9tablie",
    it: "Connessione ripristinata",
    es: "Conexi\xF3n restablecida",
    pl: "Po\u0142\u0105czenie przywr\xF3cone",
    uk: "\u0417'\u0454\u0434\u043D\u0430\u043D\u043D\u044F \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043E",
    "zh-cn": "\u8FDE\u63A5\u5DF2\u6062\u590D"
  },
  cannotReach: {
    en: "Cannot reach parcel.app API \u2014 will keep retrying",
    de: "parcel.app-API nicht erreichbar \u2014 Versuche werden fortgesetzt",
    ru: "parcel.app API \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u2014 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u044E\u0442\u0441\u044F",
    pt: "N\xE3o foi poss\xEDvel contactar a API parcel.app \u2014 tentativas continuar\xE3o",
    nl: "parcel.app-API onbereikbaar \u2014 pogingen worden voortgezet",
    fr: "API parcel.app injoignable \u2014 les tentatives continuent",
    it: "API parcel.app non raggiungibile \u2014 i tentativi continueranno",
    es: "API parcel.app inaccesible \u2014 se seguir\xE1n intentando",
    pl: "API parcel.app niedost\u0119pne \u2014 pr\xF3by b\u0119d\u0105 kontynuowane",
    uk: "API parcel.app \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439 \u2014 \u0441\u043F\u0440\u043E\u0431\u0438 \u0442\u0440\u0438\u0432\u0430\u0442\u0438\u043C\u0443\u0442\u044C",
    "zh-cn": "\u65E0\u6CD5\u8BBF\u95EE parcel.app API \u2014 \u5C06\u7EE7\u7EED\u91CD\u8BD5"
  },
  apiTimeout: {
    en: "API request timeout \u2014 will retry next cycle",
    de: "API-Anfrage-Timeout \u2014 Wiederholung im n\xE4chsten Zyklus",
    ru: "\u0422\u0430\u0439\u043C-\u0430\u0443\u0442 API-\u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u2014 \u043F\u043E\u0432\u0442\u043E\u0440 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0446\u0438\u043A\u043B\u0435",
    pt: "Tempo limite da API \u2014 tentar de novo no pr\xF3ximo ciclo",
    nl: "API-verzoek-time-out \u2014 opnieuw proberen volgende cyclus",
    fr: "D\xE9lai d'API d\xE9pass\xE9 \u2014 nouvelle tentative au prochain cycle",
    it: "Timeout della richiesta API \u2014 riprovo al prossimo ciclo",
    es: "Tiempo de espera de la API agotado \u2014 se reintentar\xE1 en el pr\xF3ximo ciclo",
    pl: "Przekroczono limit czasu API \u2014 ponowa pr\xF3ba w nast\u0119pnym cyklu",
    uk: "\u0422\u0430\u0439\u043C-\u0430\u0443\u0442 API-\u0437\u0430\u043F\u0438\u0442\u0443 \u2014 \u043F\u043E\u0432\u0442\u043E\u0440 \u0443 \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u043C\u0443 \u0446\u0438\u043A\u043B\u0456",
    "zh-cn": "API \u8BF7\u6C42\u8D85\u65F6 \u2014 \u5C06\u5728\u4E0B\u4E00\u4E2A\u5468\u671F\u91CD\u8BD5"
  },
  pollFailed: {
    en: "Poll failed: {error}",
    de: "Abfrage fehlgeschlagen: {error}",
    ru: "\u041E\u043F\u0440\u043E\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439: {error}",
    pt: "Sondagem falhou: {error}",
    nl: "Poll is mislukt: {error}",
    fr: "\xC9chec de l'interrogation : {error}",
    it: "Interrogazione non riuscita: {error}",
    es: "Consulta fall\xF3: {error}",
    pl: "Odpytywanie nie powiod\u0142o si\u0119: {error}",
    uk: "\u041E\u043F\u0438\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u043E\u0441\u044C \u0437 \u043F\u043E\u043C\u0438\u043B\u043A\u043E\u044E: {error}",
    "zh-cn": "\u8F6E\u8BE2\u5931\u8D25\uFF1A{error}"
  },
  // ──────── Rate limit / auth ────────
  rateLimitHit: {
    en: "Rate limit hit \u2014 pausing API requests for {minutes} minute(s)",
    de: "Rate-Limit erreicht \u2014 API-Anfragen pausieren f\xFCr {minutes} Minute(n)",
    ru: "\u0414\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442 \u043B\u0438\u043C\u0438\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u2014 \u043F\u0430\u0443\u0437\u0430 API \u043D\u0430 {minutes} \u043C\u0438\u043D",
    pt: "Limite de taxa atingido \u2014 pausa nos pedidos \xE0 API por {minutes} minuto(s)",
    nl: "Rate limit bereikt \u2014 API-verzoeken pauzeren voor {minutes} minuut/minuten",
    fr: "Limite de d\xE9bit atteinte \u2014 pause des requ\xEAtes API pendant {minutes} minute(s)",
    it: "Limite di frequenza raggiunto \u2014 pausa delle richieste API per {minutes} minuto/i",
    es: "L\xEDmite de solicitudes alcanzado \u2014 pausando peticiones API durante {minutes} minuto(s)",
    pl: "Osi\u0105gni\u0119to limit zapyta\u0144 \u2014 pauza w \u017C\u0105daniach API przez {minutes} minut",
    uk: "\u0414\u043E\u0441\u044F\u0433\u043D\u0443\u0442\u043E \u043B\u0456\u043C\u0456\u0442 \u0437\u0430\u043F\u0438\u0442\u0456\u0432 \u2014 \u043F\u0430\u0443\u0437\u0430 API \u043D\u0430 {minutes} \u0445\u0432",
    "zh-cn": "\u8FBE\u5230\u901F\u7387\u9650\u5236 \u2014 API \u8BF7\u6C42\u6682\u505C {minutes} \u5206\u949F"
  },
  invalidApiKey: {
    en: "Invalid API key \u2014 please check your parcel.app API key",
    de: "Ung\xFCltiger API-Key \u2014 bitte pr\xFCfe deinen parcel.app API-Key",
    ru: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 API-\u043A\u043B\u044E\u0447 \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0430\u0448 parcel.app API-\u043A\u043B\u044E\u0447",
    pt: "Chave de API inv\xE1lida \u2014 verifique a sua chave parcel.app",
    nl: "Ongeldige API-sleutel \u2014 controleer je parcel.app API-sleutel",
    fr: "Cl\xE9 API invalide \u2014 v\xE9rifiez votre cl\xE9 parcel.app",
    it: "Chiave API non valida \u2014 verifica la tua chiave parcel.app",
    es: "Clave API inv\xE1lida \u2014 comprueba tu clave parcel.app",
    pl: "Nieprawid\u0142owy klucz API \u2014 sprawd\u017A sw\xF3j klucz parcel.app",
    uk: "\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 API-\u043A\u043B\u044E\u0447 \u2014 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0432\u0430\u0448 parcel.app API-\u043A\u043B\u044E\u0447",
    "zh-cn": "API \u5BC6\u94A5\u65E0\u6548 \u2014 \u8BF7\u68C0\u67E5\u60A8\u7684 parcel.app API \u5BC6\u94A5"
  },
  // ──────── Per-package update failure ────────
  updateFailed: {
    en: "Failed to update '{tracking}': {error}",
    de: "Aktualisierung von '{tracking}' fehlgeschlagen: {error}",
    ru: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C '{tracking}': {error}",
    pt: "Falha ao atualizar '{tracking}': {error}",
    nl: "Bijwerken van '{tracking}' is mislukt: {error}",
    fr: "\xC9chec de la mise \xE0 jour de '{tracking}' : {error}",
    it: "Impossibile aggiornare '{tracking}': {error}",
    es: "Error al actualizar '{tracking}': {error}",
    pl: "Nie uda\u0142o si\u0119 zaktualizowa\u0107 '{tracking}': {error}",
    uk: "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u043D\u043E\u0432\u0438\u0442\u0438 '{tracking}': {error}",
    "zh-cn": "\u66F4\u65B0 '{tracking}' \u5931\u8D25\uFF1A{error}"
  }
};
function tLog(lang, key, params) {
  var _a;
  const langKey = SUPPORTED_LANGS.includes(lang) ? lang : "en";
  const bundle = LOG_STRINGS[key];
  const template = (_a = bundle[langKey]) != null ? _a : bundle.en;
  return fmt(template, params);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LOG_STRINGS,
  tLog
});
//# sourceMappingURL=i18n-logs.js.map
