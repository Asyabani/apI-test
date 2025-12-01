document.addEventListener('DOMContentLoaded', () => {
  fetchCryptos();
});

async function fetchCryptos() {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');

  try {
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';

    const response = await fetch('https://api.coinlore.net/api/tickers/');
    if (!response.ok) {
      throw new Error('Response tidak OK: ' + response.status);
    }

    const json = await response.json();
    const cryptoList = json.data; // array data crypto dari API

    renderCryptoList(cryptoList);
    loadingEl.style.display = 'none';
  } catch (err) {
    console.error(err);
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
  }
}

function renderCryptoList(cryptoList) {
  const listEl = document.getElementById('crypto-list');
  listEl.innerHTML = ''; // bersihkan dulu

  // Jika ingin batasi misalnya 50 data pertama:
  // const limited = cryptoList.slice(0, 50);
  // for (const item of limited) { ... }

  cryptoList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'crypto-card';

    // Kiri
    const left = document.createElement('div');
    left.className = 'crypto-left';

    const rank = document.createElement('div');
    rank.className = 'crypto-rank';
    rank.textContent = `#${item.rank}`;

    const name = document.createElement('div');
    name.className = 'crypto-name';
    name.textContent = item.name;

    const symbol = document.createElement('div');
    symbol.className = 'crypto-symbol';
    symbol.textContent = item.symbol;

    left.appendChild(rank);
    left.appendChild(name);
    left.appendChild(symbol);

    // Kanan
    const right = document.createElement('div');
    right.className = 'crypto-right';

    const price = document.createElement('div');
    price.className = 'crypto-price';
    // Format harga jadi 2 digit desimal
    const priceValue = Number(item.price_usd || 0).toFixed(2);
    price.textContent = `$ ${priceValue}`;

    const priceLabel = document.createElement('div');
    priceLabel.className = 'crypto-price-label';
    priceLabel.textContent = 'Price (USD)';

    right.appendChild(price);
    right.appendChild(priceLabel);

    // Gabungkan ke card
    card.appendChild(left);
    card.appendChild(right);

    // Tambahkan ke list
    listEl.appendChild(card);
  });
}
