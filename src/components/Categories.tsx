
import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (categoryIndex: number) => void;
};

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

const CategoriesComponent: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(CategoriesComponent); // Exportul corect!
