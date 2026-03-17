const DEFAULT_TIME_24H = "06:45";
const LANG_STORAGE_KEY = "eid_timings_d12_lang_v1";

const MOSQUES = [
  {
    id: "imam-muslim",
    nameEn: "Jamia Masjid Imam Muslim",
    nameUr: "جامعہ مسجد امام مسلم",
    sectorEn: "D-12 Markaz",
    sectorUr: "D-12 Markaz",
    streetEn: "Behind Carrefour",
    streetUr: "حقیب کارڈور",
    time: "06:45",
    women: true,
    lat: 33.70321057534957,
    lng: 72.94724225018842,
  },
  {
    id: "siddiqa-qadriya",
    nameEn: "Jamia Masjid Siddiqa Qadriya",
    nameUr: "جامعہ مسجد صدیقہ قادریہ",
    sectorEn: "D-12/4",
    sectorUr: "D-12/4",
    streetEn: "Street 147",
    streetUr: "147",
    time: "07:30",
    women: true,
    lat: 33.70357498532319,
    lng: 72.95832206291158,
  },
  {
    id: "khadija-al-kubra",
    nameEn: "Jamia Masjid Khadija al-Kubra",
    nameUr: "جامعہ مسجد خدیجہ الکبری",
    sectorEn: "D-12/1",
    sectorUr: "D-12/1",
    streetEn: "Street 88",
    streetUr: "88",
    time: "07:30",
    women: true,
    lat: 33.69720137064314,
    lng: 72.94529149822651,
  },
  {
    id: "ashab-e-suffa",
    nameEn: "Jamia Masjid Ashab-e-Suffa",
    nameUr: "جامعہ مسجد اصحابِ صفہ",
    sectorEn: "D-12/2",
    sectorUr: "D-12/2",
    streetEn: "Street 39",
    streetUr: "39",
    time: "07:30",
    women: false,
    lat: 33.70568999882358,
    lng: 72.943999480695,
  },
  {
    id: "syeda-amina",
    nameEn: "Jamia Masjid Syeda Amina",
    nameUr: "جامعہ مسجد سیدہ آمنہ",
    sectorEn: "D-12/4",
    sectorUr: "D-12/4",
    streetEn: "Street 141",
    streetUr: "141",
    time: "08:00",
    women: true,
    lat: 33.70150570530734,
    lng: 72.95426727746475,
  },
  {
    id: "gulshan-habib",
    nameEn: "Jamia Masjid Gulshan Habib",
    nameUr: "جامعہ مسجد گلشن حبیب",
    sectorEn: "D-12/2",
    sectorUr: "D-12/2",
    streetEn: "Street 46",
    streetUr: "46",
    time: "08:00",
    women: false,
    lat: 33.70342796201811,
    lng: 72.94055406879005,
  },
  {
    id: "syedna-ali",
    nameEn: "Jamia Masjid Syedna Ali",
    nameUr: "جامعہ مسجد سیدنا علی",
    sectorEn: "D-12/3",
    sectorUr: "D-12/3",
    streetEn: "Street 11",
    streetUr: "11",
    time: "08:00",
    women: false,
    lat: 33.706375421400345,
    lng: 72.95244798259296,
  },
  {
    id: "maqsood-ul-uloom",
    nameEn: "Jamia Masjid Maqsood ul Uloom",
    nameUr: "جامعہ مسجد مقصود العلوم",
    sectorEn: "D-12 Markaz",
    sectorUr: "D-12 Markaz",
    streetEn: "Behind SOS Center / Allied Bank, near Najeeb Mart",
    streetUr: "عقب سوس سینٹر/ الائیڈ بنک ، نزد نجیب مارٹ",
    time: "08:15",
    women: true,
    lat: 33.70030383673561,
    lng: 72.94954873767173,
  },
  {
    id: "auliya",
    nameEn: "Jamia Masjid Auliya",
    nameUr: "جامعہ مسجد اولیاء",
    sectorEn: "Green Belt",
    sectorUr: "گرین بیلٹ",
    streetEn: "Service Road South (near Grid Station)",
    streetUr: "سروس روڈ ساوتھ نزد گرڈ اسٹیشن",
    time: "08:25",
    women: false,
    lat: 33.69757923240884,
    lng: 72.95365029598663,
  },
];

function parseISODateParam(value) {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

function to12h(time24h) {
  const [hh, mm] = String(time24h || "").split(":").map((v) => Number(v));
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return String(time24h || "");
  const ampm = hh >= 12 ? "PM" : "AM";
  const hour12 = ((hh + 11) % 12) + 1;
  return `${hour12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

function buildMapsUrl(mosque) {
  if (typeof mosque.lat === "number" && typeof mosque.lng === "number") {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${mosque.lat},${mosque.lng}`,
    )}`;
  }
  const query = [mosque.nameEn, mosque.sectorEn, mosque.streetEn].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getFixedEidDate() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = parseISODateParam(params.get("date"));
  if (fromQuery) return fromQuery;
  // Eid prayer date confirmed by user: Saturday, March 21, 2026
  return new Date(2026, 2, 21);
}

function computeTargetDate(time24h, fixedDate) {
  const [hh, mm] = String(time24h || "").split(":").map((v) => Number(v));
  const hour = Number.isFinite(hh) ? hh : 0;
  const minute = Number.isFinite(mm) ? mm : 0;

  if (fixedDate) {
    const target = new Date(fixedDate);
    target.setHours(hour, minute, 0, 0);
    return target;
  }

  const now = new Date();
  const target = new Date(now);
  target.setHours(hour, minute, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}

function formatCountdownLocalized(ms) {
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  if (lang === "ur") {
    const parts = [];
    if (days) parts.push(`${days} دن`);
    parts.push(`${hours} گھنٹے`);
    parts.push(`${minutes} منٹ`);
    parts.push(`${String(seconds).padStart(2, "0")} سیکنڈ`);
    return `${parts.join(" ")} ${TEXT.ur.leftSuffix}`;
  }

  const parts = [];
  if (days) parts.push(`${days}d`);
  parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  parts.push(`${String(seconds).padStart(2, "0")}s`);
  return `${parts.join(" ")} ${TEXT.en.leftSuffix}`;
}

function pinSvg() {
  return `
    <svg class="pin" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2c-3.86 0-7 3.14-7 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/>
    </svg>
  `;
}

const TEXT = {
  en: {
    greetingTitle: "Eid Mubarak",
    greetingBody:
      "May Allah accept our عبادات, forgive our shortcomings, and bless our homes with peace.",
    defaultTimeLabel: "Default time",
    countdownDateLabel: "Countdown date",
    countdownAuto: "Auto (today/next)",
    mapCta: "Open in Google Maps",
    womenYes: "Women: ✓",
    womenNo: "Women: ✗",
    passed: "Prayer time passed",
    leftSuffix: "left",
    footerBuilt: "Built for the D-12 community.",
    footerSign: "Humble requester of prayers, Amer Butt",
    footerNote: "Please cross-check addresses before leaving.",
  },
  ur: {
    greetingTitle: "عید مبارک",
    greetingBody: "اللہ ہماری عبادات قبول فرمائے، ہماری کوتاہیوں کو معاف فرمائے اور ہمارے گھروں میں سکون عطا فرمائے۔",
    defaultTimeLabel: "ڈیفالٹ وقت",
    countdownDateLabel: "تاریخ",
    countdownAuto: "آٹو (آج/اگلا)",
    mapCta: "گوگل میپس میں کھولیں",
    womenYes: "خواتین: ✓",
    womenNo: "خواتین: ✗",
    passed: "نماز کا وقت گزر چکا ہے",
    leftSuffix: "باقی",
    footerBuilt: "D-12 کمیونٹی کے لیے تیار کیا گیا۔",
    footerSign: "دعاؤں کا طالبگار، عامر بٹ",
    footerNote: "براہِ کرم روانگی سے پہلے پتے کی تصدیق کر لیں۔",
  },
};

function getInitialLang() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === "ur" || saved === "en") return saved;
  return "en";
}

let lang = getInitialLang();
let mosques = MOSQUES.slice();

const fixedEidDate = getFixedEidDate();

function applyLanguageToStaticText() {
  const t = TEXT[lang];

  const title = document.getElementById("greeting-title");
  if (title) title.textContent = t.greetingTitle;
  const body = document.getElementById("greeting-body");
  if (body) body.textContent = t.greetingBody;

  const footerBuilt = document.getElementById("footer-built");
  if (footerBuilt) footerBuilt.textContent = t.footerBuilt;
  const footerSign = document.getElementById("footer-sign");
  if (footerSign) footerSign.textContent = t.footerSign;
  const footerNote = document.getElementById("footer-note");
  if (footerNote) footerNote.textContent = t.footerNote;

  const btnEn = document.getElementById("btn-en");
  const btnUr = document.getElementById("btn-ur");
  if (btnEn) btnEn.classList.toggle("active", lang === "en");
  if (btnUr) btnUr.classList.toggle("active", lang === "ur");

  document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang === "ur" ? "ur" : "en");

}

function renderMosques() {
  const list = document.getElementById("mosque-list");
  if (!list) return;
  list.innerHTML = "";

  const visible = mosques;
  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.textContent = "No mosques to show.";
    list.appendChild(empty);
    return;
  }

  for (const m of visible) {
    const article = document.createElement("article");
    article.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const top = document.createElement("div");
    top.className = "card-top";

    const left = document.createElement("div");
    const name = document.createElement("div");
    name.className = "name";
    name.textContent = lang === "ur" ? m.nameUr : m.nameEn;
    const address = document.createElement("div");
    address.className = "address";
    const addressPrimary =
      lang === "ur"
        ? `${m.sectorUr || ""}${m.streetUr ? ` — ${m.streetUr}` : ""}`
        : `${m.sectorEn || ""}${m.streetEn ? ` • ${m.streetEn}` : ""}`;
    address.textContent = addressPrimary.trim();

    const secondary = document.createElement("div");
    secondary.className = "secondary-line";
    const addressSecondary =
      lang === "ur"
        ? `${m.sectorEn || ""}${m.streetEn ? ` • ${m.streetEn}` : ""}`
        : `${m.sectorUr || ""}${m.streetUr ? ` — ${m.streetUr}` : ""}`;
    secondary.textContent = (lang === "ur" ? m.nameEn : m.nameUr) + " • " + addressSecondary.trim();

    left.appendChild(name);
    left.appendChild(address);
    left.appendChild(secondary);

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = to12h(m.time);

    top.appendChild(left);
    top.appendChild(badge);

    const meta = document.createElement("div");
    meta.className = "meta";

    const women = document.createElement("div");
    women.className = "pill";
    women.textContent = m.women ? TEXT[lang].womenYes : TEXT[lang].womenNo;

    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.id = `cd-${m.id}`;
    countdown.textContent = "Calculating…";

    meta.appendChild(women);
    meta.appendChild(countdown);

    const btnRow = document.createElement("div");
    btnRow.className = "btn-row";

    const mapLink = document.createElement("a");
    mapLink.className = "map-link";
    mapLink.href = buildMapsUrl(m);
    mapLink.target = "_blank";
    mapLink.rel = "noopener noreferrer";
    mapLink.innerHTML = `${pinSvg()} ${TEXT[lang].mapCta}`;

    btnRow.appendChild(mapLink);

    inner.appendChild(top);
    inner.appendChild(meta);
    inner.appendChild(btnRow);
    article.appendChild(inner);

    list.appendChild(article);
  }
}

function updateCountdowns() {
  const now = new Date();
  for (const m of mosques) {
    const el = document.getElementById(`cd-${m.id}`);
    if (!el) continue;

    const target = computeTargetDate(m.time, fixedEidDate);
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) {
      el.textContent = TEXT[lang].passed;
      el.classList.add("passed");
    } else {
      el.textContent = formatCountdownLocalized(diff);
      el.classList.remove("passed");
    }
  }
}

function setLanguage(next) {
  lang = next === "ur" ? "ur" : "en";
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyLanguageToStaticText();
  renderMosques();
  updateCountdowns();
}

document.getElementById("btn-en")?.addEventListener("click", () => setLanguage("en"));
document.getElementById("btn-ur")?.addEventListener("click", () => setLanguage("ur"));

renderMosques();
applyLanguageToStaticText();
updateCountdowns();
setInterval(updateCountdowns, 1000);
