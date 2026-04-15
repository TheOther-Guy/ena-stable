const STORAGE_KEY = "enatable-menu-v1";
const REACTION_KEY = "enatable-reactions-v1";

const RAW_MENU = `
الحلويات
بان كيك: 180
سلطة فواكه: 160
ليالي لبنان: 130
غزل بيروت: 190
كاروت كيك: 150
وافل كلاسيك: 100
وافل أيس كريم: 140
وافل نوتيلا: 150
براونيز: 120
مولتن كيك: 250
وافل فواكه: 170

المزه البارده
طبق حمص: 140
طبق حمص بنجر: 160
طبق حمص بيستو: 180
طبق محمره: 190
طبق بابا غنوج: 140
طبق لبنه بالتوم: 140
طبق ورق عنب: 170
فتوش: 150
تبوله: 150
روكا: 150
شمندر: 150
خيار باللبن: 90

المزه السخنه
طبق بطاطا حاره: 150
طبق فطاير سبانخ: 110
طبق كبه لحمه: 200
طبق كبه فراخ: 170
طبق كفته دبس الرمان: 250
طبق فته حمص: 150
طبق فته بزنجان: 170
طبق فته الدجاج: 240
طبق سجق دبس الرمان: 240
طبق كبده دجاج بدبس الرمان: 240
طبق حمص بالقاورما و المكسرات: 280
طبق عرايس كفته بجبنه العكاوي: 190
طبق عرايس باللحمه: 150
طبق كبه لبنيه: 280
طبق فلافل لبناني: 120
طبق كعب الغزال: 280
طبق كفته بالطحينه: 280

الأطباق الرئيسية - مشاوي
طبق كباب: 450
طبق شيش طاووق: 350
طبق شيش كفته: 350
طبق لحم شقف: 450
طبق مكس جريل: 520
طبق دجاج مسحب: 350
طبق كبة مشوية: 210
طبق كباب خشخاش: 375
طبق كباب أورفالي: 375

المأكولات البحرية
طبق شوربة سي فود: 280
طبق جمبري مقلي: 350
طبق جمبري مشوي: 350
طبق جمبري بالثوم والحامض: 350
طبق كاليماري مقلي: 330
طبق كاليماري مشوي: 330
طبق سمك مشوي: 430
طبق سمكة حارة: 580

إضافات
أرز بسمتي: 80
خضار مشوي: 100
بطاطس مقلية: 70

المشروبات
شاي عادي: 50
شاي أخضر: 70
شاي كرك: 80
أعشاب: 80
كركديه: 70
قرفة: 80
براد شاي بدوي صغير: 100
براد شاي بدوي كبير: 120
اسبريسو: 65
دبل اسبريسو: 85
امريكانو: 100
لاتيه: 120
كابتشينو: 120
موكاتو: 100
كورتادو: 115
فلات وايت: 180
سبانش لاتيه: 140
أيس سبانش لاتيه: 150
قهوة تركي: 60
قهوة فرنساوي: 90
ايس امريكانو: 100
ايس كوفي بلح: 145
ميلك شيك (شوكولاتة/فانيليا): 110
ميلك شيك (فواكه/لوتس): 150
كوكا كولا / بيبسي / سبرايت / فانتا: 60
مياه معدنية: 30
مياه غازية: 60

العصائر الفريش
بطيخ / برتقال / كانتالوب: 100
مانجا / فراولة: 120
ليمون: 90
ليمون نعناع: 100
جوجو بيساب: 100
مخيطو ليمون: 100
صان شاين: 110
كريزي جوس: 130

المناقيش
زعتر: 130
زعتر مع جبنه: 160
جبنه: 160
لبنه مع خضار: 130
محمره: 160
محمره مع جبنه: 180
لحمه بعجين: 250
سجق مع جبنه: 180
نوتيلا: 130
نوتيلا مع موز: 150

شوربه
شوربه عدس: 180
شوربه بروكلي: 210
شوربه كريمه مع الدجاج: 210

البيتزا
بيتزا مرجريتا: 240
بيتزا 4 أجبان: 330
بيتزا جضار: 290
بيتزا بيبروني: 320
بيتزا دجاج باربيكيو: 330
بيتزا الفريدو: 365
بيتزا فاهيتا دجاج: 330
بيتزا فاهيتا جمبري: 375
بيتزا فيلي تشيز ستيك: 385
بيتزا أمواج البحر: 390
بيتزا دوديز سوبر اكستريم: 410
بيتزا الملكه: 320
بيتزا تشيكن بافالو: 325
بيتزا سلامي: 310

الفطار
توفي أفوكادو توست: 360
كاساديا أوملت: 150
حلومي توست: 320
بيض: 115
أفوكادو توست: 340
أفوكادو توست بالدجاج: 370
أفوكادو توست بالسلامون: 430
شكشوكه توست: 210
شكشوكه توست بالبيض: 240
طبق بيض شكشوكي: 220
فول: 100
مسبحه: 140
فته: 150
ترويقه انجليزي: 275
ترويقه لبناني: 300
بيض قاورمه: 250
أوملت لبنه ونعناع: 150
`;

const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const menuGrid = document.getElementById("menuGrid");
const resetBtn = document.getElementById("resetBtn");
const template = document.getElementById("itemCardTemplate");
const adminToggle = document.getElementById("adminToggle");
const adminPanel = document.getElementById("adminPanel");
const itemForm = document.getElementById("itemForm");
const adminRows = document.getElementById("adminRows");
const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");

function parseMenu(raw) {
    const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
    const items = [];
    let currentCategory = "عام";
    for (const line of lines) {
        if (!line.includes(":")) {
            currentCategory = line;
            continue;
        }
        const [name, pricePart] = line.split(":");
        const price = Number(pricePart.trim());
        const rating = Number((3.8 + (name.length % 12) / 10).toFixed(1));
        const id = slugify(`${currentCategory}-${name}`);
        items.push({
            id,
            name: name.trim(),
            category: currentCategory,
            price,
            rating,
            photo: `https://picsum.photos/seed/${encodeURIComponent(id)}/600/400`,
        });
    }
    return items;
}

function slugify(input) {
    return input.toLowerCase().replace(/\s+/g, "-");
}

function getMenu() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    const initial = parseMenu(RAW_MENU);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
}

function setMenu(menu) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
}

function getReactions() {
    return JSON.parse(localStorage.getItem(REACTION_KEY) || "{}");
}

function setReactions(data) {
    localStorage.setItem(REACTION_KEY, JSON.stringify(data));
}

function renderCategories(menu) {
    const categories = [...new Set(menu.map((x) => x.category))];
    categoryFilter.innerHTML = '<option value="">كل الأقسام</option>';
    categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });
}

function renderMenu() {
    const menu = getMenu();
    const category = categoryFilter.value;
    const q = searchInput.value.trim().toLowerCase();
    const reactions = getReactions();

    const filtered = menu.filter((item) => {
        const matchesCat = !category || item.category === category;
        const matchesSearch = !q || item.name.toLowerCase().includes(q);
        return matchesCat && matchesSearch;
    });

    menuGrid.innerHTML = "";
    filtered.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector("article");
        clone.querySelector("img").src = item.photo;
        clone.querySelector("h3").textContent = item.name;
        clone.querySelector(".category").textContent = item.category;
        clone.querySelector(".price").textContent = `${item.price} جنيه`;
        clone.querySelector(".rating").textContent = `⭐ تقييم السوشيال: ${item.rating}/5`;

        const likeBtn = clone.querySelector('[data-action="like"]');
        const dislikeBtn = clone.querySelector('[data-action="dislike"]');
        likeBtn.querySelector("span").textContent = reactions[item.id]?.likes || 0;
        dislikeBtn.querySelector("span").textContent = reactions[item.id]?.dislikes || 0;

        likeBtn.addEventListener("click", () => updateReaction(item.id, "likes"));
        dislikeBtn.addEventListener("click", () => updateReaction(item.id, "dislikes"));

        card.dataset.id = item.id;
        menuGrid.appendChild(clone);
    });

    renderAdminRows(menu);
}

function renderAdminRows(menu) {
    adminRows.innerHTML = "";
    menu.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td><input data-field="name" value="${item.name}" /></td>
      <td><input data-field="category" value="${item.category}" /></td>
      <td><input data-field="price" type="number" value="${item.price}" /></td>
      <td><input data-field="rating" type="number" step="0.1" min="0" max="5" value="${item.rating}" /></td>
      <td><button data-action="save">حفظ</button></td>
      <td><button data-action="delete">حذف</button></td>
    `;

        tr.querySelector('[data-action="save"]').addEventListener("click", () => {
            const next = {
                ...item,
                name: tr.querySelector('[data-field="name"]').value.trim(),
                category: tr.querySelector('[data-field="category"]').value.trim(),
                price: Number(tr.querySelector('[data-field="price"]').value),
                rating: Number(tr.querySelector('[data-field="rating"]').value),
            };
            const menuState = getMenu().map((x) => (x.id === item.id ? next : x));
            setMenu(menuState);
            renderCategories(menuState);
            renderMenu();
        });

        tr.querySelector('[data-action="delete"]').addEventListener("click", () => {
            const menuState = getMenu().filter((x) => x.id !== item.id);
            setMenu(menuState);
            renderCategories(menuState);
            renderMenu();
        });

        adminRows.appendChild(tr);
    });
}

function updateReaction(id, type) {
    const data = getReactions();
    if (!data[id]) data[id] = { likes: 0, dislikes: 0 };
    data[id][type] += 1;
    setReactions(data);
    renderMenu();
}

function setupEvents() {
    searchInput.addEventListener("input", renderMenu);
    categoryFilter.addEventListener("change", renderMenu);
    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        categoryFilter.value = "";
        renderMenu();
    });

    adminToggle.addEventListener("click", () => adminPanel.classList.toggle("hidden"));

    itemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(itemForm);
        const name = fd.get("name").toString().trim();
        const category = fd.get("category").toString().trim();
        const id = `${slugify(category)}-${slugify(name)}-${Date.now()}`;
        const newItem = {
            id,
            name,
            category,
            price: Number(fd.get("price")),
            rating: Number(fd.get("rating")),
            photo: fd.get("photo").toString().trim(),
        };
        const menu = [...getMenu(), newItem];
        setMenu(menu);
        renderCategories(menu);
        renderMenu();
        itemForm.reset();
    });

    exportBtn.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(getMenu(), null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "enatable-menu.json";
        a.click();
        URL.revokeObjectURL(a.href);
    });

    importInput.addEventListener("change", async () => {
        const file = importInput.files?.[0];
        if (!file) return;
        const text = await file.text();
        const parsed = JSON.parse(text);
        setMenu(parsed);
        renderCategories(parsed);
        renderMenu();
    });
}

function initQr() {
    const target = document.getElementById("qrContainer");
    new QRCode(target, {
        text: window.location.href,
        width: 180,
        height: 180,
    });
}

function init() {
    const menu = getMenu();
    renderCategories(menu);
    setupEvents();
    renderMenu();
    initQr();
}

init();
