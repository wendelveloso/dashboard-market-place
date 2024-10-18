import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeRequest } from "../../utils/makeRequest";
import { IEditProduct } from "../../interfaces/editProduct.interface";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./EditProductsForm.module.css";
import auth_NameStore from "../../utils/auth_NameStore";
import LoadingModal from "../../utils/LoadingModal";

export function EditProducts(): JSX.Element {
  const navigate = useNavigate();
  const { nomeLoja } = auth_NameStore();
  const [loading, setLoading] = useState(false);
  const product = useLoaderData() as IEditProduct;

  const { register, handleSubmit } = useForm<IEditProduct>({
    defaultValues: product,
  });

  const onSubmit = async (data: IEditProduct) => {
    try {
      setLoading(true);
      await makeRequest(`/produtos/${product.id}`, "PUT", {
        nome: data.nome,
        estoque: Number(data.estoque),
        preco: Number(data.preco),
        descricao: data.descricao,
        imagem: data.imagem,
      });

      localStorage.setItem("productToast", "Produto atualizado com sucesso!");
      navigate("/produtos");
    } catch (error: any) {
      toast(error.response?.data?.messagem || "Erro ao atualizar produto", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main__container}>
      {loading && <LoadingModal />}
      <div className={styles.productImg}>
        <img
          src={product.imagem || "https://placehold.co/300x400"}
          alt="imagem do produto"
        />
      </div>
      <section className={styles.products}>
        <h1>{nomeLoja}</h1>
        <h2 className={styles.products__title}>Editar produto</h2>
        <form
          className={styles.newProductsForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.grupoNome}>
            <label htmlFor="nome">Nome do produto</label>
            <input {...register("nome")} type="text" placeholder="" />
          </div>

          <div className={styles.sameLine}>
            <div className={styles.grupoPreco}>
              <label htmlFor="preco">Preço</label>
              <input {...register("preco")} type="number" placeholder="R$" />
            </div>

            <div className={styles.grupoEstoque}>
              <label htmlFor="estoque">Estoque</label>
              <input {...register("estoque")} type="number" placeholder="Un" />
            </div>
          </div>

          <div className={styles.grupoDescricao}>
            <label htmlFor="descricao">Descrição do produto</label>
            <input {...register("descricao")} type="text" placeholder="" />
          </div>

          <div className={styles.grupoImagem}>
            <label htmlFor="imagem">Imagem</label>
            <input {...register("imagem")} type="text" placeholder="" />
          </div>
          <span className={styles.products__line}></span>
          <div className={styles.grupoBtn}>
            <a href="/produtos">CANCELAR</a>
            <button type="submit" className={styles.btn}>
              salvar alterações
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
}
