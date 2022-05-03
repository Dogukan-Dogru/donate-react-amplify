var eth = document.getElementById("ethereum");

var settings = {
    "async" : true,
    "scrossDomain" : true,
    "url" : "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    "method" : "GET",
    "headers" : {}
}

$.ajax(settings).done(function (response){
    eth.innerHTML = response.ethereum.usd;
});