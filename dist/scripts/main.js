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

    HTMLprojectStart: '<button aria-label="%alt%" class="col-lg-4 col-sm-6 col-xs-12 project-entry" ' +
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

var helper;

(function() {
    'use strict';
    var model, bridge, view;

    /* All information objects */
    model = {
        // store all arrays with information
        work: {
            'jobs': [{
                'employer': 'City of Vaughan',
                'title': 'Front of House Manager',
                'location': 'Vaughan, Ontario, Canada',
                'date': '07/2014 - present',
                'description': 'I talk to the client who is running the performance, as well as ' +
                    'the theatre technicians, the front of house staff, and the ' +
                    'patrons in order to ensure that everything runs smoothly. ' +
                    'Mainly, it is a matter of keeping things running on time, ' +
                    'making sure everyone is informed about current conditions, and ' +
                    'dealing with situations so as to avoid problems.',
                'url': 'http://www.vaughan.ca/services/cultural/city_playhouse_theatre/Pages/About.aspx'
            }, {
                'employer': 'University of Toronto',
                'title': 'Standardized Patient',
                'location': 'Toronto, Ontario, Canada',
                'date': '10/2014 - present',
                'description': 'This job is involves learning and demonstrating particular ' +
                    'ailments and medical conditions so as to allow medical ' +
                    'students and practitioners to be tested for their knowledge ' +
                    'and aptitude for dealing with a variety of situations. ' +
                    'Due to the sensitive nature of dealing with examinations, ' +
                    'particulars are strictly confidential.',
                'url': 'http://www.spp.utoronto.ca/'
            }, {
                'employer': 'Touchstone Institute',
                'title': 'Standardized Patient',
                'location': 'Toronto, Ontario, Canada',
                'date': '08/2015 - present',
                'description': 'See University of Toronto - Standardized Patient, above.',
                'url': 'http://www.touchstoneinstitute.ca/'
            }, {
                'employer': 'York University',
                'title': 'Studio Monitor',
                'location': 'Toronto, Ontario, Canada',
                'date': '09/2013 - 04/2014',
                'description': 'I was tasked with keeping certainly rooms organized. It was ' +
                    'important to keep track of the dates when tasks were done and ' +
                    'to keep immediate supervisors informed of issues pertaining ' +
                    'to them. This was flexibly scheduled work ' +
                    'that had me working with little insturction. This job ' +
                    'terminated when I finished my degree at York.',
                'url': 'http://theatre.ampd.yorku.ca/'
            }]
        },
        projects: {
            'projects': [{
                'title': 'Toronto Theatre Map',
                'date': '27/01/16 - 23/02/16',
                'description': 'Map that uses Google Maps API to present a number ' +
                    'of live theatre options in a palatable manner.',
                'image': 'dist/images/theatremap.png',
                'url': 'https://github.com/AndreiCommunication/toronto-theatre-map',
                'altText': 'Google Map with some custom markers'
            }, {
                'title': 'Jasmine Test Suites',
                'date': '24/02/16 - 25/02/16',
                'description': 'A set of Jasmine Test Suites to check for correct ' +
                    'functionality of a RSS feed reader.',
                'image': 'dist/images/jasmine.png',
                'url': 'https://github.com/AndreiCommunication/feed-reader-testing',
                'altText': 'Jasmine test results display'
            }, {
                'title': 'Tiny Crossing',
                'date': '29/10/15 - 20/11/15',
                'description': 'An object oriented game using JavaScript and HTML 5 canvas. ' +
                    'It is a Frogger clone with increasingly difficult levels.',
                'image': 'dist/images/tiny_crossing.jpeg',
                'url': 'https://github.com/AndreiCommunication/tiny-crossing',
                'altText': 'Screen capture of a frogger-style game'
            }, {
                'title': 'Riddle Game',
                'date': '21/09/15 - 25/09/15',
                'description': 'An object oriented game in Python 2.7. Player walks around to complete ' +
                    'riddles. The game is available on my GitHub account.',
                'image': 'dist/images/riddle_game.jpeg',
                'url': 'https://github.com/AndreiCommunication/riddle-game',
                'altText': 'Screen capture of a text-based game'
            }, {
                'title': 'Optimized Website Project',
                'date': '12/11/15 - 19/01/16',
                'description': 'For this project, a horribly unoptimized portfolio was ' +
                    'presented to me and I made its initial load and the animations on the ' +
                    'linked pizza page work much faster.',
                'image': 'dist/images/optimized_site.jpeg',
                'url': 'https://github.com/AndreiCommunication/Optimized-Portfolio',
                'altText': 'Site segment featuring a randomly generated pizza ingredient list'
            }],
            'current': 0
        },
        bio: {
            'name': 'Andrei Borissenko',
            'role': 'Frontend Web Developer',
            'contacts': {
                'email': 'aborissenkodev@gmail.com',
                'github': 'AndreiBoris',
                'twitter': '@AndreiBDev',
                'location': 'Toronto, Canada'
            },
            'picture': 'dist/images/me.jpg',
            'welcome': 'Develop everyday.',
            'skills': [
                'Python',
                'HTML',
                'CSS',
                'Sass',
                'JavaScript',
                'jQuery',
                'Grunt',
                'Gulp',
                'C',
                'Bash',
                'Jasmine',
                'AJAX',
                'Knockout'
            ],
            'icons': [{
                'icon': 'fa fa-git',
                'url': 'https://github.com/AndreiCommunication'
            }, {
                'icon': 'fa fa-linkedin',
                'url': '#'
            }, {
                'icon': 'fa fa-twitter',
                'url': 'https://twitter.com/AndreiBDev'
            }, {
                'icon': 'fa fa-envelope',
                'url': 'mailto:aborissenkodev@gmail.com'
            }]
        },
        education: {
            'schools': [{
                'name': 'York University',
                'location': 'Toronto, Ontario, Canada',
                'degree': 'Bachelor of Fine Arts',
                'majors': [
                    'theatre',
                ],
                'dates': '2014',
                'url': 'http://www.yorku.ca/index.html'
            }],
            'online': [{
                'title': 'JavaScript Testing',
                'school': 'Udacity',
                'dates': '2016',
                'url': 'https://www.udacity.com/courses/ud549'
            }, {
                'title': 'JavaScript Design Patterns',
                'school': 'Udacity',
                'dates': '2016',
                'url': 'https://www.udacity.com/courses/ud989'
            }, {
                'title': 'Intro to AJAX',
                'school': 'Udacity',
                'dates': '2016',
                'url': 'https://www.udacity.com/courses/ud110'
            }, {
                'title': 'Browser Rendering Optimization',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/courses/ud860'
            }, {
                'title': 'Website Performance Optimization',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/courses/ud884'
            }, {
                'title': 'HTML5 Canvas',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/courses/ud292'
            }, {
                'title': 'Object-Oriented JavaScript',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/courses/ud015'
            }, {
                'title': 'Intro to jQuery',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/viewer#!/c-ud015-nd'
            }, {
                'title': 'JavaScript Basics',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/javascript-basics--ud804'
            }, {
                'title': 'How to Use Git and GitHub',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/how-to-use-git-and-github--ud775'
            }, {
                'title': 'Programming Foundations with Python',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/programming-foundations-with-python--ud036'
            }, {
                'title': 'Responsive Images',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/responsive-images--ud882'
            }, {
                'title': 'Responsive Web Design Fundamentals',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/responsive-web-design-fundamentals--ud893'
            }, {
                'title': 'Intro to HTML and CSS',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/intro-to-html-and-css--ud304'
            }, {
                'title': 'Intro to Computer Science',
                'school': 'Udacity',
                'dates': '2015',
                'url': 'https://www.udacity.com/course/intro-to-computer-science--cs101'
            }]
        }
    };

    bridge = {

        /**
         * Set everything up.
         * @return {[type]} [description]
         */
        init: function() {
            view.init();
        },

        /**
         * Get an attribute (detail) from the bio object in the model
         */
        getBio: function(detail) {
            return model.bio[detail];
        },

        /**
         * Get an attribute (detail) from the contacts object in the bio object
         * in the model
         */
        getBioContacts: function(detail) {
            return model.bio.contacts[detail];
        },

        /**
         * Get array of projects from the projects object in model object
         */
        getProjects: function() {
            return model.projects.projects;
        },

        /**
         * Get array of schools from the education object in model object
         */
        getSchools: function() {
            return model.education.schools;
        },

        /**
         * Get array of online courses from the education object in model object
         */
        getOnlineCourses: function() {
            return model.education.online;
        },

        /**
         * Get array of jobs from the work object in model object
         */
        getJobs: function() {
            return model.work.jobs;
        },

        /**
         * Advance the currently selected project in the model.projects object.
         */
        nextProject: function() {
            // We are at the end of the projects array.
            if (model.projects.current + 1 >= model.projects.projects.length) {
                model.projects.current = 0; // Back to beginning
            } else {
                model.projects.current++;
            }
        },

        /**
         * Backtrack the currently selected project in the model.projects object.
         */
        previousProject: function() {
            // We are at the beginning of the projects array.
            if (model.projects.current === 0) {
                // Go to the last project.
                model.projects.current = model.projects.projects.length - 1;
            } else {
                model.projects.current--;
            }
        },

        /**
         * Get the index number of the currently selected object.
         */
        getCurrentProject: function() {
            return model.projects.current;
        },

        /**
         * Check which is the next project without changing anything. This is
         * necessray because the projects should loop so that after the last one
         * the next project is the first project in the array. The parameter
         * 'starting' allows us to peek further ahead as well.
         * @param  {integer} starting index number of the project from which to
         *                            perform the query.
         *
         */
        peekNextProject: function(starting) {
            // Current project is the last in the array
            if (starting + 1 >= model.projects.projects.length) {
                return 0; // Next project is the first in the array.
            } else {
                return starting + 1; // Return the next project in the array.
            }
        },

        /**
         * Allows us to select any object without having to cycle through them.
         */
        setCurrentProject: function(index) {
            model.projects.current = index;
        }
    };

    /**
     * Object for handling user interface.
     */
    view = {
        /**
         * Reused jQuery objects to avoid unnecessary DOM calls.
         */
        $body: $('body'),
        $projects: null,
        $projectsNavItems: null,

        /**
         * Set up the view.
         */
        init: function() {

            this.renderBio();
            this.loadProjects(); // calls renderProjects
            this.renderEducation();
            this.renderWork();
            this.renderNav();
            this.setNavListeners(); // navigation bar behaviour

            $('#mapDiv').append(helper.googleMap);

            // Console log click locations.
            $(document).click(function(loc) {
                console.log('x location: ' + loc.pageX, 'y location:' + loc.pageY);
            });

        },

        /**
         * Render the bio in the header and in the footer.
         */
        renderBio: function() {
            // Format helper functions with information from the model
            var formattedName = helper.HTMLheaderName.replace('%data%', bridge.getBio('name')),
                formattedRole = helper.HTMLheaderRole.replace('%data%', bridge.getBio('role')),
                formattedEmail = helper.HTMLemail.replace('%data%', bridge.getBioContacts('email')),
                formattedGithub = helper.HTMLgithub.replace('%data%', bridge.getBioContacts('github')),
                formattedTwitter = helper.HTMLtwitter.replace('%data%', bridge.getBioContacts('twitter')),
                formattedLocation = helper.HTMLlocation.replace('%data%', bridge.getBioContacts('location')),
                formattedBioPic = helper.HTMLbioPic.replace('%data%', bridge.getBio('picture')),
                formattedWelcome = helper.HTMLwelcomeMsg.replace('%data%', bridge.getBio('welcome'));


            // Add formatted elements to the DOM
            $('#header-name').append(formattedName);
            $('#header-title').append(formattedRole);

            $('#topContacts').append(formattedEmail);
            $('#topContacts').append(formattedGithub);
            $('#topContacts').append(formattedTwitter);
            $('#topContacts').append(formattedLocation);

            $('#header-photo').append(formattedBioPic);
            $('#header-motto').append(formattedWelcome);

            // Stores both fullName and intName to allow toggle.
            var fullName = $('#name').text();
            var intName = fullName.split(' ');
            intName[1] = intName[1].toUpperCase();
            intName = intName.join(' ');

            // Toggle between fullName and intName for internationalization upon clicking
            // on name.
            $('#name').on('click', function() {
                if ($('#name').text() === fullName) {
                    $('#name').text(intName);
                } else {
                    $('#name').text(fullName);
                }
            });

            var i;
            // Display header skills.
            var usefulSkills = bridge.getBio('skills');
            var numSkills = usefulSkills.length;
            if (numSkills > 0) { // If there are skills, we attach a title and...
                $('#header-skill-title').append(helper.HTMLskillsStart);
                for (i = 0; i < numSkills; i++) {
                    // Add each of the skills, formatted, to the DOM
                    $('#header-skills').append(helper.HTMLskills.replace('%data%', usefulSkills[i]));
                }
            }

            // Display footer icons.
            var footerIcons = bridge.getBio('icons');
            var numIcons = footerIcons.length;
            for (i = 0; i < numIcons; i++) {
                $('#footerContacts').append(helper.HTMLfooterStart);
                var formattedFooter = helper.HTMLfooterContact.replace('%data%', footerIcons[i].icon);
                formattedFooter = formattedFooter.replace('#', footerIcons[i].url);
                $('.footer-entry:last').append(formattedFooter);
            }
        },


        /**
         * Load project related information into view
         */
        loadProjects: function() {
            // helper.HTMLprojectLines create line graphics for displays over 1200px wide, see
            // _media.scss. This is also the case for helper.HTMLworkLine and helper.HTMLeducationLines.
            $('#projects').prepend(helper.HTMLprojectLines);
            // Project object
            var allProjects = bridge.getProjects();
            var numProjects = allProjects.length; // for the 'for' loop
            // DOM calls made before loop. Both are for adding elements to.
            var $projectsCarousel = $('#projects-carousel');
            var $projectsNav = $('#projects-nav');
            var self = this; // needed due to scope issues inside event handlers

            for (var i = 0; i < numProjects; i++) {
                // Add to the project navigation buttons for the carousel
                var formattedProjectNavItem = helper.HTMLprojectNavItem.replace('%data%', (i + 1).toString());
                $projectsNav.append(formattedProjectNavItem);

                // Give an anchor element a link to github repo of the project
                var formattedProjectStart = helper.HTMLprojectStart.replace('#', allProjects[i].url);
                formattedProjectStart = formattedProjectStart.replace('%content%', allProjects[i].description);
                formattedProjectStart = formattedProjectStart.replace('%title%', allProjects[i].title);
                formattedProjectStart = formattedProjectStart.replace('%alt%', allProjects[i].altText);
                // Add the anchor to the carousel to hold project info
                $projectsCarousel.append(formattedProjectStart);

                // Add corresponding titles and dates to premade elements
                var formattedProjectTitle = helper.HTMLprojectTitle.replace('%data%', allProjects[i].title),
                    formattedProjectDates = helper.HTMLprojectDates.replace('%data%', allProjects[i].date);
                // formattedProjectDesc = helper.HTMLprojectDescription.replace('%data%', allProjects[i].description),

                // Grab the most recently added project-entry
                var $lastProjectEntry = $('.project-entry:last');
                // Add the title and dates elements we made earlier to it
                $lastProjectEntry.append(formattedProjectTitle);
                $lastProjectEntry.append(formattedProjectDates);
                // Set background image to the project image
                $lastProjectEntry.css('background-image', 'url(' + allProjects[i].image + ')');



            }
            // Set up listeners for next project and previous project buttons on
            // the carousel
            $('.next-project-button').on('click', function() {
                bridge.nextProject();
                self.renderProjects();
            });
            $('.previous-project-button').on('click', function() {
                bridge.previousProject();
                self.renderProjects();
            });
            // Grab all the newly created project nav items for renderProjects
            this.$projectsNavItems = $('.project-nav-item button');
            // Grab all the newly created projects in the carousel for
            // renderProjects
            this.$projects = $('.project-entry');


            /**
             * Apply popover behaviour to all the carousel items, with the
             * popover being drawn on the top side of the items.
             */
            this.$projects.popover({ placement: 'top' });

            /**
             * Popover listener that closes all popovers whenever something other
             * than a popover or a project in the carousel is clicked.
             */
            var projectPopoverListeners = function() {
                self.$body.on('click', function(e) {
                    // Thanks Oscar Jara for how to determine which element was
                    // clicked on!
                    // http://stackoverflow.com/questions/10706903/check-which-element-has-been-clicked-with-jquery
                    /**
                     * @type {jQuery} $target is whatever DOM element was clicked
                     */
                    var $target = $(e.target);

                    if ($target.is('.popover-title') ||
                        $target.is('.popover-text') ||
                        $target.is('.popover-content') ||
                        $target.is('.project-entry')) {
                        // do nothing
                    } else { // Something other than a popover or carousel item
                        self.$projects.popover('hide');
                    }
                });
            };

            // Set up listeners to close popovers when necessary
            projectPopoverListeners();

            /**
             * Display the project at position index in the carousel.
             * @param  {integer} index of project we want to choose
             */
            var projectNavHandler = function(index) {
                bridge.setCurrentProject(index);
                self.renderProjects(); // Draw projects that should be rendered
                // Once the new set of projects are rendered, we can apply focus
                // on the project we selected
                $(self.$projects[index]).focus();
            };

            /**
             * Set up listener on the carousel nav item at position index.
             * @param  {index} index of project we want to choose
             */
            var projectNavListener = function(index) {
                // Listener requires jQuery object at the position index of all
                // the carousel navigation items.
                $(self.$projectsNavItems[index]).on('click', function() {
                    projectNavHandler(index);
                });
            };

            // project-nav-items correspond to projects 1:1
            for (i = 0; i < numProjects; i++) {
                // Create listener for the latest project-nav-item to make it
                // select the corresponding project
                projectNavListener(i);
            }
            // Display the projects as they are currently laid out
            this.renderProjects();
        },

        /**
         * Update the navigation for the object at position index, as it is now
         * being displayed.
         */
        updateDisplayedProjectNav: function(index) {
            $(this.$projectsNavItems[index])
                .addClass('active') // Change visual look of button
                // Add screenreader-only text to navigation button '(Slide open)'
                .append(helper.HTMLprojectNavSelected);
        },

        /**
         * Display the project at position index in location position in the
         * carousel
         */
        displayProjectInCarousel: function(index, position) {
            $(this.$projects[index])
                .addClass('active') // Display object in carousel
                // Set the object to be the first of its kind in the DOM, so
                // that it displays first in the carousel
                .insertBefore($('.project-entry').eq(position))
                // Announce carousel item to screenreaders
                .attr('aria-live', 'polite');
        },

        /**
         * Draw the current state of the projects in the carousel.
         */
        renderProjects: function() {
            // 15 pixels needed so that breakpoints line up with the rendering
            // of additional projects
            var windowWidth = this.$body.width() + 15;
            // Preliminarily hide all projects
            this.$projects.removeClass('active');
            this.$projectsNavItems.removeClass('active');
            // Remove screen-reader-only text on project navigation buttons
            $('.project-nav-selected').remove();
            // Hide all projects from screen readers
            this.$projects.attr('aria-live', 'off');
            // Grab the currently selected project
            var currentProject = bridge.getCurrentProject();
            // Change visual of the selected project navigation button
            this.updateDisplayedProjectNav(currentProject);
            // Display the currently selected project in the carousel
            this.displayProjectInCarousel(currentProject, 0);
            // Variable to keep track of index of second and third projects
            // after the currently selected (first) one.
            var secondInLine, thirdInLine;
            if (windowWidth >= 1200) { // can display 3 projects
                // Get positions of next two projects
                secondInLine = bridge.peekNextProject(currentProject);
                thirdInLine = bridge.peekNextProject(secondInLine);
                // Display next two projects and update navigation to reflect this
                this.displayProjectInCarousel(secondInLine, 1);
                this.displayProjectInCarousel(thirdInLine, 2);
                this.updateDisplayedProjectNav(secondInLine);
                this.updateDisplayedProjectNav(thirdInLine);
            } else if (windowWidth >= 768) { // can display 2 projects
                // Get positions of next project
                secondInLine = bridge.peekNextProject(currentProject);
                // Display next project and update navigation to reflect this
                this.displayProjectInCarousel(secondInLine, 1);
                this.updateDisplayedProjectNav(secondInLine);
            }
        },

        /**
         * Render education related information
         */
        renderEducation: function() {
            var allSchools = bridge.getSchools();
            var numSchools = allSchools.length;
            var i;
            for (i = 0; i < numSchools; i++) {
                $('#education-container').append(helper.HTMLschoolStart);

                var formattedName = helper.HTMLschoolName.replace('%data%', allSchools[i].name);
                formattedName = formattedName.replace('#', allSchools[i].url);

                var formattedDegree = helper.HTMLschoolDegree.replace('%data%', allSchools[i].degree),
                    formattedDates = helper.HTMLschoolDates.replace('%data%', allSchools[i].dates),
                    formattedLocation = helper.HTMLschoolLocation.replace('%data%', allSchools[i].location),
                    formattedMajor = helper.HTMLschoolMajor.replace('%data%', allSchools[i].majors.join(', '));

                $('.education-entry:last').append(formattedName);
                $('.education-entry:last').append(formattedDegree);
                $('.education-entry:last').append(formattedDates);
                $('.education-entry:last').append(formattedLocation);
                $('.education-entry:last').append(formattedMajor);
            }

            var allOnlineCourses = bridge.getOnlineCourses();
            var numOnlineCourses = allOnlineCourses.length;
            // If there are no online classes, this heading won't be added to the resume
            if (numOnlineCourses > 0) {
                $('#education-container').append(helper.HTMLonlineClasses);
            }

            for (i = 0; i < numOnlineCourses; i++) {
                var formattedEntry = helper.HTMLonlinePill.replace('#', allOnlineCourses[i].url);
                formattedEntry = formattedEntry.replace('%data%', allOnlineCourses[i].title);
                formattedEntry = formattedEntry.replace('%date%', allOnlineCourses[i].dates);
                formattedEntry = formattedEntry.replace('%school%', allOnlineCourses[i].school);
                $('#online-classes').append(formattedEntry);
            }
        },

        /**
         * Render work related information
         */
        renderWork: function() {

            var allJobs = bridge.getJobs();
            var numJobs = allJobs.length;
            if (numJobs > 0) {
                for (var i = 0; i < numJobs; i++) {
                    $('#work-container').append(helper.HTMLworkStart);
                    var formattedEmployer = helper.HTMLworkEmployer.replace('%data%', allJobs[i].employer);
                    formattedEmployer = formattedEmployer.replace('#', allJobs[i].url);

                    var formattedTitle = helper.HTMLworkTitle.replace('%data%', allJobs[i].title),
                        formattedEmployerTitle = formattedEmployer + formattedTitle,
                        formattedDates = helper.HTMLworkDates.replace('%data%', allJobs[i].date),
                        formattedLocation = helper.HTMLworkLocation.replace('%data%', allJobs[i].location),
                        formattedDesc = helper.HTMLworkDescription.replace('%data%', allJobs[i].description);

                    $('.work-entry:last').append(formattedEmployerTitle);
                    $('.work-entry:last').append(formattedDates);
                    $('.work-entry:last').append(formattedLocation);
                    $('.work-entry:last').append(formattedDesc);

                }
            }
        },

        /**
         * Navigation should become affixed when we scroll near to the end of
         * the top div.
         */
        renderNav: function() {
            $('#nav-div').affix({
                offset: {
                    top: function() {
                        // the '- 100' accounts desire to get the navbar to a
                        // affix earlier than expected to avoid problems when
                        // scrolling to the first section, currently 'Projects'
                        // and dealing with indecisive navbar. This '- 100'
                        // ensures that the navbar WILL be attached when at
                        // 'Projects'
                        return (this.top = $('#header').outerHeight(true) - 100);
                    }
                }
            });
        },

        /**
         * Set up listeners that get navigation buttons to scroll to the
         * correct location on the resume.
         */
        setNavListeners: function() {
            // All nav anchors
            var $navButtons = $('nav a');
            // Avoid making DOM queries during each handler execution
            var $header = $('#header'); // The top element
            var $body = $('body');
            var $navBar = $('#collapsing-navbar');
            var $collapseButton = $('#collapse-button');
            // Constants
            // Default value for smallScreenOffset is 0, no offset for large
            // screens.
            var STANDARD_OFFSET = 0;
            // Compensate for larger menu size on small displays
            var SMALL_SCREEN_OFFSET = 15;
            // Small screens account for extended nav when above the affix point
            var SMALL_SCREEN_TOP_OFFSET = 300;
            // Pixels above the bottom of the header that navbar should affix
            var AFFIX_OFFSET = 100;
            // Offset that happens due to being above the affix point
            var ABOVE_AFFIX_OFFSET = 145;
            // Offset that happens when below the affix point
            var BELOW_AFFIX_OFFSET = 60;
            // Length of animation in milliseconds (ms)
            var ANIMATION_TIME = 500;
            // Listener for when any of the navigations buttons are clicked
            $navButtons.on('click', function() {
                // We can tell we're on a small screen if the navigation bar has
                // the class 'in', as that means that a collapsable menu is
                // currently on the screen. It must be 'in', since if it isn't,
                // the navigation button cannot be clicked.
                var smallScreen = $navBar.hasClass('in');
                var smallScreenOffset = STANDARD_OFFSET;
                if (smallScreen) {
                    $collapseButton.click(); // minimize navigation menu
                    smallScreenOffset = SMALL_SCREEN_OFFSET;
                }
                // Position where navbar becomes affixed
                var affixPos = $header.outerHeight(true) - AFFIX_OFFSET;
                // Current scroll position
                var currentPos = $body.scrollTop();
                // If we are above the affix point, we should scroll less to
                // make up for the pixels we'll lose when the navigation bar
                // detaches and becomes a fixed position element.
                var aboveDetach = affixPos >= currentPos;
                if (aboveDetach) { // We will lose some height due to affixation
                    if (smallScreen) { // Small screens account for extended nav
                        smallScreenOffset = SMALL_SCREEN_TOP_OFFSET;
                    }
                    /* Thank you to Joseph Silber on Stackover flow for this
                    nav scroll solution:
                    http://stackoverflow.com/questions/7717527/jquery-smooth-scrolling-when-clicking-an-anchor-link
                    */
                    // Scroll to just above the current offset().top of the
                    // element that corresponds to the href of this button. The
                    // href values correspond to DOM elements that are the titles
                    // of sections such as "Projects" and "Work Experience"
                    $body.animate({
                        scrollTop: $($(this).attr('href')).offset().top - ABOVE_AFFIX_OFFSET - smallScreenOffset
                    }, ANIMATION_TIME); // Take 0.5 secods to complete scroll
                } else {
                    $body.animate({
                        scrollTop: $($(this).attr('href')).offset().top - BELOW_AFFIX_OFFSET - smallScreenOffset
                    }, ANIMATION_TIME); // Take 0.5 secods to complete scroll
                }
                return false; // prevent default (default nav scroll is bad)
            });
        }

    };

    bridge.init();

    // return model;
    window.resumeBuilder = model;
    window.viewControls = view;

})();

if (document.getElementsByClassName('flex-item').length === 0) {
    document.getElementById('topContacts').style.color = 'black';
}
if (document.getElementsByTagName('h1').length === 0) {
    document.getElementById('header').style.backgroundColor = 'black';
}
if (document.getElementsByClassName('work-entry').length === 0) {
    document.getElementById('workExperience').style.backgroundColor = 'black';
}
if (document.getElementsByClassName('project-entry').length === 0) {
    document.getElementById('projects').style.backgroundColor = 'black';
}
if (document.getElementsByClassName('education-entry').length === 0) {
    document.getElementById('education').style.backgroundColor = 'black';
}
if (document.getElementsByClassName('flex-item').length === 0) {
    document.getElementById('lets-connect').style.backgroundColor = 'black';
}
if (document.getElementById('map') === null) {
    document.getElementById('mapDiv').style.backgroundColor = 'black';
}
