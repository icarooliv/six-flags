import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantidade: "",
      tempo: "",
      showComponent: false
    };
    this.showValue = this.showValue.bind(this);
    this.showComponentOnClick = this.showComponentOnClick.bind(this);
  }

  showValue = e => {
    console.log(this.state.quantidade);
    this.setState({ selection: e.target.value });
  };

  showComponentOnClick() {
    this.setState({
      showComponent: true
    });
  }

  renderForm(quantidade) {
    const times = quantidade;
    const inputs = [];

    for (var i = 0; i < times; i++) {
      inputs.push(
        <div key={i}>
          <h2> Brinquedo {i + 1}</h2>
          <input placeholder="Nome do Brinquedo" />
          <p />
          <input placeholder="Duração do Brinquedo" />
          <p />
          <input placeholder="Pontuação do Brinquedo" />
        </div>
      );
    }
    return inputs;
  }

  render() {
    return (
      <div className="App">
        <h1 className="string">Quantos brinquedos você planeja brincar?</h1>
        <input
          value={this.state.quantidade}
          type="text"
          id="name"
          onChange={e => {
            this.setState({ quantidade: e.target.value });
            this.showComponentOnClick();
            this.renderForm();
          }}
        />
        <p />
        <h1 className="string">Quanto tempo você possui?</h1>
        <input
          value={this.state.tempo}
          type="text"
          id="name"
          onChange={e => {
            this.setState({ tempo: e.target.value });
          }}
        />
        <p />
        <div>
          {this.state.showComponent
            ? this.renderForm(this.state.quantidade)
            : null}
        </div>
        <p />
        <div>
          <button>Confirmar</button>
        </div>
      </div>
    );
  }
}

export default App;
