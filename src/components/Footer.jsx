export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h4>À propos de nous</h4>
          <ul>
            <li><a href="#">Qui sommes-nous</a></li>
            <li><a href="#">Nos conditions</a></li>
            <li><a href="#">Paiements & Livraison</a></li>
            <li><a href="#">Retours & Échanges</a></li>
            <li><a href="#">Confidentialité</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contactez-nous</h4>
          <ul>
            <li><a href="mailto:contact@africaouboe.com">contact@africaouboe.com</a></li>
            <li><a href="tel:+22500000000">+225 00 00 00 00</a></li>
            <li>Lun - Ven: 9h - 18h</li>
            <li>Sam: 10h - 16h</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Suivez-nous</h4>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
      <div className="copyright">
        © <span id="year"></span> Africa Ouboe. Tous droits réservés.
      </div>
    </footer>
  )
}
