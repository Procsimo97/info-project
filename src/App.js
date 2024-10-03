import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

// Пример данных о товарах
const initialProducts = [
    { id: 1, name: 'РусГидро', brand: 'Энергетика', color: 'Белый', size: 'Средний', type: 'Гидроэнергетика' },
    { id: 2, name: 'Сбербанк', brand: 'Финансы', color: 'Зелёный', size: 'Крупный', type: 'Банковское дело' },
    { id: 3, name: 'Яндекс', brand: 'Технологии', color: 'Жёлтый', size: 'Крупный', type: 'ИТ-компания' },
    { id: 4, name: 'Газпром', brand: 'Энергетика', color: 'Синий', size: 'Крупный', type: 'Нефтегазовая' },
    { id: 5, name: 'Роснефть', brand: 'Энергетика', color: 'Чёрный', size: 'Средний', type: 'Нефтегазовая' },
];

function Products() {
    const [filters, setFilters] = useState({
        brand: [],
        color: [],
        size: [],
        type: []
    });

    const [activeProducts, setActiveProducts] = useState(initialProducts);

    const handleFilterChange = (filterType, value) => {
        const newFilters = {
            ...filters,
            [filterType]: filters[filterType].includes(value)
                ? filters[filterType].filter(item => item !== value)
                : [...filters[filterType], value]
        };

        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (newFilters) => {
        let filteredProducts = initialProducts;
        // Применяем каждый фильтр последовательно
        Object.keys(newFilters).forEach((filterType) => {
            if (newFilters[filterType].length > 0) {
                filteredProducts = filteredProducts.filter(product => 
                    newFilters[filterType].includes(product[filterType])
                );
            }
        });

        setActiveProducts(filteredProducts);
    };

// Функция для вычисления доступных значений фильтра (для включения/выключения чекбоксов)
const getFilteredOptions = (filterType, selectedFilters) => {
    let filteredProducts = initialProducts;

    Object.keys(selectedFilters).forEach(key => {
        if (key !== filterType && selectedFilters[key].length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                selectedFilters[key].includes(product[key])
            );
        }
    });
    return [...new Set(filteredProducts.map(product => product[filterType]))];
};

// Рендеринг опций фильтров с поддержкой disabled для недоступных вариантов
const renderFilterOptions = (filterType, options) => {
    return options.map((option, index) => {
        const disabledOptions = getFilteredOptions(filterType, filters);
        return (
            <div key={index}>
                <input
                    type="checkbox"
                    id={`${filterType}-${option}`}
                    checked={filters[filterType].includes(option)}
                    onChange={() => handleFilterChange(filterType, option)}
                    disabled={!disabledOptions.includes(option)}  // Отключаем, если фильтр недоступен
                />
                <label htmlFor={`${filterType}-${option}`}>{option}</label>
            </div>
        );
    });
};

    return (
      <div className="products-page">
        <h1>Фильтр товаров</h1>
        <div className="container">
            <div className="filters">

                <div className="filter-group">
                    <h3>Отрасль</h3>
                    {renderFilterOptions('brand', ['Энергетика', 'Финансы', 'Технологии'])}
                </div>

                <div className="filter-group">
                    <h3>Цвет</h3>
                    {renderFilterOptions('color', ['Белый', 'Зелёный', 'Жёлтый', 'Синий', 'Чёрный'])}
                </div>

                <div className="filter-group">
                    <h3>Размер компании</h3>
                    {renderFilterOptions('size', ['Крупный', 'Средний'])}
                </div>

                <div className="filter-group">
                    <h3>Тип</h3>
                    {renderFilterOptions('type', ['Гидроэнергетика', 'Банковское дело', 'ИТ-компания', 'Нефтегазовая'])}
                </div>
            </div>

            <div className="product-list">
                {activeProducts.length > 0 ? (
                    activeProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <h3>{product.name}</h3>
                            <p><strong>Отрасль:</strong> {product.brand}</p>
                            <p><strong>Цвет:</strong> {product.color}</p>
                            <p><strong>Размер компании:</strong> {product.size}</p>
                            <p><strong>Тип:</strong> {product.type}</p>
                        </div>
                    ))
                ) : (
                    <p>Нет продуктов, соответствующих выбранным фильтрам</p>
                )}
            </div>
        </div>
    </div>

    );
}

function Animations() {

    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const flipCard = () => {
        setIsClicked(prevState => !prevState);
    }

    return (
        <div className="animations-page">
            <h1>Анимации</h1>
            <div className="burger-menu-animation">
                <h2 className="subtitle">Анимация бургер-меню</h2>
                <section className={`burger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu} id="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </section>
            </div>
            <div className="card-flip-animation">
                <h2 className="subtitle">Анимация переворота карточки</h2>
                <section class={`card-container ${isClicked ? 'active' : ''}`} onClick={flipCard}>
                    <div class="card" id="card">
                        <div class="card-side card-front">
                            <h2 >РусГидро</h2>
                            <div className="info-icon">
                              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path className="icon-path" fill="black" d="M 24 3 C 12.413858 3 3 12.413866 3 24 C 3 35.586134 12.413858 45 24 45 C 35.586142 45 45 35.586134 45 24 C 45 12.413866 35.586142 3 24 3 z M 24 5 C 34.505263 5 43 13.494744 43 24 C 43 34.505256 34.505263 43 24 43 C 13.494737 43 5 34.505256 5 24 C 5 13.494744 13.494737 5 24 5 z M 24 12.185547 C 23.159 12.185547 22.474609 12.863313 22.474609 13.695312 C 22.474609 14.535312 23.159 15.220703 24 15.220703 C 24.85 15.220703 25.541016 14.535312 25.541016 13.695312 C 25.541016 12.863312 24.85 12.185547 24 12.185547 z M 24 17.935547 C 23.305 17.935547 22.818359 18.454312 22.818359 19.195312 L 22.818359 33.757812 C 22.818359 34.498812 23.304 35.017578 24 35.017578 C 24.696 35.017578 25.181641 34.498813 25.181641 33.757812 L 25.181641 19.193359 C 25.181641 18.452359 24.695 17.935547 24 17.935547 z"/></svg>
                            </div>
                        </div>
                        <div class="card-side card-back">
                            <h3 className="subtitle-card">РАО</h3>
                            <h3 className="subtitle-card">Энергетические системы Востока</h3>
                            <p className="card-text">Крупнейший поставщик тепловой и электроэнергии Дальнего Востока</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <NavLink exact to="/" className={({ isActive }) => isActive ? "active" : ""}>
                                Продукты
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/animations" className={({ isActive }) => isActive ? "active" : ""}>
                                Анимации
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Products />} />
                    <Route path="/animations" element={<Animations />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
