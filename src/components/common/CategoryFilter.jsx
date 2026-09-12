import PropTypes from 'prop-types';
import { Tag } from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter-section">
      <div className="category-filter-header">
        <Tag size={16} className="category-icon" />
        <span className="category-filter-title">Kategori Populer:</span>
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
