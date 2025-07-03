// Funciones utilitarias
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  const loggedInMessage = document.getElementById('logged-in-message');
  const mostrarRegistro = document.getElementById('mostrar-registro');
  const mostrarLogin = document.getElementById('mostrar-login');
  const nombreUsuarioSpan = document.getElementById('nombre-usuario');
  const cerrarSesionLoginBtn = document.getElementById('cerrar-sesion-login');
  const userMenu = document.getElementById("user-menu");
  const perfilBtn = document.getElementById("perfil-btn");
  const dropdown = document.getElementById("dropdown-menu");
  const cerrarSesionBtn = document.getElementById("cerrar-sesion");

  const usuarioActivo = localStorage.getItem("usuarioActivo");

  // Si está logueado
  if (usuarioActivo) {
    if (loginBox) loginBox.style.display = "none";
    if (registerBox) registerBox.style.display = "none";
    if (loggedInMessage) {
      loggedInMessage.style.display = "block";
      if (nombreUsuarioSpan) nombreUsuarioSpan.textContent = usuarioActivo;
    }
    if (userMenu) {
      perfilBtn.textContent = `👤 ${usuarioActivo}`;
      userMenu.style.display = "block";
    }
  } else {
    // No logueado
    if (loginBox) loginBox.style.display = "block";
    if (registerBox) registerBox.style.display = "none";
    if (loggedInMessage) loggedInMessage.style.display = "none";
    if (userMenu) userMenu.style.display = "none";
  }

  // Cambiar a registro
  if (mostrarRegistro) {
    mostrarRegistro.addEventListener('click', (e) => {
      e.preventDefault();
      loginBox.style.display = 'none';
      registerBox.style.display = 'block';
    });
  }

  // Cambiar a login
  if (mostrarLogin) {
    mostrarLogin.addEventListener('click', (e) => {
      e.preventDefault();
      registerBox.style.display = 'none';
      loginBox.style.display = 'block';
    });
  }

  // Registrar usuario
  const formRegister = document.getElementById("form-register");
  if (formRegister) {
    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevoUsuario = document.getElementById("nuevoUsuario").value.trim();
      const nuevaPassword = document.getElementById("nuevaPassword").value.trim();
      const usuarios = obtenerUsuarios();

      if (!nuevoUsuario || !nuevaPassword) {
        Swal.fire("Atención", "Completá ambos campos.", "warning");
        return;
      }

      if (usuarios.some(u => u.usuario === nuevoUsuario)) {
        Swal.fire("Error", "Ese usuario ya existe.", "error");
        return;
      }

      usuarios.push({ usuario: nuevoUsuario, password: nuevaPassword });
      guardarUsuarios(usuarios);

      Swal.fire("Registro exitoso", "Ya podés iniciar sesión.", "success");
      e.target.reset();
      registerBox.style.display = 'none';
      loginBox.style.display = 'block';
    });
  }

  // Iniciar sesión
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value.trim();
      const password = document.getElementById("password").value;
      const usuarios = obtenerUsuarios();

      const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.password === password);

      if (usuarioEncontrado) {
        localStorage.setItem("usuarioActivo", usuario);
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Hola, ${usuario}!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "index.html";
        });
      } else {
        Swal.fire("Error", "Usuario o contraseña incorrectos.", "error");
      }
    });
  }

  // Cerrar sesión (desde login)
  if (cerrarSesionLoginBtn) {
    cerrarSesionLoginBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.reload();
    });
  }

  // Mostrar/ocultar menú perfil
  if (perfilBtn) {
    perfilBtn.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });
  }

  // Cerrar sesión (desde menú)
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "/login.html";
    });
  }
});
