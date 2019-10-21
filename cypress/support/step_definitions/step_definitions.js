import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { page } from "../../support/page_manager";
const fixturePath = "fixtures.json";

Given(/^I am on the "([^"]*)" page$/, pageName => {
    cy.fixture(fixturePath)
        .then(fixture => {
            cy.viewport(fixture.viewport_width, fixture.viewport_height);
            });
    cy.visit('/', {timeout: 15000});
    switch(pageName) {
        case "Start":
            page.currentPage = page.startPage;
            break;
        default:
            page.currentPage = page.startPage;
            break;
    }
});

When(/^I enter "([^"]*)" as desired destination$/, destination => {
    page.currentPage.enterDestination(destination);
});

When(/^I select "([^"]*)" as start date and "([^"]*)" as end date of stay$/, (startDate, endDate) => {
    page.currentPage.selectDates(startDate, endDate);
});
Given(/^I submit my selection$/, () => {
    page.currentPage.submitSelection();
});
Then(/^I should see "([^"]*)" page$/, pageName => {
    switch(pageName) {
        case "Start":
            page.currentPage = page.startPage;
            break;
        case "Hotel selection":
            page.currentPage = page.hotelSelectionPage;
            break;
        case "Offer details":
            page.currentPage = page.offerDetailsPage;
            break;
        case "Offer summary":
            page.currentPage = page.offerSummaryPage;
            break;
        default:
            page.currentPage = page.startPage;
            break;
    }
    page.currentPage.getPageTrait().should('be.visible');
});
When(/^I specify that "(\d+)" adults will be travelling$/, numOfAdults => {
    page.startPage.selectNumberOfAdultTravellers(parseInt(numOfAdults));
});
When(/^I filter hotels by "([^"]*)" stars category$/, hotelCategory => {
    page.hotelSelectionPage.selectHotelsByCategory(hotelCategory);
});
When(/^I filter hotels by "([^"]*)" review rating$/, reviewRating => {
    page.hotelSelectionPage.selectHotelsByReviewRating(reviewRating.toLowerCase());
});
When(/^I select "([^"]*)" sorting order$/, sortingOrder => {
    page.hotelSelectionPage.selectSortingOrder(sortingOrder.toLowerCase());
});
Then(/^I should see that offers are correctly sorted$/, () => {
    page.hotelSelectionPage.isCorrectSortingOrder();
});
When(/^I select first hotel from the list$/, function () {
    page.hotelSelectionPage.selectFirstHotel();
});
When(/^I select time from "([^"]*)" to "([^"]*)" for the outbound flight$/, (fromTime, toTime) => {
    page.offerDetailsPage.setOutboundFlightTime(fromTime, toTime);
});
When(/^I select time from "([^"]*)" to "([^"]*)" for the return flight$/, (fromTime, toTime) => {
    page.offerDetailsPage.setReturnFlightTime(fromTime, toTime);
});
When(/^I select "([^"]*)" as date of arrival$/, date => {
    page.offerDetailsPage.selectArrivalDate(date);
});
Then(/^I should see that there are offers with direct outbound and return flights$/,  () => {
    page.offerDetailsPage.hasDirectFlightsOffers();
});
Then(/^I should see that first (outbound|return) flight departure time is between "([^"]*)" and "([^"]*)"$/, (flightType, fromTime, toTime) => {
    switch(flightType) {
        case 'outbound':
            page.offerDetailsPage.isOutboundDepartureWithinRange(fromTime, toTime);
            break;
        case 'return':
            page.offerDetailsPage.isReturnDepartureWithinRange(fromTime, toTime);
            break;
    }
});
When(/^I select first offer from the list$/, () => {
    page.offerDetailsPage.selectFirstOffer();
});
Then(/^hotel name should be correct$/, () => {
    console.log(Cypress.env('hotel'));
    page.offerSummaryPage.isHotelNameCorrect(Cypress.env('hotel'));
});
