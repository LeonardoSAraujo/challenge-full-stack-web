+A Educação - Full Stack Web Developer - Leonardo Araujo
===================
# Decisões Técnicas
- **Banco de dados:**
    - MySQL (Cloud database Digital Ocean): Questões de tempo e performance entre orquestrar um container com um banco de dados e um database na nuvem.
    - Comentários: Alguns campos apesar de não listado como únicos (cpf) foram tratados desta forma.
- **Back-end (api):**
    - Express: Requisito técnicos.
    - Express router: Para que fosse mais fácil lidar com expanções de rotas.
    - Prisma (ORM): Comunicação com banco de dados e mais facilidade para tratamento de erros no backend.
    - cors: Lidar com a politica de cors do navegador.
    - Comentários: Várias validações que possívelmente poderiam ser feitas apenas no front-end foram feitas aqui, em razão de que a api estivesse pronta para uma possível integração por outras formas que não apenas o front-end (aplicativo como exemplo).
- **Front-end:**
    - Vue 2.x: Requisito devido limitação do Vuetify
    - Vuetify: Requisito
    - V-mask: Mascara para CPF
    - Axios: CRUD com o back-end(API)
    - Babel/Eslint: Qualidade do código
    - Comentários: Alguns recursos do vuetify parecem ter muito pouca de liberdade de edição,talvez por consequência da minha falta de experiência com o Framework em questão e por consequência vários itens foram editados sem utilizar seus parâmetros.
- **Global:**
    - Javascript em favor de Typescriot: em favor de mais agilidade na construção e alteração na tipagem de campos durante validações e buscas optei pelo Javascript
    - Em virtude de não conseguir dedicar o tempo que gostaria ao projeto optei por sacrificar algumas estilizações e padrões dos mockups e priorizar o funcionamento da aplicação para ser possível entregar um MVP no praso.
- **Melhorias em favor do tempo:**
    - ***Front-end:***
        - Adição do vue router e gerênciar o componente de edição/criação separadamente da lista de usuários
        - Utilizar Vuex para gerenciar algumas váriaveis globais como o título da página atual no conteúdo main
        - Validação de campos no front ent e mascara para alguns deles
        - Utilizar o axios de maneira global para reduzir a reescrita de código nas requisições
        - Diversos Ajsutes de layout e estilização css
        - Tratamento de erros e validação
    - ***Back-end:***
        - Criptografia e alteração do método de autenticação apesar de ser necessário criar uma métodologia de login e validação para este fim
    - ***Banco de dados:***
        - Utilização local para desenvolvimento
    - ***Globais***
        - Orquestrar containers subindo as aplicações e sua comunição para fácil simulação do ambiente de produção
        - Teste unitários
- **Requisitos obrigatórios não entregues:**
    - subtítulo na parte de cadastro do usuário
    - Não há Módulo Acadêmico base para que seja possível ir até a listagem de alunos a partir dele


# Instruções de execução
- Salve uma cópia do arquivo .env nas pastas api e grupoa-front após instro rode o comando 	<sub>npm install && npm start </sub> na pasta api e o comando <sub>npm install && npm run serve</sub>