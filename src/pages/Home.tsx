import React from "react";


import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice";

import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isSearch = React.useRef(false);
  // const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, [dispatch]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = React.useCallback(async () => {
    const sortBy = sort?.sortProperty?.replace("-", "") || "rating";
    const order = sort?.sortProperty?.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage, dispatch]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  
  //     const sortOption = sortList.find(
  //       (obj) => obj.sortProperty === params.sortProperty
  //     );
  
  //     // Convertim valorile din params în tipurile corecte
  //     const categoryId = typeof params.categoryId === "string" ? Number(params.categoryId) : 0;
  //     const searchValue = typeof params.search === "string" ? params.search : "";
  //     const currentPage = typeof params.currentPage === "string" ? Number(params.currentPage) : 1;
  
  //     dispatch(
  //       setFilters({
  //         categoryId, 
  //         searchValue, 
  //         currentPage, 
  //         sort: sortOption || sortList[0],  // Setează la prima opțiune de sortare dacă nu este prezentă
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, [dispatch]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage, getPizzas]);

  // React.useEffect(() => {
  //   if (isMounted.current && categoryId !== 0) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage, navigate]);

  const pizzas = items
    .filter((obj: any) => {
      if (
        typeof searchValue === "string" &&
        obj.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((obj: any) => (
      
        <PizzaBlock key={obj.id} {...obj} />
     
    ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>An error has occurred. 😕</h2>
          <p>
            Unfortunately, the pizzas could not be retrieved. Please try making
            the request again later.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
