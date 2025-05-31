export default {
  mounted(el, binding) {
    const cb = binding.value
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cb && cb()
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
  }
}
