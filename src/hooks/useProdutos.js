import { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService";

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await getAllProducts();
        setProdutos(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  return {
    produtos,
    loading,
    erro,
  };
}