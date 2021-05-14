# Introdução
Seja muito bem vindo ao tutorial de como começar um projeto com **Node.js**🚀 
[Link para o vídeo]()

### Súmario
 - [O que é o Node](##o-que-e-node)
 - [Preparando o ambiente](#preparando-o-ambiente)
 - [Lets code](#lets-code-💻)
 

<br>

## O que é o Node

O Node.js pode ser definido como um ambiente de execução Javascript server-side.

Isso significa que com o Node.js é possível criar aplicações Javascript para rodar como uma aplicação standalone em uma máquina, não dependendo de um browser para a execução, como estamos acostumados.

A principal característica que diferencia o Node.JS de outras tecnologias, como PHP, Java, C#, é o fato de sua execução ser single-thread. Ou seja, apenas uma thread é responsável por executar o código Javascript da aplicação, enquanto que nas outras linguagens a execução é multi-thread.Em um servidor web utilizando linguagens tradicionais, para cada requisição recebida é criada uma nova thread para tratá-la. A cada requisição, serão demandados recursos computacionais (memória RAM, por exemplo) para a criação dessa nova thread. Uma vez que esses recursos são limitados, as threads não serão criadas infinitamente, e quando esse limite for atingido, as novas requisições terão que esperar a liberação desses recursos alocados para serem tratadas.

A figura abaixo representa esse cenário em um servidor tradicional:

![image](https://docs.oracle.com/cd/A87860_01/doc/network.817/a76933/mtsa.gif)

No modelo Node.js, apenas uma thread é responsável por tratar as requisições. Essa thread é chamada de Event Loop, e leva esse nome pois cada requisição é tratada como um evento. O Event Loop fica em execução esperando novos eventos para tratar, e para cada requisição, um novo evento é criado.

Apesar de ser single-threaded, é possível tratar requisições concorrentes em um servidor Node.js. Enquanto o servidor tradicional utiliza o sistema multi-thread para tratar requisições concorrentes, o Node.js consegue o mesmo efeito através de chamadas de E/S (entrada e saída) não-bloqueantes. Isso significa que as operações de entrada e saída (ex: acesso a banco de dados e leitura de arquivos do sistema) são assíncronas e não bloqueiam a thread. Diferentemente dos servidores tradicionais, a thread não fica esperando que essas operações sejam concluídas para continuar sua execução.

![image](https://www.luiztools.com.br/wp-content/uploads/2017/04/nodejs.jpg)

## Preparando o ambiente

Teremos três etapas principais nesta seção:

- Node + NPM;
- Yarn;
- Visual Studio Code e configurações.

### Node e NPM

O primeiro passo é instalar o Node.js, que vem acompanhado do NPM.

#### Linux (Ubuntu/Debian)

Para o Linux iremos utilizar o **[NodeSource](https://github.com/nodesource/distributions/blob/master/README.md)**, basta seguir esses passos:

- Verifique se você possui o **[curl](https://curl.haxx.se/)** instalado rodando no terminal o comando:

```bash
curl --version
```

Caso ele retorne a versão, pode pular para o próximo passo. Caso não, basta rodar o comando:

```bash
sudo apt install curl
```

- Com o **curl** instalado, execute o comando de instalação da versão LTS mais recente disponível:
    - Ubuntu

    ```bash
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

    - Debian (como root)

    ```json
    curl -sL https://deb.nodesource.com/setup_lts.x | bash -
    apt-get install -y nodejs
    ```

    Feche o terminal e abra novamente para as alterações fazerem efeito.

- Por fim, execute os seguintes comandos no terminal:

```bash
node -v
npm -v
```

Caso retorne as versões do Node e npm, sua instalação foi um sucesso.

#### macOS

Para o macOS iremos utilizar o gerenciador de pacotes [**Homebrew**](https://brew.sh/index_pt-br), que é instalado usando Ruby, que já vem instalado por padrão, execute o seguinte comando no terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Para verificar se ele foi instalado com sucesso execute:

```bash
brew --version
```

Com o **Homebrew** instalado, basta executar o comando para instalar a versão 14 (LTS) mais recente:

```bash
brew install node@14
```

Como instalamos uma versão do Node diferente da default do Homebrew (o padrão é a current, nesse caso v15), é preciso adicionar manualmente o `path` do Node na nossa variável ambiente. Adicione a seguinte linha ao final do arquivo `~/.bashrc` (ou do arquivo `~/.zshrc` caso você utilize o shell ZSH):

```bash
export PATH="/usr/local/opt/node@14/bin:$PATH"
```

Por fim, reinicie o terminal e execute os seguintes comandos:

```bash
node -v
npm -v
```

Caso retorne as versões do Node e Npm, sua instalação foi um sucesso.

#### Windows

Para o Windows utilizaremos o gerenciador de pacotes **[Chocolatey](https://chocolatey.org/)**, porém antes dos passos de instalação vamos falar brevemente sobre qual shell você deve usar.

- **CMD**: também conhecido como **Command Prompt**, ele é um dos shells mais antigos da atualidade (foi construído para ser compatível com o **MS-DOS**) e, apesar da sua fama, hoje em dia tem sido cada vez menos utilizado.
- **Powershell**: novo shell apresentado pela Microsoft por volta de 2005, ele apresenta diversas melhorias em relação ao **CMD**, tornando-o popular atualmente.

Escolhido o shell, vamos começar a instalação:

- Busque no campo de busca do Windows por **Windows Powershell**, clique com o botão direito em cima do programa e escolha a opção **Executar como administrador**.
- O Powershell trabalha com um esquema de autorizações (conhecido como `Execution Policy`) para execução de scripts e, por isso, precisamos verificar se o presente no sistema está compatível com o que o Chocolatey precisa. Execute o seguinte comando:

```bash
Get-ExecutionPolicy
```

Caso ele retorne `Restricted`, execute o comando:

```bash
Set-ExecutionPolicy RemoteSigned
```

E escolha a opção `[A] Sim para Todos`

Caso o comando acima apresente erro, tente usar:

`Set-ExecutionPolicy Bypass -Scope Process`

Verifique se alteração de permissão ocorreu com sucesso executando novamente o comando:

```bash
Get-ExecutionPolicy
```

Alterada a permissão, basta instalar o **Chocolatey** com o comando:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

Caso o comando acima apresente um erro, verifique se a sua máquina atende às requisições mínimas

`Windows 7+ / Windows Server 2003+
PowerShell v3+
.NET Framework 4.5+`

Caso o erro apresentado seja `Exceção ao definir "SecurityProtocol": "Não é possível converter o valor "3312"`, siga **[esse guia](https://blog.chocolatey.org/2020/01/remove-support-for-old-tls-versions/).**

- Após o fim da instalação, feche e abra o powershell como administrador novamente e execute:

```bash
choco -v
```

Caso ele retorne a versão do **Chocolatey**, a instalação foi um sucesso. Para finalizar, basta instalar a versão LTS mais recente do Node com o seguinte comando:

```bash
cinst nodejs-lts
```

E escolha a opção `[A]ll - yes to all`

Após o fim da instalação, feche e abra o powershell como administrador novamente e execute:

```bash
node -v
npm -v
```

Caso retorne as versões do Node e npm, sua instalação foi um sucesso.

### Yarn 1

#### Linux (Ubuntu/Debian)

Para instalar o Yarn 1 no Linux vamos começar configurando o repositório do **Yarn** executando:

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Instale utilizando o seguinte comando:

```bash
 sudo apt update && sudo apt install --no-install-recommends yarn
```

Adicione ao arquivo `~/.bashrc` (ou `~/.zshrc` caso você utilize o shell zsh) a seguinte linha: 

```bash
export PATH="$PATH:`yarn global bin`"
```

Feche e abra o terminal novamente, em seguida rode o comando:

```bash
 yarn --version
```

Caso retorne a versão do Yarn (acima de 1.0, abaixo de 2.0), a instalação ocorreu com sucesso.

#### macOS

Para instalar o Yarn 1 no macOS siga os seguintes passos, execute o comando:

```bash
 brew install yarn
```

Adicione ao arquivo `~/.bashrc` (ou `~/.zshrc` caso você utilize o shell Zsh) a seguinte linha: 

```bash
export PATH="$PATH:`yarn global bin`"
```

Feche e abre o terminal novamente. Em seguida, rode o comando:

```bash
 yarn --version
```

Caso retorne a versão do Yarn (acima de 1.0, abaixo de 2.0), a instalação ocorreu com sucesso.

#### Windows

Para instalar o Yarn 1 no Windows siga os seguintes passos, execute o comando no Powershell (como admin):

```bash
 cinst yarn
```

E escolha a opção `[A]ll - yes to all`. 

Feche e abra o terminal novamente, em seguida rode o comando:

```bash
 yarn --version
```

Caso retorne a versão do Yarn (acima de 1.0, abaixo de 2.0), a instalação ocorreu com sucesso.

### Visual Studio Code

Para instalar o editor de texto Visual Studio Code em qualquer um dos 3 sistemas operacionais, basta [acessar o site](https://code.visualstudio.com/), baixar e rodar o executável.

## Lets code 💻

Com as ferramentas instaladas, vamos para o nossa aplicação. Vamos utilizar algumas tecnologia que estão em alta no memomento como typeScript e ORM para contruir uma aplicação que realiza o cadastro de usuários e login, ou seja verifica se as credenciais passadas são válidas.

### Por que usar o Typescript?

TypeScript é um superset de JavaScript para desenvolvimento de aplicações escaláveis. Conforme o código JavaScript cresce, ele fica mais confuso, tornando cada vez mais difícil manter e reutilizar o código. JavaScript falha em abraçar a verificação de tipo forte e verificações de erro em tempo de compilação e TypeScript foi apresentado para preencher essa lacuna. (Extensão .ts)

### Criação da configuração básica TypeScript 

Crie uma pasta para aplicação, e abra o terminal nela. Para iniciar o projeto Node utilize o seguinte comando:

```bash
 yarn init -y
```

Instale o Typescript. Como o node não entende a sintaxe do typescript vamos precisar da lib **ts-node-dev** para "traduzir" nosso código no formato que node entende. O -D serve para instalar como dependência de desenvolvimento. 

```bash
 yarn add typescript ts-node-dev -D

```

Use o comando a baixo para criar o arquivo de configuração do typescript
```bash
  tsc --init

```

Após gerar o tsconfig.json, faça essas alterações abaixo:
 ```json
  {
    "strict":false, // Para remover algumas verificaçõs adicionais no desenvolvimento
  }

```

A última etapa é ajustar os scripts no package.json conforme abaixo:

```bash
 "scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node_modules --no-notify src/server.ts",
  },
```

Com isso, você deve ser capaz de digitar yarn dev terminal para ver o nosso console.log. O ts-node-dev também deve recompilar se você alterar o código no server.tsarquivo. 

### Configurando Express

Instalando as dependências:

```bash
 yarn add cors express

 yarn add @types/node @types/express   --save-dev
```

<br>

### Criando o Server 

Altere o conteúdo do server.ts para este abaixo e execute `yarn dev` para iniciar o seu servidor.

```js 
import express from 'express';

const app = express(); 

app.listen(3333,()=>console.log("Server Started!"));
```

### HTTP
Para nos comunicarmos com nossa API vamos utilizar o protocolo http. Ele estabelece alguns métodos e parâmetros:

#### ✅ Métodos

- GET = Buscas
- POST = Criação
- PUT = Alteração
- DELETE = Deletar
- PATCH = Alterar uma informação específica

<br>

#### ✅ Parâmetros

- Query Params (GET)
  - Recebe os dados da requisição como parâmetro na URL. Pode conter um ou mais parâmetros:
  - Exemplos:
    - http://minhaapi.com/banks?name=nubank
    - http://minhaapi.com/movies?name=transformers&actors=megan,peter

- Route Params (GET,PUT,DELETE)
  - Recebe os dados da requisição na rota. Melhor maneira para buscar algo específico, deletar ou atualizar usando o identificador único, por exemplo.
  - Exemplos:
    - GET: https://api.github.com/users/tgmarinho
    - PUT: https://api.github.com/users/tgmarinho
    - DELETE: https://api.github.com/users/380327

- Body Params (POST e PUT)
  - Recebe os dados da requisição no corpo da requisição, em um objeto em JSON. Sempre utilizando no método POST da requisição.
  ```json 
    { 
      "name": "Thiago", "age": 18, "email": "thiago@mail.com"
    }
  ```

### Rotas

Vamos criar a nossa primera rota.

```js 
app.get("/",(request,response) => {
  //Response é o que vamos retornar para o usuário
  response.send("Hello World")
});

```

Uma outra possibilidade seria retornar um JSON.

```js 
app.get("/json",(request,response) => {
  //Response é o que vamos retornar para o usuário
  response.json({
    message:"Hello World"
  })
});
```

Se você for no seu navegador e pesquisar por localhost:3333/ ou localhost:3333/json poderá ver a mensagem Hello world. 








