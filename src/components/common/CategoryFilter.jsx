import PropTypes from 'prop-types';
import { Tag } from 'lucide-react';
import Select from 'react-select';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const options = [
    { value: 'all', label: 'Semua Kategori' },
    ...categories.map((cat) => ({ value: cat, label: `#${cat}` })),
  ];

  const currentOption = options.find((opt) => opt.value === selectedCategory) || options[0];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'var(--bg-secondary)',
      borderColor: state.isFocused ? '#6366f1' : 'var(--border-color)',
      boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
      borderRadius: 'var(--radius-md)',
      minHeight: '38px',
      fontSize: '0.875rem',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#6366f1',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--text-primary)',
      fontWeight: 500,
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'var(--primary)'
        : state.isFocused
        ? 'rgba(99, 102, 241, 0.15)'
        : 'transparent',
      color: state.isSelected ? '#ffffff' : 'var(--text-primary)',
      cursor: 'pointer',
      fontSize: '0.875rem',
    }),
    input: (base) => ({
      ...base,
      color: 'var(--text-primary)',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--text-muted)',
    }),
  };

  return (
    <div className="category-filter-section">
      <div
        className="category-filter-header"
        style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Tag size={16} className="category-icon" />
          <span className="category-filter-title">Kategori Populer:</span>
        </div>
        <div style={{ minWidth: '220px' }}>
          <Select
            id="category-select"
            aria-label="Filter kategori"
            options={options}
            value={currentOption}
            onChange={(selected) => onSelectCategory(selected?.value || 'all')}
            styles={customSelectStyles}
            placeholder="Cari atau pilih kategori..."
            isClearable={false}
          />
        </div>
      </div>
      <div className="category-chips-list">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`category-chip ${
            selectedCategory === 'all' ? 'category-chip-active' : ''
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`category-chip ${
              selectedCategory === category ? 'category-chip-active' : ''
            }`}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
