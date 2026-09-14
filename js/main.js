// Scroll-spy for case study table of contents
document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.cs-toc a');
  if (tocLinks.length) {
    const sections = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href')));
    const setActive = () => {
      let current = sections[0];
      sections.forEach(s => {
        if (s && s.getBoundingClientRect().top < 140) current = s;
      });
      tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
    };
    document.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  // simple reveal-on-scroll for cards/sections
  const revealables = document.querySelectorAll('.case-card, .proj-card, .cs-content > section');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealables.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }
});
