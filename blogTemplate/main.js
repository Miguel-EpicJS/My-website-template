const createPost = document.querySelector('.create-container')
const readPost = document.querySelector('.read-container')
const updatePost = document.querySelector('.update-container')
const deletePost = document.querySelector('.delete-container')
const btnCreatePost = document.querySelector('#btnCreate')
const btnReadPost = document.querySelector('#btnRead')
const btnUpdatePost = document.querySelector('#btnUpdate')
const btnDeletePost = document.querySelector('#btnDelete')
const submitCreate = document.querySelector('#submit-create');
const submitRead = document.querySelector('#submit-read');
const submitUpdate = document.querySelector('#submit-update');
const submitDelete = document.querySelector('#submit-delete');

btnCreatePost.addEventListener('click', () => {
    createPost.classList.remove('none');
    readPost.classList.add('none');
    updatePost.classList.add('none');
    deletePost.classList.add('none');
})
btnReadPost.addEventListener('click', () => {
    createPost.classList.add('none');
    readPost.classList.remove('none');
    updatePost.classList.add('none');
    deletePost.classList.add('none');
    getPostsBlog();
})
btnUpdatePost.addEventListener('click', () => {
    createPost.classList.add('none');
    readPost.classList.add('none');
    updatePost.classList.remove('none');
    deletePost.classList.add('none');
})
btnDeletePost.addEventListener('click', () => {
    createPost.classList.add('none');
    readPost.classList.add('none');
    updatePost.classList.add('none');
    deletePost.classList.remove('none');
})


submitCreate.addEventListener('click', async () => {

    const url = "http://127.0.0.1:8000/article";
    const title = document.querySelector('#title-create').value;
    const info = document.querySelector('#info-create').value;
    const desc = document.querySelector('#desc-create').value;
    const article = document.querySelector('#article-create').value;
    const data = { title: `${title}`, info: `${info}`, desc: `${desc}`, article: `${article}` };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(
        result => result.json()
    ).then((result) => {
        if (result === true) {
            alert("Post Create Successfully")
        } else { alert("Something is wrong") }
    });

});

function getPostsBlog()
{
    const url = `http://127.0.0.1:8000/article/`;
    fetch(url, { 
        method: 'GET', 
        headers: { 
            'Content-type': 'application/json'
        } 
    })
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.length; i++)
        {
            const cards = document.querySelector('#cards');
            const card = createCard(data[i]['title'], data[i]['info'], data[i]['desc'], data[i]['article'])
            cards.appendChild(card);
        }
    });
}

function createCard(titleText, infoText, descText, articleText)
{
    const card = document.createElement('div');
    const title = document.createElement('p');
    const info = document.createElement('p');
    const desc = document.createElement('p');
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const article = document.createElement('p');
    article.classList.add('article-read');
    card.classList.add('card');
    desc.classList.add('desc-read');
    info.classList.add('info-read');
    title.classList.add('title-read');

    const NodeTitleText = document.createTextNode(titleText);
    const NodeInfoText = document.createTextNode(infoText);
    const NodeDescText = document.createTextNode(descText);
    const NodeArticleText = document.createTextNode(articleText);

    title.appendChild(NodeTitleText);
    info.appendChild(NodeInfoText);
    desc.appendChild(NodeDescText);
    article.appendChild(NodeArticleText);

    details.appendChild(article);
    card.appendChild(title);
    card.appendChild(info);
    card.appendChild(desc);
    card.appendChild(details);
    
    return card;
}