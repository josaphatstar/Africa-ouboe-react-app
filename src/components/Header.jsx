import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className={`btn-burger${open ? ' open' : ''}`} aria-label="Ouvrir le menu" aria-expanded={open ? 'true' : 'false'} onClick={()=>setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>

        <a className="logo" href="#">
          <img src="/img/logo-placeholder.png" alt="Logo Africa Ouboe" />
        </a>

        <nav className={`main-nav${open ? ' open' : ''}`} aria-label="Navigation principale">
          <ul>
            <li><a href="#nouveautes" onClick={()=>setOpen(false)}>Nouveautés</a></li>
            <li><a href="#collections" onClick={()=>setOpen(false)}>Collections</a></li>
            <li><a href="#blog" onClick={()=>setOpen(false)}>Blog</a></li>
            <li><a href="#newsletter" onClick={()=>setOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Compte">
            <i className="fas fa-user"></i>
            <span className="sr-only">Mon compte</span>
          </button>
          <button className="icon-btn cart-btn" aria-label="Panier">
            <i className="fas fa-shopping-bag"></i>
            <span className="cart-count">0</span>
            <span className="sr-only">Panier</span>
          </button>
        </div>
      </div>
    </header>
  )
}
