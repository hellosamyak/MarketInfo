const apiKey = 'Your_Api_Key'; // Add your API key here
const symbol = 'NIFTY50'; // Assuming Nifty50 is the symbol in the API
const interval = '5min'; // 5-minute interval

document.getElementById('fetchDataBtn').addEventListener('click', async () => {
  const dataDisplay = document.getElementById('dataDisplay');
  dataDisplay.innerHTML = 'Fetching data...';

  // Correct API URL for fetching Nifty 50 5-min interval data
  const apiUrl = `https://api.marketstack.com/v1/intraday?access_key=${apiKey}&symbols=${symbol}&interval=${interval}&limit=1000`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const data = await response.json();
    displayData(data.data, dataDisplay);  // Assuming the response has `data` field
  } catch (error) {
    dataDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

function displayData(data, container) {
  container.innerHTML = ''; // Clear previous data

  data.forEach((item) => {
    const time = new Date(item.date).toLocaleString();  // Adjust based on response structure
    const price = item.close;  // Assuming `close` contains the closing price
    const entry = document.createElement('p');
    entry.textContent = `${time}: ${price}`;
    container.appendChild(entry);
  });
}
