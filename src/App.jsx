import { useReducer } from 'react';
import { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import './App.css';
import Header from './components/header/Header';
import MealSummary from './components/meal-summary/MealSummary';
import Meals from './components/meals/Meals';
import Modal from './components/modal/Modal';
import { store } from './components/store';
const stateReducer = (state, action) => {
  if (action.type === 'OPEN_CLOSE') {
    return {
      ...state,
      openModalState: !state.openModalState,
    };
  }
};
function App() {
  const [state, dispatchState] = useReducer(stateReducer, {
    openModalState: false,
  });
  function toggleModalHandler() {
    dispatchState({ type: 'OPEN_CLOSE' });
  }

  return (
    <div className="App">
      <Provider store={store}>
        <Header onClick={toggleModalHandler} />
        <MealSummary></MealSummary>
        <Meals></Meals>
        {state.openModalState &&
          createPortal(
            <Modal onClick={toggleModalHandler} />,
            document.getElementById('modal')
          )}
      </Provider>
    </div>
  );
}

export default App;
