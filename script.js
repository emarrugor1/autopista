let colaAutos = [];
let semaforoEstado = 'rojo'; // Estados posibles: 'rojo', 'amarillo', 'verde'

function llegarAuto() {
    const autoId = colaAutos.length + 1;
    const auto = document.createElement('div');
    auto.className = 'auto';
    auto.id = `auto${autoId}`;
    colaAutos.push(auto);
    document.getElementById('lane').appendChild(auto);
    actualizarCola();
}

function cambiarSemaforo() {
    if (semaforoEstado === 'rojo') {
        semaforoEstado = 'verde';
    } else {
        semaforoEstado = 'rojo';
    }
    actualizarSemaforo();
    if (semaforoEstado === 'verde' && colaAutos.length > 0) {
        setTimeout(cruzarAuto, 2000); // Tiempo para que un auto cruce
    }
}

function actualizarSemaforo() {
    const redLight = document.querySelector('.light.red');
    const yellowLight = document.querySelector('.light.yellow');
    const greenLight = document.querySelector('.light.green');

    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');

    if (semaforoEstado === 'rojo') {
        redLight.classList.add('active');
    } else if (semaforoEstado === 'verde') {
        greenLight.classList.add('active');
    }
}

function cruzarAuto() {
    if (colaAutos.length > 0) {
        const auto = colaAutos.shift();
        auto.style.transition = 'transform 2s';
        auto.style.transform = 'translateX(1000px)'; // Mueve el auto hacia la derecha
        setTimeout(() => {
            auto.remove();
        }, 2000); // Elimina el auto después de cruzar
        if (colaAutos.length > 0 && semaforoEstado === 'verde') {
            setTimeout(cruzarAuto, 2000); // Tiempo para que el siguiente auto cruce
        }
    }
}
function actualizarCola() {
    const lane = document.getElementById('lane');
    lane.innerHTML = '';
    colaAutos.forEach(auto => {
        lane.appendChild(auto);
    });
}

actualizarSemaforo();
