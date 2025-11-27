// apibarber.js
// Sistema simple para administrar citas de MAYAN BARBER

// Lista interna de horarios (horas enteras) de 10:00 AM a 10:00 PM
const START_HOUR = 10; // 10 AM
const END_HOUR = 22;   // 10 PM

// Estructura en memoria para las citas
const appointments = [];

// Elementos DOM
const timeSelect = document.getElementById('timeSelect');
const bookingForm = document.getElementById('bookingForm');
const messageDiv = document.getElementById('message');
const appointmentsList = document.getElementById('appointmentsList');

// Inicializar select de horarios y listeners
function init(){
  populateTimeOptions();
  renderAppointments();
  bookingForm.addEventListener('submit', onSubmit);
}

// Genera array de strings con formato 12h: 10:00 AM, 11:00 AM, ..., 10:00 PM
function generateTimeSlots(){
  const slots = [];
  for(let h = START_HOUR; h <= END_HOUR; h++){
    slots.push(formatHour(h));
  }
  return slots;
}

// Pone las opciones en el select
function populateTimeOptions(){
  const slots = generateTimeSlots();
  timeSelect.innerHTML = '';
  slots.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    timeSelect.appendChild(opt);
  });
}

// Formatea hora 24 -> "HH:MM AM/PM"
function formatHour(hour24){
  const hour = ((hour24 + 11) % 12) + 1; // 12-hour
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  return `${String(hour).padStart(2,'0')}:00 ${ampm}`;
}

// Valida si un horario está disponible
function isSlotAvailable(timeStr){
  return !appointments.some(a => a.time === timeStr);
}

// Registrar cita (si está disponible)
function registerAppointment({name, cutType, time}){
  if(!isSlotAvailable(time)){
    showMessage('Este horario ya ha sido ocupado', 'error');
    return false;
  }
  const appointment = {
    id: 'c_' + Date.now(),
    name,
    cutType,
    time
  };
  appointments.push(appointment);
  showMessage('Cita agendada', 'success');
  renderAppointments();
  console.log('Citas actuales:', appointments);
  return true;
}

// Manejo del submit del formulario
function onSubmit(e){
  e.preventDefault();
  const name = document.getElementById('clientName').value.trim();
  const cutType = document.getElementById('cutType').value;
  const time = document.getElementById('timeSelect').value;

  if(!name){
    showMessage('Ingrese el nombre del cliente', 'error');
    return;
  }

  registerAppointment({name, cutType, time});

  // opcional: limpiar nombre después de registrar
  document.getElementById('clientName').value = '';
}

// Mostrar mensajes en pantalla
function showMessage(text, type){
  messageDiv.textContent = text;
  messageDiv.className = 'msg ' + (type === 'success' ? 'success' : 'error');
  setTimeout(() => { messageDiv.textContent = ''; messageDiv.className = ''; }, 3000);
}

// Renderizar lista de citas en pantalla
function renderAppointments(){
  appointmentsList.innerHTML = '';
  if(appointments.length === 0){
    appointmentsList.innerHTML = '<div class="empty">No hay citas agendadas</div>';
    return;
  }

  // Ordenar por hora (opcional)
  const sorted = appointments.slice().sort((a,b) => compareTime(a.time, b.time));

  sorted.forEach(app => {
    const div = document.createElement('div');
    div.className = 'appoint';

    const title = document.createElement('div');
    title.className = 'loan-title';
    title.textContent = app.name;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<strong>Hora:</strong> ${app.time} &nbsp; <strong>Servicio:</strong> ${app.cutType}`;

    div.appendChild(title);
    div.appendChild(meta);

    appointmentsList.appendChild(div);
  });
}

// Comparador simple para strings "HH:MM AM/PM" -> convertir a minutos desde 00:00
function compareTime(t1, t2){
  return timeToMinutes(t1) - timeToMinutes(t2);
}

function timeToMinutes(t){
  // ejemplo: "10:00 AM"
  const [hm, ampm] = t.split(' ');
  const [hh, mm] = hm.split(':').map(Number);
  let h24 = hh % 12;
  if(ampm === 'PM') h24 += 12;
  return h24 * 60 + mm;
}

// Inicializar módulo
init();

// Exponer funciones para testing desde consola (opcional)
window._barber = {
  appointments,
  generateTimeSlots,
  isSlotAvailable,
  registerAppointment
};
