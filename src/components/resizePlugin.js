const ResizePlugin = (slider) => {
    const observer = new ResizeObserver(function () {
      slider.update()
    })
  
    slider.on("created", () => {
      observer.observe(slider.container)
    })
    slider.on("destroyed", () => {
      observer.unobserve(slider.container)
    })
  }

  export default ResizePlugin