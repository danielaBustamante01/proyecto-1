let flag=false;
const traerInfo=async()=>{
 
    let info= await fetch("https://rickandmortyapi.com/api/character")
                    .then(respuesta => respuesta.json())
                    .catch(error => console.log("HAY UN ERROR!!" +error))
    return info
    
}

const inicio=async()=>{
   let dato= await traerInfo()
   mostarInfo(dato.results)
}
const mostarInfo =(data)=>{

   let infoPersonajes= data
     infoPersonajes.forEach(personaje => {
        let card=document.createElement('div');
         card.classList.add("card","m-2","p-2","d-flex","flex-row","justify-content-between","align-items-center");
        card.innerHTML=`
                     <div class="d-flex flex-column justify-content-between align-items-center" >
                        <img  src="${personaje.image}"/>
                        <h3>${personaje.name}</h3>
                        <button class="btn btn-active align-self-end more" onclick="showMore(event)" id="b${personaje.id}">Now More..</button>
                     </div> 
                     <div class="more-info p-5 flex-column align-items-center ch${personaje.id}">
                        <button class="btn btn-active d-flex align-self-end m-2 " onclick="closeMore(event)" id="x${personaje.id}">X</button>
                        <ul class="list-group"  >
                           <li class="list-group-item p-3" >
                              <div class="fw-bold">Character status ${personaje.status}
                              </div>                            
                           </li>

                           <li class="list-group-item p-3" >
                              <div class="ms-2 me-auto">
                              Species
                                 <div class="fw-bold">${personaje.species}</div>
                               </div>

                           </li>
                           <li class="list-group-item p-3" >
                           <div class="ms-2 me-auto">
                           Origin
                              <div class="fw-bold">${personaje.origin.name}</div>
                            </div>
                            
                           </li>
                           <li class="list-group-item p-3" >
                           <div class="ms-2 me-auto">
                              Gender
                              
                              <div class="fw-bold">${personaje.gender}</div>
                              </div>
                           </li>                  
                        </ul>
                     </div>     
         `
        document.querySelector(".cards-section").appendChild(card)
     });

}
inicio()


const showMore=(e)=>{
   e.target.style.display="none"
   let numId=e.target.id.slice(1)
   document.querySelector(`.ch${numId}`).style.display="flex"
}
const closeMore=(e)=>{
   let idButton= e.target.id.slice(1);

   document.querySelector(`.ch${idButton}`).style.display="none"
   document.querySelector(`#b${idButton}`).style.display="block"
}

const filterCh=async(e)=>{
   document.querySelector(".cards-section").innerHTML=``;
   if(flag == false){
      let dato= await traerInfo()
      let resultadoFiltrado;
      if(e.target.id === "Alive" || e.target.id === "Dead"){
       resultadoFiltrado= dato.results.filter((ch)=> ch.status == e.target.id)
      
      }
      if(e.target.id === "Male" || e.target.id === "Female"){
         resultadoFiltrado= dato.results.filter((ch)=> ch.gender == e.target.id)
         
      }
      if(e.target.id === "unknown"){
         resultadoFiltrado= dato.results.filter((ch)=> ch.origin.name == e.target.id)
         
      }
      mostarInfo(resultadoFiltrado)
   }else{
      inicio()
   }
   flag=!flag   
}