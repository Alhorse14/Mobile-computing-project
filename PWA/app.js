// Sample game data
const gamesData = [
    {
        id: 1,
        title: "Cyber Quest 2077",
        genre: "Action RPG",
        description: "An immersive cyberpunk adventure set in a dystopian future.",
        rating: 4.8,
        image: "🤖",
        fullDescription: "Cyber Quest 2077 is an open-world action RPG set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
        platforms: ["PC", "PlayStation", "Xbox"],
        releaseDate: "2023-12-10",
        developer: "CD Projekt Red",
        screenshots: ["🌃", "🚗", "⚔️"]
    },
    {
        id: 2,
        title: "Fantasy Realms",
        genre: "Fantasy RPG",
        description: "Explore magical worlds filled with dragons and ancient mysteries.",
        rating: 4.6,
        image: "🐉",
        fullDescription: "Fantasy Realms offers an epic journey through mystical lands where magic is real and dragons soar through the skies. Create your character and embark on quests that will determine the fate of the realm.",
        platforms: ["PC", "PlayStation", "Nintendo Switch"],
        releaseDate: "2023-09-15",
        developer: "Mystic Studios",
        screenshots: ["🏰", "🧙‍♂️", "⚔️"]
    },
    {
        id: 3,
        title: "Space Odyssey",
        genre: "Sci-Fi Adventure",
        description: "Journey through the cosmos in this epic space exploration game.",
        rating: 4.7,
        image: "🚀",
        fullDescription: "Space Odyssey takes you on an interstellar journey across the galaxy. Discover new planets, encounter alien civilizations, and uncover the mysteries of the universe in this breathtaking space adventure.",
        platforms: ["PC", "PlayStation", "Xbox"],
        releaseDate: "2023-11-20",
        developer: "Stellar Games",
        screenshots: ["🌌", "👽", "🛸"]
    },
    {
        id: 4,
        title: "Racing Thunder",
        genre: "Racing",
        description: "High-speed racing action with stunning graphics and realistic physics.",
        rating: 4.4,
        image: "🏎️",
        fullDescription: "Racing Thunder delivers the ultimate racing experience with photorealistic graphics, authentic car physics, and intense multiplayer competitions. Race on iconic tracks around the world.",
        platforms: ["PC", "PlayStation", "Xbox"],
        releaseDate: "2023-08-05",
        developer: "Speed Demon Studios",
        screenshots: ["🏁", "🏆", "🌍"]
    },
    {
        id: 5,
        title: "Puzzle Master",
        genre: "Puzzle",
        description: "Challenge your mind with innovative puzzles and brain teasers.",
        rating: 4.3,
        image: "🧩",
        fullDescription: "Puzzle Master features hundreds of unique puzzles designed to challenge and entertain. From logic puzzles to spatial challenges, this game will keep your mind sharp and engaged.",
        platforms: ["PC", "Mobile", "Nintendo Switch"],
        releaseDate: "2023-07-12",
        developer: "Brain Games Inc",
        screenshots: ["🎯", "🧠", "💡"]
    },
    {
        id: 6,
        title: "Battle Arena",
        genre: "Fighting",
        description: "Intense fighting action with diverse characters and special moves.",
        rating: 4.5,
        image: "👊",
        fullDescription: "Battle Arena brings together fighters from different worlds in epic combat. Master unique fighting styles, execute devastating combos, and compete in tournaments to become the ultimate champion.",
        platforms: ["PC", "PlayStation", "Xbox"],
        releaseDate: "2023-10-30",
        developer: "Combat Studios",
        screenshots: ["🥊", "⚡", "🏟️"]
    }
];

// DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const gamesGrid = document.getElementById('games-grid');
const gameModal = document.getElementById('game-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    displayGames(gamesData);
});

function initializeApp() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Check for app updates
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Category filtering
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterGamesByCategory(category);
        });
    });

    // Modal close
    closeModal.addEventListener('click', closeGameModal);
    window.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeGameModal();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function displayGames(games) {
    gamesGrid.innerHTML = '';
    
    if (games.length === 0) {
        gamesGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: #666;">No games found matching your criteria.</p>';
        return;
    }

    games.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card fade-in';
    card.innerHTML = `
        <div class="game-image">
            <div class="placeholder-image">${game.image}</div>
        </div>
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-genre">${game.genre}</p>
            <p class="game-description">${game.description}</p>
            <div class="game-rating">
                <span class="stars">${generateStars(game.rating)}</span>
                <span class="rating-text">${game.rating}/5</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        showGameDetails(game);
    });

    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }

    if (hasHalfStar) {
        stars += '⭐';
    }

    return stars;
}

function showGameDetails(game) {
    modalBody.innerHTML = `
        <div class="game-detail">
            <div class="game-detail-header">
                <div class="game-detail-image">
                    <div class="placeholder-image" style="font-size: 4rem;">${game.image}</div>
                </div>
                <div class="game-detail-info">
                    <h2>${game.title}</h2>
                    <p class="game-genre">${game.genre}</p>
                    <div class="game-rating">
                        <span class="stars">${generateStars(game.rating)}</span>
                        <span class="rating-text">${game.rating}/5</span>
                    </div>
                    <p><strong>Developer:</strong> ${game.developer}</p>
                    <p><strong>Release Date:</strong> ${game.releaseDate}</p>
                    <p><strong>Platforms:</strong> ${game.platforms.join(', ')}</p>
                </div>
            </div>
            <div class="game-detail-description">
                <h3>About This Game</h3>
                <p>${game.fullDescription}</p>
            </div>
            <div class="game-screenshots">
                <h3>Screenshots</h3>
                <div class="screenshots-grid">
                    ${game.screenshots.map(screenshot => `
                        <div class="screenshot">
                            <div class="placeholder-image" style="font-size: 2rem;">${screenshot}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    gameModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGameModal() {
    gameModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        displayGames(gamesData);
        return;
    }

    const filteredGames = gamesData.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );

    displayGames(filteredGames);
    
    // Scroll to games section
    document.getElementById('featured').scrollIntoView({
        behavior: 'smooth'
    });
}

function filterGamesByCategory(category) {
    const filteredGames = gamesData.filter(game => 
        game.genre.toLowerCase().includes(category.toLowerCase())
    );

    displayGames(filteredGames);
    
    // Scroll to games section
    document.getElementById('featured').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add some CSS for the modal content
const modalStyles = `
<style>
.game-detail-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.game-detail-image {
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.game-detail-info h2 {
    margin-bottom: 0.5rem;
    color: #333;
}

.game-detail-info p {
    margin-bottom: 0.5rem;
    color: #666;
}

.game-detail-description {
    margin-bottom: 2rem;
}

.game-detail-description h3 {
    margin-bottom: 1rem;
    color: #333;
}

.screenshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.screenshot {
    height: 100px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

@media (max-width: 768px) {
    .game-detail-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .game-detail-image {
        width: 150px;
        height: 150px;
    }
}
</style>
`;

// Add the styles to the document head
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Install prompt for PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button or banner
    showInstallPromotion();
});

function showInstallPromotion() {
    // Create install button
    const installButton = document.createElement('button');
    installButton.textContent = '📱 Install App';
    installButton.className = 'install-btn';
    installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    installButton.addEventListener('mouseenter', () => {
        installButton.style.transform = 'translateY(-2px)';
        installButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    });

    installButton.addEventListener('mouseleave', () => {
        installButton.style.transform = 'translateY(0)';
        installButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });

    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
            installButton.remove();
        }
    });

    document.body.appendChild(installButton);

    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (installButton.parentNode) {
            installButton.style.opacity = '0';
            setTimeout(() => installButton.remove(), 300);
        }
    }, 10000);
}

// Handle app installation
window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed');
    // Remove install button if it exists
    const installBtn = document.querySelector('.install-btn');
    if (installBtn) {
        installBtn.remove();
    }
});

