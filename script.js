const CONFIG = {
    defaultCity: "Bandar Lampung",
    updateInterval: 300000 
};

let state = {
    city: CONFIG.defaultCity,
    isCelsius: true,
    lastWeatherData: null,
    lastForecastData: null,
    debounceTimer: null,
};

const EL = {
    html: document.documentElement,
    themeBtn: document.getElementById("themeToggle"),
    themeIcon: document.querySelector("#themeToggle i"),
    unitBtn: document.getElementById("unitToggle"),
    cityInput: document.getElementById("cityInput"),
    citySuggestions: document.getElementById("citySuggestions"),
    searchBtn: document.getElementById("searchBtn"),
    refreshBtn: document.getElementById("refreshBtn"),
    saveFavBtn: document.getElementById("saveFavBtn"),
    weatherContent: document.getElementById("weatherContent"),
    loading: document.getElementById("loadingIndicator"),
    errorMsg: document.getElementById("errorMessage"),
    errorText: document.getElementById("errorText"),
    favList: document.getElementById("favoritesList"),
    cityName: document.getElementById("cityName"),
    timestamp: document.getElementById("timestamp"),
    lastUpdated: document.getElementById("lastUpdated"), 
    weatherDesc: document.getElementById("weatherDesc"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("windSpeed"),
    weatherIcon: document.getElementById("weatherIcon"),
    temperature: document.getElementById("temperature"),
    tempUnit: document.getElementById("tempUnit"),
    forecastGrid: document.getElementById("forecastGrid"),
    notification: document.getElementById("notification"),
    notifText: document.getElementById("notifText"),
};

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupEvents();
    fetchWeatherData();
    setInterval(fetchWeatherData, CONFIG.updateInterval);
});

function initTheme() {
    const saved = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved === "dark" || (!saved && system));
}

function setTheme(dark) {
    if (dark) {
        EL.html.classList.add("dark");
        EL.themeIcon.className = "fas fa-sun";
        localStorage.setItem("theme", "dark");
    } else {
        EL.html.classList.remove("dark");
        EL.themeIcon.className = "fas fa-moon";
        localStorage.setItem("theme", "light");
    }
}

function setupEvents() {
    EL.themeBtn.onclick = () => setTheme(!EL.html.classList.contains("dark"));

    EL.unitBtn.onclick = () => {
        state.isCelsius = !state.isCelsius;
        if (state.lastWeatherData) renderWeather(state.lastWeatherData);
        if (state.lastForecastData) renderForecast(state.lastForecastData);
    };

    EL.cityInput.oninput = () => {
        clearTimeout(state.debounceTimer);
        const query = EL.cityInput.value.trim();
        if (query.length < 2) return;
        state.debounceTimer = setTimeout(() => fetchGeo(query), 500);
    };

    EL.cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSearch();
    });

    EL.searchBtn.onclick = handleSearch;
    EL.refreshBtn.onclick = () => fetchWeatherData();
    EL.saveFavBtn.onclick = saveFavorite;

    loadFavorites();
}

async function fetchWeatherData() {
    toggleLoading(true);
    showError(null);

    try {
        const city = state.city.split(",")[0].trim();

        const [weatherRes, forecastRes] = await Promise.all([
            fetch(`weather.php?city=${city}&endpoint=weather`),
            fetch(`weather.php?city=${city}&endpoint=forecast`),
        ]);

        const weatherText = await weatherRes.text();
        const forecastText = await forecastRes.text();

        let weather, forecast;
        try {
            weather = JSON.parse(weatherText);
            forecast = JSON.parse(forecastText);
        } catch (e) {
            throw new Error("Gagal parsing JSON. Cek API Key & Koneksi.");
        }

        if (weather.cod != 200) throw new Error(weather.message);

        state.lastWeatherData = weather;
        state.lastForecastData = forecast;

        renderWeather(weather);
        renderForecast(forecast);

        EL.weatherContent.classList.remove("hidden");

    } catch (err) {
        showError(err.message);
        EL.weatherContent.classList.add("hidden");
    } finally {
        toggleLoading(false);
    }
}

async function fetchGeo(query) {
    try {
        const res = await fetch(`weather.php?city=${query}&endpoint=geo`);
        const data = await res.json();
        EL.citySuggestions.innerHTML = "";
        if (!Array.isArray(data)) return;

        data.forEach((c) => {
            const opt = document.createElement("option");
            opt.value = `${c.name}${c.state ? ", " + c.state : ""}, ${c.country}`;
            EL.citySuggestions.appendChild(opt);
        });
    } catch (e) {}
}

function renderWeather(data) {
    EL.cityName.textContent = `${data.name}, ${data.sys.country}`;
    EL.timestamp.textContent = new Date().toLocaleString("id-ID", {
        weekday: "long", hour: "2-digit", minute: "2-digit",
    });

    const updateTime = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit", 
        minute: "2-digit"
    });
    EL.lastUpdated.innerHTML = `<i class="fas fa-sync-alt fa-xs"></i> Update: ${updateTime} WIB (Setiap 5 menit)`;

    EL.weatherDesc.textContent = data.weather[0].description;
    EL.humidity.textContent = `${data.main.humidity}%`;
    EL.windSpeed.textContent = `${data.wind.speed} m/s`;
    EL.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    const temp = state.isCelsius ? data.main.temp : (data.main.temp * 9) / 5 + 32;
    EL.temperature.textContent = Math.round(temp);
    EL.tempUnit.textContent = state.isCelsius ? "°C" : "°F";
}

function renderForecast(data) {
    EL.forecastGrid.innerHTML = "";
    const grouped = {};

    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
    });

    const days = Object.keys(grouped).slice(1, 6);

    days.forEach((dayKey) => {
        const items = grouped[dayKey];
        const temps = items.map((i) => i.main.temp);
        const icon = items[0].weather[0].icon;
        const desc = items[0].weather[0].main;

        const minC = Math.min(...temps);
        const maxC = Math.max(...temps);
        const min = state.isCelsius ? minC : (minC * 9) / 5 + 32;
        const max = state.isCelsius ? maxC : (maxC * 9) / 5 + 32;
        const unit = state.isCelsius ? "°C" : "°F";

        const card = `
            <div class="bg-slate-900/20 dark:bg-black/40 p-4 rounded-2xl backdrop-blur-md text-center border border-white/10 text-white shadow-sm 
                        transition-all duration-300 hover:scale-105 hover:bg-slate-900/40 cursor-pointer hover:shadow-xl group">
                <h4 class="font-bold mb-1 group-hover:text-yellow-200 transition-colors">${new Date(dayKey).toLocaleDateString("id-ID", { weekday: "short" })}</h4>
                <img src="https://openweathermap.org/img/wn/${icon}.png" class="w-12 mx-auto filter drop-shadow-md group-hover:scale-110 transition-transform">
                <p class="font-bold drop-shadow-sm">${Math.round(max)}${unit} / ${Math.round(min)}${unit}</p>
                <p class="text-xs text-white/80 capitalize">${desc}</p>
            </div>
        `;

        EL.forecastGrid.innerHTML += card;
    });
}

function saveFavorite() {
    if (!state.city) return;
    const clean = state.city.split(",")[0].trim();
    let fav = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!fav.includes(clean)) {
        fav.push(clean);
        localStorage.setItem("favorites", JSON.stringify(fav));
        loadFavorites();
        showNotification(`${clean} ditambahkan ke favorit!`);
    } else {
        showNotification(`${clean} sudah ada di daftar.`);
    }
}

function showNotification(msg) {
    const notif = EL.notification;
    const text = EL.notifText;
    
    text.textContent = msg;

    notif.classList.remove("opacity-0", "translate-y-[-20px]");
    notif.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
        notif.classList.remove("opacity-100", "translate-y-0");
        notif.classList.add("opacity-0", "translate-y-[-20px]");
    }, 3000);
}

function loadFavorites() {
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    EL.favList.innerHTML = "";

    fav.forEach((city) => {
        const div = document.createElement("div");
        div.className =
            "flex items-center gap-2 px-3 py-1 bg-slate-900/20 rounded-full border border-white/10 cursor-pointer text-white " +
            "transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow-sm";
        
        div.innerHTML = `
            <span>${city}</span>
            <button class="text-white/60 hover:text-red-300 transition-colors">
                <i class="fas fa-times"></i>
            </button>
        `;

        div.children[0].onclick = () => {
            state.city = city;
            fetchWeatherData();
        };

        div.children[1].onclick = (e) => {
            e.stopPropagation();
            removeFavorite(city);
        };

        EL.favList.appendChild(div);
    });
}

function removeFavorite(name) {
    let fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    fav = fav.filter((f) => f !== name);
    localStorage.setItem("favorites", JSON.stringify(fav));
    loadFavorites();
}

function toggleLoading(s) { EL.loading.classList.toggle("hidden", !s); }
function showError(msg) {
    if (!msg) return EL.errorMsg.classList.add("hidden");
    EL.errorText.textContent = msg;
    EL.errorMsg.classList.remove("hidden");
}
function handleSearch() {
    const val = EL.cityInput.value.trim();
    if (val.length === 0) return;
    state.city = val;
    fetchWeatherData();
    EL.cityInput.value = "";
}