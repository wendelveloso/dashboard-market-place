import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IProfile } from "../../interfaces/profile.interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth_NameStore from "../../utils/auth_NameStore";
import styles from "./ProfileForm.module.css";

export function Profile(): JSX.Element {
  const { register, setValue } = useForm<IProfile>();
  const { nomeLoja } = auth_NameStore();

  useEffect(() => {
    const productToast = localStorage.getItem("productToast");
    if (productToast) {
      toast(productToast, {
        type: "success",
        autoClose: 1500,
        position: "bottom-center",
      });
      setTimeout(() => {
        localStorage.removeItem("productToast");
      }, 3000);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);

      setValue("nome", parsedUser.nome);
      setValue("email", parsedUser.email);
      setValue("nome_loja", parsedUser.nome_loja);
    }
  }, [setValue]);

  return (
    <main className={styles.main__container}>
      <section className={styles.products}>
        <h1>{nomeLoja}</h1>
        <h2 className={styles.products__title}>Perfil</h2>
        <form className={styles.perfilForm}>
          <div className={styles.grupoNome}>
            <label htmlFor="nome">Seu nome</label>
            <input {...register("nome")} type="text" placeholder="" readOnly />
          </div>
          <div className={styles.grupoNomeLoja}>
            <label htmlFor="nome_loja">Nome da Loja</label>
            <input
              {...register("nome_loja")}
              type="text"
              placeholder=""
              readOnly
            />
          </div>

          <div className={styles.grupoEmail}>
            <label htmlFor="descricao">E-mail</label>
            <input {...register("email")} type="text" placeholder="" readOnly />
          </div>
          <span className={styles.products__line}></span>
          <div className={styles.grupoBtn}>
            <NavLink to="/perfil/editar">
              <button type="button" className={styles.btn}>
                editar perfil
              </button>
            </NavLink>
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
}
