import { useState,useReducer } from 'react'
import DigitButtons from './DigitButtons';
import OperationButtons from './OperationButtons'
import './App.css'
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT :'delete-digit',
  EVALUATE:'evaluate'
}
function reducer(state,{type, payload}) {
  switch(type){
    case ACTIONS.ADD_DIGIT: 
    if(payload.digit === '0' && state.currentOperand === "0") return state
    if(payload.digit === '.' && state.currentOperand.includes(".")) return state
    return {
      ...state, 
      currentOperand: `${state.currentOperand || ""}${payload.digit}`
    }
    case ACTIONS.CHOOSE_OPERATION: 
    if(state.currentOperand == null && state.previouOperand == null){
      return state;
    }
    if(state.previouOperand == null){
       return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand, 
        currentOperand: null
       }
    }
    case ACTIONS.CLEAR:
      return {}
  }
}
function App() {
  const [{currentOperand, previouOperand, operation}, dispatch] = useReducer(reducer, {})
  // dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: 1}})
  return (<>
  <div className="calculator-grid">
    <div className="output">
      <div className="previous-operand">{previouOperand} {operation}</div>
      <div className="current-operand">{currentOperand}</div>
    </div>
    <button className='span-two' onClick={() =>dispatch({type: ACTIONS.CLEAR})}>AC</button>
    <button>DEL</button>
    <OperationButtons operation="÷" dispatch={dispatch} />
    <DigitButtons digit="1" dispatch={dispatch} />
    <DigitButtons digit="2" dispatch={dispatch} />
    <DigitButtons digit="3" dispatch={dispatch} />
    <OperationButtons operation="*" dispatch={dispatch} />
    <DigitButtons digit="4" dispatch={dispatch} />
    <DigitButtons digit="5" dispatch={dispatch} />
    <DigitButtons digit="6" dispatch={dispatch} />
    <OperationButtons operation="+" dispatch={dispatch} />
    <DigitButtons digit="7" dispatch={dispatch} />
    <DigitButtons digit="8" dispatch={dispatch} />
    <DigitButtons digit="9" dispatch={dispatch} />
    <OperationButtons operation="-" dispatch={dispatch} />
    <DigitButtons digit="." dispatch={dispatch} />
    <DigitButtons digit="0" dispatch={dispatch} />
    <button className='span-two'>=</button>
  </div>
    </>
)}

export default App
