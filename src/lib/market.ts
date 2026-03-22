export async function getMarketData() {
    try {
        const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL");
        if (!res.ok) return null;
        const data = await res.json();

        return {
            usd: data.USDBRL,
            eur: data.EURBRL,
            btc: data.BTCBRL,
        };
    } catch (error) {
        console.error("Error fetching market data", error);
        return null;
    }
}
