class URLShortener {
    constructor() {
        this.urlMap = new Map();
        this.characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }

    encodeURL(longURL) {
        const urlObj = new URL(longURL);
        const domain = urlObj.origin;
        let shortCode = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * this.characters.length);
            shortCode += this.characters.charAt(randomIndex);
        }
        const shortURL = domain + '/' + shortCode;
        this.urlMap.set(shortCode, longURL);
        return shortURL;
    }

    decodeURL(shortURL) {
        const shortCode = shortURL.slice(-6);
        const longURL = this.urlMap.get(shortCode);
        if (longURL) {
            console.log('Redirecting to:', longURL);
            window.location.href = longURL;
        } else {
            console.error('Shortened URL not found');
        }
    }
}

function isValidURL(url) {
    const pattern = /^((https?|ftp):\/\/)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})(:\d{2,5})?(\/\S*)?$/;
    return pattern.test(url);
}

function shortenURL() {
    const shortener = new URLShortener();
    const longURLInput = document.getElementById('long-url');
    const longURL = longURLInput.value.trim();
    if (isValidURL(longURL)) {
        const shortenedURL = shortener.encodeURL(longURL);
        document.getElementById('shortened-url').innerHTML = `<strong>Shortened URL:</strong> <a href="${shortenedURL}" target="_blank">${shortenedURL}</a>`;
    } else {
        alert('Please enter a valid URL.');
    }
}