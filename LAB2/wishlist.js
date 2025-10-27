export function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

export function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

export function addToWishlist(product) {
    const wishlist = getWishlist();
    const index = wishlist.findIndex(item => item.id === product.id);
    if (index === -1) {
        wishlist.push(product);
    } else {
        wishlist.splice(index, 1);
    }
    saveWishlist(wishlist);
}

export function removeFromWishlist(id) {
    const wishlist = getWishlist();
    const updated = wishlist.filter(item => item.id !== parseInt(id));
    saveWishlist(updated);
}

export function clearWishlist() {
    localStorage.removeItem('wishlist');
}

export function isInWishlist(id) {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === id);
}

export function displayWishlist(wishlist, gridElement, emptyElement) {
    gridElement.innerHTML = '';
    if (wishlist.length === 0) {
        emptyElement.classList.remove('hidden');
        return;
    }
    emptyElement.classList.add('hidden');
    wishlist.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain p-4 bg-gray-50" onerror="this.src='https://via.placeholder.com/150';">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 truncate">${product.title}</h3>
                <p class="text-gray-600 mb-2">$${product.price.toFixed(2)}</p>
                <button class="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-red-500 transition-colors" data-id="${product.id}">Remove</button>
            </div>
        `;
        gridElement.appendChild(card);
    });
}