import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue, setCurrentPage } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const updateSearchValue = React.useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setSearchValue(str));
      }, 150),
    [dispatch],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
    dispatch(setCurrentPage(1));
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"/></svg>
      <input 
        id='muster'
        ref={inputRef} 
        value={value} 
        onChange={onChangeInput} 
        placeholder="pizza find..." 
        className={styles.input}
      />
      {value && (
        <svg onClick={onClickClear} className={styles.clearIcon} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
          <path d="M0 0h48v48h-48z" fill="none"/>
        </svg>
      )}
    </div>
  )
}

export default Search;
