document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
  
        if (e.key ==="Escape")e.target.value = ""
  
        document.querySelectorAll(".grid-item").forEach(producto =>{
  
            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?producto.classList.remove("filtro")
              :producto.classList.add("filtro")
        })
  
    }
  
  
  })