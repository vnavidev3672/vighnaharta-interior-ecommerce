// =====================================================================
// Vighnaharta Translation System
// Uses a pre-defined Marathi dictionary + MyMemory API for missing text
// =====================================================================

const TRANSLATIONS = {
  mr: {
    // ---- Navigation ----
    "Home": "मुखपृष्ठ",
    "Products": "उत्पादने",
    "About": "आमच्याबद्दल",
    "Contact": "संपर्क",
    "Account": "खाते",

    // ---- Index Hero ----
    "Wooden Wonders for Modern Living": "आधुनिक जीवनासाठी लाकडी चमत्कार",
    "Elevate your home with our top-grade wooden masterpieces — a perfect fusion of strength, style, and artistic design.":
      "आमच्या उच्च दर्जाच्या लाकडी कलाकृतींनी आपले घर सजवा — सामर्थ्य, शैली आणि कलात्मक रचनेचे परिपूर्ण संयोजन.",
    "Explore Now →": "आता पाहा →",

    // ---- Featured ----
    "Featured Products": "वैशिष्ट्यपूर्ण उत्पादने",
    "Polished Main Door": "चकचकीत मुख्य दरवाजा",
    "Designer Cradle": "डिझायनर पाळणा",
    "Handcrafted Devara": "हस्तनिर्मित देवारा",
    "Premium Wooden Bed": "प्रीमियम लाकडी पलंग",

    // ---- Products ----
    "All Products": "सर्व उत्पादने",
    "Loading products...": "उत्पादने लोड होत आहेत...",
    "No products found.": "उत्पादने सापडली नाहीत.",
    "No products found in this category.": "या श्रेणीत उत्पादने सापडली नाहीत.",

    // ---- Category Titles ----
    "Darawaja (Wooden Doors)": "दरवाजे (लाकडी दरवाजे)",
    "Divaan": "दिवाण",
    "Chair": "खुर्ची",
    "Devara": "देवारा",
    "Bed": "पलंग",
    "Other": "इतर",

    // ---- Footer ----
    "Download our App": "आमचे अॅप डाउनलोड करा",
    "Download App for Android and ios mobile phone.": "Android आणि iOS मोबाइल फोनसाठी अॅप डाउनलोड करा.",
    "Follow Us": "आम्हाला फॉलो करा",
    "Facebook": "फेसबुक",
    "Twitter": "ट्विटर",
    "Instagram": "इन्स्टाग्राम",
    "YouTube": "यूट्यूब",
    "Copyright 2025": "कॉपीराइट 2025",
    "\"Crafting Timeless Wooden Interiors to Enrich Every Home.\"": "\"प्रत्येक घर समृद्ध करण्यासाठी कालातीत लाकडी आतील सजावट.\"",
    "\"Sustainably Designed Woodwork for Beautiful Living Spaces.\"": "\"सुंदर राहण्याच्या जागांसाठी टिकाऊ लाकडी कारागिरी.\"",

    // ---- Account ----
    "Login": "लॉग इन",
    "Register": "नोंदणी",
    "Forgot Password": "पासवर्ड विसरलात?",
    "Username": "वापरकर्तानाव",
    "Email": "ईमेल",
    "Password": "पासवर्ड",

    // ---- Admin ----
    "Admin Panel - Upload Image": "प्रशासक पॅनेल - प्रतिमा अपलोड करा",
    "Image Title": "प्रतिमा शीर्षक",
    "Category": "श्रेणी",
    "Select Image": "प्रतिमा निवडा",
    "Upload Image": "प्रतिमा अपलोड करा",
    "Logout": "बाहेर पडा",
  }
};

// Cache API translations to avoid repeated calls
const apiTranslationCache = {};

// Translate a single text string to Marathi using MyMemory API
async function translateViaAPI(text) {
  if (!text || text.trim().length === 0) return text;
  if (apiTranslationCache[text]) return apiTranslationCache[text];

  try {
    const encoded = encodeURIComponent(text.trim().substring(0, 500));
    const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|mr`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.responseStatus === 200 && data.responseData) {
      const translated = data.responseData.translatedText;
      apiTranslationCache[text] = translated;
      return translated;
    }
  } catch (e) {
    // API unavailable — return original
  }
  return text;
}

// Walk all text nodes in the page and translate them
async function applyTranslations(lang) {
  if (lang !== 'mr') {
    // Reload the page to restore English (original HTML)
    // We store the original text in data-en attributes
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-en');
      el.removeAttribute('data-en');
    });
    // For placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      el.placeholder = el.getAttribute('data-placeholder-en');
      el.removeAttribute('data-placeholder-en');
    });
    return;
  }

  const dict = TRANSLATIONS['mr'];

  // Get all text-containing elements (exclude script, style, input)
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const tag = node.parentElement?.tagName;
        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  for (const node of textNodes) {
    const original = node.textContent.trim();
    if (!original) continue;

    // Check local dictionary first
    const mrText = dict[original];
    if (mrText) {
      // Save original in data-en on parent element
      const parent = node.parentElement;
      if (!parent.hasAttribute('data-en')) {
        parent.setAttribute('data-en', original);
      }
      node.textContent = node.textContent.replace(original, mrText);
    }
    // For short text not in dict, try API (skip long text)
    else if (original.length > 2 && original.length < 200 && /[a-zA-Z]/.test(original)) {
      const translated = await translateViaAPI(original);
      if (translated && translated !== original) {
        const parent = node.parentElement;
        if (!parent.hasAttribute('data-en')) {
          parent.setAttribute('data-en', original);
        }
        node.textContent = node.textContent.replace(original, translated);
      }
    }
  }

  // Translate placeholders
  const inputs = document.querySelectorAll('input[placeholder]');
  for (const input of inputs) {
    const ph = input.placeholder.trim();
    const mrPh = dict[ph] || await translateViaAPI(ph);
    if (mrPh && mrPh !== ph) {
      input.setAttribute('data-placeholder-en', ph);
      input.placeholder = mrPh;
    }
  }
}

// Main function — call this on page load
async function initTranslation() {
  const savedLang = localStorage.getItem('siteLang') || 'en';

  // Update any language select elements on the page
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener('change', async (e) => {
      const lang = e.target.value;
      localStorage.setItem('siteLang', lang);
      await applyTranslations(lang);
    });
  }

  // Apply saved language on page load
  if (savedLang === 'mr') {
    await applyTranslations('mr');
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTranslation);
} else {
  initTranslation();
}
