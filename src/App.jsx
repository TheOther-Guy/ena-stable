import React, { useState, useEffect } from "react";
import { RAW_MENU, parseMenu, slugify } from "./data";
import "./index.css";

const STORAGE_KEY = "enatable-menu-v3";
const REACTION_KEY = "enatable-reactions-v2";

export default function App() {
    const [menu, setMenu] = useState([]);
    const [reactions, setReactions] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "", category: "", price: "", rating: "", photo: ""
    });

    useEffect(() => {
        const savedMenu = localStorage.getItem(STORAGE_KEY);
        if (savedMenu) {
            setMenu(JSON.parse(savedMenu));
        } else {
            const initial = parseMenu(RAW_MENU);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
            setMenu(initial);
        }

        const savedReactions = JSON.parse(localStorage.getItem(REACTION_KEY) || "{}");
        setReactions(savedReactions);
    }, []);

    const saveMenu = (newMenu) => {
        setMenu(newMenu);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMenu));
    };

    const saveReactions = (newReactions) => {
        setReactions(newReactions);
        localStorage.setItem(REACTION_KEY, JSON.stringify(newReactions));
    };

    const handleReaction = (id, type) => {
        const updated = { ...reactions };
        if (!updated[id]) updated[id] = { likes: 0, dislikes: 0 };
        updated[id][type] += 1;
        saveReactions(updated);
    };

    const handleApplyPrice = () => {
        // Just triggers re-render, filter logic handles it
        setMenu([...menu]);
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setCategoryFilter("All");
        setPriceRange({ min: "", max: "" });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const id = `${slugify(formData.category)}-${slugify(formData.name)}-${Date.now()}`;
        const newItem = {
            id,
            name: formData.name.trim(),
            category: formData.category.trim(),
            price: Number(formData.price),
            rating: Number(formData.rating),
            photo: formData.photo.trim() || `https://picsum.photos/seed/${id}/600/600`, // Default to square
        };
        saveMenu([...menu, newItem]);
        setFormData({ name: "", category: "", price: "", rating: "", photo: "" });
    };

    // Filter Logic
    const categories = ["All", ...new Set(menu.map((x) => x.category))];

    const filteredMenu = menu.filter((item) => {
        const matchesCat = categoryFilter === "All" || item.category === categoryFilter;
        const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesPrice = true;
        if (priceRange.min !== "") matchesPrice = matchesPrice && item.price >= Number(priceRange.min);
        if (priceRange.max !== "") matchesPrice = matchesPrice && item.price <= Number(priceRange.max);
        
        return matchesCat && matchesSearch && matchesPrice;
    });

    return (
        <div dir="rtl">
            {/* Header matching La Poire */}
            <header className="site-header">
                <div className="header-top">
                    <div className="header-left">
                        <span>📍 فرع القاهرة</span>
                        <span>عربي ⌵</span>
                    </div>
                    <div className="header-center">
                        <h1 className="brand-logo">Enatable</h1>
                    </div>
                    <div className="header-right">
                        <button className="icon-btn" onClick={() => setIsAdminOpen(!isAdminOpen)}>
                            ⚙️
                        </button>
                        <button className="icon-btn">
                            🔍
                        </button>
                        <button className="icon-btn">
                            ❤️ <span className="badge">0</span>
                        </button>
                        <button className="icon-btn">
                            🛒 <span className="badge">0</span>
                        </button>
                    </div>
                </div>

                <nav className="main-nav">
                    <a className="active">الرئيسية</a>
                    <a>الطلبات الخاصة</a>
                    <a>من نحن</a>
                </nav>
            </header>

            <main className="page-container">
                <div className="breadcrumbs">
                    الرئيسية &gt; القائمة
                </div>

                <div className="breadcrumbs-bar">
                    <h2>قائمة المطعم</h2>
                    <div className="sort-drp">
                        <span>ترتيب حسب : </span>
                        <select>
                            <option>أضيف حديثاً</option>
                            <option>الأعلى تقييماً</option>
                            <option>السعر: الأقل للأكثر</option>
                        </select>
                    </div>
                </div>

                {/* Horizontal Category Tabs */}
                <div className="category-tabs">
                    {categories.map((cat) => (
                        <button 
                            key={cat} 
                            className={`cat-tab ${categoryFilter === cat ? 'active' : ''}`}
                            onClick={() => setCategoryFilter(cat)}
                        >
                            {cat === "All" ? "الكل" : cat}
                        </button>
                    ))}
                </div>

                <div className="catalog-layout">
                    {/* Left Sidebar Filters */}
                    <aside className="sidebar">
                        <div className="search-widget">
                            <h3>بحث</h3>
                            <input 
                                type="text" 
                                placeholder="ابحث عن..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="price-filter">
                            <h3>السعر</h3>
                            <div className="inputs">
                                <span>من</span>
                                <input 
                                    type="number" 
                                    value={priceRange.min} 
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                />
                                <span>إلى</span>
                                <input 
                                    type="number" 
                                    value={priceRange.max} 
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                />
                            </div>
                            <button className="btn-primary" onClick={handleApplyPrice}>تطبيق الكل</button>
                            <button className="btn-outline" onClick={handleClearFilters}>مسح الكل</button>
                        </div>
                    </aside>

                    {/* Main Product Grid */}
                    <section className="product-grid">
                        {filteredMenu.map((item) => {
                            // Mocking Out of Stock for demonstration based on ID length
                            const isOut = item.name.length > 20; 
                            return (
                                <article key={item.id} className="product-card">
                                    <div className="product-img-wrap">
                                        <img src={item.photo} alt={item.name} loading="lazy" />
                                        {isOut && <div className="stock-badge">غير متوفر</div>}
                                    </div>
                                    <h3 className="product-title">{item.name}</h3>
                                    <p className="product-price">{item.price} ج.م</p>
                                    
                                    <div className="product-actions">
                                        <button className="action-circle" onClick={() => handleReaction(item.id, "likes")}>
                                            👍
                                        </button>
                                        <button className="action-circle" onClick={() => handleReaction(item.id, "dislikes")}>
                                            👎
                                        </button>
                                        <button className="action-circle" title="Add to cart">
                                            🛒
                                        </button>
                                    </div>
                                </article>
                            )
                        })}
                    </section>
                </div>

                {/* Hidden Admin Panel */}
                {isAdminOpen && (
                    <section className="admin-row">
                        <h3>🔧 إضافة عنصر جديد</h3>
                        <form className="inputs" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} onSubmit={handleFormSubmit}>
                            <input
                                style={{flex: 1, padding: '0.6rem'}}
                                placeholder="اسم الصنف" required
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                style={{flex: 1, padding: '0.6rem'}}
                                placeholder="القسم" required
                                value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                            <input
                                style={{flex: 1, padding: '0.6rem'}}
                                type="number" placeholder="السعر" required
                                value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </form>
                        <button className="btn-primary" style={{marginTop: '1rem', width: 'auto'}} onClick={handleFormSubmit}>إضافة</button>
                    </section>
                )}
            </main>
        </div>
    );
}
