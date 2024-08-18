import React from 'react';

const Filter = ({ updateFilters }) => {
  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    updateFilters(name, value);
  };

  const filterGroups = [
    {
      title: 'Бренд',
      criteria: 'brand',
      options: ['Samsung', 'Apple', 'Philips', 'LG', 'Bosch']
    },
    {
      title: 'Категория',
      criteria: 'category',
      options: ['Электроника', 'Бытовая техника']
    },
    {
      title: 'Цена',
      criteria: 'price',
      options: [
        { label: 'До 500$', value: 'low' },
        { label: 'От 500$', value: 'high' }
      ]
    },
    {
      title: 'Цвет',
      criteria: 'color',
      options: ['black', 'silver', 'white']
    }
  ];

  return (
    <div className="filters">
      <h2>Фильтры</h2>
      {filterGroups.map(group => (
        <div className="filter-group" key={group.criteria}>
          <h3>{group.title}</h3>
          {group.options.map(option => (
            <label key={typeof option === 'string' ? option : option.value}>
              <input
                type="checkbox"
                name={group.criteria}
                value={typeof option === 'string' ? option : option.value}
                onChange={handleCheckboxChange}
              />
              {typeof option === 'string' ? option : option.label}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filter;
