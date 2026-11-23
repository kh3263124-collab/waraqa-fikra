// 1. بيانات تفاصيل الكتب للنافذة المنبثقة
const booksData = {
    atomic: {
        title: "العادات الذرية (Atomic Habits)",
        author: "تأليف: جيمس كلير",
        tag: "تطوير الذات",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
        fullDesc: "يركّز الكتاب على أن النتائج الكبيرة لا تأتي من قرارات مفاجئة هائلة، بل من تحسينات صغيرة متراكمة تتكرر يومياً حتى تصبح جزءاً من هويتك اليومية.",
        points: [
            "اربط العادة الجديدة بعادة قائمة تفعلها يومياً (تكديس العادات).",
            "اجعل بدء العادة سهلاً جداً لدرجة لا تحتاج فيها إلى حماس كبير.",
            "صمّم بيئتك بحيث تجعل العادات الجيدة واضحة والسيئة صعبة الوصول."
        ],
        quote: "«أنت لا ترتقي إلى مستوى أهدافك، بل تهبط إلى مستوى أنظمتك.»"
    },
    deepwork: {
        title: "العمل العميق (Deep Work)",
        author: "تأليف: كال نيوبورت",
        tag: "التركيز والإنتاجية",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
        fullDesc: "العمل العميق هو القدرة على التركيز دون أي تشتت على مهمة تتطلب أقصى طاقتك الذهنية. يوضح الكتاب كيف يرفع هذا النمط جودة عملك ويسرّع تعلّمك للمهارات الصعبة.",
        points: [
            "احجز أوقاتاً محددة في جدولك للتركيز العميق وتعامل معها كموعد غير قابل للتأجيل.",
            "أغلق الإشعارات وابتعد عن المشتتات أثناء جلسة العمل المركزة.",
            "خطط لنهاية يومك بوضوح لتمنح عقلك راحة حقيقية دون قلق."
        ],
        quote: "«التركيز العميق هو القوة الخارقة في اقتصاد المعرفة سريع التغير.»"
    },
    timemgmt: {
        title: "إدارة الوقت",
        author: "تأليف: د. إبراهيم الفقي",
        tag: "إدارة الوقت",
        cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
        fullDesc: "إدارة الوقت ليست سباقاً مع الساعة، بل إدارة لنفسك وأولوياتك. يساعدك الكتاب على التمييز بين ما هو عاجل وما هو مهم حقاً لأهدافك بعيدة المدى.",
        points: [
            "رتّب مهامك حسب الأولوية والأثر وليس حسب الضجيج أو الاستعجال فقط.",
            "تعلّم قول «لا» بوضوح ولطف للمهام التي تستنزف وقتك بلا قيمة حقيقية.",
            "راجع إنجازك اليومي باختصار لتعرف أين ذهب وقتك وكيف تحسّنه غداً."
        ],
        quote: "«النجاح مجموعة من الخطوات الصغيرة التي ينجزها الإنسان يومياً بثبات.»"
    },
    howtoread: {
        title: "كيف تقرأ كتاباً (How to Read a Book)",
        author: "تأليف: مورتيمر أدلر",
        tag: "قراءة وفكر",
        cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        fullDesc: "يقدّم الكتاب منهجاً عملياً للقراءة النشطة؛ بحيث لا تمر على الصفحات مرور الكرام، بل تحاور الكاتب وتستخرج الفكرة الرئيسية وتعيد صياغتها بلغتك.",
        points: [
            "افحص فهرس الكتاب ومقدمته وخاتمته لتكوين خريطة أولية قبل التعمق.",
            "ضع علامات أو اكتب ملاحظات قصيرة في الهامش أثناء القراءة.",
            "لخّص فكرة الكتاب الأساسية في جملتين أو ثلاث بعد الانتهاء منه."
        ],
        quote: "«القراءة الجيدة حوار حي بين القارئ والكاتب، لا مجرد استقبال سلبي.»"
    }
};

// 2. التحكم في النافذة المنبثقة لتفاصيل الكتاب
function openBookModal(bookKey) {
    const book = booksData[bookKey];
    const modal = document.getElementById("bookModal");
    if (!book || !modal) return;

    document.getElementById("modalCover").src = book.cover;
    document.getElementById("modalCover").alt = `غلاف كتاب ${book.title}`;
    document.getElementById("modalTag").textContent = book.tag;
    document.getElementById("modalTitle").textContent = book.title;
    document.getElementById("modalAuthor").textContent = book.author;
    document.getElementById("modalFullDesc").textContent = book.fullDesc;
    document.getElementById("modalQuote").textContent = book.quote;

    const pointsList = document.getElementById("modalPoints");
    pointsList.innerHTML = "";
    book.points.forEach(point => {
        const li = document.createElement("li");
        li.textContent = point;
        pointsList.appendChild(li);
    });

    const modalFavBtn = document.getElementById("modalFavBtn");
    if (modalFavBtn) {
        modalFavBtn.setAttribute("data-book-key", bookKey);
        modalFavBtn.onclick = function(e) {
            toggleFavorite(e, bookKey);
        };
    }

    syncFavoriteButtons(bookKey);

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeBookModal() {
    const modal = document.getElementById("bookModal");
    if (!modal) return;
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function closeModalOnOutside(event) {
    const modal = document.getElementById("bookModal");
    if (event.target === modal) {
        closeBookModal();
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeBookModal();
    }
});

// 3. تفعيل وحفظ الوضع الليلي (Dark Mode)
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("waraqa_theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const btn = document.getElementById("themeToggle");
    if (btn) {
        btn.textContent = isDark ? "☀️" : "🌙";
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("waraqa_theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

// 4. إدارة المفضلة عبر localStorage
const FAVORITES_KEY = "waraqa_favorite_books";

function getFavoriteBooks() {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function saveFavoriteBooks(list) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

function toggleFavorite(event, bookKey) {
    if (event) {
        event.stopPropagation();
    }

    const favs = getFavoriteBooks();
    const index = favs.indexOf(bookKey);

    if (index === -1) {
        favs.push(bookKey);
    } else {
        favs.splice(index, 1);
    }

    saveFavoriteBooks(favs);
    syncFavoriteButtons(bookKey);
}

function syncFavoriteButtons(targetKey = null) {
    const favs = getFavoriteBooks();

    document.querySelectorAll(".fav-btn[data-book-key]").forEach(btn => {
        const key = btn.getAttribute("data-book-key");
        if (targetKey && key !== targetKey) return;

        const isFav = favs.includes(key);
        btn.classList.toggle("is-favorite", isFav);
        btn.textContent = isFav ? "❤️ في المفضلة" : "🤍 أضف للمفضلة";
    });

    const modalFavBtn = document.getElementById("modalFavBtn");
    if (modalFavBtn) {
        const currentKey = modalFavBtn.getAttribute("data-book-key");
        if (!currentKey || (targetKey && currentKey !== targetKey)) return;

        const isFav = favs.includes(currentKey);
        modalFavBtn.classList.toggle("is-favorite", isFav);
        modalFavBtn.textContent = isFav ? "❤️ محفوظ في المفضلة" : "🤍 حفظ في المفضلة";
    }
}

// 5. شريط تقدم القراءة العلوي
function updateReadingProgress() {
    const bar = document.getElementById("readingProgress");
    if (!bar) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    bar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress, { passive: true });

// 6. تحدي فكرة اليوم في الصفحة الرئيسية
const CHALLENGE_STATE_KEY = "waraqa_daily_challenge";

function getChallengeState() {
    try {
        const raw = localStorage.getItem(CHALLENGE_STATE_KEY);
        return raw ? JSON.parse(raw) : {
            text: "قراءة 10 صفحات أو 15 دقيقة بتركيز كامل دون هاتف.",
            done: false
        };
    } catch (e) {
        return {
            text: "قراءة 10 صفحات أو 15 دقيقة بتركيز كامل دون هاتف.",
            done: false
        };
    }
}

function saveChallengeState(state) {
    localStorage.setItem(CHALLENGE_STATE_KEY, JSON.stringify(state));
}

function selectChallenge(buttonEl, text) {
    document.querySelectorAll(".challenge-chip").forEach(chip => chip.classList.remove("active"));
    if (buttonEl) {
        buttonEl.classList.add("active");
    }

    const current = getChallengeState();
    current.text = text;
    current.done = false;
    saveChallengeState(current);
    renderChallengeUI();
}

function toggleChallengeDone() {
    const current = getChallengeState();
    current.done = !current.done;
    saveChallengeState(current);
    renderChallengeUI();
}

function renderChallengeUI() {
    const textEl = document.getElementById("selectedChallengeText");
    const statusEl = document.getElementById("challengeStatus");
    const btnEl = document.getElementById("completeChallengeBtn");
    if (!textEl || !statusEl || !btnEl) return;

    const state = getChallengeState();
    textEl.textContent = `التحدي الحالي: ${state.text}`;

    if (state.done) {
        statusEl.textContent = "تم الإنجاز اليوم ✓";
        statusEl.classList.add("done");
        btnEl.textContent = "إلغاء تأكيد الإنجاز";
    } else {
        statusEl.textContent = "لم يُنجز بعد";
        statusEl.classList.remove("done");
        btnEl.textContent = "تأكيد إنجاز التحدي اليوم";
    }

    document.querySelectorAll(".challenge-chip").forEach(chip => {
        const onclickAttr = chip.getAttribute("onclick") || "";
        chip.classList.toggle("active", onclickAttr.includes(state.text));
    });
}

// 7. الأسئلة الشائعة واقتراح الكتب في صفحة عن الموقع
function toggleFaq(buttonEl) {
    const item = buttonEl.closest(".faq-item");
    if (!item) return;
    item.classList.toggle("open");
    const icon = item.querySelector(".faq-icon");
    if (icon) {
        icon.textContent = item.classList.contains("open") ? "−" : "+";
    }
}

const SUGGESTIONS_KEY = "waraqa_book_suggestions";

function getSuggestions() {
    try {
        const raw = localStorage.getItem(SUGGESTIONS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function submitBookSuggestion(event) {
    event.preventDefault();
    const bookInput = document.getElementById("suggestedBookName");
    const authorInput = document.getElementById("suggestedAuthorName");
    const feedbackEl = document.getElementById("suggestionFeedback");

    if (!bookInput || !bookInput.value.trim()) return;

    const bookName = bookInput.value.trim();
    const authorName = authorInput && authorInput.value.trim() ? authorInput.value.trim() : "مؤلف غير محدد";

    const list = getSuggestions();
    list.unshift(`${bookName} — ${authorName}`);
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(list));

    bookInput.value = "";
    if (authorInput) authorInput.value = "";

    if (feedbackEl) {
        feedbackEl.textContent = `تم تسجيل اقتراحك لكتاب «${bookName}» بنجاح!`;
        feedbackEl.style.display = "block";
    }

    renderSuggestionsList();
}

function renderSuggestionsList() {
    const listEl = document.getElementById("userSuggestionsList");
    if (!listEl) return;

    const items = getSuggestions();
    listEl.innerHTML = "";
    items.forEach(itemText => {
        const li = document.createElement("li");
        li.textContent = `📌 ${itemText}`;
        listEl.appendChild(li);
    });
}

// تشغيل التهيئة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    initTheme();
    syncFavoriteButtons();
    updateReadingProgress();
    renderChallengeUI();
    renderSuggestionsList();
});