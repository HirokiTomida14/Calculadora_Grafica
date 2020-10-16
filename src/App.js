import React from 'react';
import './App.css';

const Input = props => <div className= "Input">{props.input}</div>;
const BotaoAC = props => (<div className="botao_AC" onClick={props.handleClear} >{props.children}</div>);
const Operador = val => {
  return !isNaN(val) || val === "," || val === "=";
};
const Button = props => (
  <div
    className={`Button ${
      Operador(props.children) ? null : "operator"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);

const BotaoDiv = props => (
  <div
    className={`botao_div ${
      Operador(props.children) ? null : "operator"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);

const BotaoIgual = props => (
  <div
    className={`botao_igual ${
      Operador(props.children) ? null : "operator"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      currentOperand: '',
      previousOperand: '',
      operation: '',
      decimal: false,
      resultado: false,
      };
  }

  add_input = val => {
    if (val === "." && this.state.resultado === false) {
      if (this.state.decimal === true) {}
      else if (this.state.input === '' || this.state.input === '+' || this.state.input === '-'){
        val = "0."
        this.setState(state =>({
          input: this.state.input + val,
          decimal: true}));
      }
      else{
        this.setState(state => ({
          input: this.state.input + val,
          decimal: true}));
      }
    }

    else if (val === "+" || val === "-" || val === "x" || val === "÷"){
      if (this.state.input === '' && (val === "+" || val === "-") ){
        this.setState({input: val});
      }

      else if (this.state.previousOperand === ''){
          this.setState(state => ({
            previousOperand: this.state.input,
            operation: val,
            decimal: false,
            resultado: false,
            input:''}));
      }
    }

    else if (val === '=' && this.state.operation !== '' && this.state.input !== '' && this.state.resultado === false ){

      if (this.state.operation === '+') {
        this.setState({input: parseFloat(this.state.previousOperand) + parseFloat(this.state.input)})
        this.setState({previousOperand: parseFloat(this.state.previousOperand) + parseFloat(this.state.input)})
        }
      else if (this.state.operation === '-') {
        this.setState({input: parseFloat(this.state.previousOperand) - parseFloat(this.state.input)})
        this.setState({previousOperand: parseFloat(this.state.previousOperand) - parseFloat(this.state.input)})
      }
      else if (this.state.operation === 'x') {
        this.setState({input: parseFloat(this.state.previousOperand) * parseFloat(this.state.input)})
        this.setState({previousOperand: parseFloat(this.state.previousOperand) * parseFloat(this.state.input)})
       
      }
      else if (this.state.operation === '÷') {
        this.setState({input: parseFloat(this.state.previousOperand) / parseFloat(this.state.input)})
        this.setState({previousOperand: parseFloat(this.state.previousOperand) / parseFloat(this.state.input)})
      }

      this.setState(state => ({
        resultado: true,
        operation: '',
        decimal: false,
        previousOperand: ''}));
    }

    else if (val !== '=' && this.state.resultado === false){
      this.setState(state => ({
        input: this.state.input + val,
        currentOperand: this.state.input}));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="calculadora">
          <div className="display">
            <Input input={this.state.previousOperand + this.state.operation }></Input>
            <Input input={this.state.input}></Input>
          </div>
          <div className='box_botoes'>
            <span className='box_inputs'>
              <div className='linha'>
                <Button handleClick={this.add_input}>+</Button>
                <Button handleClick={this.add_input}>-</Button>
                <Button handleClick={this.add_input}>x</Button>
              </div>

              <div className='linha'>
                <Button handleClick={this.add_input}>7</Button>
                <Button handleClick={this.add_input}>8</Button>
                <Button handleClick={this.add_input}>9</Button>
              </div>

              <div className='linha'>
                <Button handleClick={this.add_input}>4</Button>
                <Button handleClick={this.add_input}>5</Button>
                <Button handleClick={this.add_input}>6</Button>
              </div>

              <div className='linha'>
                <Button handleClick={this.add_input}>1</Button>
                <Button handleClick={this.add_input}>2</Button>
                <Button handleClick={this.add_input}>3</Button>
              </div>

              <div className='linha'>
                <Button handleClick={this.add_input}>0</Button>
                <Button handleClick={this.add_input}>.</Button>
                <BotaoAC handleClear={() => this.setState({ input: "", currentOperand: "",  decimal: false, resultado: false})}>AC</BotaoAC>
              </div>
            </span>

            <span className='box_inputs2'>
              <BotaoDiv handleClick={this.add_input}>÷</BotaoDiv>
              <BotaoIgual handleClick={this.add_input}>=</BotaoIgual>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default App;