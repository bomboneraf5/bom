const api = '/api/reservations';

async function loadSlots() {
  const res = await fetch(api);
  const data = await res.json();
  const c = document.getElementById('slots');
  c.innerHTML = '';
  data.forEach(s => {
    const d = document.createElement('div');
    d.className = 'slot ' + s.status;
    d.textContent = `${s.time}\n${s.status}${s.name? '\n'+s.name : ''}`;
    d.onclick = () => openModal(s);
    c.appendChild(d);
  });
}

function openModal(s) {
  if (s.status !== 'DISPONIBLE') return;
  document.getElementById('resCancha').value = s.cancha;
  document.getElementById('resTime').value = s.time;
  document.getElementById('modalReserva').classList.remove('hidden');
}

document.getElementById('formReserva').onsubmit = async e => {
  e.preventDefault();
  const body = {
    cancha: +e.target.resCancha.value,
    time: e.target.resTime.value,
    name: e.target.resName.value
  };
  await fetch(api, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  document.getElementById('modalReserva').classList.add('hidden');
  loadSlots();
};

window.onload = loadSlots;
