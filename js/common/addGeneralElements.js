const addGeneralElements = async () => {
    const headerContainer = "#header-container";
    const headerTemplate = "#header-template";
    const footerContainer = "#footer-container";
    const footerTemplate = "#footer-template";
    await registerPartials()
    addCustomTemplate(headerContainer, headerTemplate)
    addCustomTemplate(footerContainer, footerTemplate)
}