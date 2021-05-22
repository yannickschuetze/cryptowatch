const api_url = 'https://api.coinlore.net/api/ticker/?id='
const coins = {
    btc: 90,
    eth: 80,
    ada: 257,
    doge: 2
}

function getCoins() {
    for (const [key, value] of Object.entries(coins)) {
        const priceCoin = document.getElementById('price' + key)

        fetch(api_url + value)
        .then((res) => res.json())
        .then((data) => {
            priceCoin.innerHTML = data["0"].price_usd + ' USD'

            if(data["0"].percent_change_24h  <= 0) {
                $('.dashboard__crypto-card--status').text('↘')
                $('.dashboard__crypto-card--status').css('color', 'red')
            } else {
                $('.dashboard__crypto-card--status').text('↗')
                $('.dashboard__crypto-card--status').css('color', 'green')
            }

            console.log(data)

        })
        .catch((err) => console.error("Rejected", err))
        apiLoaded()
    }
}

function apiLoaded() {
    $('.lds-ring').css('display', 'none')
    
    $('.dashboard__crypto-card--price').fadeIn('slow')


}


var intervalId = window.setInterval(function(){
    getCoins()
  }, 3000)


