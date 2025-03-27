import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (categoryIndex: number) => void;  
}

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {
  
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={value === i ? "active" : ''}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
export default Categories;