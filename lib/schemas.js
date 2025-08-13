import z from "zod";

const dataValida = (day, month, year) => {
  const data = new Date(year, month - 1, day);
  return (
    data.getFullYear() === year &&
    data.getMonth() === month - 1 &&
    data.getDate() === day
  );
};

export const cadastroSchema = z
  .object({
    nomeCompleto: z
      .string()
      .min(5, "O nome deve ter, no mínimo, 5 caracteres."),
    email: z.string().email("Por favor, insira um endereço de e-mail válido."),
    dataDeNascimento: z
      .string()
      .min(10, "Data de nascimento é obrigatória.")
      .regex(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "Por favor, insira uma data válida no formato dd/mm/aaaa."
      )
      .refine((val) => {
        const [day, month, year] = val.split("/").map(Number);
        return dataValida(day, month, year);
      }, "Data de nascimento inválida.")
      .refine((val) => {
        const [day, month, year] = val.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        return inputDate < today;
      }, "A data de nascimento não pode ser no futuro."),
    senha: z.string().min(6, "A senha deve ter, no mínimo, 6 caracteres."),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"],
  });

export const loginSchema = z.object({
  email: z.string().email("Por favor, insira um endereço de e-mail válido."),
  senha: z.string().min(6, "A senha deve ter, no mínimo, 6 caracteres"),
});
