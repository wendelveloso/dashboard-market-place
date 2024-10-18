import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../../utils/makeRequest";
import { IProduct } from "../../interfaces/product.interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ProductsForm.module.css";
import auth_NameStore from "../../utils/auth_NameStore";

export function Products(): JSX.Element {
  const navigate = useNavigate();
  const loaderProducts = useLoaderData() as IProduct[];
  const [products, setProducts] = useState<IProduct[]>(loaderProducts || []);
  const [isVisible, setIsVisible] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState<number | null>(
    null
  );

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

  const showModal = (productId: number) => {
    setProductIdToRemove(productId);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setProductIdToRemove(null);
  };

  const removeProduct = async () => {
    if (productIdToRemove !== null) {
      try {
        await makeRequest(`/produtos/${productIdToRemove}`, "DELETE");
        setProducts(
          products.filter((product) => product.id !== productIdToRemove)
        );
        hideModal();
        toast.success("Produto removido com sucesso!", {
          autoClose: 1500,
          position: "bottom-center",
        });
      } catch (error: any) {
        toast(error.response.data, { type: "error" });
      }
    }
  };

  const handleEditProduct = (productId: number) => {
    navigate(`/produtos/${productId}/editar`);
  };

  return (
    <main className={styles.main__container}>
      {isVisible && (
        <section className={styles.modal}>
          <div className={styles.confirmationBox}>
            <h3>Remover produto do catálogo?</h3>
            <p>Esta ação não poderá ser desfeita.</p>
            <div className={styles.groupBtn}>
              <button className={styles.accept} onClick={hideModal}>
                manter produto
              </button>
              <button className={styles.refuse} onClick={removeProduct}>
                remover
              </button>
            </div>
          </div>
        </section>
      )}
      <section className={styles.products}>
        <h1>{nomeLoja}</h1>
        <h2 className={styles.products__title}>Seus produtos</h2>
        <div className={styles.products__body}>
          {products.map((product) => (
            <div
              className={styles.productItem}
              key={product.id}
              onClick={() => handleEditProduct(product.id)}
            >
              <div
                className={styles.products__exclude}
                onClick={(event) => {
                  event.stopPropagation();
                  showModal(product.id);
                }}
              >
                <img
                  src="../src/assets/exclude.svg"
                  alt="logo excluir produto"
                />
              </div>
              <div className={styles.products__body_img}>
                <img src={product.imagem} alt="img produto" />
              </div>

              <div className={styles.products__body__text}>
                <h3>{product.nome}</h3>
                <p className={styles.products__body__text_description}>
                  {product.descricao}
                </p>
                <div className={styles.products__body__text_value}>
                  <p className={styles.products__body__text_un}>
                    {product.estoque}{" "}
                    {product.estoque === 1 ? "unidade" : "unidades"}
                  </p>
                  <p className={styles.products__body__text_price}>
                    R${" "}
                    {product.preco.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <span className={styles.products__line}></span>
        <NavLink to="/produtos/novo">
          <button type="submit" className={styles.btn}>
            adicionar produto
          </button>
        </NavLink>
      </section>
      <ToastContainer />
    </main>
  );
}
