import { BasePage } from "./base_page";

const PAGE_TRAIT                    = 'input#idestflat';
const HOTEL_INPUT_1                 = 'div.ac-item.location.standard-version.show-layer-on>input';
const HOTEL_INPUT_2                 = 'div.ac-item.location.layer-version>input';
const DATE_PICKER_START             = 'div.datepicker-input-wrapper-start';
const DATE_PICKER_END               = 'div.datepicker-input-wrapper-end';
const DATE_PICKER_START_ARROW_NEXT  = 'div.start-input span.month-button-next';
const DATE_PICKER_START_DAYS        = 'div.start-input table.days td';
const DATE_PICKER_END_DAYS          = 'div.end-input table.days td';
const TRAVELLERS_INPUT              = 'div.form>div.traveller'
const ADULT_COUNT_INPUT             = '#adult input#adultCount'
const ADULT_COUNT_MINUS             = '#adult button.minusButton'
const ADULT_COUNT_PLUS              = '#adult button.plusButton'
const TRAVELLERS_SUBMIT_BUTTON      = 'div#travellerLayer button.button-submit'
const SEE_OFFERS_BUTTON             = 'div.form-submit-button input#submit'

class StartPage extends BasePage {

    constructor() {
        super();
        this.pageTrait = PAGE_TRAIT;
    }

    enterDestination(destination) {
        this.clickElement(HOTEL_INPUT_1);
        this.enterText(HOTEL_INPUT_2, destination);
        this.driver
            .get(`ul.aiduac-group.area>li>ul>li>a[data-requestmethod = "search-hotelsmulti"]>strong`)
            .last()
            .click();
    }

    selectDates(startDate, endDate) {
        this.clickElement(DATE_PICKER_START);
        this.clickElement(DATE_PICKER_START_ARROW_NEXT);
        this.clickElement(DATE_PICKER_START_DAYS + `[data-date = ${this.toWebDate(startDate)}]`);
        this.clickElement(DATE_PICKER_END_DAYS + `[data-date = ${this.toWebDate(endDate)}]`);
    }

    selectNumberOfAdultTravellers(numberOfAdults) {
        this.clickElement(TRAVELLERS_INPUT);
        this.getElement(ADULT_COUNT_INPUT)
            .invoke('val')
            .then(val => {
                let numOfAdults = val;
                if(numOfAdults < numberOfAdults) {
                    while(numOfAdults < numberOfAdults) {
                        this.clickElement(ADULT_COUNT_PLUS);
                        numOfAdults++;
                    }
                }
                if(numOfAdults > numberOfAdults) {
                    while(numOfAdults > numberOfAdults) {
                        this.clickElement(ADULT_COUNT_MINUS);
                        numOfAdults--;
                    }
                }
            });
        this.clickElement(TRAVELLERS_SUBMIT_BUTTON);
    }

    submitSelection() {
        this.clickElement(SEE_OFFERS_BUTTON);
    }
}

export default new StartPage();
