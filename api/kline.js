export default async function handler(req, res) {
  const { symbol = 'DOGE-USDT-SWAP', bar = '1H', limit = 100 } = req.query;
  
  try {
    const url = `https://www.okx.com/api/v5/market/candles?instId=${symbol}&bar=${bar}&limit=${limit}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 'no-cache, max-age=0');
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ code: '500', msg: error.message, data: null });
  }
}
