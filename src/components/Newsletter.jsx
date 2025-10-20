export default function Newsletter(){
  return (
    <section id="newsletter" className="newsletter">
      <div className="container newsletter-inner">
        <h3>Abonnez-vous à notre Newsletter</h3>
        <p>Soyez les premiers à recevoir nos nouveautés et offres exclusives.</p>
        <form className="newsletter-form" action="#" onSubmit={(e)=>e.preventDefault()}>
          <input type="email" placeholder="E-mail" aria-label="Email" />
          <button className="btn-secondary" type="submit">Soumettre</button>
        </form>
      </div>
    </section>
  )
}
