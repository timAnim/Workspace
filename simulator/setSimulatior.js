function setSimulator(){

    let div = document.createElement('div');
    div.innerHTML = `
        ×
        
    `
    div.style = "position:absolute; z-index:999; height:360px; width:480px; left:50%; top:8px; margin:0; padding:0; margin-left:-240px; background: white; border:1px solid #bdbdbd;"
    
    
    document.body.appendChild(div);
    function closeInp(ev){
        div.parentNode.removeChild(div)
    }
}
