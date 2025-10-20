export default function NewArrivals(){
  return (
    <section id="nouveautes" className="section container">
      <h3 className="section-title">Nouveautés du moment</h3>
      <div className="grid-3">
        <article className="card">
          <img src="/img/nouveaute1.png" alt="Set Atyododo" />
          <h4>Set Atyododo</h4>
          <p className="price">35 000 CFA</p>
        </article>
        <article className="card">
          <img src="/img/nouveaute2.png" alt="Set Vivi" />
          <h4>Set Vivi</h4>
          <p className="price">20 000 CFA</p>
        </article>
        <article className="card">
          <img src="/img/nouveaute3.png" alt="Sac Cauris" />
          <h4>Sac Cauris</h4>
          <p className="price">15 500 CFA</p>
        </article>
      </div>
    </section>
  )
}
