(function loadApi(){

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://restcountries.com/v3.1/lang/spa', true);

    xhr.onload = function(){
       
        if (this.status === 200) {

            const data = JSON.parse(this.responseText);
            
            class AppPais extends HTMLElement {
                constructor(){
                    super();
                }
            }
        
            customElements.define('app-pais', AppPais); 

            data.forEach((element, index) => {

                if (index < 12) {
                    
                    let pais = element.name.common;
                    let capital = element.capital[0];
                    let poblacion = NumberMillion(element.population)
                    let continente = element.continents[0];
                    var appPais = new AppPais();
                    appPais.classList = 'main__card-content';
                    appPais.innerHTML = `
                        <div class="main__card" data-element="${continente}">
                            <div class="main__pais">
                                <span class="p-label">País:</span>
                                <span class="p-data">${pais}</span>
                            </div>
                            <div class="main__capital">
                                <span class="p-label">Capital:</span>
                                <span class="p-data">${capital}</span>
                            </div>
                            <div class="main__poblacion">
                                <span class="p-label">Población:</span>
                                <span class="p-data">${poblacion}</span>
                            </div>
                        </div>
                    `;                
                    document.getElementById('paises').appendChild(appPais);

                }
                
            });

          
            document.querySelectorAll('.main__card-content').forEach((item, index) => {
                
                item.addEventListener('click', event => {
                    let element = document.querySelector('.main__card');
                    let dContinente = element.getAttribute('data-element');
                    let modal = document.querySelector('.portfolio__modal');
                    let sContinente = document.getElementById('modalData');
                    sContinente.textContent = dContinente;
                    modal.classList.add('active-modal');
                })

            })
            
        }else{
            console.log('no hay datos')
            document.getElementById('paises').innerHTML = '<p class="alert">No se encontraron datos</p>';
        }
    }

    xhr.send()
})()

// boton cerrar modal
var btnClose = document.getElementById('close');
btnClose.addEventListener('click', event => {
    const existsClass = document.getElementById('modal');
    if (existsClass.classList.contains('active-modal')) {
        existsClass.classList.remove('active-modal');
    }
})

// Agregar fecha actual
var dateAdd = document.getElementById('fecha').textContent = getDateNow();

function getDateNow(){
    
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
        return `${day}/0${month}/${year}`
    }else{
        return `${day}/${month}/${year}`
    }
}

function NumberMillion(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
