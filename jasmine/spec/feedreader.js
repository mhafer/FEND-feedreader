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

    /* TODO: Write a new test suite named "The menu" */

    describe('The Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        /*we can see by line 130-133 in app.js that when the menu icon
         is clicked it will show/hide the menu-hidden class in the body */
         it('is not visible one load', function() {
            // on load the body should have menu-hidden class, this means menu is off the screen
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

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
        

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

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

    /* TODO: Write a new test suite named "New Feed Selection" */

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

         /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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
