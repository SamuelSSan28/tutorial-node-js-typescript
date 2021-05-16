### Seja muito bem vindo/a ao tutorial de como começar um projeto com **Node.js**🚀 
[Link para o vídeo]()

### Súmario
 - [O que é o Node](##o-que-e-node)
 - [Preparando o ambiente](#preparando-o-ambiente)
 - [Lets code](#lets-code-💻)
    - [Introdução]() - (Video)
      - O que é Node
      - Por que usar typescript ?
      - Configurações Inicias
    - [Server e Rotas]() - (Video)
      - Express
      - HTTP
    - [Banco de dados e  ORM]() - (Video)
      - Migrations
      - Entidades
      - Services e Controllers
    - [Considerações Finais]() - (Video)
      - "Testes"
      - Sugestões de melhoria


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

### Insomnia

Para instalar a plataforma de realizar requisições Insomnia em qualquer um dos 3 sistemas operacionais, basta [acessar o site](https://insomnia.rest/download), baixar e rodar o executável.

<br>

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

```json
 "scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node_modules --no-notify src/server.ts",
  },
```

Com isso, você deve ser capaz de digitar yarn dev terminal para ver o nosso console.log. O ts-node-dev também deve recompilar se você alterar o código no server.tsarquivo. 

### Configurando Express

Instalando as dependências:

```bash
 yarn add  express

 yarn add @types/node @types/express  -D
```


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
    - GET: https://api.github.com/users/samuelssan28
    - PUT: https://api.github.com/users/samuelssan28
    - DELETE: https://api.github.com/users/380327

- Body Params (POST e PUT)
  - Recebe os dados da requisição no corpo da requisição, em um objeto em JSON. Sempre utilizando no método POST da requisição.
  ```json 
    { 
      "name": "Samuel", "age": 18, "email": "samuel@email.com"
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


### Banco de Dados e ORM

Por questoões de simplicidade de instalação, neste tutorial vamos utilizar o banco relacional **SQLite**. Além dele utilizaremos o framwork [**TypeORM**]() que facilita o trabalho com o banco e não se prende a um banco especifico. Caso você queira utilizar um MySQL ou Postgree é bem simples fazer essa alteração somente nas configuações do framework. Ou seja. não é necessário fazer alterações na implementação de inserts,selects e etc.

Para iniciarmos temos instalar as seguintes dependencias:

```bash
  yarn add typeorm reflect-metadata sqlite3
```

Crie na raiz do seu projeto o arquivo ormconfig.json. Este é o arquivo de configuração do TypeORM. O campo type é qual o banco você vai utilizar, no nosso caso o Sqlite, o campo database onde o arquivo sqlite será armazenado. As migrations são registros que devemos fazer para manter a integridade do arquivo principalmente quando estivermos trabalhando em equipe. E as entidades são a representação das tabelas do banco em objetos.

```json
 {
    "type":"sqlite",
    "database":"./src/database/database.sqlite",
    "migrations":["./src/database/migrations/**.ts"],
    "cli":{
        "migrationsDir":"./src/database/migrations"
    },
    "entities":["./src/entities/**.ts"]
}
```

Agora vamos deixar o nosso repositório de acordo com o ormconfig. Dentro da pasta src crie a pasta database e entities. Dentro da pasta database crie a pasta das migrations e o arquivo index.ts. Dentro index vamos criar a conexão com o banco dessa forma:

```ts
  // src/database/index.ts

  import {createConnection} from 'typeorm'

  createConnection()
```

E importar essa conexão no server.ts. A importação é feita nesse formato pois queremos que a conexão seja criada assim que o servidor for iniciado.

```ts
  // src/server.ts
  ...
  import './database'
```


#### Migrations

É uma forma de versionar o schema de sua aplicação. Migrations trabalha na manipulação da base de dados: criando, alterando ou removendo. Uma forma de controlar as alterações do seu banco juntamente com o versionamento de sua aplicação e compartilhar-la.

Para criar uma migration, primeiro vamos criar um novo script no package.json

```json
  "scripts": {
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js",
  },
```

Com isso feito podemos criar de fato a migration com o seguinte comando

```bash
  yarn typeorm migration:create -n NomeDaMigration
```

No nosso caso vamos criar a tabela do usuário, então: 

```bash
  yarn typeorm migration:create -n CreateUser
```

Se você olhar na pasta das migrations já foi criado um arquivo com esse formato:

```ts
  import {MigrationInterface, QueryRunner} from "typeorm";

  export class CreateSettings1619708107361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
```

O método up() deve conter o que vai executado no banco, já o down() o que deve acontecer caso o up() dê errado.

O nosso usuário vai conter um nome(string), email(string) e uma senha(string). Dessa forma conteúdo final da migration deve ficar dessa forma:

```ts
  import {MigrationInterface, QueryRunner} from "typeorm";

  export class CreateSettings1619708107361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                    name:"users",
                    columns:[
                        {
                            name:"id",
                            type:"INTEGER",
                            isPrimary:true,
                            generationStrateg y:"increment",
                            isGenerated:true

                        },
                        {
                            name:"name",
                            type:"varchar"
                            
                        },
                        {
                            name:"email",
                            type:"varchar"
                            
                        },
                    
                        {
                            name:"password",
                            type:"varchar"           
                        }
                    ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
```

Para vermos de fato a criação da tabela devemos usar o comando: 

```bash
  yarn typeorm migration:run
```

#### Entities

É a representação das nossas tabelas do banco em objetos. Dessa forma, devemos criar a pasta entities, cmo definimos no ormconfig.json, dentro da pasta src.
Crie dentra dela o arquivo User.ts. Como ela é uma representação da nossa tabela usuário deve conter os mesmo atributos que definimos na migration.

```ts
  import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn,} from 'typeorm';

  @Entity("users") //nome da tabela
  class User {

      @PrimaryGeneratedColumn("increment")
      id:number;

      @Column()
      email:string;

      @Column()
      password:string;

      @Column()
      name:string;
      
  } 

export {User}
```

Isso vai gerar alguns erros. Para resolver precisamos habilitar algumas opções no tsconfig.json que está na raiz do nosso projeto.

 ```json
  {
     /* Experimental Options */
     "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
     "emitDecoratorMetadata": true               /* Enables experimental support for emitting type metadata for decorators. */
  }
```

#### Services

É a representação das nossas interações com o banco para cada entidade. Ou seja, onde vamos implementar inserts, selects e etc. No nosso exemplo vamo cria o método create 
para criar um usuário e readOne para verificar se um usuário existe.

```ts
  import {  getRepository, Repository } from 'typeorm';
  import { User } from '../entities/User';


  class UsersService{
    private usersRepository:Repository<User>;

    constructor(){
        this.usersRepository = getRepository(User);
    }
    
    async create(email:string , password:string){

        const user = await this.usersRepository.create({email,password})

        await this.usersRepository.save(user)

        return user.id
    }

    async login(email:string , password:string){

        const user = await this.usersRepository.findOneOrFail({where:{email}});

        if(!(user.password === password)){
            throw new Error("Usuário ou senha incorretos!")
        }

        return { auth:true }
    }     
}

export {UsersService}
```

#### Controllers

É a representação das requisições que serão feitas para a API. E também para não poluir o server.ts.

```ts
  import {Request,Response} from 'express'
  import { UsersService } from '../services/UsersService';


  class UsersController{
      
      async create(request:Request,response:Response):Promise<Response>{
          try {
              const { password,username } = request.params;

              const UsersService = new UsersService();

              const user = await UsersService.create(username,password)

              return response.json({ message: 'User successfully created !',user})

          } catch (error) {
              return response.status(400).json({ error })
          }

      }

      async login(request:Request,response:Response):Promise<Response>{
          try {
              const { password,username } = request.body;

              const UsersService = new UsersService();

              const auth = await UsersService.login(username,password);

              return response.json(auth)

          } catch (error) {
              console.log("rro: ",error)
              return response.status(400).json({ error })
          }

      }
      
  }

  export {UsersController}
```

Agora no server.ts vamos chamar os controllers e criar as rotas para o usuário. O seu arquive server.ts de ficar dessa forma: 

```js 
// src/server.ts

import express from 'express';
import { UsersController } from '../Controllers/UsersService';

const app = express();

const userController = new UsersController()

app.get("/users/:email/:password",userController.login);

app.post("/users",userController.create);

app.listen(3333,()=>console.log("Server Started!"));

```

## 🙌 Considerações Finais

Concluímos nosso tutorial de Node.JS com Typescript e ORM, espero que tenha contrinuído a jua jornada em busca de conhecimento. Como a ideia é ser uma aplicação bem simples, ela tem muitos pontos para melhorar, alguns deles que você pode aproveitar e implementar são:

  - As senhas altualmente estão sendo salvas da forma que são enviadas na requisição, uma boa prática é sempre criptografar antes de salvar. A biblioteca [CryptoJS](https://www.npmjs.com/package/crypto-js) tem vários algoritmos que você pode utilizar para criptografar a senha.

  - Simplificar ainda mais o arquivo server.ts e criar um arquivo só para as rotas da sua APi utilizando o Router do express.
  
