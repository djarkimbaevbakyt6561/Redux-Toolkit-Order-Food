import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getBasket } from '../store/basket';
import OrderBasket from './OrderBasket';
const Header = ({ onClick }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBasket());
  }, []);
  return (
    <header style={{ width: '100%' }}>
      <Container>
        <ReactMeals>ReactMeals</ReactMeals>
        <OrderBasket onClick={onClick}>Your Cart</OrderBasket>
      </Container>
    </header>
  );
};
export default Header;
const Container = styled.div`
  height: 101px;
  background: #8a2b06;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 120px;
  font-family: 'Poppins';
`;
const ReactMeals = styled.h1`
  color: #ffffff;
  font-style: normal;
  font-weight: 600;
  line-height: 57px;
  margin: 0;
`;
