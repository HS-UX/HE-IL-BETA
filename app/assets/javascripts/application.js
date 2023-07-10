//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  let all_links = document.querySelector('.govuk-header__navigation').querySelectorAll(".govuk-header__link"),
      
        full_path = location.href.split('#')[0]; //Ignore hashes?


    all_links.forEach(link => {
      if(full_path.includes(link.href.split("#"))  && !link.className.includes("hide")) {
        link.parentElement.className+=" govuk-header__navigation-item--active"
        console.log('full: ' + full_path, 'link: ' + link.href.split("#"))

      }
    })
})
