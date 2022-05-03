import logo from './logo.svg';
import React from "react";
import './App.css';
import web3 from './web3';
import donate from './donate';
import background from "./wswp.webp";

class App extends React.Component {
  state = {
    manager: '',
    balance: '',
    value: '',
    message: ''
  };
  
  /* constructor(props) {
    super(props);
    this.state = { organization: "" };
  } */
async componentDidMount() {
  const organization = await donate.methods.organization().call();
  const getBalance = await donate.methods.balance().call();

  this.setState({ organization, getBalance });

  fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(res => res.json())
  .then(
    (result) => {
      this.setState({
        isLoaded: true,
        items: result.items
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  )

  
}

onSubmit = async (event) => {
  event.preventDefault();

  const accounts = await web3.eth.getAccounts();

  this.setState({message: 'Waiting to transaction success...'});

  await donate.methods.donateEther().send({ 
    value: web3.utils.toWei(this.state.value, 'ether'), 
    from: accounts[0] 
  });

  this.setState({message: 'Transaction send!'});


}

withdraw = async (event) => {
  event.preventDefault();

  const adr = await donate.methods.getAdr();

  this.setState({message: 'Waiting to transaction success...'});

  await donate.methods.donateEther().send({ 
    value: web3.utils.toWei(this.state.value, 'ether'), 
    from: adr 
  });

  this.setState({message: 'Transaction send!'});


}

render() {
  
  return (  
    <div class="center" >
      <h2 >Donate Contract</h2>
      <p>This contract is deployed by {this.state.organization}</p>
      <p>Balance is = {this.state.getBalance} ethereum.</p>


      <form onSubmit={this.onSubmit}>
        <h3>Donate here</h3>
        <div>
          <label>Amount of ether to donate </label>
          <input 
          value={this.state.value} onChange={event => this.setState({ value: event.target.value })} /> 
          <label> Ex) .001 </label>
        </div>
        <button class="donate-button">Donate</button>
      </form>

      <h1>
        {this.state.message}
      </h1>

    </div>
  );
  
}
  
}

export default App;
