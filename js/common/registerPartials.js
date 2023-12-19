const registerPartials = async function () {
  try {
    const navbarPartial = await fetch("../views/partials/navbar-partial.hbs");
    const navbarPartialText = await navbarPartial.text();

    const homeMainPartial = await fetch("../views/partials/home-main-partial.hbs");
    const homeMainPartialText = await homeMainPartial.text();

    const estadosMainPartial = await fetch("../views/partials/estados-main-partial.hbs");
    const estadosMainPartialText = await estadosMainPartial.text();

    const municipiosMainPartial = await fetch("../views/partials/municipios-main-partial.hbs");
    const municipiosMainPartialText = await municipiosMainPartial.text();

    const footerPartial = await fetch("../views/partials/footer-partial.hbs");
    const footerPartialText = await footerPartial.text();

    const currentLocation = window.location.pathname;
    const searchLocation = window.location.search;
    // Append the partial to the "main" element
    $("body").append(navbarPartialText);
    $("body").append(homeMainPartialText);
    $("body").append(footerPartialText);
    $("body").append(estadosMainPartialText);
    $("body").append(municipiosMainPartialText);

    const home = $("#home-main-partial").html()
    const estados = $("#estados-main-partial").html()
    const municipios = $("#municipios-main-partial").html()

    // Register the partial with Handlebars
    Handlebars.registerPartial("navbarPartial", $("#navbar-partial").html());
    Handlebars.registerPartial("footerPartial", $("#footer-partial").html());



    if (currentLocation == '/' || currentLocation.includes('index.html')) {
      Handlebars.registerPartial("homeMainPartial", home);
    }
    else if (currentLocation.includes('estados.html')) {
      Handlebars.registerPartial("estadosMainPartial", estados);
    } else if (searchLocation.includes('?estado=')) {
      Handlebars.registerPartial("municipiosMainPartial", municipios);
    }

  } catch (error) {
    console.error("Error loading and registering partial:", error);
  }
}