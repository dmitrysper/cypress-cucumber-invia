import StartPage from "../integration/pages/start_page";
import HotelSelectionPage from "../integration/pages/hotel_selection_page";
import OfferDetailsPage from "../integration/pages/offer_details_page";
import OfferSummaryPage from "../integration/pages/offer_summary_page";

export let page = {
    currentPage: undefined,
    startPage: StartPage,
    hotelSelectionPage: HotelSelectionPage,
    offerDetailsPage: OfferDetailsPage,
    offerSummaryPage: OfferSummaryPage
};
