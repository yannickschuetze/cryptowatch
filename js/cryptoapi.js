const api_url = 'https://api.coingecko.com/api/v3/'
let currency = 'usd'
let bitcoinPrice = 0
let calcPrice = 0

function getBitcoinPrice() {
    fetch(api_url + 'simple/price?ids=bitcoin&vs_currencies=usd')
    .then((res) => res.json())
    .then((data) => {
        bitcoinPrice = data.bitcoin.usd;
        getTrendingCoins()
    })
    .catch((err) => console.error("Rejected", err))
}

function getTopCoins() {
    fetch(api_url + 'coins/markets?vs_currency=' + currency + '&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        for(var i = 0; i < data.length; i++) {
            $('#crypto-top-' + i + ' .lds-ring').css('display', 'none')
            $('.dashboard__crypto-card--price').fadeIn('slow')
            $('.dashboard__crypto-card--image').fadeIn('slow')
            $('#crypto-top-' + i + ' .dashboard__crypto-card--title').text(data[i].name)
            $('#crypto-top-' + i + ' .dashboard__crypto-card--symbol').text(data[i].symbol)
            $('#crypto-top-' + i + ' .dashboard__crypto-card--price').text('$' + data[i].current_price)
            $('#crypto-top-' + i + ' .dashboard__crypto-card--image').attr("src", data[i].image)
        }
    })
    .catch((err) => console.error("Rejected", err))
}

function getTrendingCoins() {
    fetch(api_url + 'search/trending')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        for(var i = 0; i < 4; i++) {
            calcPrice = data.coins[i].item.price_btc * bitcoinPrice
            $('#crypto-trending-' + i + ' .lds-ring').css('display', 'none')
            $('#crypto-trending-' + i + ' .dashboard__crypto-card--title').text(data.coins[i].item.name)
            $('#crypto-trending-' + i + ' .dashboard__crypto-card--symbol').text(data.coins[i].item.symbol)
            $('#crypto-trending-' + i + ' .dashboard__crypto-card--price').text('$' + calcPrice.toFixed(2))
            $('#crypto-trending-' + i + ' .dashboard__crypto-card--image').attr("src", data.coins[i].item.small)
        }
    })
    .catch((err) => console.error("Rejected", err))
}

function refreshPrices() {
    console.log('Refreshing prices...')
    fetch(api_url + 'coins/markets?vs_currency=' + currency + '&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h')
    .then((res) => res.json())
    .then((data) => {
        for(var i = 0; i < data.length; i++) {
            $('#crypto-top-' + i + ' .dashboard__crypto-card--price').text('$' + data[i].current_price)
        }
        console.log('Prices refreshed')
    })
    .catch((err) => console.error("Rejected", err))
}

getBitcoinPrice()
getTopCoins()


var intervalId = window.setInterval(function(){
    refreshPrices()
  }, 10000)


