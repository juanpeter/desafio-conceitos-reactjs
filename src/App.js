import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response  = await api.post('repositories', {
      "url": "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      "title": `Repositório ${repositories.length}`,
      "techs": [
        "NodeJs, Yarn"
      ]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    setRepositories([...repositories.filter(repository => repository.id !== id)]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
          <h2>{repository.title}</h2>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
