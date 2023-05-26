import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as BasketIcon } from '../../assets/icons/Group.svg';
import { basketActions, basketActionTypes } from '../store/basket';
import classes from './OrderBasket.module.css';
const buttonStateReducer = (state, action) => {
  if (action.type === BUTTON_STATE_TRUE) {
    return {
      ...state,
      btnIsHighlighted: true,
    };
  }
  if (action.type === BUTTON_STATE_FALSE) {
    return {
      ...state,
      btnIsHighlighted: false,
    };
  }
};
const BUTTON_STATE_TRUE = 'BUTTON_STATE_TRUE';
const BUTTON_STATE_FALSE = 'BUTTON_STATE_FALSE';

const OrderBasket = ({ children, onClick }) => {
  const dispatch = useDispatch();
  const [buttonState, dispatchButtonState] = useReducer(buttonStateReducer, {
    btnIsHighlighted: false,
  });
  const { items, totalAmount } = useSelector((state) => state.basket);
  const btnClasses = `${
    buttonState.btnIsHighlighted ? classes.bump : undefined
  }`;
  useEffect(() => {
    dispatch(basketActions.getTotalAmount());
    dispatchButtonState({ type: BUTTON_STATE_TRUE });
    const timer = setTimeout(() => {
      dispatchButtonState({ type: BUTTON_STATE_FALSE });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <Button className={btnClasses} onClick={onClick}>
      <BasketIcon />
      <OrderBasketTitle>{children}</OrderBasketTitle>
      <OrderBasketCount>{totalAmount}</OrderBasketCount>
    </Button>
  );
};
export default OrderBasket;
const Button = styled.button`
  width: 249px;
  height: 59px;
  background: #5a1f08;
  border-radius: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #4d1601;
  }
`;
const OrderBasketTitle = styled.span`
  color: white;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-left: 13px;
`;
const OrderBasketCount = styled.span`
  width: 51px;
  height: 35px;
  background: #8a2b06;
  border-radius: 30px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #ffffff;
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
