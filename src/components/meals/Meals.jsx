import styled from 'styled-components';
import MealsItem from './MealsItem';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeals, mealsActions } from '../store/meals';
import { createPortal } from 'react-dom';
import Button from '../UI/Button';
import ErrorComponent from '../errors/ErrorComponent';
const Meals = React.memo(() => {
  const { meals, isLoading, isError, errorMessage } = useSelector(
    (state) => state.meals
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeals());
  }, []);
  return (
    <MealsList>
      {isLoading ? null : 'Loading...'}
      {isError &&
        createPortal(
          <ErrorComponent
            onClick={() => {
              dispatch(mealsActions.closeError());
            }}
          >
            {errorMessage}{' '}
          </ErrorComponent>,
          document.getElementById('error')
        )}
      {meals?.map((el) => {
        return (
          <MealsItem
            price={el.price}
            title={el.title}
            description={el.description}
            key={el._id}
            id={el._id}
          />
        );
      })}
    </MealsList>
  );
});
export default Meals;
const MealsList = styled.ul`
  width: 50.4%;
  background: #ffffff;
  border-radius: 16px;
  padding-right: 40px;
`;
const Error = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  font-size: 36px;
  color: #ff0000;
`;
