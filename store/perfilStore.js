import { makeAutoObservable } from "mobx";

class PerfilStore {
  nome = "";
  idade = "";
  interesses = [];
  orcamento = "";
  roteiro = "";

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

  reset() {
    this.nome = "";
    this.idade = "";
    this.interesses = [];
    this.orcamento = "";
    this.roteiro = "";
  }
}

const perfilStore = new PerfilStore();

export default perfilStore;
