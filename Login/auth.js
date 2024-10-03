class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Auth {
    constructor() {
        this.users = this.loadUsers();
    }

    loadUsers() {
        const usersData = localStorage.getItem('users');
        return usersData ? JSON.parse(usersData) : [];
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    registerUser(name, email, password) {
        if (this.isEmailRegistered(email)) {
            alert("E-mail já cadastrado!");
            return false;
        }
        const newUser = new User(name, email, password);
        this.users.push(newUser);
        this.saveUsers(); // Salva os usuários no localStorage
        alert("Usuário cadastrado com sucesso!");
        return true;
    }

    loginUser(email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            window.location.href = "main.html";
        } else {
            alert("Usuário ou senha incorretos!");
        }
    }

    isEmailRegistered(email) {
        return this.users.some(user => user.email === email);
    }

    validatePassword(password, confirmPassword) {
        return password === confirmPassword;
    }
}

// Instância de Auth
const auth = new Auth();

// Manipulação do login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.loginUser(email, password);
});

// Manipulação do cadastro
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (auth.validatePassword(password, confirmPassword)) {
        auth.registerUser(name, email, password);
        document.getElementById('registerForm').reset(); // Limpa o formulário
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide(); // Fecha o modal
    } else {
        alert("As senhas não coincidem!"); // Alerta de erro
    }
});
