window.addEventListener('DOMContentLoaded', ()=> {
    fetch('http://localhost:3000/paquetes')
    .then(response => response.json())
    .then(paquetes => {
        renderizarPaquetes(paquetes)
    })
    .catch(er => console.log(er))
    .finally(() => console.log('final'))
})

function renderizarPaquetes(paquetes) {
    paquetes.forEach(({img, destino, año, salida, precio}) =>{
        const paqueteHTML = 
        `
        <div class="col">
        <div class="card shadow h-100">
            <img src="${img}" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title">${destino} ${año} DESDE ${salida}</h3>
                <p class="card-text">desde U$S ${precio}</p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-primary">Ver más</a>
            </div>
        </div>
        </div>
        </div>
        
        `;
        document.getElementById('paquetes').innerHTML += paqueteHTML;
    })


    const trasladoPaquetes = ['Aerolíneas Argentinas', 'JetSmart', 'FlyBondi', 'Todas']

    trasladoPaquetes.forEach(traslado => {

        const btn = document.createElement('button');
        btn.innerHTML = traslado;
        btn.classList.add('btn', 'btn-primary', 'm-2');

        btn.addEventListener('click', ()=>{
            if(traslado === 'Todas') {

                document.getElementById('paquetes').innerHTML = "";

                fetch('http://localhost:3000/paquetes')
                .then((response) => response.json())
                .then(paquete => {
                    paquete.forEach(paquete =>{

                        const paqueteHTML = 
                        `
                        <div class="col">
                        <div class="card shadow h-100">
                            <img src="${paquete.img}" class="card-img-top">
                            <div class="card-body">
                                <h3 class="card-title">${paquete.destino} ${paquete.año} DESDE ${paquete.salida}</h3>
                                <p class="card-text">desde U$S ${paquete.precio}</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="btn btn-primary">Ver más</a>
                            </div>
                        </div>
                        </div>
                        </div>
                        
                        `;
                        document.getElementById('paquetes').innerHTML += paqueteHTML;

                    })
                })
                .catch((err) => console.error(err))
                .finally(() => console.log('Todas completo'))

            } else {
                const paqueteFiltrados = paquetes.filter(paq => paq.traslado === traslado)

                console.log(paqueteFiltrados)

                document.querySelector('#paquetes').innerHTML = ""

                paqueteFiltrados.forEach(paquete =>{

                    const paqueteHTML = 
                        `
                        <div class="col">
                        <div class="card shadow h-100">
                            <img src="${paquete.img}" class="card-img-top">
                            <div class="card-body">
                                <h3 class="card-title">${paquete.destino} ${paquete.año} DESDE ${paquete.salida}</h3>
                                <p class="card-text">desde U$S ${paquete.precio}</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="btn btn-primary">Ver más</a>
                            </div>
                        </div>
                        </div>
                        </div>
                        
                        `;
                        document.getElementById('paquetes').innerHTML += paqueteHTML;
                })
            }
        })

        document.querySelector('#traslados').appendChild(btn);
    })
}



