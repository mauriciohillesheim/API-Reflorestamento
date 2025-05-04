document.addEventListener("DOMContentLoaded", () => {
  // --- Elementos DOM --- //
  const cadastroForm = document.getElementById("cadastro-form");
  const avatarOptions = document.querySelectorAll(".avatar-option");
  const selectedAvatarInput = document.getElementById("selected-avatar");
  const body = document.body;
  const cadastroContainer = document.getElementById("cadastro-container");
  const mainApp = document.getElementById("main-app");
  const appSections = document.querySelectorAll(".app-section");
  const navLinks = document.querySelectorAll(".nav-link");
  const logoutLink = document.getElementById("nav-logout");

  // Elementos do Perfil
  const profileSection = document.getElementById("perfil");
  const profileAvatarImg = document.getElementById("profile-avatar-img");
  const avatarStageSpan = document.getElementById("avatar-stage");
  const profileUsername = document.getElementById("profile-username");
  const profileTreeType = document.getElementById("profile-tree-type");
  const profileTreeCount = document.getElementById("profile-tree-count");
  const profileBioText = document.getElementById("profile-bio-text");
  const editBioBtn = document.getElementById("edit-bio-btn");
  const editBioArea = document.getElementById("edit-bio-area");
  const editBioTextarea = document.getElementById("edit-bio-textarea");
  const saveBioBtn = document.getElementById("save-bio-btn");
  const cancelBioBtn = document.getElementById("cancel-bio-btn");

  // Elementos do Cadastro de Ações
  const cadastroAcoesForm = document.getElementById("cadastro-acoes-form");
  const quantidadeArvoresInput = document.getElementById("quantidade-arvores");
  const especieArvoreSelect = document.getElementById("especie-arvore");
  const cadastroAcoesFeedback = document.getElementById(
    "cadastro-acoes-feedback"
  );

  // Elementos do Relatório
  const relatorioForm = document.getElementById("relatorio-form");
  const buscaEspecieSelect = document.getElementById("busca-especie");
  const relatorioResultadosDiv = document.getElementById(
    "relatorio-resultados"
  );

  // Elementos dos Destaques
  const destaquesListDiv = document.getElementById("destaques-list");

  // --- Dados Fictícios (Simulação de Backend/DB) --- //
  // Nota: Em uma aplicação real, estes dados viriam de um servidor.
  const fakeUsersData = [
    {
      username: "Ana Reflorestadora",
      avatar: "pau-brasil",
      treesPlanted: 1850,
      bio: "Amante da natureza e plantadora de árvores!",
    },
    {
      username: "Beto Castanheira",
      avatar: "castanheira",
      treesPlanted: 750,
      bio: "Contribuindo para um futuro mais verde.",
    },
    {
      username: "Carla Peroba",
      avatar: "peroba-rosa",
      treesPlanted: 310,
      bio: "Cada árvore conta.",
    },
    {
      username: "Davi Verde",
      avatar: "pau-brasil",
      treesPlanted: 120,
      bio: "Iniciando minha jornada no reflorestamento.",
    },
    {
      username: "Elisa Folha",
      avatar: "castanheira",
      treesPlanted: 95,
      bio: "",
    },
    // Adicionar mais usuários se necessário para testar
  ];

  // --- Funções Auxiliares --- //

  // Mostra uma seção específica da aplicação
  function showSection(sectionId) {
    appSections.forEach((section) => {
      section.style.display = section.id === sectionId ? "block" : "none";
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${sectionId}`
      );
    });

    // Carrega/Limpa dados específicos da seção
    if (sectionId === "perfil") {
      loadProfileData();
    }
    if (sectionId === "destaques") {
      loadHighlightsData(); // Carrega dados dos destaques
    }

    // Limpa feedback/resultados de outras seções
    if (sectionId !== "cadastro-acoes" && cadastroAcoesFeedback) {
      cadastroAcoesFeedback.textContent = "";
    }
    if (sectionId !== "relatorio" && relatorioResultadosDiv) {
      relatorioResultadosDiv.innerHTML =
        "<p><i>Faça uma busca para ver os registros.</i></p>";
    }
    if (sectionId !== "destaques" && destaquesListDiv) {
      destaquesListDiv.innerHTML = "<p><i>Carregando destaques...</i></p>"; // Reset ao sair
    }
  }

  // Aplica o tema de cores
  function applyTheme(theme) {
    body.classList.remove(
      "theme-pau-brasil",
      "theme-castanheira",
      "theme-peroba-rosa"
    );
    if (theme) {
      body.classList.add(`theme-${theme}`);
    }
  }

  // Obtém detalhes do avatar (imagem e estágio) baseado na contagem de árvores
  function getAvatarDetails(avatarType, treeCount) {
    let stage = "plantada";
    let stageName = "Plantada";
    if (treeCount >= 1500) {
      stage = "madura_plus";
      stageName = "Anciã";
    } else if (treeCount >= 700) {
      stage = "madura";
      stageName = "Madura";
    } else if (treeCount >= 300) {
      stage = "jovem";
      stageName = "Jovem";
    } else if (treeCount >= 100) {
      stage = "broto";
      stageName = "Broto";
    }

    // TODO: Criar as imagens placeholder necessárias em assets/images/
    // Ex: pau-brasil-plantada.png, pau-brasil-broto.png, castanheira-jovem.png etc.
    const imagePath = `assets/images/${avatarType}-${stage}.png`;
    return { imagePath, stageName };
  }

  // Carrega e exibe os dados do usuário LOGADO no perfil
  function loadProfileData() {
    const userDataString = localStorage.getItem("reflorestamentoUser");
    if (!userDataString || !profileSection) return;

    try {
      const userData = JSON.parse(userDataString);
      // Simular atualização da contagem do usuário logado a partir dos dados "globais" (para teste)
      // Em um sistema real, isso viria do backend ou seria gerenciado de forma mais robusta.
      const currentUserGlobalData = fakeUsersData.find(
        (u) => u.username === userData.username
      );
      const treeCount = currentUserGlobalData
        ? currentUserGlobalData.treesPlanted
        : userData.treesPlanted || 0;
      // Atualizar localStorage com a contagem mais recente (simulação)
      userData.treesPlanted = treeCount;
      localStorage.setItem("reflorestamentoUser", JSON.stringify(userData));

      const avatarDetails = getAvatarDetails(userData.avatar, treeCount);

      profileUsername.textContent = userData.username;
      const treeNameMap = {
        "pau-brasil": "Pau-Brasil",
        castanheira: "Castanheira",
        "peroba-rosa": "Peroba-Rosa",
      };
      profileTreeType.textContent =
        treeNameMap[userData.avatar] || userData.avatar;
      profileTreeCount.textContent = treeCount;
      profileBioText.textContent = userData.bio || "(Sem bio definida)";
      profileAvatarImg.src = avatarDetails.imagePath;
      profileAvatarImg.alt = `Avatar ${treeNameMap[userData.avatar]} - ${
        avatarDetails.stageName
      }`;
      avatarStageSpan.textContent = avatarDetails.stageName;

      editBioArea.style.display = "none";
      profileBioText.style.display = "block";
      editBioBtn.style.display = "inline-block";
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error);
      logoutUser();
    }
  }

  // Carrega e exibe os usuários destaque
  function loadHighlightsData() {
    if (!destaquesListDiv) return;

    try {
      // Ordena os usuários fakes pela quantidade de árvores (decrescente)
      const sortedUsers = [...fakeUsersData].sort(
        (a, b) => b.treesPlanted - a.treesPlanted
      );

      // Pega os top 3
      const topUsers = sortedUsers.slice(0, 3);

      if (topUsers.length === 0) {
        destaquesListDiv.innerHTML =
          "<p><i>Nenhum usuário destaque ainda.</i></p>";
      } else {
        let htmlResult = "";
        topUsers.forEach((user) => {
          const avatarDetails = getAvatarDetails(
            user.avatar,
            user.treesPlanted
          );
          htmlResult += `
                        <div class="destaque-item">
                            <img src="${avatarDetails.imagePath}" alt="Avatar de ${user.username}">
                            <div class="destaque-username">${user.username}</div>
                            <div class="destaque-tree-count">${user.treesPlanted} árvores</div>
                        </div>
                    `;
        });
        destaquesListDiv.innerHTML = htmlResult;
      }
    } catch (error) {
      console.error("Erro ao carregar destaques:", error);
      destaquesListDiv.innerHTML =
        "<p><i>Ocorreu um erro ao carregar os destaques.</i></p>";
    }
  }

  // Função para simular logout e limpar interface
  function logoutUser() {
    localStorage.removeItem("reflorestamentoUser");
    localStorage.removeItem("reflorestamentoTheme");
    body.classList.remove(
      "theme-pau-brasil",
      "theme-castanheira",
      "theme-peroba-rosa"
    );
    if (mainApp) mainApp.style.display = "none";
    if (cadastroContainer) cadastroContainer.style.display = "block";
    if (cadastroForm) cadastroForm.reset();
    avatarOptions.forEach((opt) => opt.classList.remove("selected"));
    if (selectedAvatarInput) selectedAvatarInput.value = "";
    // Limpar outras seções
    if (relatorioResultadosDiv)
      relatorioResultadosDiv.innerHTML =
        "<p><i>Faça uma busca para ver os registros.</i></p>";
    if (destaquesListDiv)
      destaquesListDiv.innerHTML = "<p><i>Carregando destaques...</i></p>";
  }

  // --- Inicialização e Lógica Principal --- //

  const loggedInUser = localStorage.getItem("reflorestamentoUser");
  const savedTheme = localStorage.getItem("reflorestamentoTheme");

  if (loggedInUser && savedTheme) {
    applyTheme(savedTheme);
    if (cadastroContainer) cadastroContainer.style.display = "none";
    if (mainApp) mainApp.style.display = "block";
    showSection("perfil"); // Inicia na seção de perfil
  } else {
    if (cadastroContainer) cadastroContainer.style.display = "block";
    if (mainApp) mainApp.style.display = "none";
    if (savedTheme) {
      applyTheme(savedTheme);
      const savedAvatarOption = document.querySelector(
        `.avatar-option[data-tree="${savedTheme}"]`
      );
      if (savedAvatarOption && selectedAvatarInput) {
        savedAvatarOption.classList.add("selected");
        selectedAvatarInput.value = savedTheme;
      }
    }
  }

  // --- Event Listeners --- //

  // Seleção de Avatar no Cadastro
  avatarOptions.forEach((option) => {
    option.addEventListener("click", () => {
      avatarOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      const selectedTree = option.getAttribute("data-tree");
      if (selectedAvatarInput) selectedAvatarInput.value = selectedTree;
      applyTheme(selectedTree);
      localStorage.setItem("reflorestamentoTheme", selectedTree);
    });
  });

  // Submissão do Formulário de Cadastro
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const avatar = selectedAvatarInput.value;

      if (!avatar) {
        alert("Por favor, escolha uma árvore avatar.");
        return;
      }

      // Verifica se o usuário já existe nos dados fakes (simulação)
      const existingUser = fakeUsersData.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );
      if (existingUser) {
        alert("Nome de usuário já existe. Por favor, escolha outro.");
        return;
      }

      const user = {
        username: username,
        password: password, // Não seguro
        avatar: avatar,
        bio: "",
        treesPlanted: 0,
        reforestationRecords: [],
      };

      // Adiciona o novo usuário aos dados fakes (simulação)
      fakeUsersData.push(user);
      console.log("Usuário cadastrado (JSON):", JSON.stringify(user, null, 2));
      console.log("Lista de usuários atualizada (simulação):", fakeUsersData);

      localStorage.setItem("reflorestamentoUser", JSON.stringify(user));
      localStorage.setItem("reflorestamentoTheme", avatar);

      alert("Cadastro realizado com sucesso!");

      applyTheme(avatar);
      cadastroContainer.style.display = "none";
      mainApp.style.display = "block";
      showSection("perfil");
    });
  }

  // Navegação Principal
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.id === "nav-logout") return;
      event.preventDefault();
      const targetSectionId = link.getAttribute("href").substring(1);
      showSection(targetSectionId);
    });
  });

  // Logout
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      logoutUser();
    });
  }

  // Edição da Bio no Perfil
  if (editBioBtn) {
    editBioBtn.addEventListener("click", () => {
      const userDataString = localStorage.getItem("reflorestamentoUser");
      if (!userDataString) return;
      const userData = JSON.parse(userDataString);

      profileBioText.style.display = "none";
      editBioBtn.style.display = "none";
      editBioArea.style.display = "block";
      editBioTextarea.value = userData.bio || "";
      editBioTextarea.focus();
    });
  }

  if (saveBioBtn) {
    saveBioBtn.addEventListener("click", () => {
      const newBio = editBioTextarea.value;
      const userDataString = localStorage.getItem("reflorestamentoUser");
      if (!userDataString) return;

      try {
        let userData = JSON.parse(userDataString);
        userData.bio = newBio;
        localStorage.setItem("reflorestamentoUser", JSON.stringify(userData));

        // Atualiza também nos dados fakes (simulação)
        const userIndex = fakeUsersData.findIndex(
          (u) => u.username === userData.username
        );
        if (userIndex !== -1) {
          fakeUsersData[userIndex].bio = newBio;
        }

        profileBioText.textContent = newBio || "(Sem bio definida)";
        editBioArea.style.display = "none";
        profileBioText.style.display = "block";
        editBioBtn.style.display = "inline-block";
      } catch (error) {
        console.error("Erro ao salvar bio:", error);
        alert("Ocorreu um erro ao salvar a bio.");
      }
    });
  }

  if (cancelBioBtn) {
    cancelBioBtn.addEventListener("click", () => {
      editBioArea.style.display = "none";
      profileBioText.style.display = "block";
      editBioBtn.style.display = "inline-block";
    });
  }

  // Submissão do Formulário de Cadastro de Ações
  if (cadastroAcoesForm) {
    cadastroAcoesForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const quantidade = parseInt(quantidadeArvoresInput.value, 10);
      const especie = especieArvoreSelect.value;

      if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida de árvores.");
        return;
      }
      if (!especie) {
        alert("Por favor, selecione a espécie da árvore.");
        return;
      }

      const userDataString = localStorage.getItem("reflorestamentoUser");
      if (!userDataString) {
        alert("Erro: Usuário não encontrado. Faça o login novamente.");
        logoutUser();
        return;
      }

      try {
        let userData = JSON.parse(userDataString);
        const newRecord = {
          user: userData.username, // Associar ao usuário logado (simulação)
          quantity: quantidade,
          species: especie,
          timestamp: new Date().toISOString(),
        };

        if (!Array.isArray(userData.reforestationRecords)) {
          userData.reforestationRecords = [];
        }
        userData.reforestationRecords.push(newRecord);
        userData.treesPlanted = (userData.treesPlanted || 0) + quantidade;
        localStorage.setItem("reflorestamentoUser", JSON.stringify(userData));

        // Atualiza também nos dados fakes (simulação)
        const userIndex = fakeUsersData.findIndex(
          (u) => u.username === userData.username
        );
        if (userIndex !== -1) {
          fakeUsersData[userIndex].treesPlanted = userData.treesPlanted;
          // Poderia adicionar o registro ao usuário fake também, se necessário para outras features
        }

        cadastroAcoesFeedback.textContent = `Plantio de ${quantidade} ${especie}(s) registrado com sucesso!`;
        cadastroAcoesForm.reset();
        setTimeout(() => {
          cadastroAcoesFeedback.textContent = "";
        }, 5000);
      } catch (error) {
        console.error("Erro ao registrar plantio:", error);
        alert("Ocorreu um erro ao registrar o plantio.");
      }
    });
  }

  // Submissão do Formulário de Relatório
  if (relatorioForm) {
    relatorioForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const buscaEspecie = buscaEspecieSelect.value;

      const userDataString = localStorage.getItem("reflorestamentoUser");
      if (!userDataString) {
        relatorioResultadosDiv.innerHTML =
          "<p><i>Erro: Usuário não encontrado.</i></p>";
        return;
      }

      try {
        const userData = JSON.parse(userDataString);
        const records = userData.reforestationRecords || [];
        const filteredRecords = records.filter((record) => {
          return !buscaEspecie || record.species === buscaEspecie;
        });

        if (filteredRecords.length === 0) {
          relatorioResultadosDiv.innerHTML =
            "<p><i>Nenhum registro encontrado para os critérios selecionados.</i></p>";
        } else {
          const speciesNameMap = {
            ipe: "Ipê",
            angico: "Angico",
            aroeira: "Aroeira",
            jequitiba: "Jequitibá",
            "peroba-campo": "Peroba do Campo",
          };
          let htmlResult = "<ul>";
          filteredRecords.forEach((record) => {
            const formattedDate = new Date(record.timestamp).toLocaleString(
              "pt-BR"
            );
            const speciesName =
              speciesNameMap[record.species] || record.species;
            htmlResult += `<li>${formattedDate} - ${record.quantity} x ${speciesName}</li>`;
          });
          htmlResult += "</ul>";
          relatorioResultadosDiv.innerHTML = htmlResult;
        }
      } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        relatorioResultadosDiv.innerHTML =
          "<p><i>Ocorreu um erro ao gerar o relatório.</i></p>";
      }
    });
  }
});
