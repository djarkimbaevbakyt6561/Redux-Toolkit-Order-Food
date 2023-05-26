import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { mealsActions } from '../store/meals';

const ErrorComponent = ({ children, onClick }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Container>
        <Close
          onClick={onClick}
        >
          X
        </Close>
        <Text>{children}</Text>
      </Container>
    </Wrapper>
  );
};
export default ErrorComponent;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 36px;
  color: #ff0000;
`;
const Close = styled.p`
  color: red;
  border: none;
  margin: 0;
  margin-right: 20px;
  margin-top: 10px;
  cursor: pointer;
  width: 99%;
  text-align: right;
`;
const Text = styled.p`
    position: relative;
    top: 250px;
`