import './Visited.css'
import { useSelector } from 'react-redux';

function Visited() {
    const visited = useSelector((state) => state.visited);

    const fetchVisited = async () => {
        try {
            renderVisited(visited);
        } catch (err) {
            console.error(err);
        }
    };

    const renderVisited = (items) => {
        const wrapper = document.getElementById("visited-slider");
        const favorites = JSON.parse(localStorage.getItem("visitedFavorites") || "[]");

        wrapper.innerHTML = "";
        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "visited-card";

            const cardHTML = `
            <div class="visited-img-wrapper">
                <img src="${item.img}" alt="${item.title}">
                <button class="favorite-btn">${favorites.includes(item.id) ? "♥" : "♡"}</button>
                ${item.label ? `<div class="label-badge">${item.label.replace(/\n/g, "<br>")}</div>` : ""}
            </div>
            <div class="visited-info">
                ${item.paymentNote ? `<div class="payment-note">${item.paymentNote}</div>` : ""}
                <p class="product-name">${item.title}</p>
                <div class="star-review">
                    ${getStars(item.rating)}
                    <span class="review-count">(${item.votes})</span>
                </div>
                ${item.oldPrice
                    ? `<div><span class="old-price">${item.oldPrice}</span><span class="discount">%${getDiscount(item.oldPrice, item.discountedPrice)} indirim</span></div>`
                    : ""
                }
                <p class="product-price">${item.discountedPrice}</p>
                ${item.cartPrice ? `<p class="cart-price">${item.cartPrice}</p>` : ""}
                ${item.extra ? `<p class="extra-info">${item.extra}</p>` : ""}
            </div>
            <button class="add-cart-btn">Sepete Ekle</button>
        `;

            if (item.forwardLink) {
                const wrapper = document.createElement("a");
                wrapper.href = item.forwardLink;
                wrapper.target = "_blank";
                wrapper.rel = "noopener noreferrer";
                wrapper.style.textDecoration = "none";
                wrapper.style.color = "inherit";
                wrapper.style.display = "block";
                wrapper.style.height = "100%";
                wrapper.innerHTML = cardHTML;

                card.appendChild(wrapper);
            } else {
                card.innerHTML = cardHTML;
            }

            wrapper.appendChild(card);
        });

        setupVisitedSlider();
    };


    function setupVisitedSlider() {
        const container = document.getElementById("visited-slider");
        const leftBtn = document.getElementById("visited-left");
        const rightBtn = document.getElementById("visited-right");
        const cards = Array.from(container.getElementsByClassName("visited-card"));

        if (cards.length === 0) return;

        const cardWidth = cards[0].offsetWidth + 20;
        const visibleCount = 6;
        let currentIndex = 0;

        leftBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex = Math.max(currentIndex - visibleCount, 0);
                container.scrollTo({ left: currentIndex * cardWidth, behavior: "smooth" });
            } else {
                currentIndex = 0;
                container.scrollTo({ left: 0, behavior: "smooth" });
            }
        });

        rightBtn.addEventListener("click", () => {
            const maxIndex = cards.length - visibleCount;
            if (currentIndex < maxIndex) {
                currentIndex = Math.min(currentIndex + visibleCount, maxIndex);
                container.scrollTo({ left: currentIndex * cardWidth, behavior: "smooth" });
            } else {
                currentIndex = 0;
                container.scrollTo({ left: 0, behavior: "smooth" });
            }
        });
    }

    const getDiscount = (oldPrice, newPrice) => {
        const oldNum = parseFloat(oldPrice.replace(",", ".").replace(" TL", "").replace(".", "").trim());
        const newNum = parseFloat(newPrice.replace(",", ".").replace(" TL", "").replace(".", "").trim());
        return Math.round(((oldNum - newNum) / oldNum) * 100);
    };

    const getStars = (rating) => {
        const percentage = (Math.round(rating * 2) / 2) * 20;
        return `<span class="stars" style="--rating-width: ${percentage}%"></span>`;
    }

    fetchVisited();

    return (
        <section className="visited-section" id="visited-section">
            {Object.keys(visited).length !== 0 && <h2 className="visited-title">Gezilen Urunler</h2>}
            <div className="visited-slider-wrapper">
                <button className="product-slider-btn left" id="visited-left">‹</button>
                <div className="visited-list" id="visited-slider"></div>
                <button className="product-slider-btn right" id="visited-right">›</button>
            </div>
        </section>
    )
}

export default Visited
