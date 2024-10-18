import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeRequest } from "../../utils/makeRequest";
import { useState } from "react";
import { INewProduct } from "../../interfaces/newProduct.interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth_NameStore from "../../utils/auth_NameStore";
import LoadingModal from "../../utils/LoadingModal";
import styles from "./NewProducstForm.module.css";

export function NewProducts(): JSX.Element {
  const navigate = useNavigate();
  const { nomeLoja } = auth_NameStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<INewProduct>();

  const onSubmit = async (data: INewProduct) => {
    try {
      setLoading(true);
      await makeRequest("/produtos", "POST", {
        nome: data.nome,
        estoque: Number(data.estoque),
        preco: Number(data.preco),
        descricao: data.descricao,
        imagem: data.imagem,
      });

      localStorage.setItem("productToast", "Produto adicionado com sucesso!");
      navigate("/produtos");
    } catch (error: any) {
      toast(error.response?.data?.message || "Erro ao adicionar produto", {
        type: "error",
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateURL = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      toast("Insira uma URL válida!", {
        type: "error",
        position: "bottom-center",
      });
      return false;
    }
  };

  return (
    <main className={styles.main__container}>
      {loading && <LoadingModal />}
      <section className={styles.products}>
        <h1>{nomeLoja}</h1>
        <h2 className={styles.products__title}>Adicionar produto</h2>
        <form
          className={styles.newProductsForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.grupoNome}>
            <label htmlFor="nome">Nome do produto</label>
            <input
              {...register("nome", { required: true })}
              type="text"
              placeholder=""
            />
          </div>

          <div className={styles.sameLine}>
            <div className={styles.grupoPreco}>
              <label htmlFor="preco">Preço</label>
              <input
                {...register("preco", {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) =>
                    Number.isInteger(value) ||
                    "O preço deve ser um número inteiro.",
                })}
                type="number"
                placeholder="R$"
                step="1"
                min="0"
              />
            </div>

            <div className={styles.grupoEstoque}>
              <label htmlFor="estoque">Estoque</label>
              <input
                {...register("estoque", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Un"
              />
            </div>
          </div>

          <div className={styles.grupoDescricao}>
            <label htmlFor="descricao">Descrição do produto</label>
            <input
              {...register("descricao", { required: true })}
              type="text"
              placeholder=""
            />
          </div>

          <div className={styles.grupoImagem}>
            <label htmlFor="imagem">Imagem</label>
            <input
              {...register("imagem", { required: true, validate: validateURL })}
              type="text"
              placeholder=""
            />
          </div>

          <span className={styles.products__line}></span>

          <div className={styles.grupoBtn}>
            <a href="/produtos">CANCELAR</a>
            <button type="submit" className={styles.btn}>
              adicionar produto
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
}
