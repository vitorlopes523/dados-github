document.querySelector(".btn-seek-information").addEventListener("click", () => {
  const userName = document.querySelector(".text-input").value
  if(validateEmptyInput(userName)) return
  getUser(userName)
})

document.querySelector(".text-input").addEventListener("keyup", (event) => {
  const userName = event.target.value
  const key = event.which || event.keyCode
  const keyPressed = key === 13

  if(keyPressed) {
    if(validateEmptyInput(userName)) return
    getUser(userName)
  }
})

function validateEmptyInput(userName) {
  if(userName.length === 0) {
    alert('Preencha o campo com o nome do usuário do GitHub')
    return true
  }
}

async function user(userName) {
  const response = await fetch(`https://api.github.com/users/${userName}`)
  return await response.json()
}

async function repositories(userName) {
  const response = await fetch(`https://api.github.com/users/${userName}/repos`)
  return await response.json()
}

async function getUser(userName) {

  const userData = await user(userName)

  let userInformation = `<img src="${userData.avatar_url}" alt="Foto de perfil do usuario" class="profile-picture"/>
                          <p class="login">@${userData.login}</p>
                          <div class="data">
                              <h1 class="name">${userData.name ?? 'Não possui nome cadastrado!'}</h1>
                              <p class="bio">${userData.bio ?? 'Não possui bio cadastrada'}</p>
                          </div>
                          <buttom class="btn-show-repositories">Mostrar Respositórios</buttom>
                                `
  const userNotFound = `<h3 class="not-found">Usuário não encontrado!</h3>`
  const userInformationPresent = document.querySelector(".user-information")

  if(userData.message === "Not Found") {
    userInformationPresent.innerHTML = userNotFound
    return
  }

  userInformationPresent.innerHTML = userInformation

      

  document.querySelector(".btn-show-repositories").addEventListener("click", () => {
    const showUserRepository = document.querySelector(".btn-show-repositories")

    showUserRepository.classList.add("hide")

    getRepositories(userName)
  })
}

async function getRepositories(userName) {
  const repositoryData = await repositories(userName)
  
    let repositoryItems = ""

    repositoryData.forEach(repos => {
      repositoryItems += `<li class="repository">
                            <a href="${repos.html_url}" target="_blank">${repos.name}</a>
                          </li>`
    })
    
   document.querySelector('.user-information').innerHTML += `<div class="information-repositories">
                                                              <h2>Repositórios</h2>
                                                              <ul class="list-repositories">${repositoryItems}</ul>
                                                            </div>
    `
  const repositoryNotFound = `<h4 class="not-found">Não possui repositórios!</h4>`
  if(repositoryItems === '') {
    document.querySelector(".list-repositories").innerHTML = repositoryNotFound
    return
  }
}