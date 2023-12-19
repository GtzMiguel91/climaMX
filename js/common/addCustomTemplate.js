const addCustomTemplate = (container, template, data) => {
    const $mainContainer = $(container);
    const mainTemplate = $(template).html()
    const compiledMain = Handlebars.compile(mainTemplate);
    $mainContainer.html(compiledMain(data));
}