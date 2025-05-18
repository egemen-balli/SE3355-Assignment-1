import './Recommended.css'
import { useDispatch } from "react-redux";
import { addToVisited } from '../../redux/actions/visitedActions';

function Recommended() {

    const dispatch = useDispatch();

    const fetchRecommended = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/carousel");
            const data = await response.json();
            renderRecommended(data);
        } catch (err) {
            console.error(err);
        }
    };

    const renderRecommended = (items) => {
        const cardsWrapper = document.getElementById("suggested-slider");
        const favorites = JSON.parse(localStorage.getItem("suggestedFavorites") || "[]");

        cardsWrapper.innerHTML = "";
        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "suggested-item";
            card.addEventListener("click", () => {
                dispatch(addToVisited(item))
            });

            const cardHTML = `
            <div class="image-box">
                <img src="${item.img}" alt="${item.title}">
                <button class="favorite-btn">♡</button>
                ${item.label ? `<div class="label-badge">${item.label.replace(/\n/g, "<br>")}</div>` : ""}
            </div>
            <div class="suggested-info">
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

            cardsWrapper.appendChild(card);
        });

        setupRecommendedSlider();
    };


    function setupRecommendedSlider() {
        const container = document.getElementById("suggested-slider");
        const leftBtn = document.getElementById("recommended-left");
        const rightBtn = document.getElementById("recommended-right");
        const cards = Array.from(container.getElementsByClassName("suggested-item"));

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

    fetchRecommended();

    return (
        <section className="suggested-section" id="suggested-section">
            <h2 className="suggested-title">sana özel öneriler</h2>
            <div className="slider-frame">
                <button className="product-slider-btn left" id="recommended-left">‹</button>
                <div className="suggested-list" id="suggested-slider"></div>
                <button className="product-slider-btn right" id="recommended-right">›</button>
            </div>
        </section>
    )
}

export default Recommended
