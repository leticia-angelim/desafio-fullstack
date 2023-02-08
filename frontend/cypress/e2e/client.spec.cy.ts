context("Client", () => {
  it("Tries to access the application", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);
  });

  it("Tries to register", () => {
    cy.visit("http://localhost:3000/register");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/register", {
      body: {
        name: "Kenzinho",
        email: "kenzinho@mail.com",
        password: "1234",
        phone: "(00) 1111-1111",
      },
    });

    cy.get("input#name").type("Kenzinho");
    cy.get("input#email").type("kenzinho@mail.com");
    cy.get("input#password").type("1234");
    cy.get("input#phone").type("(00) 1111-1111");

    cy.contains("Cadastrar").click();
    cy.contains("Login");
    cy.contains("Conta criada com sucesso!");
  });

  it("Tries to register with email that already exists", () => {
    cy.visit("http://localhost:3000/register");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/register", {
      body: {
        name: "Teste",
        email: "kenzinho@mail.com",
        password: "1234",
        phone: "(00) 1111-1111",
      },
    });

    cy.get("input#name").type("Teste");
    cy.get("input#email").type("kenzinho@mail.com");
    cy.get("input#password").type("1234");
    cy.get("input#phone").type("(00) 1111-1111");

    cy.contains("Cadastrar").click();
    cy.contains("Ops! Email já cadastrado");
  });

  it("Tries to register with an invalid email", () => {
    cy.visit("http://localhost:3000/register");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/register", {
      body: {
        name: "Teste",
        email: "teste",
        password: "1234",
        phone: "(00) 1111-1111",
      },
    });

    cy.get("input#name").type("Teste");
    cy.get("input#email").type("teste");
    cy.get("input#password").type("1234");
    cy.get("input#phone").type("(00) 1111-1111");

    cy.contains("Cadastrar").click();
    cy.contains("Email inválido");
  });

  it("Tries to register without any data", () => {
    cy.visit("http://localhost:3000/register");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/register", {
      body: {},
    });

    cy.contains("Cadastrar").click();
    cy.contains("Campo obrigatório");
  });

  it("Tries to login", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000", {
      body: {
        email: "kenzinho@mail.com",
        password: "1234",
      },
    });

    cy.get("input#email").type("kenzinho@mail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho!");
    cy.contains("Login efetuado com sucesso!");
  });

  it("Tries to login with wrong password", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/login", {
      body: {
        email: "kenzinho@mail.com",
        password: "12345",
      },
    });

    cy.get("input#email").type("kenzinho@mail.com");
    cy.get("input#password").type("12345");

    cy.contains("Entrar").click();
    cy.contains("Ops! Email e/ou senha incorretos");
  });

  it("Tries to login with email not registered", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/login", {
      body: {
        email: "teste@mail.com",
        password: "1234",
      },
    });

    cy.get("input#email").type("teste@mail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Ops! Email e/ou senha incorretos");
  });

  it("Tries to login without any data", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/login", {
      body: {},
    });

    cy.contains("Entrar").click();
    cy.contains("Campo obrigatório");
  });

  it("Tries to edit account", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.get("input#email").type("kenzinho@mail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho!");
    cy.contains("Login efetuado com sucesso!");

    cy.get("#basic-button").click();
    cy.contains("Editar conta").click();

    cy.get("input#name").type(" Kenzie");
    cy.get("input#password").type("1234");

    cy.contains("Salvar").click();
    cy.contains("Olá, Kenzinho Kenzie!");
    cy.contains("Conta atualizada!");
  });

  it("Tries to delete account", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.get("input#email").type("kenzinho@mail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho Kenzie!");
    cy.contains("Login efetuado com sucesso!");

    cy.get("#basic-button").click();
    cy.contains("Excluir conta").click();
    cy.contains("Sim").click();

    cy.contains("Conta excluída!").click();
    cy.contains("Login");
  });
});
