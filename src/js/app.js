sendRequest()
function sendRequest() {
    fetch("https://key48798231.herokuapp.com/weather?city=tehran", {
        method: "GET",
    }).then((res) =>{
        res.json().then(output => showResult(output)) 
    }).catch(error =>{
        console.log(error);
    })
}

function showResult(data){
    console.log(data)
}
