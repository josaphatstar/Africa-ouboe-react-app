export default function Collections(){
  return (
    <section id="collections" className="section container">
      <h3 className="section-title">Nos collections</h3>
      <div className="grid-3">
        <article className="collection-card">
          <img src="/img/collection1.png" alt="Boucles d'oreilles" />
          <span className="tag">Boucles d'oreilles</span>
        </article>
        <article className="collection-card">
          <img src="/img/collection2.png" alt="Bayas" />
          <span className="tag">Bayas</span>
        </article>
        <article className="collection-card">
          <img src="/img/collection3.png" alt="Bracelets" />
          <span className="tag">Bracelets</span>
        </article>
      </div>
    </section>
  )
}
