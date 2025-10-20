export default function Blog(){
  return (
    <section id="blog" className="section container">
      <h3 className="section-title">Articles de blog</h3>
      <div className="grid-3 blog-grid">
        <article className="blog-card">
          <img src="/img/blog.png" alt="" />
          <h4>L'Afrique et les perles</h4>
          <p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus...</p>
        </article>
        <article className="blog-card">
          <img src="/img/blog.png" alt="" />
          <h4>L'Afrique et les perles</h4>
          <p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus...</p>
        </article>
        <article className="blog-card">
          <img src="/img/blog.png" alt="" />
          <h4>L'Afrique et les perles</h4>
          <p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus...</p>
        </article>
      </div>
    </section>
  )
}
