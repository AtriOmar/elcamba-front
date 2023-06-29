import React, { useState } from "react";
import Categories from "./Categories";
import SubCategories from "./SubCategories";

export default function ManageCategories() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="min-h-full">
      <div className={`grid min-h-full ${activeCategory ? "hidden" : ""}`}>
        <Categories setActiveCategory={setActiveCategory} />
      </div>
      <div className={`grid min-h-full ${activeCategory ? "" : "hidden"}`}>
        <SubCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
    </div>
  );
}
