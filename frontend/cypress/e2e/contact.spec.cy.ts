context("Contact", () => {
  it("Tries to access the dashboard", () => {
    cy.visit("http://localhost:3000/register");
    cy.viewport(1440, 900);

    cy.intercept("POST", "http://localhost:3000/register", {
      body: {
        name: "Kenzinho",
        email: "kenzinho@hotmail.com",
        password: "1234",
        phone: "(00) 1111-1111",
      },
    });

    cy.get("input#name").type("Kenzinho");
    cy.get("input#email").type("kenzinho@hotmail.com");
    cy.get("input#password").type("1234");
    cy.get("input#phone").type("(00) 1111-1111");

    cy.contains("Cadastrar").click();
    cy.contains("Conta criada com sucesso!");
    cy.contains("Login");

    cy.get("input#email").type("kenzinho@hotmail.com");
    cy.get("input#password").type("1234");
    cy.contains("Entrar").click();
  });

  it("Tries to add new contact", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.get("input#email").type("kenzinho@hotmail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho!");
    cy.contains("Login efetuado com sucesso!");

    cy.contains("Novo Contato").click();
    cy.get("input#name").type("Teste");
    cy.get("input#email").type("teste@mail.com");
    cy.get("input#phone").type("(00) 2222-2222");

    cy.contains("ADICIONAR").click();
    cy.contains("Contato adicionado!");
    cy.contains("Teste");
    cy.contains("teste@mail.com");
    cy.contains("(00) 2222-2222");
  });

  it("Tries to add new contact with phone number that already exists", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.get("input#email").type("kenzinho@hotmail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho!");
    cy.contains("Login efetuado com sucesso!");

    cy.contains("Novo Contato").click();
    cy.get("input#name").type("Teste 2");
    cy.get("input#email").type("teste2@mail.com");
    cy.get("input#phone").type("(00) 2222-2222");

    cy.contains("ADICIONAR").click();
    cy.contains("Teste");
    cy.contains("Ops! Um contato com esse número já existe!");
  });

  it("Tries to add new contact without any data", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.get("input#email").type("kenzinho@hotmail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho!");
    cy.contains("Login efetuado com sucesso!");

    cy.contains("Novo Contato").click();
    cy.contains("ADICIONAR").click();
    cy.contains("Campo obrigatório");
  });

  it("Tries to edit a contact", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.get("input#email").type("kenzinho@hotmail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho!");
    cy.contains("Login efetuado com sucesso!");

    cy.get("#edit").click();
    cy.get("input#name").type(" Editado");

    cy.contains("Salvar").click();
    cy.contains("Teste Editado");
    cy.contains("Contato atualizado!");
  });

  it("Tries to delete a contact", () => {
    cy.visit("http://localhost:3000/login");
    cy.viewport(1440, 900);

    cy.get("input#email").type("kenzinho@hotmail.com");
    cy.get("input#password").type("1234");

    cy.contains("Entrar").click();
    cy.contains("Olá, Kenzinho!");
    cy.contains("Login efetuado com sucesso!");

    cy.get("#delete").click();
    cy.contains("Sim").click();
    cy.contains("Contato excluído!");
    cy.contains("Você não possui nenhum contato cadastrado");
  });
});
