import React from 'react';
import styled from 'styled-components';

const MealSummaryCard = React.memo(() => {
  return (
    <Container>
      <h1>Delicious Food, Delivered To You</h1>
      <ParagraphOne>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </ParagraphOne>
      <ParagraphTwo>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </ParagraphTwo>
    </Container>
  );
});
export default MealSummaryCard;
const Container = styled.div`
  width: 854px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 270px;
  background: #383838;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  position: relative;
  bottom: 175px;
  h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    line-height: 54px;
    color: #ffffff;
    font-size: 36px;
    padding-top: 36px;
    margin: 0;
  }
`;
const ParagraphOne = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-top: 28px;
  color: #ffffff;
  width: 746px;
  height: 48px;
`;
const ParagraphTwo = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-top: 20px;
  color: #ffffff;
  width: 774px;
  height: 48px;
`;
