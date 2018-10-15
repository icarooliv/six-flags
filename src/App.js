import React, { Component } from "react";
import "./App.css";

class Brinquedo {
  constructor(nome, duracao, pontuacao) {
    this.nome = nome;
    this.duracao = duracao;
    this.pontuacao = pontuacao;
  }
  get div() {
    return this.calculaDiv();
  }
  /*
  o div representa o brinquedo com maior "importancia": 
  quanto maior a pontuaçao e menor a duracao, melhor
  */
  calculaDiv() {
    return parseFloat(this.pontuacao / this.duracao);
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brinquedosEscolhidos: [],
      quantidade: "",
      tempo: "",
      showComponent: false,
      pontuacaoMaxima: "",
      showResult: false
    };

    this.showValue = this.showValue.bind(this);
    this.showComponentOnClick = this.showComponentOnClick.bind(this);
    this.algorithm = this.algorithm.bind(this);
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

  showResultOnClick() {
    this.setState({
      showResult: true
    });
  }

  renderForm(quantidade) {
    const times = quantidade;
    const inputs = [];

    for (var i = 0; i < times; i++) {
      inputs.push(
        <div id={`brinquedo${i}`} key={i}>
          <h2> Brinquedo {i + 1}</h2>
          <input id={`nomeBrinquedo${i}`} placeholder="Nome do Brinquedo" />
          <p />
          <input
            id={`duracaoBrinquedo${i}`}
            placeholder="Duração do Brinquedo"
          />
          <p />
          <input
            id={`pontuacaoBrinquedo${i}`}
            placeholder="Pontuação do Brinquedo"
          />
        </div>
      );
    }
    return inputs;
  }

  algorithm() {
    var numeroTotalBrinquedos = 0,
      tempoTotalEquipe = 1,
      instancias = 1;
    var brinquedos = new Array();

    numeroTotalBrinquedos = this.state.quantidade;
    tempoTotalEquipe = this.state.tempo;

    if (numeroTotalBrinquedos == 0) {
      alert("Numero de brinquedos NÃO pode ser 0!");
      return;
    }

    console.log(numeroTotalBrinquedos);
    for (var i = 0; i < numeroTotalBrinquedos; i++) {
      var b = new Brinquedo();
      b.nome = document.getElementById(`nomeBrinquedo${i}`).value;
      b.duracao = parseInt(
        document.getElementById(`duracaoBrinquedo${i}`).value
      );
      b.pontuacao = parseInt(
        document.getElementById(`pontuacaoBrinquedo${i}`).value
      );
      brinquedos.push(b);
    }

    brinquedos.sort((a, b) => b.div > a.div);

    var pontuacaoTotal = 0;
    var tempoTotal = 0;
    var k = 0;

    var escolhidos = new Array();

    while (k < numeroTotalBrinquedos) {
      var auxTempoTotal = tempoTotal + brinquedos[k].duracao;
      console.log("auxtempo", auxTempoTotal);
      console.log("tempototal", tempoTotal);
      if (auxTempoTotal <= tempoTotalEquipe) {
        pontuacaoTotal += brinquedos[k].pontuacao;
        tempoTotal = auxTempoTotal;
        escolhidos.push(brinquedos[k]);
      } else {
        k++;
      }
    }

    console.log("Brinquedos escolhidos: \n", escolhidos);
    console.log("Pontuacao total", pontuacaoTotal);

    this.state.brinquedosEscolhidos = escolhidos;
    console.log("brinkedo", this.state.brinquedosEscolhidos);
  }

  renderResult(escolhidos) {
    console.log("escolhidos", escolhidos);
    const inputs = [];
    console.log(escolhidos.length);
    console.log(escolhidos[0].nome);
    var listaBrinquedos = [];
    for (var j = 0; j < escolhidos.length; j++) {
      inputs.push(
        <div key={j}>
          <span> {escolhidos[j].nome}</span>
        </div>
      );
    }
    console.log(listaBrinquedos);
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
            this.renderForm();
            this.showComponentOnClick();
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
          <button
            onClick={() => {
              this.algorithm();
              this.showResultOnClick();
            }}
          >
            Confirmar
          </button>
        </div>
        <div>
          {this.state.showResult ? (
            <div>
              <span>Você deverá escolher os seguintes brinquedos:</span>
              <span>{this.renderResult(this.state.brinquedosEscolhidos)}</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
