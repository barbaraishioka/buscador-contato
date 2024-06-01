const input = document.querySelector("input");
const search = document.querySelector("button#search");
const call = document.querySelector("button#call");
const p = document.querySelector("p");

const contacts = [
  { name: "Lua", number: "(99) 99999-3434" },
  { name: "Mia", number: "(99) 99999-3535" },
  { name: "João", number: "(99) 99999-3636" },
  { name: "José", number: "(99) 99999-3737" },
  { name: "Paulo", number: "(99) 99999-3838" },
];

let currentContactNumber = null;

function buscarContato() {
  let found = false;

  for (const contact of contacts) {
    const inputValue = input.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const contactName = contact.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (inputValue === contactName) {
      p.innerHTML = contact.name + " - " + contact.number;
      found = true;
      currentContactNumber = contact.number.replace(/[^\d]/g, "");
      call.style.display = "block";
      call.focus();
      break;
    }
  }

  if (!found) {
    call.style.display = "none";
    p.innerHTML = "Contato não encontrado.";
    search.focus();
  }

  if (input.value === "" || input.value === null) {
    p.innerHTML = "Digite um nome.";
    search.focus();
  }

  input.value = "";
}

function ligar() {
  if (currentContactNumber) {
    window.location.href = `tel:+55${currentContactNumber}`;
  }
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    buscarContato();
  }
});

search.addEventListener("click", buscarContato);
call.addEventListener("click", ligar);
