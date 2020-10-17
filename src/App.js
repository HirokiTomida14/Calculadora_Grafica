import React from 'react';
import './App.css';

const Input = props => <div className= "Input">{props.input}</div>;
const BotaoAC = props => (<div className="botao_AC" onClick={props.handleClear} >{props.children}</div>);
const BotaoDiv = props => <div className= "botao_div" onClick={() => props.handleClick(props.children)}>{props.children}</div>
const BotaoIgual = props => <div className= "botao_igual" onClick={() => props.handleClick(props.children)}>{props.children}</div>
const BotaoMemoria = props => <div className= "botao_memoria" onClick={() => props.handleClick(props.children)}>{props.children}</div>
const BotaoMemoria2 = props => (<div className="botao_memoria2" onClick={props.handleSet} >{props.children}</div>);

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      previousOperand: '',
      operation: '',
      decimal: false,
      resultado: false,
      };

    this.registro = {
      memoria:[]
      }
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

      else if (this.state.previousOperand === '' && !isNaN(parseFloat(this.state.input))){
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

    else if (val !== '=' && this.state.resultado === false && val !== 'MC' && val !== 'MR' && val !== 'M+' && val !== 'MS'){
      this.setState(state => ({
        input: this.state.input + val}));
    }
  }

  add_memory = val => {
    if (val === 'MC') {
      this.registro.memoria = []
      this.forceUpdate();
    }

    else if (val === 'MR') {
      if(!isNaN(this.registro.memoria[0])){
        this.setState({
          input: parseFloat(this.registro.memoria[0])
        })
      }
    }

    else if (!isNaN(parseFloat(this.state.input)) && isFinite(parseFloat(this.state.input))){

      if (val === 'M+') {
        if (isNaN(parseFloat(this.registro.memoria[0]))){
          this.setState({
            registro: this.registro.memoria.unshift(parseFloat(this.state.input))})
        }
        else{
        this.setState({
          registro: this.registro.memoria.splice(0,1,(parseFloat(this.state.input) + (parseFloat(this.registro.memoria[0])) ))})
        }
      }

      else if (val === 'MS') {
        this.setState({
          registro: this.registro.memoria.unshift(parseFloat(this.state.input))})
      }
   }
  }
  
  render() {
    return (
      <div className="App">
        <span className="calculadora">
          <div className="display">
            <Input input={this.state.previousOperand + this.state.operation }></Input>
            <Input input={this.state.input}></Input>
          </div>
          <div className='linha_memoria'>
                <BotaoMemoria handleClick={this.add_memory}>MC</BotaoMemoria>
                <BotaoMemoria handleClick={this.add_memory}>MR</BotaoMemoria>
                <BotaoMemoria handleClick={this.add_memory}>M+</BotaoMemoria>
                <BotaoMemoria handleClick={this.add_memory}>MS</BotaoMemoria>
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
                <BotaoAC handleClear={() => this.setState({ input: "", decimal: false, resultado: false})}>AC</BotaoAC>
              </div>
            </span>

            <span className='box_inputs2'>
              <BotaoDiv handleClick={this.add_input}>÷</BotaoDiv>
              <BotaoIgual handleClick={this.add_input}>=</BotaoIgual>
            </span>
          </div>
        </span>
          
        <span className='box_memoria'>
          <h1 id = 'titulo_memoria'>Memória</h1>
          <table className='table'>
            {this.registro.memoria.map((numero,idbotao) => {
              let table = []
              let children = []
              children.push(<td><BotaoMemoria2 id={idbotao} handleSet={() => this.setState({input: parseFloat(this.registro.memoria[idbotao])})}>MC</BotaoMemoria2></td>)
              children.push(<td><BotaoMemoria2 id={idbotao} handleSet={() => this.setState({registro: this.registro.memoria.splice(idbotao,1)})}>MR</BotaoMemoria2></td>)
              children.push(<td>{numero}</td>) 
              table.push(<tr>{children}</tr>)
              return table
            })}
          </table>
        </span>
      </div>
    );
  }
}
export default App;