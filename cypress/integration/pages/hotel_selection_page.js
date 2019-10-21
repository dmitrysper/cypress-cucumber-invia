import { BasePage } from "./base_page";

const PAGE_TRAIT                    = 'section#hotelList';

const DATE_PICKER_START             = 'div.datepicker-input-wrapper-start';
const DATE_PICKER_END               = 'div.datepicker-input-wrapper-end';
const DATE_PICKER_START_DAYS        = 'table.days td';
const DATE_PICKER_END_DAYS          = 'table.days td';
const SEE_OFFERS_BUTTON             = '#formFilter input#submit';
const HOTEL_CATEGORY_FILTER         = 'div.filter-hotelkategorie';
const FOUR_STARS_HOTEL_CB           = 'div.filter-hotelkategorie input[data-name *= "4"]';
const HOTEL_REVIEW_FILTER           = 'div.filter-kundenbewertung';
const BEST_REVIEW_OPTION            = 'div.filter-kundenbewertung label[for ^= "5"]>svg';
const SORTING_ORDER_SELECT          = 'select#hotelsorting';
const HOTEL_PRICES                  = 'div.priceBox';
const SELECT_FIRST_HOTEL_LINK       = 'section#hotelList>div.skeleton-wrapper>article:first-of-type>div.content>div.priceBox>div.price-wrapper+a'
const FIRST_HOTEL_NAME_LINK         = 'section#hotelList>div.skeleton-wrapper>article:first-of-type>div.content>div.hotel-head>h2>a.hotel-name'

const REVIEW_SCORES = {
    'any': '0-1',
    'sufficient': '2',
    'good': '3',
    'very good': '4',
    'excellent': '5'
};

const SORTING_MODES = {
    'price ascending': 'price_asc',
    'price descending': 'price_desc',
    'best rating': 'rating_desc',
    'most starts': 'stars_desc',
    'favourite hotels': 'sales_desc'
};

class HotelSelectionPage extends BasePage {

    constructor() {
        super();
        this.pageTrait = PAGE_TRAIT;
    }

    selectDates(startDate, endDate) {
        this.clickElement(DATE_PICKER_START);
        this.clickElement(DATE_PICKER_START_DAYS + `[data-date = ${this.toWebDate(startDate)}]`);
        this.clickElement(DATE_PICKER_END_DAYS + `[data-date = ${this.toWebDate(endDate)}]`);
    }

    submitSelection() {
        this.clickElement(SEE_OFFERS_BUTTON);
    }

    selectHotelsByCategory(category) {
        this.clickElement(HOTEL_CATEGORY_FILTER + ` input[data-name *= "${category}"]`);
    }

    selectHotelsByReviewRating(reviewRating) {
        this.clickElement(HOTEL_REVIEW_FILTER + ` label[for ^= "${REVIEW_SCORES[reviewRating]}"]>svg`);
    }

    selectSortingOrder(sortingBy) {
        this.getElement(SORTING_ORDER_SELECT).select(SORTING_MODES[sortingBy]);
    }

    isCorrectSortingOrder() {
        this.getElement(HOTEL_PRICES)
            .then($elems => {
                let arrPrices = [];
                for (let i = 0; i < $elems.length; i++) {
                    const price = $elems.eq(i).data('price');
                    if(!isNaN(price)) arrPrices.push(price);
                }
                const arrSorted = arrPrices.sort((a, b) => b - a);  // descending order
                expect(arrPrices.join('-')).to.eq(arrSorted.join('-'));
            });
    }

    selectFirstHotel()  {
        this.getElement(FIRST_HOTEL_NAME_LINK)
            .invoke('attr', 'title')
            .then(hotelName =>  {
                Cypress.env('hotel', hotelName); // really not great, but probably the only working way to 'extract' values for the later use
            })
        this.getElement(SELECT_FIRST_HOTEL_LINK)
            // .click({force: true})
            .invoke('attr', 'href')
            .then(href => {
                this.driver.visit(href);
            });
    }

}

export default new HotelSelectionPage();
