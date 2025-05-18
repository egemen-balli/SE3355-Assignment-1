import './Slider.css'
import { useDispatch } from "react-redux";
import { addToVisited } from '../../redux/actions/visitedActions';

function Slider() {

    const dispatch = useDispatch();

    let currentSlide = 0;
    let sliderAutoPlayInterval;

    const fetchMainSlider = async () => {
        try {
            const response = await fetch("https://se3355-assignment-1-ago1.onrender.com/api/main-slider");
            const data = await response.json();
            const sliderTrack = document.getElementById("main-slider");
            if (!sliderTrack) return;

            sliderTrack.innerHTML = "";

            data.forEach(item => {
                const div = document.createElement("div");
                div.className = "slider-item";

                const anchor = document.createElement("a");
                anchor.href = item.forwardLink;
                anchor.target = "_blank";
                anchor.rel = "noopener noreferrer";

                anchor.innerHTML = `<img src="${item.image}" alt="${item.title}" />`;

                div.appendChild(anchor);
                sliderTrack.appendChild(div);
            });

            setupSliderControls();
            startSliderAutoPlay();
        } catch (err) {
            console.error(err);
        }

        document.getElementById("slide-indicator").textContent = `1 / ${totalSlides}`;
    };

    const setupSliderControls = () => {
        const track = document.getElementById("main-slider");
        const leftBtn = document.getElementById("slide-left");
        const rightBtn = document.getElementById("slide-right");

        const slides = Array.from(track.children);
        const totalSlides = slides.length;

        if (totalSlides === 0) return;

        currentSlide = 0;

        const updateSliderButtons = () => {
            leftBtn.style.display = currentElectronicsIndex === 0 ? "none" : "block";
            rightBtn.style.display = "block";
        }

        const goToSlide = (index) => {
            if (!track || slides.length === 0) return;

            currentSlide = (index + totalSlides) % totalSlides;

            if (currentSlide === 0) {
                track.style.transform = `translateX(0px)`;
            } else {
                const slide = slides[currentSlide];
                const slideWidth = slide.offsetWidth;
                const offset = index * slideWidth;
                track.style.transform = `translateX(-${offset}px)`;
            }

            const indicator = document.getElementById("slide-indicator");
            if (indicator) indicator.textContent = `${index + 1} / ${totalSlides}`;

            updateSliderButtons();
            resetSliderAutoPlay();
        };


        leftBtn.addEventListener("click", () => {
            resetSliderAutoPlay();
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        });

        rightBtn.addEventListener("click", () => {
            resetSliderAutoPlay();
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        });

        goToSlide(0);
        updateSliderButtons();

        window.goToNextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        };
    };

    const startSliderAutoPlay = () => {
        if (sliderAutoPlayInterval) {
            clearInterval(sliderAutoPlayInterval);
        }

        sliderAutoPlayInterval = setInterval(() => {
            if (typeof window.goToNextSlide === 'function') {
                window.goToNextSlide();
            }
        }, 3000);
    }

    const resetSliderAutoPlay = () => {
        if (sliderAutoPlayInterval) {
            clearInterval(sliderAutoPlayInterval);
        }
        startSliderAutoPlay();
    }

    fetchMainSlider();

    let electronicsAutoPlayInterval;
    let currentElectronicsIndex = 0;

    const fetchElectronicsDeals = async () => {
        try {
            const res = await fetch("https://se3355-assignment-1-ago1.onrender.com/api/electronics");
            const data = await res.json();
            const container = document.getElementById("electronics-slider");
            if (!container) return;

            container.innerHTML = "";

            data.forEach(item => {
                const card = document.createElement("div");
                card.className = "deal-card";
                const couponBadge = item.couponText ? `<div class="coupon-badge">${item.couponText}</div>` : "";
                const stars = getStars(item.rating);
                const reviewsInfo = item.votes ? `<div class="reviews-info">${item.votes} Değerlendirme</div>` : "";
                card.addEventListener("click", () => {
                    dispatch(addToVisited(item));
                });

                const cardContent = `
                    <div class="deal-card-image">
                        <img src="${item.img}" alt="${item.title}" />
                    </div>
                    <div class="deal-card-content">
                        ${couponBadge}
                        <h3>${item.title}</h3>
                        <div class="star-review">
                            ${stars}
                            <span class="review-count">${reviewsInfo}</span>
                        </div>
                        <p class="product-price">${item.discountedPrice}</p>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                `;

                if (item.forwardLink) {
                    const wrapper = document.createElement("a");
                    wrapper.href = item.forwardLink;
                    wrapper.target = "_blank";
                    wrapper.rel = "noopener noreferrer";
                    wrapper.style.textDecoration = "none";
                    wrapper.style.color = "inherit";
                    wrapper.style.display = "flex";
                    wrapper.style.width = "100%";
                    wrapper.style.height = "100%";
                    wrapper.innerHTML = cardContent;

                    card.appendChild(wrapper);
                } else {
                    card.innerHTML = cardContent;
                }

                container.appendChild(card);
            });

            setupElectronicsSlider();
            startElectronicsAutoPlay();
        } catch (err) {

        }
    }

    const getStars = (rating) => {
        const percentage = (Math.round(rating * 2) / 2) * 20;
        return `<span class="stars" style="--rating-width: ${percentage}%"></span>`;
    }

    const setupElectronicsSlider = () => {
        const sliderContainer = document.querySelector(".product-slider-container");
        const sliderTrack = document.getElementById("electronics-slider");
        const leftBtn = document.getElementById("product-slide-left");
        const rightBtn = document.getElementById("product-slide-right");

        const cards = Array.from(sliderTrack.children);
        const totalCards = cards.length;

        if (totalCards === 0) return;

        currentElectronicsIndex = 0;
        const GAP = 12;

        const updateSliderButtons = () => {
            leftBtn.style.display = currentElectronicsIndex === 0 ? "none" : "block";
            rightBtn.style.display = "block";
        };

        const goToCard = (index) => {
            if (!sliderContainer || !sliderTrack || cards.length === 0) return;

            currentElectronicsIndex = (index + totalCards) % totalCards;

            if (currentElectronicsIndex === 0) {
                sliderTrack.style.transform = `translateX(0px)`;
            } else {
                const containerWidth = sliderContainer.getBoundingClientRect().width;
                const cardWidth = cards[0].getBoundingClientRect().width;
                const cardCenter = currentElectronicsIndex * (cardWidth + GAP) + (cardWidth / 2);
                const offset = (containerWidth / 2) - cardCenter;
                sliderTrack.style.transform = `translateX(${offset}px)`;
            }

            updateSliderButtons();

            resetElectronicsAutoPlay();
        };

        leftBtn.addEventListener("click", () => {
            goToCard(currentElectronicsIndex - 1);
        });

        rightBtn.addEventListener("click", () => {
            goToCard(currentElectronicsIndex + 1);
        });

        goToCard(0);

        updateSliderButtons();

        window.goToNextElectronicsCard = () => {
            goToCard(currentElectronicsIndex + 1);
        };
    }

    const startElectronicsAutoPlay = () => {
        if (electronicsAutoPlayInterval) {
            clearInterval(electronicsAutoPlayInterval);
        }

        electronicsAutoPlayInterval = setInterval(() => {
            if (typeof window.goToNextElectronicsCard === 'function') {
                window.goToNextElectronicsCard();
            }
        }, 3000);
    };

    const resetElectronicsAutoPlay = () => {
        if (electronicsAutoPlayInterval) {
            clearInterval(electronicsAutoPlayInterval);
        }
        startElectronicsAutoPlay();
    };

    fetchElectronicsDeals();

    return (
        <div className="slider-and-electronics">
            <div className="campaign-slider-wrapper">
                <div className="campaign-slider-track" id="main-slider"></div>
                <button className="campaign-slider-btn left" id="slide-left">‹</button>
                <button className="campaign-slider-btn right" id="slide-right">›</button>
                <div className="campaign-slide-indicator" id="slide-indicator">0 / 0</div>
            </div>

            <div className="electronics-products-wrapper">
                <div className="electronics-slider-inner">
                    <button className="product-slider-btn left" id="product-slide-left">‹</button>
                    <div className="product-slider-container">
                        <div className="product-slider-track" id="electronics-slider"></div>
                    </div>
                    <button className="product-slider-btn right" id="product-slide-right">›</button>
                </div>
            </div>
        </div>
    )
}

export default Slider
