import z from "zod";

export const cadastroSchema = z
  .object({
    nomeCompleto: z
      .string()
      .min(5, "O nome deve ter, no mínimo, 5 caracteres."),
    email: z.string().email("Por favor, insira um endereço de e-mail válido."),
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
