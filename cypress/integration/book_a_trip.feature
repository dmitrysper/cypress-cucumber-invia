Feature: Vacation booking

  Background:
    Given I am on the "Start" page

  @invia
  Scenario: Booking a vacation with an-der-urlaub

    When I enter "Sizilien" as desired destination
     And I select "06.11.2019" as start date and "13.11.2019" as end date of stay
     And I specify that "2" adults will be travelling
     And I submit my selection
    Then I should see "Hotel selection" page

    When I select "13.11.2019" as start date and "20.11.2019" as end date of stay
     And I submit my selection
    Then I should see "Hotel selection" page

    When I filter hotels by "4" stars category
     And I filter hotels by "Excellent" review rating
     And I select "Price descending" sorting order
    Then I should see "Hotel selection" page
     And I should see that offers are correctly sorted

    When I select first hotel from the list
    Then I should see "Offer details" page

    When I select time from "04:00" to "21:00" for the outbound flight
     And I select time from "00:00" to "12:00" for the return flight
     And I select "13.11.2019" as date of arrival
    Then I should see that there are offers with direct outbound and return flights
     And I should see that first outbound flight departure time is between "04:00" and "21:00"
     And I should see that first return flight departure time is between "00:00" and "12:00"

    When I select first offer from the list
    Then I should see "Offer summary" page
     And hotel name should be correct
