import React, { useEffect, useState } from 'react';
import Product from '../Products/Products';
import useProducts from '../../hooks/useProducts';

const Filters = () => {
  const categorys = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
  ];

  const [categoryFilter, setCategoryFilter] = useState({
    smartphones: false,
    laptops: false,
    fragrances: false,
    skincare: false,
    'home-decoration': false,
  });

  const [filteredData, setFilteRedData] = useState([]);
  const { products, fetchProductsData } = useProducts();

  const handleFilter = (type) => {
    setCategoryFilter((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const filterData = () => {
    if (
      !categoryFilter.fragrances &&
      !categoryFilter['home-decoration'] &&
      !categoryFilter.laptops &&
      !categoryFilter.skincare &&
      !categoryFilter.smartphones &&
      !categoryFilter.groceries
    ) {
      return setFilteRedData(products);
    }

    const newFilteredData = products.filter(
      (item) => categoryFilter[item.category]
    );

    setFilteRedData(newFilteredData);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);
  useEffect(() => {
    products && filterData();
  }, [categoryFilter, products]);

  return (
    <div>
      <div className="w-[100%] flex justify-center items-center gap-2  overflow-x-scroll  md:text-xl text-[10px]">
        {categorys.map((btn) => (
          <button
            style={{ backgroundColor: categoryFilter[btn] === true && 'black' }}
            key={btn}
            onClick={() => handleFilter(btn)}
            className="button  truncate mt-2"
          >
            {btn}
          </button>
        ))}
      </div>
      <Product products={filteredData} />
    </div>
  );
};

export default Filters;
