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
         * empty.
         */
        it('are defined', function() {
            // toBeDefined() will make sure that all the variables we are testing are actually created
            expect(allFeeds).toBeDefined();
            // all variables are longer than 0
            expect(allFeeds.length).not.toBe(0);
        });
       
        it('Have Name Defined & not Empty', function(){
            // go through each Feeds
            allFeeds.forEach(function(feed){
                // check that the url is there
                expect(feed.url).toBeDefined();
                // check that the url is not left empty
                expect(feed.url).not.toBe('');
            });
        });
       
        it('has a name', function() {
            // go through each  Feeds
            allFeeds.forEach(function(feed){
                // check that the name is there
                expect(feed.name).toBeDefined();
                // check that the name is not left empty
                expect(feed.name).not.toBe('');
            });
           
        });

    });


    describe('The Menu', function() {

        /*we can see by line 130-133 in app.js that when the menu icon
         is clicked it will show/hide the menu-hidden class in the body */
         it('is not visible one load', function() {
            // on load the body should have menu-hidden class, this means menu is off the screen
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

        it('hides when icon is clicked', function(){
            // the menu's visibility changed when the menu-icon-link is clicked
            $('.menu-icon-link').trigger('click');
            // when clicked the class is removed, therefore should be false
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // when clicked again it should re-vert to being true again
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });
        

    describe('Initial Entries', function() {

         beforeEach(function(done) {
            // load feed[0]
            // call done() for async
            loadFeed(1, done);
         });

         it('there is at least a single .entry element in the .feed container', function(done) {
                // after loading the feed there should be at least 1 entry in the element
                expect($('.feed .entry').length).toBeGreaterThan(0);
                // do not run the rest of code till done() is executed
                done();
         });

    });     

    describe('New Feed Selection', function() {

        var initialFeed;
        var newFeed;

         beforeEach(function(done) {

            loadFeed(1, function() {
                // store the value of one feed (feed[1]) in a variable
                initialFeed = $('.feed').html();
                // do not run the rest of code till done() is executed
                done();
            });

         });

         it('changes content when new feed it loaded', function(done) {

           loadFeed(2, function() {
                // load a differend feed (feed[2]) and store that in a second variable
                newFeed = $('.feed').html();
                // compare the two variable, they should not be equal to each other
                expect(newFeed).not.toEqual(initialFeed);
               // do not run the rest of code till done() is executed
                done();
            });
         });
        
    });

}());
