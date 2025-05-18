import './Navbar.css'

function Navbar() {

    return (
        <>
            <div className="color-strip">
                <div className="segment orange"></div>
                <div className="segment light-blue"></div>
                <div className="segment purple"></div>
                <div className="segment green"></div>
                <div className="segment dark-purple"></div>
            </div>

            <nav className='main-nav'>
                <ul className='nav-list'>
                    <li className='nav-list-item has-submenu'>Elektronik
                        <ul className="submenu">
                            <li><a href="#">Bilgisayar/Tablet <span>›</span></a></li>
                            <li><a href="#">Yazıcılar & Projeksiyon <span>›</span></a></li>
                            <li><a href="#">Telefon & Telefon Aksesuarları <span>›</span></a></li>
                            <li><a href="#">TV, Görüntü & Ses Sistemleri <span>›</span></a></li>
                            <li><a href="#">Beyaz Eşya <span>›</span></a></li>
                            <li><a href="#">Klima ve Isıtıcılar <span>›</span></a></li>
                            <li><a href="#">Elektrikli Ev Aletleri <span>›</span></a></li>
                            <li><a href="#">Foto & Kamera <span>›</span></a></li>
                            <li><a href="#">Oyun & Oyun Konsolları <span>›</span></a></li>
                        </ul>
                    </li>
                    <li className="divider"></li>
                    <li className="nav-list-item has-submenu">Moda
                        <ul className="submenu">
                            <li><a href="#">Kadın Giyim <span>›</span></a></li>
                            <li><a href="#">Erkek Giyim <span>›</span></a></li>
                            <li><a href="#">Ayakkabı & Çanta <span>›</span></a></li>
                            <li><a href="#">Spor Giyim <span>›</span></a></li>
                            <li><a href="#">Aksesuar & Takı <span>›</span></a></li>
                            <li><a href="#">İç Giyim <span>›</span></a></li>
                            <li><a href="#">Plaj Giyim <span>›</span></a></li>
                            <li><a href="#">Çocuk Giyim <span>›</span></a></li>
                        </ul>
                    </li>
                    <li className="divider"></li>
                    <li className="nav-list-item">Ev, Yaşam,<br />Kırtasiye, Ofis</li>
                    <li className="divider"></li>
                    <li className="nav-list-item">Oto, Bahçe, Yapı<br />Market</li>
                    <li className="divider"></li>
                    <li className="nav-list-item">Anne, Bebek,<br />Oyuncak</li>
                    <li className="divider"></li>
                    <li className="nav-list-item">Spor,<br />Outdoor</li>
                    <li className="divider"></li>
                    <li className="nav-list-item">Kozmetik,<br />Kişisel Bakım</li>
                    <li className="divider"></li>
                    <li className="nav-list-item">Süpermarket,<br />Pet Shop</li>
                    <li className="divider"></li>
                    <li className="nav-list-item">Kitap, Müzik,<br />Film, Hobi</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
