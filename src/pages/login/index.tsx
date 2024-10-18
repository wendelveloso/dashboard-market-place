import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { noPrivatePass, privatePass } from "../../components/Icons/icons";
import { ILogin } from "../../interfaces/login.interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./LoginForm.module.css";
import LoadingModal from "../../utils/LoadingModal";
import api from "../../services/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<ILogin>();

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/produtos");
    }
  }, [navigate]);

  async function onSubmit(data: ILogin) {
    setLoading(true);
    try {
      const response = await api.post("/login", {
        email: data.email,
        senha: data.senha,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.usuario));
      navigate("/produtos");
    } catch (error: any) {
      toast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {loading && <LoadingModal />}
      <div className={styles.loginBox}>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <div className={styles.grupoEmail}>
            <label htmlFor="email">E-mail</label>
            <input {...register("email")} type="email" />
          </div>
          <div className={styles.grupoSenha}>
            <label htmlFor="senha">Senha</label>
            <span
              className={styles.esconderSenha}
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? noPrivatePass : privatePass}
                alt="Botão para visibilidade da senha"
              />
            </span>
            <input
              {...register("senha")}
              type={showPassword ? "text" : "password"}
            />
          </div>
          <button type="submit" className={styles.btn}>
            Entrar
          </button>
          <p>
            Primeira vez aqui? <a href="/usuarios">CRIE UMA CONTA</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
