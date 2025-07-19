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

  constructor() {
    makeAutoObservable(this);
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

  reset() {
    this.nome = "";
    this.idade = "";
    this.interesses = [];
    this.orcamento = "";
    this.roteiro = "";
    this.sugestoesDestino = [];
    this.destinoEscolhido = "";
    this.paisDestinoEscolhido = "";
  }
}

const perfilStore = new PerfilStore();

export default perfilStore;
