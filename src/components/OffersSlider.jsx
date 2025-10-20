import { useEffect, useRef } from 'react'

export default function OffersSlider(){
  const sliderRef = useRef(null)
  const slidesWrapRef = useRef(null)
  const dotsRef = useRef(null)
  const autoplayRef = useRef(null)
  const indexRef = useRef(1) // start at first real slide after prepended clone
  const realCountRef = useRef(0)

  // Tunables
  const AUTOPLAY_MS = 4500
  const TRANSITION_MS = 480
  const SWIPE_DISTANCE_THRESHOLD = 90
  const SWIPE_VELOCITY_THRESHOLD = 0.6 // px per ms

  useEffect(()=>{
    const slider = sliderRef.current
    const slidesWrap = slidesWrapRef.current
    const dots = dotsRef.current
    if(!slider || !slidesWrap || !dots) return

    // GPU/perf hints
    slidesWrap.style.willChange = 'transform'

    // Build slides list and clone edges for seamless loop
    let initialSlides = Array.from(slidesWrap.querySelectorAll('.slide'))
    if(initialSlides.length === 0) return
    realCountRef.current = initialSlides.length

    // Clear any previous clones (hot reload safety) — mark once
    if (slidesWrap.dataset.cloned !== '1') {
      const firstClone = initialSlides[0].cloneNode(true)
      const lastClone = initialSlides[initialSlides.length - 1].cloneNode(true)
      slidesWrap.prepend(lastClone)
      slidesWrap.append(firstClone)
      slidesWrap.dataset.cloned = '1'
      initialSlides = Array.from(slidesWrap.querySelectorAll('.slide'))
    }

    // Dots
    function renderDots(){
      dots.innerHTML = ''
      for (let i = 0; i < realCountRef.current; i++) {
        const b = document.createElement('button')
        b.setAttribute('aria-label', `Aller à la diapositive ${i+1}`)
        b.setAttribute('role', 'tab')
        b.addEventListener('click', ()=>{ goTo(i + 1); restartAutoplay() }) // +1 for leading clone
        dots.appendChild(b)
      }
    }
    function updateDots(){
      const realCount = realCountRef.current
      const realIndex = normalizeRealIndex(indexRef.current, realCount)
      Array.from(dots.children).forEach((d, i)=>{
        const active = i === realIndex
        d.classList.toggle('active', active)
        d.setAttribute('aria-selected', active ? 'true' : 'false')
      })
    }

    function getGap(){
      const style = getComputedStyle(slidesWrap)
      const gap = parseFloat(style.gap || '0')
      return isNaN(gap) ? 0 : gap
    }
    function getSlideWidth(){
      const first = slidesWrap.querySelector('.slide')
      if(!first) return 0
      return first.offsetWidth + getGap()
    }

    function setTransform(i, withTransition){
      const w = getSlideWidth()
      slidesWrap.style.transition = withTransition ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)` : 'none'
      slidesWrap.style.transform = `translateX(${-i * w}px)`
    }

    function normalizeRealIndex(i, realCount){
      let ri = i - 1 // account for leading clone
      if (ri < 0) ri = realCount - 1
      if (ri >= realCount) ri = 0
      return ri
    }

    function goTo(i){
      indexRef.current = i
      setTransform(indexRef.current, true)
      updateDots()
    }

    function next(){ goTo(indexRef.current + 1) }
    function prev(){ goTo(indexRef.current - 1) }

    function onTransitionEnd(){
      const totalWithClones = realCountRef.current + 2
      if (indexRef.current === totalWithClones - 1) {
        // at trailing clone -> jump silently to last real slide
        indexRef.current = realCountRef.current
        setTransform(indexRef.current, false)
      } else if (indexRef.current === 0) {
        // at leading clone -> jump silently to first real slide
        indexRef.current = 1
        setTransform(indexRef.current, false)
      }
    }

    function pauseAutoplay(){
      if(autoplayRef.current){
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }
    function restartAutoplay(){
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      pauseAutoplay()
      autoplayRef.current = setInterval(next, AUTOPLAY_MS)
    }

    // Pointer/touch drag with velocity
    let dragging = false
    let startX = 0
    let currentX = 0
    let baseX = 0
    let startTime = 0

    function onStart(e){
      dragging = true
      startX = getX(e)
      currentX = startX
      startTime = performance.now()
      baseX = -indexRef.current * getSlideWidth()
      slidesWrap.style.transition = 'none'
      pauseAutoplay()
      if(e.type === 'mousedown'){
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onEnd)
      }
    }
    function onMove(e){
      if(!dragging) return
      currentX = getX(e)
      const dx = currentX - startX
      slidesWrap.style.transform = `translateX(${baseX + dx}px)`
      if(e.cancelable) e.preventDefault()
    }
    function onEnd(){
      if(!dragging) return
      dragging = false
      const dx = currentX - startX
      const dt = Math.max(1, performance.now() - startTime)
      const velocity = Math.abs(dx) / dt
      if(dx < -SWIPE_DISTANCE_THRESHOLD || (velocity > SWIPE_VELOCITY_THRESHOLD && dx < 0)) next()
      else if(dx > SWIPE_DISTANCE_THRESHOLD || (velocity > SWIPE_VELOCITY_THRESHOLD && dx > 0)) prev()
      else setTransform(indexRef.current, true)
      restartAutoplay()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
    }
    function getX(e){ return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX }

    // Hover/focus pause
    function onEnter(){ pauseAutoplay() }
    function onLeave(){ restartAutoplay() }
    slider.addEventListener('mouseenter', onEnter)
    slider.addEventListener('mouseleave', onLeave)
    slider.addEventListener('focusin', onEnter)
    slider.addEventListener('focusout', onLeave)

    // Page visibility pause
    function onVisibility(){
      if (document.hidden) pauseAutoplay(); else restartAutoplay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Init
    renderDots()
    setTransform(indexRef.current, false) // position to first real slide
    updateDots()
    slidesWrap.addEventListener('transitionend', onTransitionEnd)

    // listeners
    slidesWrap.addEventListener('touchstart', onStart, { passive: true })
    slidesWrap.addEventListener('touchmove', onMove, { passive: false })
    slidesWrap.addEventListener('touchend', onEnd, { passive: true })
    slidesWrap.addEventListener('mousedown', onStart)

    const prevBtn = slider.querySelector('.slider-arrow.prev')
    const nextBtn = slider.querySelector('.slider-arrow.next')
    prevBtn?.addEventListener('click', ()=>{ prev(); restartAutoplay() })
    nextBtn?.addEventListener('click', ()=>{ next(); restartAutoplay() })

    function onKey(e){
      if(e.key === 'ArrowLeft'){ e.preventDefault(); prev(); restartAutoplay() }
      if(e.key === 'ArrowRight'){ e.preventDefault(); next(); restartAutoplay() }
    }
    slider.addEventListener('keydown', onKey)

    // responsive reflow
    let resizeTimer
    function onResize(){
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(()=>{
        setTransform(indexRef.current, false)
      }, 180)
    }
    window.addEventListener('resize', onResize)

    restartAutoplay()

    return ()=>{
      pauseAutoplay()
      slidesWrap.removeEventListener('transitionend', onTransitionEnd)
      slidesWrap.removeEventListener('touchstart', onStart)
      slidesWrap.removeEventListener('touchmove', onMove)
      slidesWrap.removeEventListener('touchend', onEnd)
      slidesWrap.removeEventListener('mousedown', onStart)
      slider.removeEventListener('mouseenter', onEnter)
      slider.removeEventListener('mouseleave', onLeave)
      slider.removeEventListener('focusin', onEnter)
      slider.removeEventListener('focusout', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      slider.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  },[])

  return (
    <section className="section offers">
      <div className="container">
        <h3 className="section-title">Nos offres du moment</h3>
        <div className="slider" id="offersSlider" aria-roledescription="carousel" ref={sliderRef} tabIndex={0}>
          <button className="slider-arrow prev" aria-label="Diapositive précédente" />
          <div className="slides-container">
            <div className="slides" ref={slidesWrapRef}>
              <div className="slide"><img src="/img/offre.png" alt="Offre 1" /></div>
              <div className="slide"><img src="/img/offre.png" alt="Offre 2" /></div>
              <div className="slide"><img src="/img/offre.png" alt="Offre 3" /></div>
              <div className="slide"><img src="/img/offre.png" alt="Offre 4" /></div>
            </div>
          </div>
          <button className="slider-arrow next" aria-label="Diapositive suivante" />
          <div className="slider-dots" id="sliderDots" role="tablist" aria-label="Contrôle du slider" ref={dotsRef}></div>
        </div>
      </div>
    </section>
  )
}
