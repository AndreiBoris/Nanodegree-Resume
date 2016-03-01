var resumeBuilder,
    google;

// Avoid JSHint warning:
/*exported helper*/

var helper = {

    HTMLheaderName: '<h1 id="name" class="big-title">%data%</h1>',
    HTMLheaderRole: '<span class="header-role">%data%</span>',

    HTMLcontactGeneric: '<li><span class="highlight-text">%contact%</span><span class="white-text">%data%</span></li>',
    HTMLmobile: '<li><span class="big-line highlight-text">mobile</span><span class="big-text white-text">%data%</span></li>',
    HTMLemail: '<li><span class="big-line highlight-text">email</span><span class="big-text white-text">%data%</span></li>',
    HTMLtwitter: '<li><span class="big-line highlight-text">twitter</span><span class="big-text white-text">%data%</span></li>',
    HTMLgithub: '<li><span class="big-line highlight-text">github</span><span class="big-text white-text">%data%</span></li>',
    HTMLblog: '<li><span class="big-line highlight-text">blog</span><span class="big-text white-text">%data%</span></li>',
    HTMLlocation: '<li><span class="big-line highlight-text">location</span><span class="big-text white-text">%data%</span></li>',

    HTMLbioPic: '<img src="%data%" class="biopic img-responsive center-block" alt="Andrei\'s photo">',
    HTMLwelcomeMsg: '<div class="welcome-message text-center">%data%</div>',

    HTMLskillsStart: '<h3 id="skills-h3" class="header-heading">Toolkit:</h3>' +
        '<ul id="skills" class="flex-box-skills"></ul>',
    HTMLskills: '<div class="btn btn-default skill">%data%</div>',

    HTMLworkStart: '<div class="work-entry"></div>',
    HTMLworkEmployer: '<a href="#" target="_blank">%data%',
    HTMLworkTitle: ' - %data%</a>',
    HTMLworkDates: '<div class="date-text">%data%</div>',
    HTMLworkLocation: '<div class="location-text">%data%</div>',
    HTMLworkDescription: '<p><br>%data%</p>',

    HTMLprojectStart: '<button class="col-lg-4 col-sm-6 col-xs-12 project-entry" ' +
        'type="button" data-toggle="popover" data-content="%content%" ' +
        'data-html="true" data-original-title="<a target=&quot;_blank&quot; ' +
        'class=&quot;popover-text&quot; href=&quot;#&quot; ' +
        '>See Github Repository</a>"></button>',
    HTMLprojectTitle: '<h4 class="project-title">%data%</h4>',
    HTMLprojectDates: '<div class="project-date-text">%data%</div>',
    HTMLprojectDescription: '<p><br>%data%</p>',
    HTMLprojectImage: '<img class="project-img" src="%data%" alt="%alt%">',
    HTMLprojectNavItem: '<li class="project-nav-item"><button>' +
        '<span class="sr-only">Project</span>%data%</button></li>',
    // Thank you to https://www.w3.org/WAI/tutorials/carousels/functionality/ for
    // the following accessibility tool:
    HTMLprojectNavSelected: '<span class="project-nav-selected sr-only"> (Slide open)</span>',


    HTMLschoolStart: '<div class="education-entry"></div>',
    HTMLschoolName: '<a href="#" target="_blank">%data%',
    HTMLschoolDegree: ' -- %data%</a>',
    HTMLschoolDates: '<div class="date-text">%data%</div>',
    HTMLschoolLocation: '<div class="location-text">%data%</div>',
    HTMLschoolMajor: '<em><br>Major: %data%</em>',

    HTMLonlineClasses: '<h3 class="online-subtitle">Completed Online Classes</h3>' +
        '<ul id="online-classes" class="flex-box-classes"></ul>',
    HTMLonlinePill: '<a href="#" target="_blank" class="btn btn-default online-class">' +
        '<h4 class="bold-text">%data%</h4><p>%school% - %date%</p></a>',
    // HTMLonlineTitle: '<a href="#" target="_blank">%data%</a>',
    // HTMLonlineSchool: ' - %data%</a>',
    // HTMLonlineDates: '<div class="date-text">%data%</div>',
    // HTMLonlineURL: '<br><a href="#">%data%</a>',

    // These allow us to add Font Awesome icons that link to other sites to the footer
    HTMLfooterStart: '<li class="footer-entry"></li>',
    HTMLfooterContact: '<a class="footer-icon" href="#" target="_blank"><span class="%data%"></span></a>',

    googleMap: '<div id="map" class="map"></div>',

    /*
    The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
    */
    clickLocations: [],

    logClicks: function(x, y) {
        'use strict';
        this.clickLocations.push({
            x: x,
            y: y
        });
        console.log('x location: ' + x + '; y location: ' + y);
    },

    /*
    This is the fun part. Here's where we generate the custom Google Map for the website.
    See the documentation below for more details.
    https://developers.google.com/maps/documentation/javascript/reference
    */


    /*
    Start here! initializeMap() is called when page is loaded.
    */

    initializeMap: function() {
        'use strict';

        var locations;

        var mapOptions = {
            disableDefaultUI: true
        };

        /*
        For the map to be displayed, the googleMap var must be
        appended to #mapDiv in resumeBuilder.js.
        */
        var map = new google.maps.Map(document.querySelector('#map'), mapOptions);


        /*
        locationFinder() returns an array of every location string from the JSONs
        written for bio, education, and work.
        */
        function locationFinder() {

            // initializes an empty array
            var locations = [];

            // adds the single location property from bio to the locations array
            locations.push(resumeBuilder.bio.contacts.location);

            // iterates through school locations and appends each location to
            // the locations array
            for (var school in resumeBuilder.education.schools) {
                locations.push(resumeBuilder.education.schools[school].location);
            }

            // iterates through work locations and appends each location to
            // the locations array
            for (var job in resumeBuilder.work.jobs) {
                locations.push(resumeBuilder.work.jobs[job].location);
            }

            return locations;
        }

        /*
        createMapMarker(placeData) reads Google Places search results to create map pins.
        placeData is the object returned from search results containing information
        about a single location.
        */

        function createMapMarker(placeData) {
            /*jshint camelcase: false */

            // The next lines save location data from the search result object to local variables
            var lat = placeData.geometry.location.lat(); // latitude from the place service
            var lon = placeData.geometry.location.lng(); // longitude from the place service
            var name = placeData.formatted_address; // name of the place from the place service
            var bounds = window.mapBounds; // current boundaries of the map window

            // marker is an object with additional data about the pin for a single location
            var marker = new google.maps.Marker({
                map: map,
                position: placeData.geometry.location,
                title: name
            });

            // infoWindows are the little helper windows that open when you click
            // or hover over a pin on a map. They usually contain more information
            // about a location.
            var infoWindow = new google.maps.InfoWindow({
                content: '<div class="marker">' + name + '</div>'
            });

            // hmmmm, I wonder what this is about...
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(map, marker);
            });

            // this is where the pin actually gets added to the map.
            // bounds.extend() takes in a map location object
            bounds.extend(new google.maps.LatLng(lat, lon));
            // fit the map to the new marker
            map.fitBounds(bounds);
            // center the map
            map.setCenter(bounds.getCenter());
        }

        /*
        callback(results, status) makes sure the search returned results for a location.
        If so, it creates a new map marker for that location.
        */
        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                createMapMarker(results[0]);
            }
        }

        /*
        pinPoster(locations) takes in the array of locations created by locationFinder()
        and fires off Google place searches for each location
        */
        function pinPoster(locations) {

            // creates a Google place search service object. PlacesService does the work of
            // actually searching for location data.
            var service = new google.maps.places.PlacesService(map);

            // Iterates through the array of locations, creates a search object for each location
            for (var place in locations) {

                // the search request object
                var request = {
                    query: locations[place]
                };

                // Actually searches the Google Maps API for location data and runs the callback
                // function with the search results after each search.
                service.textSearch(request, callback);
            }
        }

        // Sets the boundaries of the map based on pin locations
        window.mapBounds = new google.maps.LatLngBounds();

        // locations is an array of location strings returned from locationFinder()
        locations = locationFinder();

        // pinPoster(locations) creates pins on the map for each location in
        // the locations array
        pinPoster(locations);

    }

};
