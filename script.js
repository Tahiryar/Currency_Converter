async function GetExchange(baseCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    if (!response.ok) {
        throw new Error("Error! Can't convert");
    }
    const data = await response.json();
    return data.rates;
}

function Convert_Currency(amount, fromRate, toRate) {
    return (amount / fromRate) * toRate;
}

document.getElementById("convertButton").addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    try {
        const rates = await GetExchange(fromCurrency);
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const convertedAmount = Convert_Currency(amount, fromRate, toRate);
        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
});