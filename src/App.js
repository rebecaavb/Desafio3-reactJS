import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

var counter = 0;
function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  function handleAddRepository() {
    api.post('repositories', {
      title: `Novo repositório ${counter++}`,
      url: 'http//teste.com.br',
      techs: ['Java', 'ReactJS', 'React Native', 'Flutter', 'Dart']
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id);
    setRepositories([...repositories.filter(repository => repository.id != id)]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
