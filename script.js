const LANG_STORAGE_KEY = "eid_timings_d12_lang_v1";

const MOSQUES = [
  {
    id: "imam-muslim",
    nameEn: "Jamia Masjid Imam Muslim",
    nameUr: "جامعہ مسجد امام مسلم",
    sectorEn: "D-12 Markaz",
    sectorUr: "D-12 Markaz",
    streetEn: "Behind Carrefour",
    streetUr: "عقب کاررفور",
    time: "06:45",
    women: true,
    lat: 33.70321057534957,
    lng: 72.94724225018842,
  },
  {
    id: "ashab-e-suffa",
    nameEn: "Jamia Masjid Ashab-e-Suffa",
    nameUr: "جامعہ مسجد اصحابِ صفہ",
    sectorEn: "D-12/2",
    sectorUr: "D-12/2",
    streetEn: "Street 39",
    streetUr: "39",
    time: "07:00",
    women: false,
    lat: 33.70568999882358,
    lng: 72.943999480695,
  },
  {
    id: "siddiqa-qadriya",
    nameEn: "Jamia Masjid Siddiqa Qadriya",
    nameUr: "جامعہ مسجد صدیقہ قادریہ",
    sectorEn: "D-12/4",
    sectorUr: "D-12/4",
    streetEn: "Street 147",
    streetUr: "147",
    time: "07:15",
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
    time: "07:15",
    women: true,
    lat: 33.69720137064314,
    lng: 72.94529149822651,
  },
  {
    id: "gulshan-habib",
    nameEn: "Jamia Masjid Gulshan Habib",
    nameUr: "جامعہ مسجد گلشن حبیب",
    sectorEn: "D-12/2",
    sectorUr: "D-12/2",
    streetEn: "Street 46",
    streetUr: "46",
    time: "07:15",
    women: false,
    lat: 33.70342796201811,
    lng: 72.94055406879005,
  },
  {
    id: "maqsood-ul-uloom",
    nameEn: "Jamia Masjid Maqsood ul Uloom",
    nameUr: "جامعہ مسجد مقصود العلوم",
    sectorEn: "D-12 Markaz",
    sectorUr: "D-12 Markaz",
    streetEn: "Behind SOS Center / Allied Bank, near Najeeb Mart",
    streetUr: "عقب سوس سینٹر/ الائیڈ بنک، نزد نجیب مارٹ",
    time: "07:30",
    women: true,
    lat: 33.70030383673561,
    lng: 72.94954873767173,
  },
  {
    id: "syeda-amina",
    nameEn: "Jamia Masjid Syeda Amina",
    nameUr: "جامعہ مسجد سیدہ آمنہ",
    sectorEn: "D-12/4",
    sectorUr: "D-12/4",
    streetEn: "Street 141",
    streetUr: "141",
    time: "07:45",
    women: true,
    lat: 33.70150570530734,
    lng: 72.95426727746475,
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
];

const TEXT = {
  en: {
    greetingTitle: "Eid Mubarak",
    greetingBody:
      "May Allah accept our عبادات, forgive our shortcomings, and bless our homes with peace.",
    mapCta: "Open in Google Maps",
    womenYes: "Women: ✓",
    womenNo: "Women: ✗",
    passed: "Prayer time passed",
    leftSuffix: "left",
    footerBuilt: "Built for the D-12 community.",
    footerSign: "Humble requester of prayers, Amer Butt",
    footerNote: "Please cross-check addresses before leaving.",
    emptyState: "No mosques to show.",
  },
  ur: {
    greetingTitle: "عید مبارک",
    greetingBody:
      "اللہ ہماری عبادات قبول فرمائے، ہماری کوتاہیوں کو معاف فرمائے اور ہمارے گھروں میں سکون عطا فرمائے۔",
    mapCta: "گوگل میپس میں کھولیں",
    womenYes: "خواتین: ✓",
    womenNo: "خواتین: ✗",
    passed: "نماز کا وقت گزر چکا ہے",
    leftSuffix: "باقی",
    footerBuilt: "D-12 کمیونٹی کے لیے تیار کیا گیا۔",
    footerSign: "دعاؤں کا طالبگار، عامر بٹ",
    footerNote: "براہِ کرم روانگی سے پہلے پتے کی تصدیق کر لیں۔",
    emptyState: "دکھانے کے لیے کوئی مسجد موجود نہیں۔",
  },
};

function parseISODateParam(value) {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
}

function getFixedEidDate() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = parseISODateParam(params.get("date"));
  if (fromQuery) return fromQuery;
  return new Date(2026, 2, 21);
}

function getInitialLang() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  return saved === "ur" || saved === "en" ? saved : "en";
}

function sortMosquesByTime(items) {
  return items.slice().sort((left, right) => left.time.localeCompare(right.time));
}

function sortMosquesByUpcoming(items) {
  const now = new Date();
  return items.slice().sort((a, b) => {
    const aTarget = computeTargetDate(a.time, fixedEidDate);
    const bTarget = computeTargetDate(b.time, fixedEidDate);
    const aDiff = aTarget.getTime() - now.getTime();
    const bDiff = bTarget.getTime() - now.getTime();
    const aUpcoming = aDiff > 0;
    const bUpcoming = bDiff > 0;
    // Upcoming mosques first (soonest first), then passed ones sorted by time
    if (aUpcoming && !bUpcoming) return -1;
    if (!aUpcoming && bUpcoming) return 1;
    return a.time.localeCompare(b.time);
  });
}

function to12h(time24h) {
  const [hh, mm] = String(time24h || "").split(":").map(Number);
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

function computeTargetDate(time24h, fixedDate) {
  const [hh, mm] = String(time24h || "").split(":").map(Number);
  const hour = Number.isFinite(hh) ? hh : 0;
  const minute = Number.isFinite(mm) ? mm : 0;

  const target = new Date(fixedDate);
  target.setHours(hour, minute, 0, 0);
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

let lang = getInitialLang();
let mosques = sortMosquesByTime(MOSQUES); // will be re-sorted after fixedEidDate is set

const fixedEidDate = getFixedEidDate();

// Now that fixedEidDate is available, sort so upcoming mosques appear first
mosques = sortMosquesByUpcoming(MOSQUES);

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

  if (!mosques.length) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.textContent = TEXT[lang].emptyState;
    list.appendChild(empty);
    return;
  }

  for (const mosque of mosques) {
    const article = document.createElement("article");
    article.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const top = document.createElement("div");
    top.className = "card-top";

    const left = document.createElement("div");
    const name = document.createElement("div");
    name.className = "name";
    name.textContent = lang === "ur" ? mosque.nameUr : mosque.nameEn;

    const address = document.createElement("div");
    address.className = "address";
    address.textContent =
      lang === "ur"
        ? `${mosque.sectorUr}${mosque.streetUr ? ` - ${mosque.streetUr}` : ""}`
        : `${mosque.sectorEn}${mosque.streetEn ? ` • ${mosque.streetEn}` : ""}`;

    left.appendChild(name);
    left.appendChild(address);

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = to12h(mosque.time);

    top.appendChild(left);
    top.appendChild(badge);

    const meta = document.createElement("div");
    meta.className = "meta";

    const women = document.createElement("div");
    women.className = "pill";
    women.textContent = mosque.women ? TEXT[lang].womenYes : TEXT[lang].womenNo;

    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.id = `cd-${mosque.id}`;
    countdown.textContent = lang === "ur" ? "حساب ہو رہا ہے..." : "Calculating...";

    meta.appendChild(women);
    meta.appendChild(countdown);

    const btnRow = document.createElement("div");
    btnRow.className = "btn-row";

    const mapLink = document.createElement("a");
    mapLink.className = "map-link";
    mapLink.href = buildMapsUrl(mosque);
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
  let needsReorder = false;

  for (const mosque of mosques) {
    const countdown = document.getElementById(`cd-${mosque.id}`);
    if (!countdown) continue;

    const target = computeTargetDate(mosque.time, fixedEidDate);
    const diff = target.getTime() - now.getTime();
    const wasPassed = countdown.classList.contains("passed");

    if (diff <= 0) {
      countdown.textContent = TEXT[lang].passed;
      countdown.classList.add("passed");
      if (!wasPassed) needsReorder = true; // just crossed over — move to bottom
    } else {
      countdown.textContent = formatCountdownLocalized(diff);
      countdown.classList.remove("passed");
    }
  }

  // Re-sort and re-render if a mosque just finished so order stays live
  if (needsReorder) {
    mosques = sortMosquesByUpcoming(MOSQUES);
    renderMosques();
    updateCountdowns(); // re-run to fill in fresh text after re-render
  }
}

function setLanguage(next) {
  lang = next === "ur" ? "ur" : "en";
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyLanguageToStaticText();
  renderMosques();
  updateCountdowns();
  updateNextPrayerBanner();
}

document.getElementById("btn-en")?.addEventListener("click", () => setLanguage("en"));
document.getElementById("btn-ur")?.addEventListener("click", () => setLanguage("ur"));

renderMosques();
applyLanguageToStaticText();
updateCountdowns();
updateNextPrayerBanner();
setInterval(() => { updateCountdowns(); updateNextPrayerBanner(); }, 1000);

function updateNextPrayerBanner() {
  const now = new Date();
  const upcoming = MOSQUES
    .map(m => ({ mosque: m, diff: computeTargetDate(m.time, fixedEidDate).getTime() - now.getTime() }))
    .filter(x => x.diff > 0)
    .sort((a, b) => a.diff - b.diff);

  const banner = document.querySelector(".next-prayer-banner");
  const labelEl = document.getElementById("next-prayer-label");
  const nameEl = document.getElementById("next-prayer-name");
  const metaEl = document.getElementById("next-prayer-meta");
  const timeEl = document.getElementById("next-prayer-time");
  const cdEl = document.getElementById("next-prayer-cd");

  if (!banner || !nameEl || !timeEl || !cdEl) return;

  if (!upcoming.length) {
    banner.classList.add("all-passed");
    if (labelEl) labelEl.textContent = lang === "ur" ? "تمام نمازیں" : "All Prayers";
    nameEl.textContent = lang === "ur" ? "تمام نمازیں ادا ہو چکی ہیں" : "All prayers have passed";
    if (metaEl) metaEl.textContent = "";
    timeEl.textContent = "";
    cdEl.textContent = lang === "ur" ? "عید مبارک!" : "Eid Mubarak!";
    return;
  }

  banner.classList.remove("all-passed");
  const { mosque, diff } = upcoming[0];

  if (labelEl) labelEl.textContent = lang === "ur" ? "اگلی نماز" : "Next Prayer";
  nameEl.textContent = lang === "ur" ? mosque.nameUr : mosque.nameEn;
  if (metaEl) {
    metaEl.textContent = lang === "ur"
      ? `${mosque.sectorUr}${mosque.streetUr ? ` - ${mosque.streetUr}` : ""}`
      : `${mosque.sectorEn}${mosque.streetEn ? ` • ${mosque.streetEn}` : ""}`;
  }
  timeEl.textContent = to12h(mosque.time);
  cdEl.textContent = formatCountdownLocalized(diff);
}
