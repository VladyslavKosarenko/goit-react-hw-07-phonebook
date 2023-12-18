import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../redux/reducers/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.value);

  const handleChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  return (
    <label>
      Filter contacts:
      <input type="text" value={filter} onChange={handleChange} />
    </label>
  );
};

export default Filter;
