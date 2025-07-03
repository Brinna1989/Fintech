    const monedas = ["BTC", "ETH", "USDT"];
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    function calcularSaldos() {
    const saldos = { BTC: 0, ETH: 0, USDT: 0 };
    movimientos.forEach(m => {
        if (["ingreso", "compra"].includes(m.tipo)) {
        saldos[m.moneda] += m.monto;
        } else if (["egreso", "venta", "pago"].includes(m.tipo)) {
        saldos[m.moneda] -= m.monto;
        }
    });
    return saldos;
    }

    function mostrarSaldos() {
    const saldos = calcularSaldos();
    const ul = document.getElementById("saldos");
    ul.innerHTML = "";
    monedas.forEach(moneda => {
        const li = document.createElement("li");
        li.textContent = `${moneda}: ${saldos[moneda].toFixed(4)}`;
        ul.appendChild(li);
    });
    }

    function mostrarHistorial() {
    const ul = document.getElementById("historial");
    ul.innerHTML = "";
    movimientos.forEach(m => {
        const li = document.createElement("li");
        li.classList.add(m.moneda, "nuevo");
        li.textContent = `${m.tipo.toUpperCase()} - ${m.moneda} ${m.monto} | ${m.descripcion} (${m.fecha})`;
        ul.appendChild(li);
        setTimeout(() => li.classList.remove("nuevo"), 500);
    });
    }

    document.getElementById("formulario").addEventListener("submit", e => {
    e.preventDefault();
    const moneda = document.getElementById("cripto").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!isNaN(monto) && descripcion) {
        const nuevoMov = {
        moneda,
        monto,
        tipo,
        descripcion,
        fecha: new Date().toLocaleString()
        };

        movimientos.push(nuevoMov);
        localStorage.setItem("movimientos", JSON.stringify(movimientos));
        mostrarSaldos();
        mostrarHistorial();
        e.target.reset();
    }
    });

    document.getElementById("vaciar").addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esto eliminará todo el historial de transacciones.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
        movimientos = [];
        localStorage.removeItem("movimientos");
        mostrarSaldos();
        mostrarHistorial();
        }
    });
    });

    mostrarSaldos();
    mostrarHistorial();

    // cerrar menú hamburguesa si existe
    document.querySelectorAll(".menu a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        const checkbox = document.getElementById("menu-toggle");
        if (checkbox) checkbox.checked = false;
    });
    });

    // Para la página recibir
    const direcciones = {
    BTC: {
        direccion: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        red: "Red: Bitcoin Mainnet. Comisiones pueden variar según congestión."
    },
    ETH: {
        direccion: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        red: "Red: Ethereum Mainnet. Asegúrate de enviar solo tokens compatibles."
    },
    USDT: {
        direccion: "TRon123456789ABCDEF",
        red: "Red: TRON TRC20. ⚠️ No enviar desde Ethereum o Binance Smart Chain."
    }
    };

    const select = document.getElementById("cripto");
    const span = document.getElementById("direccion-wallet");
    const infoRed = document.getElementById("info-red");
    const qrContainer = document.getElementById("qrContainer");

    if (select && span && infoRed && qrContainer) {
    select.addEventListener("change", () => {
        const moneda = select.value;
        span.textContent = direcciones[moneda].direccion;
        infoRed.textContent = direcciones[moneda].red;

        qrContainer.classList.remove("fade-in");
        void qrContainer.offsetWidth;
        qrContainer.classList.add("fade-in");
    });
    }

    function copiarDireccion() {
    navigator.clipboard.writeText(span.textContent).then(() => {
        Swal.fire({
        icon: 'success',
        title: 'Dirección copiada',
        timer: 1500,
        showConfirmButton: false
        });
    });
    }

    document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes("recibir")) {
        Swal.fire('¡Atención!', '¿Estás seguro de continuar?', 'warning');
    }
    });

    document.addEventListener('DOMContentLoaded', function () {
  const toggleThemeBtn = document.getElementById('toggle-theme');
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }
});

