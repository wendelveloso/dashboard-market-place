import { noPrivatePass, privatePass } from "../../components/Icons/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../../interfaces/register.interface";
import { makeRequest } from "../../utils/makeRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "../../utils/LoadingModal";
import styles from "./RegisterForm.module.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/produtos");
    }
  });

  const { register, handleSubmit } = useForm<IRegister>();

  const onSubmit = async (data: IRegister) => {
    setLoading(true);
    try {
      await makeRequest("/usuarios", "POST", {
        nome: data.nome,
        nome_loja: data.nome_loja,
        email: data.email,
        senha: data.senha,
        confirmarSenha: data.confirmarSenha,
      });
      return navigate("/");
    } catch (error: any) {
      toast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <LoadingModal />}
      <div className={styles.registerBox}>
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
          <h2>Criar uma conta</h2>
          <div className={styles.grupoNome}>
            <label htmlFor="nome">Seu nome</label>
            <input {...register("nome")} type="text" placeholder="" />
          </div>

          <div className={styles.grupoNomeLoja}>
            <label htmlFor="nome_loja">Nome da loja</label>
            <input {...register("nome_loja")} type="text" placeholder="" />
          </div>

          <div className={styles.grupoEmail}>
            <label htmlFor="email">E-mail</label>
            <input {...register("email")} type="email" placeholder="" />
          </div>

          <div className={styles.grupoSenha}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.passwordContainer}>
              <input
                {...register("senha")}
                type={showPassword ? "text" : "password"}
                placeholder=""
                className={styles.passwordInput}
              />
              <span
                className={styles.esconderSenha}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? noPrivatePass : privatePass}
                  alt="Botão para visibilidade da senha"
                />
              </span>
            </div>
          </div>

          <div className={styles.grupoConfirmarSenha}>
            <label htmlFor="confirmarSenha">Repita a senha</label>
            <div className={styles.passwordContainer}>
              <input
                {...register("confirmarSenha")}
                type={showPassword ? "text" : "password"}
                placeholder=""
              />
              <span
                className={styles.esconderSenha}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? noPrivatePass : privatePass}
                  alt="Botão para visibilidade da senha"
                />
              </span>
            </div>
          </div>

          <button type="submit" className={styles.btn}>
            Criar conta
          </button>
          <p>
            Já possui uma conta? <a href="/">ACESSE</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
