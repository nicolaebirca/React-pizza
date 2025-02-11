import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from '../App';


const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);



  
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

 
  

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }
  

  React.useEffect(() => {
    setLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `search=${searchValue}` : '';

    axios
    .get(`https://679cf40b87618946e653f32e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    .then((res) => {
      console.log(res);
      setItems(res.data);
      setLoading(false);
    })
    
      window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


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
            <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {loading ? skeletons : pizzas}
          </div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
        
    );
};
export default Home;