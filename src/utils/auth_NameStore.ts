import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function auth_NameStore() {
  const navigate = useNavigate();
  const [nomeLoja, setNomeLoja] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setNomeLoja(parsedUser.nome_loja);
    }
  }, [navigate]);

  return { nomeLoja };
}

export default auth_NameStore;
