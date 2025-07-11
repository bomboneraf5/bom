const express = require('express');
const router = express.Router();

// Memoria temporal
const slots = {};
for (let h = 0; h < 24; h++) {
  const time = String(h).padStart(2, '0') + ':00';
  for (let cancha = 1; cancha <= 5; cancha++) {
    const key = `${cancha}_${time}`;
    slots[key] = { cancha, time, status: 'DISPONIBLE', name: '' };
  }
}

// Listar todos los slots
router.get('/', (req, res) => res.json(Object.values(slots)));

// Crear reserva
router.post('/', (req, res) => {
  const { cancha, time, name } = req.body;
  const key = `${cancha}_${time}`;
  if (slots[key] && slots[key].status === 'DISPONIBLE') {
    slots[key].status = 'RESERVADO';
    slots[key].name = name;
    return res.json(slots[key]);
  }
  res.status(400).json({ error: 'Slot no disponible' });
});

// Actualizar estado de un slot
router.put('/:cancha/:time/status', (req, res) => {
  const key = `${req.params.cancha}_${req.params.time}`;
  if (slots[key]) {
    slots[key].status = req.body.status;
    return res.json(slots[key]);
  }
  res.status(404).json({ error: 'Slot no encontrado' });
});

module.exports = router;
