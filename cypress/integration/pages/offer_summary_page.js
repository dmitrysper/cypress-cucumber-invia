import { BasePage } from "./base_page";

const PAGE_TRAIT                    = 'section#vacationSummary';
const HOTEL_NAME_IN_SUMMARY         = 'section#vacationSummary>ul.description-box'

const PAGE_LOAD_DELAY = 2000;

class OfferSummaryPage extends BasePage {

    constructor() {
        super();
        this.pageTrait = PAGE_TRAIT;
    }

    isHotelNameCorrect(hotelName) {
        this.getElement(HOTEL_NAME_IN_SUMMARY)
            .invoke('data', 'hotelname')
            .then(summaryHotelName => {
                const hotelNameArr = summaryHotelName.split(' ');
                hotelNameArr.shift();
                const shortHotelName = hotelNameArr.join(' ');
                expect(hotelName).to.include(hotelName);
            });
    }

}

export default new OfferSummaryPage();
