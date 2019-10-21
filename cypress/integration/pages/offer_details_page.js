import { BasePage } from "./base_page";

const PAGE_TRAIT                    = 'section#hotelInfoBox';
const OUTBOUND_FROM_TIME_HANDLE     = '#departureTimeRange div.noUi-handle-lower'
const OUTBOUND_TO_TIME_HANDLE       = '#departureTimeRange div.noUi-handle-upper'
const RETURN_FROM_TIME_HANDLE       = '#returnTimeRange div.noUi-handle-lower'
const RETURN_TO_TIME_HANDLE         = '#returnTimeRange div.noUi-handle-upper'
const ARRIVAL_DATE_OPTIONS          = '#offerFilter-arrival div.offerFilter-list>label>span.name'
const FLIGHT_DURATIONS              = 'div.duration'
const OUTBOUND_FILGHT_INFO          = 'div.duration-departure>div.flight-time>span:last-of-type'
const RETURN_FILGHT_INFO            = 'div.duration-return>div.flight-time>span:last-of-type'
const FIRST_OUTBOUND_FLIGHT_TIME    = 'section.skeleton-offers>article:first-of-type div.duration-departure>div.flight-time>span:first-of-type'
const FIRST_RETURN_FLIGHT_TIME      = 'section.skeleton-offers>article:first-of-type div.duration-return>div.flight-time>span:first-of-type'
const FIRST_OFFER_FLIGHT_DETAILS    = 'section.skeleton-offers>article:first-of-type div.duration>div.flight-info>a'
const FIRST_OFFER_BOOK_LINK         = 'section.skeleton-offers>article:first-of-type div.price>a.button-next'

const DIRECT_FLIGHT                 = 'Direktflug';
const TIMES_DISTANCES = {
    "fromTime": {
        "04:00": {"x": 50, "y": 0},
        "00:00": {"x": 0, "y": 0}
    },
    "toTime": {
        "21:00": {"x": -20, "y": 0},
        "12:00": {"x": -110, "y": 0}
    }
}

const PAGE_LOAD_DELAY = 2000;

class OfferDetailsPage extends BasePage {

    constructor() {
        super();
        this.pageTrait = PAGE_TRAIT;
    }

    setOutboundFlightTime(fromTime, toTime) {
        let distanceX = TIMES_DISTANCES['fromTime'][fromTime]['x'];
        let distanceY = TIMES_DISTANCES['fromTime'][fromTime]['y'];
        this.dragElement(OUTBOUND_FROM_TIME_HANDLE, distanceX, distanceY);
        distanceX = TIMES_DISTANCES['toTime'][toTime]['x'];
        distanceY = TIMES_DISTANCES['toTime'][toTime]['y'];
        this.dragElement(OUTBOUND_TO_TIME_HANDLE, distanceX, distanceY);
    }

    setReturnFlightTime(fromTime, toTime) {
        let distanceX = TIMES_DISTANCES['fromTime'][fromTime]['x'];
        let distanceY = TIMES_DISTANCES['fromTime'][fromTime]['y'];
        this.dragElement(RETURN_FROM_TIME_HANDLE, distanceX, distanceY);
        distanceX = TIMES_DISTANCES['toTime'][toTime]['x'];
        distanceY = TIMES_DISTANCES['toTime'][toTime]['y'];
        this.dragElement(RETURN_TO_TIME_HANDLE, distanceX, distanceY);
    }

    selectArrivalDate(date) {
        this.getElement(ARRIVAL_DATE_OPTIONS)
            .then($elems => {
                for (let i = 0; i < $elems.length; i++) {
                    if($elems.eq(i).text() === date) this.driver.wrap($elems.eq(i)).click({force: true});
                }
            });
        this.delayExecution(PAGE_LOAD_DELAY);
    }

    hasDirectFlightsOffers() {
        this.getElement(FLIGHT_DURATIONS)
            .then($elems => {
                let allDirectFlightsCounter = 0;
                for (let i = 0; i < $elems.length; i++) {
                    let isDirectFlight = false;
                    if($elems.eq(i).find(OUTBOUND_FILGHT_INFO).text().includes(DIRECT_FLIGHT)) isDirectFlight = true;
                    if($elems.eq(i).find(RETURN_FILGHT_INFO).text().includes(DIRECT_FLIGHT) && isDirectFlight) {
                        isDirectFlight = true;
                    } else {
                        isDirectFlight = false;
                    }
                    if(isDirectFlight) allDirectFlightsCounter++;
                }
                expect(allDirectFlightsCounter).to.be.greaterThan(0);
            });
    }

    isOutboundDepartureWithinRange(fromTime, toTime) {
        this.getElement(FIRST_OUTBOUND_FLIGHT_TIME)
            .then($elem => {
                const departureTime = parseInt(this.toHours($elem.text()));
                expect(departureTime).to.be.within(parseInt(this.toHours(fromTime)), parseInt(this.toHours(toTime)));
            });
    }

    isReturnDepartureWithinRange(fromTime, toTime) {
        this.getElement(FIRST_RETURN_FLIGHT_TIME)
            .then($elem => {
                const departureTime = parseInt(this.toHours($elem.text()));
                expect(departureTime).to.be.within(parseInt(this.toHours(fromTime)), parseInt(this.toHours(toTime)));
            });
    }

    selectFirstOffer() {
        this.delayExecution();
        this.getElement(FIRST_OFFER_FLIGHT_DETAILS).click({force: true});
        this.delayExecution();
        this.getElement(FIRST_OFFER_BOOK_LINK)
            .invoke('attr', 'href')
            .then(href => {
                this.driver.visit(href);
            });
        this.delayExecution();
    }

}

export default new OfferDetailsPage();
