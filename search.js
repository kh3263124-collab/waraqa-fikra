let showOnlyFavorites = false;

// 1. دالة توحيد النصوص العربية لتسهيل البحث (تجاهل الهمزات والتشكيل والتاء المربوطة)
function normalizeArabicText(text) {
    if (!text) return "";
    return text
        .toLowerCase()
        .replace(/[\u064B-\u065F]/g, "") // إزالة التشكيل
        .replace(/[أإآ]/g, "ا")          // توحيد الألف
        .replace(/ة/g, "ه")              // توحيد التاء المربوطة والهاء
        .replace(/ى/g, "ي")              // توحيد الألف المقصورة والياء
        .trim();
}

// 2. تبديل فلتر "المفضلة فقط"
function toggleFavOnlyFilter() {
    showOnlyFavorites = !showOnlyFavorites;
    const btn = document.getElementById("favOnlyBtn");
    if (btn) {
        btn.classList.toggle("active", showOnlyFavorites);
        btn.textContent = showOnlyFavorites ? "❤️ عرض كل الكتب" : "❤️ المفضلة فقط";
    }
    filterBooks();
}

// 3. مسح البحث وإعادة ضبط الفلاتر بالكامل
function resetAllFilters() {
    const searchInput = document.getElementById("bookSearchInput");
    const categorySelect = document.getElementById("categoryFilter");
    const favBtn = document.getElementById("favOnlyBtn");

    if (searchInput) searchInput.value = "";
    if (categorySelect) categorySelect.value = "all";
    
    showOnlyFavorites = false;
    if (favBtn) {
        favBtn.classList.remove("active");
        favBtn.textContent = "❤️ المفضلة فقط";
    }

    filterBooks();
}

// 4. الدالة الرئيسية للبحث والتصفية والفرز
function filterBooks() {
    const searchInput = document.getElementById("bookSearchInput");
    const categorySelect = document.getElementById("categoryFilter");
    const cards = document.querySelectorAll(".books-grid .book-card");
    const emptyMsg = document.getElementById("noResultsMsg");
    const resultsCounter = document.getElementById("resultsCounter");

    if (!searchInput || !categorySelect || cards.length === 0) return;

    const normalizedQuery = normalizeArabicText(searchInput.value);
    const selectedCategory = categorySelect.value;
    const favoriteKeys = typeof getFavoriteBooks === "function" ? getFavoriteBooks() : [];

    let visibleCount = 0;

    cards.forEach(card => {
        const titleEl = card.querySelector("h4");
        const authorEl = card.querySelector(".author");
        const summaryEl = card.querySelector(".summary");
        const takeawayEl = card.querySelector(".takeaway");
        const tagEl = card.querySelector(".tag");
        const bookKey = card.getAttribute("data-book-key");

        // تجميع كل نصوص الكرت وتوحيدها للبحث الشامل
        const fullCardText = normalizeArabicText(
            `${titleEl ? titleEl.textContent : ""} ${authorEl ? authorEl.textContent : ""} ${summaryEl ? summaryEl.textContent : ""} ${takeawayEl ? takeawayEl.textContent : ""}`
        );

        const tag = tagEl ? tagEl.textContent.trim() : "";

        // التحقق من الشروط الثلاثة
        const matchesText = fullCardText.includes(normalizedQuery);
        const matchesCategory = selectedCategory === "all" || tag === selectedCategory;
        const matchesFavorite = !showOnlyFavorites || (bookKey && favoriteKeys.includes(bookKey));

        if (matchesText && matchesCategory && matchesFavorite) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // تحديث عداد النتائج
    if (resultsCounter) {
        if (visibleCount === cards.length && !normalizedQuery && selectedCategory === "all" && !showOnlyFavorites) {
            resultsCounter.textContent = `إجمالي الكتب المتاحة: ${cards.length}`;
        } else {
            resultsCounter.textContent = `نتائج التصفية: ${visibleCount} من ${cards.length}`;
        }
    }

    // إظهار أو إخفاء رسالة "لا توجد نتائج" مع زر إعادة الضبط
    if (emptyMsg) {
        emptyMsg.style.display = visibleCount === 0 ? "block" : "none";
    }
}

// 5. تشغيل التحديث التلقائي عند تحميل الصفحة أو تغيير المفضلة
document.addEventListener("DOMContentLoaded", function () {
    filterBooks();

    // مراقبة الضغط على أزرار المفضلة لتحديث القائمة فوراً إذا كان فلتر المفضلة مفعلاً
    document.addEventListener("click", function (event) {
        if (event.target.closest(".fav-btn") && showOnlyFavorites) {
            setTimeout(filterBooks, 50);
        }
    });
});