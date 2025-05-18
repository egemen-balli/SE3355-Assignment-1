import './SpecialOffers.css'

function SpecialOffers() {

    const fetchSpecialOffers = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/special-offers");
            const data = await res.json();
            const container = document.getElementById("special-offers");
            if (!container) return;

            data.forEach((item) => {
                const card = document.createElement("div");
                card.className = "special-offer-card";

                const anchor = document.createElement("a");
                anchor.href = item.forwardLink;
                anchor.target = "_blank";
                anchor.rel = "noopener noreferrer";

                anchor.innerHTML = `<img src="${item.image}" alt="Special Offer" className="special-offer-image" />`;

                card.appendChild(anchor);
                container.appendChild(card);
            });
        } catch (err) {
            console.error(err);
        }
    };

    fetchSpecialOffers();

    return (
        <section className="special-offers" id="special-offers"></section>
    )
}

export default SpecialOffers
