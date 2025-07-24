import { makeAutoObservable } from "mobx";

class PerfilStore {
  nome = "";
  idade = "";
  interesses = [];
  orcamento = "";
  roteiro = "";
  sugestoesDestino = [];
  destinoEscolhido = "";
  paisDestinoEscolhido = "";
  roteirosSalvos = [];

  constructor() {
    makeAutoObservable(this);
    this.addSalvarRoteiro = this.addSalvarRoteiro.bind(this);
  }

  setPerfil({ nome, idade, interesses, orcamento }) {
    this.nome = nome;
    this.idade = idade;
    this.interesses = interesses;
    this.orcamento = orcamento;
  }

  setRoteiro(roteiro) {
    this.roteiro = roteiro;
  }

  setSugestoesDestino(destinos) {
    this.sugestoesDestino = destinos;
  }

  setDestinoEscolhido(destino) {
    this.destinoEscolhido = destino.nomeCidade;
    this.paisDestinoEscolhido = destino.nomePais;
  }

  addSalvarRoteiro = (roteiro) => {
    const now = new Date();
    const idRoteiro = `${roteiro.destino.nomeCidade}-${now.getTime()}`;

    const roteiroJaSalvo = this.roteirosSalvos.some(
      (r) => r.roteiroText === roteiro.roteiroText
    );

    if (!roteiroJaSalvo) {
      this.roteirosSalvos.push({
        id: idRoteiro,
        salvoEm: now.toLocaleString(),
        ...roteiro,
      });
      return true;
    }

    console.log("Esse roteiro já foi salvo.");
    return false;
  };

  removerRoteiroSalvo = (id) => {
    this.roteirosSalvos = this.roteirosSalvos.filter(
      (roteiro) => roteiro.id !== id
    );
    console.log(`Roteiro com id ${id} removido.`);
  };

  reset() {
    this.nome = "";
    this.idade = "";
    this.interesses = [];
    this.orcamento = "";
    this.roteiro = "";
    this.sugestoesDestino = [];
    this.destinoEscolhido = "";
    this.paisDestinoEscolhido = "";
    this.roteirosSalvos = [];
  }
}

const perfilStore = new PerfilStore();

export default perfilStore;
