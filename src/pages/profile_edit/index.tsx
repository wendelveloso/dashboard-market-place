import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { noPrivatePass, privatePass } from "../../components/Icons/icons";
import { makeRequest } from "../../utils/makeRequest";
import { IEditProfile } from "../../interfaces/editProfile.interface";
import LoadingModal from "../../utils/LoadingModal";
import styles from "./PerfilForm.module.css";

export function EditProfile(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [nomeLoja, setNomeLoja] = useState<string | null>(null);
  const { register, handleSubmit, setValue } = useForm<IEditProfile>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);

      setValue("nome", parsedUser.nome);
      setValue("email", parsedUser.email);
      setValue("nome_loja", parsedUser.nome_loja);
      setNomeLoja(parsedUser.nome_loja);
    }
  }, [navigate, setValue]);

  const onSubmit = async (data: IEditProfile) => {
    try {
      setLoading(true);
      await makeRequest("/perfil", "PUT", {
        nome: data.nome,
        nome_loja: data.nome_loja,
        email: data.email,
        senha: data.senha,
        confirmarSenha: data.senha,
      });
      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);

        parsedUser.nome = data.nome;
        parsedUser.nome_loja = data.nome_loja;
        parsedUser.email = data.email;

        localStorage.setItem("user", JSON.stringify(parsedUser));
      }

      localStorage.setItem("productToast", "Perfil atualizado com sucesso!");
      navigate("/perfil");
    } catch (error: any) {
      toast(error.response.data, { type: "error", position: "bottom-center" });
    }
  };
  return (
    <main className={styles.main__container}>
      {loading && <LoadingModal />}
      <section className={styles.products}>
        <h1>{nomeLoja}</h1>
        <h2 className={styles.products__title}>Editar Perfil</h2>
        <form className={styles.perfilForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.grupoNome}>
            <label htmlFor="nome">Seu nome</label>
            <input {...register("nome")} type="text" placeholder="" />
          </div>
          <div className={styles.grupoNomeLoja}>
            <label htmlFor="nome_loja">Nome da Loja</label>
            <input {...register("nome_loja")} type="text" placeholder="" />
          </div>

          <div className={styles.grupoEmail}>
            <label htmlFor="descricao">E-mail</label>
            <input {...register("email")} type="text" placeholder="" />
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
          <span className={styles.products__line}></span>
          <div className={styles.grupoBtn}>
            <a href="/perfil">CANCELAR</a>
            <button type="submit" className={styles.btn}>
              editar perfil
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
}
