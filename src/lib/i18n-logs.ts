/**
 * Localized log strings — info/warn/error end up in the ioBroker admin log,
 * which is user-facing. Translations cover all 11 ioBroker system languages
 * (en/de/ru/pt/nl/fr/it/es/pl/uk/zh-cn).
 *
 * The active language is read once in `main.onReady` from
 * `system.config.language` and stored on the adapter instance. A language
 * change in admin requires an adapter restart — acceptable, users don't
 * switch languages on the fly.
 *
 * Debug logs stay English (maintainer diagnostics, not user-visible at
 * default loglevel).
 */

const SUPPORTED_LANGS = ["en", "de", "ru", "pt", "nl", "fr", "it", "es", "pl", "uk", "zh-cn"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

/**
 * Token substitution: `{name}` in the template is replaced with `params.name`.
 * `null` values render as `(none)`, missing tokens are kept as `{key}` so a
 * caller bug surfaces in the log instead of silently emitting an empty string.
 *
 * @param template Localized log string with `{key}` placeholders.
 * @param params   Token values; `null` → `(none)`, `undefined` → token kept.
 */
function fmt(template: string, params?: Record<string, string | number | null | undefined>): string {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = params[key];
    if (v === null) {
      return "(none)";
    }
    if (v === undefined) {
      return `{${key}}`;
    }
    return String(v);
  });
}

/**
 * All user-facing info/warn/error strings. Keys are descriptive identifiers,
 * values are bundles for the 11 supported ioBroker system languages.
 */
export const LOG_STRINGS = {
  // ──────── Adapter lifecycle / crash defense ────────
  onReadyFailed: {
    en: "onReady failed: {error}",
    de: "onReady fehlgeschlagen: {error}",
    ru: "onReady завершился с ошибкой: {error}",
    pt: "onReady falhou: {error}",
    nl: "onReady is mislukt: {error}",
    fr: "onReady a échoué : {error}",
    it: "onReady non riuscito: {error}",
    es: "onReady falló: {error}",
    pl: "onReady nie powiódł się: {error}",
    uk: "onReady завершився з помилкою: {error}",
    "zh-cn": "onReady 失败：{error}",
  },
  onMessageFailed: {
    en: "onMessage failed: {error}",
    de: "onMessage fehlgeschlagen: {error}",
    ru: "onMessage завершился с ошибкой: {error}",
    pt: "onMessage falhou: {error}",
    nl: "onMessage is mislukt: {error}",
    fr: "onMessage a échoué : {error}",
    it: "onMessage non riuscito: {error}",
    es: "onMessage falló: {error}",
    pl: "onMessage nie powiódł się: {error}",
    uk: "onMessage завершився з помилкою: {error}",
    "zh-cn": "onMessage 失败：{error}",
  },
  unhandledRejection: {
    en: "Unhandled rejection: {error}",
    de: "Unbehandelte Promise-Rejection: {error}",
    ru: "Необработанный rejection: {error}",
    pt: "Rejeição não tratada: {error}",
    nl: "Onafgehandelde rejection: {error}",
    fr: "Rejet non géré : {error}",
    it: "Rejection non gestita: {error}",
    es: "Rechazo no manejado: {error}",
    pl: "Nieobsłużone odrzucenie: {error}",
    uk: "Необроблений rejection: {error}",
    "zh-cn": "未处理的 rejection：{error}",
  },
  uncaughtException: {
    en: "Uncaught exception: {error}",
    de: "Nicht abgefangene Exception: {error}",
    ru: "Необработанное исключение: {error}",
    pt: "Exceção não capturada: {error}",
    nl: "Niet-opgevangen exception: {error}",
    fr: "Exception non capturée : {error}",
    it: "Eccezione non catturata: {error}",
    es: "Excepción no capturada: {error}",
    pl: "Nieprzechwycony wyjątek: {error}",
    uk: "Неперехоплене виключення: {error}",
    "zh-cn": "未捕获的异常：{error}",
  },

  // ──────── Configuration / startup ────────
  noApiKey: {
    en: "No valid API key configured — please enter your parcel.app API key in the adapter settings",
    de: "Kein gültiger API-Key konfiguriert — bitte trage deinen parcel.app API-Key in den Adapter-Einstellungen ein",
    ru: "API-ключ не настроен — введите ваш parcel.app API-ключ в настройках адаптера",
    pt: "Nenhuma chave de API válida configurada — insira a sua chave parcel.app nas configurações do adaptador",
    nl: "Geen geldige API-sleutel geconfigureerd — voer je parcel.app API-sleutel in de adapter-instellingen in",
    fr: "Aucune clé API valide configurée — saisissez votre clé parcel.app dans les paramètres de l'adaptateur",
    it: "Nessuna chiave API valida configurata — inserisci la tua chiave parcel.app nelle impostazioni dell'adattatore",
    es: "Ninguna clave API válida configurada — introduce tu clave parcel.app en los ajustes del adaptador",
    pl: "Nie skonfigurowano poprawnego klucza API — wprowadź swój klucz parcel.app w ustawieniach adaptera",
    uk: "Немає налаштованого API-ключа — введіть ваш parcel.app API-ключ у налаштуваннях адаптера",
    "zh-cn": "未配置有效的 API 密钥 — 请在适配器设置中输入您的 parcel.app API 密钥",
  },
  trackingStarted: {
    en: "Parcel tracking started — polling every {minutes} minutes",
    de: "Paketverfolgung gestartet — Abfrage alle {minutes} Minuten",
    ru: "Отслеживание посылок запущено — опрос каждые {minutes} мин",
    pt: "Monitorização de encomendas iniciada — sondagem a cada {minutes} minutos",
    nl: "Pakketvolg-systeem gestart — pollen elke {minutes} minuten",
    fr: "Suivi des colis démarré — interrogation toutes les {minutes} minutes",
    it: "Tracciamento pacchi avviato — interrogazione ogni {minutes} minuti",
    es: "Seguimiento de paquetes iniciado — consulta cada {minutes} minutos",
    pl: "Śledzenie paczek uruchomione — odpytywanie co {minutes} minut",
    uk: "Відстеження посилок запущено — опитування кожні {minutes} хв",
    "zh-cn": "包裹跟踪已启动 — 每 {minutes} 分钟轮询一次",
  },

  // ──────── Connection / poll ────────
  connectionRestored: {
    en: "Connection restored",
    de: "Verbindung wiederhergestellt",
    ru: "Соединение восстановлено",
    pt: "Conexão restabelecida",
    nl: "Verbinding hersteld",
    fr: "Connexion rétablie",
    it: "Connessione ripristinata",
    es: "Conexión restablecida",
    pl: "Połączenie przywrócone",
    uk: "З'єднання відновлено",
    "zh-cn": "连接已恢复",
  },
  cannotReach: {
    en: "Cannot reach parcel.app API — will keep retrying",
    de: "parcel.app-API nicht erreichbar — Versuche werden fortgesetzt",
    ru: "parcel.app API недоступен — попытки продолжаются",
    pt: "Não foi possível contactar a API parcel.app — tentativas continuarão",
    nl: "parcel.app-API onbereikbaar — pogingen worden voortgezet",
    fr: "API parcel.app injoignable — les tentatives continuent",
    it: "API parcel.app non raggiungibile — i tentativi continueranno",
    es: "API parcel.app inaccesible — se seguirán intentando",
    pl: "API parcel.app niedostępne — próby będą kontynuowane",
    uk: "API parcel.app недоступний — спроби триватимуть",
    "zh-cn": "无法访问 parcel.app API — 将继续重试",
  },
  apiTimeout: {
    en: "API request timeout — will retry next cycle",
    de: "API-Anfrage-Timeout — Wiederholung im nächsten Zyklus",
    ru: "Тайм-аут API-запроса — повтор в следующем цикле",
    pt: "Tempo limite da API — tentar de novo no próximo ciclo",
    nl: "API-verzoek-time-out — opnieuw proberen volgende cyclus",
    fr: "Délai d'API dépassé — nouvelle tentative au prochain cycle",
    it: "Timeout della richiesta API — riprovo al prossimo ciclo",
    es: "Tiempo de espera de la API agotado — se reintentará en el próximo ciclo",
    pl: "Przekroczono limit czasu API — ponowa próba w następnym cyklu",
    uk: "Тайм-аут API-запиту — повтор у наступному циклі",
    "zh-cn": "API 请求超时 — 将在下一个周期重试",
  },
  pollFailed: {
    en: "Poll failed: {error}",
    de: "Abfrage fehlgeschlagen: {error}",
    ru: "Опрос завершился с ошибкой: {error}",
    pt: "Sondagem falhou: {error}",
    nl: "Poll is mislukt: {error}",
    fr: "Échec de l'interrogation : {error}",
    it: "Interrogazione non riuscita: {error}",
    es: "Consulta falló: {error}",
    pl: "Odpytywanie nie powiodło się: {error}",
    uk: "Опитування завершилось з помилкою: {error}",
    "zh-cn": "轮询失败：{error}",
  },

  // ──────── Rate limit / auth ────────
  rateLimitHit: {
    en: "Rate limit hit — pausing API requests for {minutes} minute(s)",
    de: "Rate-Limit erreicht — API-Anfragen pausieren für {minutes} Minute(n)",
    ru: "Достигнут лимит запросов — пауза API на {minutes} мин",
    pt: "Limite de taxa atingido — pausa nos pedidos à API por {minutes} minuto(s)",
    nl: "Rate limit bereikt — API-verzoeken pauzeren voor {minutes} minuut/minuten",
    fr: "Limite de débit atteinte — pause des requêtes API pendant {minutes} minute(s)",
    it: "Limite di frequenza raggiunto — pausa delle richieste API per {minutes} minuto/i",
    es: "Límite de solicitudes alcanzado — pausando peticiones API durante {minutes} minuto(s)",
    pl: "Osiągnięto limit zapytań — pauza w żądaniach API przez {minutes} minut",
    uk: "Досягнуто ліміт запитів — пауза API на {minutes} хв",
    "zh-cn": "达到速率限制 — API 请求暂停 {minutes} 分钟",
  },
  invalidApiKey: {
    en: "Invalid API key — please check your parcel.app API key",
    de: "Ungültiger API-Key — bitte prüfe deinen parcel.app API-Key",
    ru: "Неверный API-ключ — проверьте ваш parcel.app API-ключ",
    pt: "Chave de API inválida — verifique a sua chave parcel.app",
    nl: "Ongeldige API-sleutel — controleer je parcel.app API-sleutel",
    fr: "Clé API invalide — vérifiez votre clé parcel.app",
    it: "Chiave API non valida — verifica la tua chiave parcel.app",
    es: "Clave API inválida — comprueba tu clave parcel.app",
    pl: "Nieprawidłowy klucz API — sprawdź swój klucz parcel.app",
    uk: "Невірний API-ключ — перевірте ваш parcel.app API-ключ",
    "zh-cn": "API 密钥无效 — 请检查您的 parcel.app API 密钥",
  },

  // ──────── Per-package update failure ────────
  updateFailed: {
    en: "Failed to update '{tracking}': {error}",
    de: "Aktualisierung von '{tracking}' fehlgeschlagen: {error}",
    ru: "Не удалось обновить '{tracking}': {error}",
    pt: "Falha ao atualizar '{tracking}': {error}",
    nl: "Bijwerken van '{tracking}' is mislukt: {error}",
    fr: "Échec de la mise à jour de '{tracking}' : {error}",
    it: "Impossibile aggiornare '{tracking}': {error}",
    es: "Error al actualizar '{tracking}': {error}",
    pl: "Nie udało się zaktualizować '{tracking}': {error}",
    uk: "Не вдалося оновити '{tracking}': {error}",
    "zh-cn": "更新 '{tracking}' 失败：{error}",
  },
} as const;

/**
 * Look up a log string in the requested language with EN fallback.
 *
 * @param lang   ioBroker system language (`'en'`, `'de'`, …) — any string
 *               accepted, falls back to `en` for unknown values.
 * @param key    Translation key from {@link LOG_STRINGS}.
 * @param params Token values for `{name}` placeholders.
 */
export function tLog(
  lang: string,
  key: keyof typeof LOG_STRINGS,
  params?: Record<string, string | number | null | undefined>,
): string {
  const langKey = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : "en";
  const bundle = LOG_STRINGS[key];
  const template = bundle[langKey] ?? bundle.en;
  return fmt(template, params);
}
