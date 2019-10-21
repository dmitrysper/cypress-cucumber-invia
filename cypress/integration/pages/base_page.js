const DEFAULT_DELAY = 5000;
const PAGE_LOAD_DELAY = 2000;

export class BasePage {

    constructor() {
        this.driver = cy;
        this.pageTrait = '';
    }

    getElement(elem) {
        return this.driver.get(elem);
    }

    clickElement(elem) {
        return this.getElement(elem).click();
    }

    enterText(elem, text) {
        return this.getElement(elem).type(text);
    }

    dragElement (elem, x, y) {
        // this.delayExecution();
        this.getElement(elem, { timeout: 10000 })
            .then($el => {
                const rect = $el[0].getBoundingClientRect();
                this.driver.wrap($el)
                    .trigger('mousedown', { which: 1 })
                    .trigger('mousemove', { clientX: rect['x'] + x, clientY: rect['y'] + y })
                    .trigger('mouseup', {force: true})
            });
        this.delayExecution();
    }

    getPageTrait() {
        this.delayExecution(PAGE_LOAD_DELAY);
        return this.driver.get(this.pageTrait, { timeout: 10000 });
    }

    delayExecution(delay = DEFAULT_DELAY) {
        return this.driver.wait(delay);
    }

    toWebDate(dateString) {
        let arr = dateString.split('.');
        return `${arr[2]}-${arr[1]}-${arr[0]}`
    }

    toHours(timeString) {
        const regex = /^\d{2}/;
        return regex.exec(timeString)[0];
    }

}
