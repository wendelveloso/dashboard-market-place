![](https://i.imgur.com/xG74tOh.png)

# Desafio Individual | Front-end - Módulo 8

# Caso tenha problema em abrir o arquivo pelo figma, utilize pelo [penpot](https://design.penpot.app/#/view/82999118-5f89-808f-8004-b4cb07937139?page-id=82999118-5f89-808f-8004-b4cb090179ad&section=inspect&index=0&share-id=ad45735f-43aa-8114-8004-b4d6e7e5d4a8)

A empresa que você está trabalhando recebeu uma demanda de um cliente muito importante, trata-se de um projeto de dashboard para um Market Place, onde o usuário deve se cadastrar e logar na dashboard, após o login ele poderá adicionar, remover, excluir e alterar produtos da sua loja, bem como fazer a edição do seu perfil. Cada usuário irá representar uma loja no Market Place. Lembre-se, esse é um cliente muito importante e você é o responsável por entregar da melhor maneira a solução para o problema dele.

Telas que precisam ser desenvolvidas:

## Áreas não protegidas

### Cadastro de usuário: `/usuarios`

- Funcionalidades obrigatórias:
  - Validar a igualdade das senhas
  - Validar os campos obrigatórios (consultar nos requisitos do back-end)
  - Enviar os dados do formulário para a rota `POST /usuarios`
  - Redirecionar para a rota de login (`/`);
  - Inputs:
    - nome
    - nome_loja
    - email
    - senha
    - senhaConfirmacao
- Funcionalidades extras:
  - Controle de estado de requisições (erro e carregamento)

Exemplo do body a ser enviado:

```
{
    "nome": "Fulano de Tal",
    "email": "fulano@email.com",
    "senha": "teste",
    "nome_loja": "Loja do Fulano"
}
```

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-router-dom</code></li>
    <li><code>axios</code></li>
    </ul>
</details>

### Login: `/`

- Funcionalidades obrigatórias:
  - Validar os campos obrigatórios (consultar nos requisitos do back-end)
  - Enviar os dados do formulário para a rota `POST /login`
  - Salvar o `token` no `localStotage`
  - Redirecionar para a rota de produtos (`/produtos`);
  - Inputs:
    - email
    - senha
- Funcionalidades extras:
  - Controle de estado de requisições (erro e carregamento)

Exemplo do body a ser enviado:

```
{
    "email": "fulano@email.com",
    "senha": "teste"
}
```

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-router-dom</code></li>
    </ul>
</details>

## Áreas protegidas

### Produtos: `/produtos`

- Funcionalidades obrigatórias:
  - Carregamento dos produtos da loja (`GET /produtos`)
  - Ao clicar no card do produto, obter as informações do produto (`GET /produtos/:id`)
  - Ao clicar no icone de lixo no card do produto, abrir um modal e se o cliente confirmar, deletar o produto (`DELETE /produtos/:id`)
  - Ao clicar no botão de "ADICIONAR PRODUTO", redirecionar para a rota de (`/produtos/novo`)
- Funcionalidades extras:
  - Controle de estado de requisições (erro e carregamento)

Exemplo de resposta da API:

```
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Camisa preta",
        "estoque": 12,
        "categoria": "Camisa",
        "preco": 4990,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "Camisa azul",
        "estoque": 8,
        "categoria": "Camisa",
        "preco": 4490,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    }
]
```

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-router-dom</code></li>
    </ul>
</details>

### Editar Produtos: `/produtos/:id/editar`

- Funcionalidades obrigatórias:
  - Como a atualização dos dados do produto pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do produto nesta tela e nem verificar os dados obrigatórios.
  - Enviar os dados do formulário para a rota `PUT /produtos/:id`
  - Redirecionar para a rota de produtos (`/produtos`);
  - Inputs:
    - nome
    - preco
    - estoque
    - descricao
    - imagem (link para uma imagem)
- Funcionalidades extras:
  - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>axios</code></li>
    <li><code>react-router-dom</code></li>
    </li>
    <li><img src="https://i.imgur.com/OAxmxYB.png"></li>
    </ul>
</details>

### Adicionar Produtos: `/produtos/novo`

- Funcionalidades obrigatórias:
  - Enviar os dados do formulário para a rota `POST /produtos`
  - Redirecionar para a rota de produtos (`/produtos`);
  - Inputs:
    - nome
    - preco
    - estoque
    - descricao
    - imagem (link para uma imagem)
- Funcionalidades extras:
  - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>axios</code></li>
    <li><code>react-router-dom</code></li>
    </ul>
</details>

### Perfil de usuário: `/perfil`

- Funcionalidades obrigatórias:
  - Visualização dos dados do perfil (`GET /pefil`).
  - Redirecionar para a rota de perfil (`/perfil/editar`);
  - Inputs (não precisamos controlá-los):
    - nome
    - nome_loja
    - email
- Funcionalidades extras:
  - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>axios</code></li>
    <li><code>react-router-dom</code></li>
    </ul>
</details>

### Edição de usuário: `/perfil/editar`

- Funcionalidades obrigatórias:
  - Como a atualização dos dados do perfil pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do usuário nesta tela e nem verificar os dados obrigatórios.
  - Se a senha for informada, validar a igualdade das senhas
  - Enviar os dados do formulário para a rota `PUT /perfil`
  - Redirecionar para a rota de perfil (`/perfil`);
  - Inputs:
    - nome
    - nome_loja
    - email
    - senha
    - senhaConfirmacao
- Funcionalidades extras:
  - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>axios</code></li>
    <li><code>react-router-dom</code></li>
    <li><img src="https://i.imgur.com/OAxmxYB.png"></li>
    </ul>
</details>

## Componentes

### Navbar

- Funcionalidades obrigatórias:
  - Redirecionar o usuário para as rotas `/produtos` e `/perfil`
  - Deslogar (remover o token do _contexto_)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-router-dom</code></li>
    <li>Usar o componente <code>NavLink</code> do react-router-dom para conseguir renderizar os icones ativos</li>
    </ul>
</details>

## Requisitos obrigatórios

- Sua aplicação deve ser desenvolvida com `React`;
- Trabalhar com `Hooks` (`useState`, `useEffect`, `useRef`...)
- Trabalhar com `componentização`;
- Utilizar roteamento (`react-router-dom`);
- As requisições devem ser feitas utilizando `axios`;
- Integração ao back-end (sua API ou [https://api-market.pedagogico.cubos.academy](https://api-market.pedagogico.cubos.academy));
- Seguir a estrutura de layout do wireframe que está no arquivo `.fig` que se encontra na pasta raiz do desafio;

## Como entregar?

- [ ] Faça o fork desse repositório para o seu GitHub
- [ ] Clone o seu repositório em sua máquina
- [ ] Desenvolva seu projeto, fazendo commits a cada alteração e push
- [ ] Crie um PR (pull request)
- [ ] Envie o link do pull request que você criou na plataforma da Cubos

### ⚠️ Importante: Se o pull request não for criado e enviado na plataforma o feedback não será fornecido e constará como não entregue

## Links Úteis

- Documentação do ReactJS: https://reactjs.org/
  - Hooks (useState, useEffect, useRef): https://reactjs.org/docs/hooks-intro.html
- Documentação react-router-dom: https://reactrouter.com/web/guides/quick-start
- Documentação Axios: https://axios-http.com/

**LEMBRE-SE**: Feito é melhor que perfeito!!!

###### tags: `front-end` `React` `HTML` `CSS` `desafio`
