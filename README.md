# Raposo RH - Gestão de Empregados

## .NET 8 & Angular 18 <img align="right" width="40" height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" /> <img align="right" width="40" height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" />

Bem-vindo à Raposo RH - Gestão de Empregados! 

## Objetivo do Projeto

Este projeto visa desenvolver uma aplicação de gerenciamento de RH,  logística de funcionários também permitirá aos parceiros externos usarem suas próprias soluções de software. 
Através de uma interface intuitiva e recursos avançados, buscamos facilitar a gestão e melhorar a eficiência operacional.

## Tecnologias Utilizadas

### Back-End

#### Estrutura
- **API**
  - Controladores
  - Classe principal (`Program`)
  - Classes de processamento para suporte aos controladores
- **Aplicação**
  - Lógica de negócios
  - Instância de banco de dados

#### Pacotes
1. EntityFramework
---
2. Authentication.JwtBearer
---
3. EntityFramework.Design
---
4. SQLite (para desenvolvimento e portabilidade)
---
5. Http.Headers

### Front-End

#### Bibliotecas Utilizadas (6)

1. **@angular/material@18.0.3**
- Componentes de UI baseados em Material Design para Angular.
1.1 **@ng-bootstrap/ng-bootstrap@17.0.0**
- Integração dos componentes Bootstrap com Angular.
1.2 **bootstrap@5.3.3**
- Framework CSS para desenvolvimento responsivo e componentes de UI.
---
2. **rxjs@7.8.1**
- Biblioteca para programação reativa.
---
3. **@popperjs/core@2.11.8**
- Biblioteca de posicionamento de tooltips e popovers (necessária para o Bootstrap).
---

## Começando

### Pré-requisitos
- [Node](https://nodejs.org/en/download/current)
- [.NET 7](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [.Angular 18](https://angular.dev/)
- [Visual Studio / VSCode (opcional)](https://code.visualstudio.com/)

### Instalação
Iniciando o processo de instalação da aplicação, temos que efetuar 3 passos:

**1. Clonar o repositório**
```bash
# Exemplo de comando para clonar o repositório
git clone https://github.com/JoaoGSAlves/web_Rh.git
cd web_Rh
```

**2. Restaurar as configurações do Back-End**
```bash
dotnet restore
cd API
```
Caso queira visualizar a documentação da API, é possível através do Swagger.

**3. Restaurar as configurações do Front-End**
```bash
# Se estiver na pasta WebApi
cd rh-List 

### Executando o Projeto
Após clonar o repositório, basta executar os seguintes comandos:

#### Backend
No diretório raiz podemos, em dois terminais:
```bash
dotnet watch --project .\WebApi\
```
#### Front-End
```bash
npm start
```

## Possíveis otimizações atuais
- Estrutura banco de dados para definir usuários com permissões diferentes no sistema
- Tabela de Admins e Users normais
- Quais itens são guardados em cache
