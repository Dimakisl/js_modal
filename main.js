let cpus = [
    {id: 1, title: 'AMD Ryzen 1300', price: 100, img: 'https://www.ixbt.com/img/n1/news/2020/4/1/ryzen_large.JPG'},
    {id: 2, title: 'AMD Ryzen 3600', price: 200, img: 'https://3dnews.ru/assets/external/illustrations/2020/06/29/1014481/apu_01.jpg'},
    {id: 3, title: 'AMD Ryzen 7600', price: 300, img: 'https://3dnews.ru/assets/external/illustrations/2020/06/10/1013101/AMD-vermeer_navi2x_01.jpg'},
];

const toHTML = (cpu) => {
    return `
        <div class="col">
        <div class="card">
            <img src="${cpu.img}" style="height: 150px"class="card-img-top" alt=${cpu.title}>
            <div class="card-body">
            <h5 class="card-title">${cpu.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${cpu.id}">Подробнее</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${cpu.id}">Удалить</a>
            </div>
        </div>
        </div>
    `
}

function render(){
    const html = cpus.map(toHTML).join('');
    document.querySelector('#cpu').innerHTML = html;
}

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler(){
            priceModal.close();
        }},
        {text: 'Закрыть', type: 'danger', handler(){
            priceModal.close();
        }},
    ]
});

// const confirmModal = $.modal({
//     title: 'Вы уверены?',
//     closable: true,
//     width: '400px',
//     footerButtons: [
//         {text: 'Отменить', type: 'primary', handler(){
//             confirmModal.close();
//         }},
//         {text: 'Удалить', type: 'danger', handler(){
//             confirmModal.close();
//         }},
//     ]
// });

render();

document.addEventListener('click', (e) => {
    e.preventDefault();
    const id = +e.target.dataset.id;
    const cpu = cpus.find((c) => c.id === id);
   
    if(e.target.dataset.btn === 'price'){
        
        priceModal.setContent(`
        <p>Цена на ${cpu.title}: <strong>${cpu.price} $</strong></p>
    `)
        priceModal.open();
    }
    else if(e.target.dataset.btn === 'remove'){
        $.confirm({
            title: 'Вы уверены?',
            content: `
            <p>Вы удаляете: <strong>${cpu.title}</strong></p>
            `
        }).then(() => {
            console.log('Удалить');
            cpus = cpus.filter((c) => c.id !== id);
            render();
        })
        .catch(() => {
            console.log('Отмена');
        })
        // confirmModal.open();
        // confirmModal.setContent(`
        // <p>Вы удаляете: <strong>${cpu.title}</strong></p>
        // `)
        // confirmModal.open();

    }
})