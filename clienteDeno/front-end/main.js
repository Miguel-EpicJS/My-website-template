async function getSubmit() {
    const cards = document.querySelector(".cards");

    const value = document.querySelector("#getSubmit").value;
    cards.innerHTML = ''
    if (value === '') {
        const url = 'http://127.0.0.1:3000/cliente';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    insert(i, data);
                }
            })
            .catch(err => console.log(err));
    } else {
        const url = `http://127.0.0.1:3000/cliente/${value}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    insert(i, data);
                }
            })
            .catch(err => console.log(err));
    }

    function insert(i, data) {
        const card = document.createElement("div");
        const ul = document.createElement("ul");
        const liId = document.createElement("li");
        const liName = document.createElement("li");
        const liPrice = document.createElement("li");
        const liDate = document.createElement("li");
        const liDesc = document.createElement("li");
        const textId = document.createTextNode(data[i].id);
        const textName = document.createTextNode(data[i].name);
        const textPrice = document.createTextNode(data[i].price);
        const textDate = document.createTextNode(data[i].date);
        const textDesc = document.createTextNode(data[i].desc);

        liId.appendChild(textId)
        liName.appendChild(textName)
        liPrice.appendChild(textPrice)
        liDate.appendChild(textDate)
        liDesc.appendChild(textDesc)

        card.className = ' card';
        ul.appendChild(liId)
        ul.appendChild(liName)
        ul.appendChild(liPrice)
        ul.appendChild(liDate)
        ul.appendChild(liDesc)
        card.appendChild(ul)
        cards.appendChild(card)
    }
}

async function postSubmit() {
    const cards = document.querySelector(".cards");
    const card = document.createElement("div");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const h1 = document.createElement("h1");
    const text = document.createTextNode("Cliente Criado Com Sucesso!")
    const name = document.querySelector("#postNome").value;
    const price = document.querySelector("#postPrice").value;
    const date = document.querySelector("#postDate").value;
    const desc = document.querySelector("#postDesc").value;

    const data = { name: name, price: price, date: date, desc: desc };

    const url = "http://127.0.0.1:3000/cliente";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err));

    h1.appendChild(text)
    li.appendChild(h1)
    ul.appendChild(li)
    card.appendChild(ul)
    cards.appendChild(card)
}

async function putSubmit() {
    const cards = document.querySelector(".cards");
    const card = document.createElement("div");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const h1 = document.createElement("h1");
    const text = document.createTextNode("Cliente Alterado Com Sucesso!")
    const id = document.querySelector("#putId").value;
    const name = document.querySelector("#putNome").value;
    const price = document.querySelector("#putPrice").value;
    const date = document.querySelector("#putDate").value;
    const desc = document.querySelector("#putDesc").value;

    const data = { name: name, price: price, date: date, desc: desc };

    const url = `http://127.0.0.1:3000/cliente/${id}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err));

    h1.appendChild(text)
    li.appendChild(h1)
    ul.appendChild(li)
    card.appendChild(ul)
    cards.appendChild(card)
}

async function deleteSubmit() {
    const cards = document.querySelector(".cards");
    const card = document.createElement("div");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const h1 = document.createElement("h1");
    const text = document.createTextNode("Cliente Deletado Com Sucesso!")
    const id = document.querySelector("#deleteId").value;

    const url = `http://127.0.0.1:3000/cliente/${id}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err));

    h1.appendChild(text)
    li.appendChild(h1)
    ul.appendChild(li)
    card.appendChild(ul)
    cards.appendChild(card)
}

