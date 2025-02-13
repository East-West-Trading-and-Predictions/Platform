// script.js - Handles interactivity, API integrations, and dynamic features

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Platform JS Loaded Successfully");

    // Smooth Scroll for Navbar
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Dark Mode Toggle
    const toggleDarkMode = document.getElementById("darkModeToggle");
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });

        // Keep preference stored
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }

    // Fetch Live Market Data (Example: Yahoo Finance API)
    async function fetchMarketData() {
        const url = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,GOOGL,MSFT";
        try {
            let response = await fetch(url);
            let data = await response.json();
            displayMarketData(data);
        } catch (error) {
            console.error("❌ Error fetching market data: ", error);
        }
    }

    function displayMarketData(data) {
        const stockContainer = document.getElementById("market-data");
        if (!stockContainer) return;

        stockContainer.innerHTML = data.quoteResponse.result.map(stock => `
            <div class="stock-item">
                <h3>${stock.shortName} (${stock.symbol})</h3>
                <p>Price: $${stock.regularMarketPrice.toFixed(2)}</p>
                <p>Change: <span class="${stock.regularMarketChange >= 0 ? 'green' : 'red'}">
                    ${stock.regularMarketChange.toFixed(2)} (${stock.regularMarketChangePercent.toFixed(2)}%)
                </span></p>
            </div>
        `).join('');
    }

    // Fetch market data every 30 seconds
    setInterval(fetchMarketData, 30000);
    fetchMarketData();

    // Fetch Latest News (Example: CNBC API)
    async function fetchNews() {
        const url = "https://newsapi.org/v2/top-headlines?sources=cnn,bloomberg,cnbc&apiKey=YOUR_NEWS_API_KEY";
        try {
            let response = await fetch(url);
            let data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error("❌ Error fetching news: ", error);
        }
    }

    function displayNews(articles) {
        const newsContainer = document.getElementById("news-section");
        if (!newsContainer) return;

        newsContainer.innerHTML = articles.map(article => `
            <div class="news-item">
                <a href="${article.url}" target="_blank">
                    <img src="${article.urlToImage || 'default-news.jpg'}" alt="News Image">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                </a>
            </div>
        `).join('');
    }

    fetchNews();

    // Placeholder for Plaid API Integration
    async function connectPlaid() {
        console.log("🔗 Connecting to Plaid...");
        // Replace with actual Plaid authentication logic
    }

    const plaidButton = document.getElementById("connectPlaid");
    if (plaidButton) {
        plaidButton.addEventListener("click", connectPlaid);
    }
});
