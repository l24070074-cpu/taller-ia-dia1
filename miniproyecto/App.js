// Configuración: cambia API_URL al endpoint real si tienes un backend
const API_URL = 'http://localhost:3000/api/loans'; // ejemplo: ajustar según backend

// Elementos del DOM
const loanForm = document.getElementById('loanForm');
const studentNameInput = document.getElementById('studentName');
const matriculaInput = document.getElementById('matricula');
const bookTitleInput = document.getElementById('bookTitle');
const dueDateInput = document.getElementById('dueDate');
const container = document.getElementById('container');

// LocalStorage key para fallback
const LS_KEY = 'biblioteca_itsva_loans';

// Eventos
loanForm.addEventListener('submit', onSubmit);

document.addEventListener('DOMContentLoaded', () => {
  loadLoans();
});

async function loadLoans(){
  // Intenta obtener desde API
  try{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error('No hubo respuesta del servidor');
    const data = await res.json();

    // Si el backend devuelve {results: []} o un array directamente
    const loans = Array.isArray(data) ? data : (data.results || data);
    renderLoans(loans);
  }catch(err){
    console.warn('No se pudo obtener desde API, usando localStorage:', err.message);
    const local = getLocalLoans();
    renderLoans(local);
  }
}

async function onSubmit(e){
  e.preventDefault();
  const loan = {
    id: generateId(),
    studentName: studentNameInput.value.trim(),
    matricula: matriculaInput.value.trim(),
    bookTitle: bookTitleInput.value.trim(),
    dueDate: dueDateInput.value
  };

  if(!loan.studentName || !loan.matricula || !loan.bookTitle || !loan.dueDate){
    alert('Completa todos los campos');
    return;
  }

  // Intentar enviar al backend
  try{
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loan)
    });

    if(!res.ok) throw new Error('Error al guardar en el servidor');

    // Si el servidor devuelve el objeto creado, refrescar lista
    await loadLoans();
    loanForm.reset();
  }catch(err){
    console.warn('POST falló, guardando en localStorage:', err.message);
    // Guardar en localStorage
    saveLocalLoan(loan);
    // Re-render
    const all = getLocalLoans();
    renderLoans(all);
    loanForm.reset();
  }
}

function renderLoans(loans){
  container.innerHTML = '';
  if(!loans || loans.length === 0){
    container.innerHTML = '<div class="empty">No hay préstamos registrados</div>';
    return;
  }

  loans.forEach(l => {
    const card = document.createElement('div');
    card.className = 'loan-card';

    const title = document.createElement('div');
    title.className = 'loan-title';
    title.textContent = l.bookTitle;

    const stud = document.createElement('div');
    stud.className = 'loan-sub';
    stud.textContent = `${l.studentName} — Matrícula: ${l.matricula}`;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `Entrega: ${formatDate(l.dueDate)}`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-del';
    delBtn.textContent = 'Eliminar';
    delBtn.addEventListener('click', () => removeLoan(l.id));

    actions.appendChild(delBtn);

    card.appendChild(title);
    card.appendChild(stud);
    card.appendChild(meta);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

async function removeLoan(id){
  // Intentar borrar en backend
  try{
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if(!res.ok) throw new Error('No se pudo borrar en servidor');
    await loadLoans();
  }catch(err){
    // fallback: borrar en localStorage
    deleteLocalLoan(id);
    renderLoans(getLocalLoans());
  }
}

// --- Helpers localStorage ---
function getLocalLoans(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch{ return []; }
}

function saveLocalLoan(loan){
  const all = getLocalLoans();
  all.unshift(loan);
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

function deleteLocalLoan(id){
  const all = getLocalLoans();
  const filtered = all.filter(x => String(x.id) !== String(id));
  localStorage.setItem(LS_KEY, JSON.stringify(filtered));
}

// Utilities
function formatDate(dateStr){
  if(!dateStr) return '—';
  const d = new Date(dateStr);
  if(isNaN(d)) return dateStr;
  return d.toLocaleDateString();
}

function generateId(){
  return 'l_' + Math.random().toString(36).slice(2,9);
}

// Nota: Si tienes un backend con la API REST, ajústalo en `API_URL`.
// Backend esperado (ejemplo):
// GET  /api/loans          -> devuelve array de préstamos
// POST /api/loans          -> crea nuevo préstamo (recibe objeto JSON)
// DELETE /api/loans/:id    -> elimina préstamo por id

