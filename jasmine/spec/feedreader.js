/* jshint esversion: 6*/
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Tests each feed in the allFeeds object
         * to ensure it has a URL defined and that URL
         * is not empty
         */
         it('are URLs defined and not empty', function(){
             allFeeds.forEach(function(element) {
                 expect(element.url).toBeDefined();
                 expect(element.url).not.toEqual("");
             });
         });


        /* Tests each feed in the allFeeds object
         * to ensure it has a name defined and that name
         * is not empty
         */
         it('are names defined and not empty', function(){
             allFeeds.forEach(function(element) {
                 expect(element.name).toBeDefined();
                 expect(element.name).not.toEqual('');
             });
         });
    });

    /* Test suite to test the hamburger menu */
    describe('The menu', function() {
        let bodyClassList = document.body.classList;
        let menuIcon = document.querySelector('.menu-icon-link');


        /* Tests the menu element is hidden by default */
         it('is hidden by default', function() {
             expect(bodyClassList).toContain('menu-hidden');
         });


         /* Tests the menu changes visibility when the
          * menu icon is clicked. It covers both displaying
          * and hiding the menu
          */
          it('does display/hide work', function(){
              menuIcon.click();
              expect(bodyClassList).not.toContain('menu-hidden');

              menuIcon.click();
              expect(bodyClassList).toContain('menu-hidden');
          });
    });

    /* Test suite to test the initial feed entries */
    describe('Initial Entries', function() {

        /* Loads the feed asynchronously before testing for entries */
         beforeEach(function(done) {
             loadFeed(0, done);
         });


         /* Tests  the loadFeed function is called and completes its work,
          * there is at least a single .entry element within the .feed container
          */
         it("is there any data in the feed", function(done){
             let feedEntries = document.querySelector('.feed').querySelectorAll('.entry').length;
             expect(feedEntries).toBeGreaterThan(0);
             done();
         });
    });


    /* Test suite to test the content of feeds */
    describe('New Feed Selection', function() {
        let initialFeed;

        /* Loads first and second feed asynchronously before comparing their contents */
        beforeEach(function(done) {
             loadFeed(0, function() {
                 initialFeed = document.querySelector('.feed').innerHTML;
             });

             loadFeed(1, function(){
                 done();
             });
         });


         /* Tests to ensure that when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          */
         it("check if content is not same for entries", function(done){
             let newFeed = document.querySelector('.feed').innerHTML;
             expect(initialFeed).not.toBe(newFeed);
             done();
         });
    });
}());
