const api_url = 'https://api.coingecko.com/api/v3/'
const currency = 'usd'

function getTopCoins() {
    fetch(api_url + 'coins/markets?vs_currency=' + currency + '&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        for(var i = 0; i < data.length; i++) {
            console.log(data[i].name)
            $('#crypto-top-' + i + ' .lds-ring').css('display', 'none')
            $('.dashboard__crypto-card--price').fadeIn('slow')
            $('#crypto-top-' + i + ' .dashboard__crypto-card--title').text(data[i].name + ' (' + data[i].symbol + ')')
            $('#crypto-top-' + i + ' .dashboard__crypto-card--price').text(data[i].current_price + '$')

        }
    })
    .catch((err) => console.error("Rejected", err))
    // apiLoaded()
}

function getTrendingCoins() {
    fetch(api_url + 'search/trending')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        for(var i = 0; i < 4; i++) {
            $('#crypto-trending-' + i + ' .lds-ring').css('display', 'none')
            $('#crypto-trending-' + i + ' .dashboard__crypto-card--title').text(data.coins[i].item.name + ' (' + data.coins[i].item.symbol + ')')
        }
    })
    .catch((err) => console.error("Rejected", err))
    //apiLoaded()
}

function refreshPrices() {
    fetch(api_url + 'coins/markets?vs_currency=' + currency + '&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        for(var i = 0; i < data.length; i++) {
            console.log(data[i].name)
            $('#crypto-top-' + i + ' .dashboard__crypto-card--price').text(data[i].current_price + ' ' + currency)
        }
    })
    .catch((err) => console.error("Rejected", err))
}

getTopCoins()
getTrendingCoins()

var intervalId = window.setInterval(function(){
    refreshPrices()
  }, 10000)


