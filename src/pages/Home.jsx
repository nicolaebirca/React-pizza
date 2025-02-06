import React from 'react';


import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from '../App';


const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'popularity',
    sortProperty: 'rating'
  });
  

  React.useEffect(() => {
    setLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-' ? 'asc' : 'desc');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `search=${searchValue}` : '';


    fetch(`https://679cf40b87618946e653f32e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  )
      .then((res) => res.json())
      .then((arr) => {
        setItems(Array.isArray(arr) ? arr : []);
        setLoading(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);


  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }

    return false;
  })
  .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className='container'>
        <div className="content__top">
            <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
            <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {loading ? skeletons : pizzas}
          </div>
          <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
        
    );
};
export default Home;