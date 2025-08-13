const { makeAutoObservable } = require("mobx");

const calcularIdadeUsuario = (dataDeNascimento) => {
  if (!dataDeNascimento) {
    return null;
  }

  const dataNascimento = new Date(dataDeNascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  const mesNascimento = dataNascimento.getMonth();
  const diaNascimento = dataNascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade;
};

class UsuarioStore {
  usuario = null;

  constructor() {
    makeAutoObservable(this);
  }

  loginUsuario(dadosUsuario) {
    this.usuario = dadosUsuario;
  }

  logoutUsuario() {
    this.usuario = null;
  }

  get idadeUsuario() {
    return calcularIdadeUsuario(this.usuario?.data_de_nascimento);
  }

  get nomeUsuario() {
    return this.usuario?.nome_completo;
  }

  get emailUsuario() {
    return this.usuario?.email;
  }
}

export const usuarioStore = new UsuarioStore();
