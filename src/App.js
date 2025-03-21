import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // Importando o Timestamp para referência

function App() {
  const [financas, setFinancas] = useState([]);
  const [metas, setMetas] = useState([]);
  const [filmesSeries, setFilmesSeries] = useState([]);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    // Função para formatar o Timestamp
    const formatDate = (timestamp) => {
      if (timestamp instanceof Timestamp) {
        return timestamp.toDate().toLocaleDateString();
      }
      return timestamp; // Caso não seja um Timestamp, retornamos o valor original
    };

    const fetchData = async () => {
      try {
        const financasSnapshot = await getDocs(collection(db, "financas"));
        const metasSnapshot = await getDocs(collection(db, "metas"));
        const filmesSeriesSnapshot = await getDocs(collection(db, "filmes_series"));
        const receitasSnapshot = await getDocs(collection(db, "receitas"));

        // Mapear e salvar os dados nas variáveis de estado
        setFinancas(financasSnapshot.docs.map(doc => ({
          ...doc.data(),
          data: formatDate(doc.data().data) // Converte a data
        })));
        setMetas(metasSnapshot.docs.map(doc => doc.data()));
        setFilmesSeries(filmesSeriesSnapshot.docs.map(doc => doc.data()));
        setReceitas(receitasSnapshot.docs.map(doc => ({
          ...doc.data(),
          data: formatDate(doc.data().data) // Converte a data
        })));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Nosso Cantinho</h1>

      <h2>Finanças</h2>
      {financas.length > 0 ? (
        <ul>
          {financas.map((item, index) => (
            <li key={index}>
              {item.categoria} - R${item.valor} - {item.data} - {item.descricao}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}

      <h2>Metas</h2>
      {metas.length > 0 ? (
        <ul>
          {metas.map((item, index) => (
            <li key={index}>
              {item.meta} - R${item.valor} - Status: {item.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma meta encontrada.</p>
      )}

      <h2>Filmes/Séries</h2>
      {filmesSeries.length > 0 ? (
        <ul>
          {filmesSeries.map((item, index) => (
            <li key={index}>
              {item.nome} ({item.tipo}) - Temporada {item.temporada}, Episódio {item.episodio}
              <br />
              <a href={item.link} target="_blank" rel="noopener noreferrer">Assistir</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum filme/série encontrado.</p>
      )}

      <h2>Receitas</h2>
      {receitas.length > 0 ? (
        <ul>
          {receitas.map((item, index) => (
            <li key={index}>
              R${item.valor} - {item.data} - {item.descricao}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma receita encontrada.</p>
      )}
    </div>
  );
}

export default App;
