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
        const filteredProducts = initialProducts.filter(product => {
            return (
                (newFilters.brand.length === 0 || newFilters.brand.includes(product.brand)) &&
                (newFilters.color.length === 0 || newFilters.color.includes(product.color)) &&
                (newFilters.size.length === 0 || newFilters.size.includes(product.size)) &&
                (newFilters.type.length === 0 || newFilters.type.includes(product.type))
            );
        });

        setActiveProducts(filteredProducts);
    };


    const getFilteredOptions = (filterType, currentFilters) => {
        return initialProducts.reduce((options, product) => {
            const filterMatch = Object.keys(currentFilters).every(key => {
                if (key === filterType) return true;
                return currentFilters[key].length === 0 || currentFilters[key].includes(product[key]);
            });

            if (filterMatch && !options.includes(product[filterType])) {
                options.push(product[filterType]);
            }

            return options;
        }, []);
    };

    const isOptionDisabled = (filterType, option, currentFilters) => {
        const testFilters = {
            ...currentFilters,
            [filterType]: [option]
        };

        const filteredProducts = initialProducts.filter(product => {
            return (
                (testFilters.brand.length === 0 || testFilters.brand.includes(product.brand)) &&
                (testFilters.color.length === 0 || testFilters.color.includes(product.color)) &&
                (testFilters.size.length === 0 || testFilters.size.includes(product.size)) &&
                (testFilters.type.length === 0 || testFilters.type.includes(product.type))
            );
        });

        return filteredProducts.length === 0;
    };

    const renderFilterOptions = (filterType, options) => {
        return options.map(option => (
            <label key={option}>
                <input
                    type="checkbox"
                    value={option}
                    onChange={() => handleFilterChange(filterType, option)}
                    disabled={isOptionDisabled(filterType, option, filters)}
                    checked={filters[filterType].includes(option)}
                />
                {option}
            </label>
        ));
    };

    return (
        <div className="products-page">
            <h1>Фильтр товаров</h1>
            <div className="container">
                <div className="filters">
                    <div className="filter-group">
                        <h3>Отрасль</h3>
                        {renderFilterOptions('brand', getFilteredOptions('brand', filters))}
                    </div>
                    <div className="filter-group">
                        <h3>Цвет</h3>
                        {renderFilterOptions('color', getFilteredOptions('color', filters))}
                    </div>
                    <div className="filter-group">
                        <h3>Размер компании</h3>
                        {renderFilterOptions('size', getFilteredOptions('size', filters))}
                    </div>
                    <div className="filter-group">
                        <h3>Тип</h3>
                        {renderFilterOptions('type', getFilteredOptions('type', filters))}
                    </div>
                </div>
                <div className="product-list">
                    {activeProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <h3>{product.name}</h3>
                            <p><strong>Отрасль:</strong> {product.brand}</p>
                            <p><strong>Цвет:</strong> {product.color}</p>
                            <p><strong>Размер компании:</strong> {product.size}</p>
                            <p><strong>Тип:</strong> {product.type}</p>
                        </div>
                    ))}
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
                            <div className="info-icon"></div>
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
