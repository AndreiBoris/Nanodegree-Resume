/*

This file contains all of the code running in the background that makes
resumeBuilder.js possible. We call these helper functions because they
support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course.
You won't need to make any changes to it until you start experimenting with
inserting a Google Map in Problem Set 3.

Cameron Pittman
*/
var map,
    google,
    model;

/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
to replace the %data% placeholder text you see in them.
*/
var helper = {

        HTMLheaderName: '<h1 id="name">%data%</h1>',
        HTMLheaderRole: '<span class="header-role">%data%</span><hr/>',

        HTMLcontactGeneric: '<li class="flex-item"><span class="highlight-text">%contact%</span><span class="white-text">%data%</span></li>',
        HTMLmobile: '<li class="flex-item"><span class="highlight-text">mobile</span><span class="white-text">%data%</span></li>',
        HTMLemail: '<li class="flex-item"><span class="highlight-text">email</span><span class="white-text">%data%</span></li>',
        HTMLtwitter: '<li class="flex-item"><span class="highlight-text">twitter</span><span class="white-text">%data%</span></li>',
        HTMLgithub: '<li class="flex-item"><span class="highlight-text">github</span><span class="white-text">%data%</span></li>',
        HTMLblog: '<li class="flex-item"><span class="highlight-text">blog</span><span class="white-text">%data%</span></li>',
        HTMLlocation: '<li class="flex-item"><span class="highlight-text">location</span><span class="white-text">%data%</span></li>',

        HTMLbioPic: '<img src="%data%" class="biopic">',
        HTMLwelcomeMsg: '<span class="welcome-message">%data%</span>',

        HTMLskillsStart: '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box-skills"></ul>',
        HTMLskills: '<li class="flex-item"><span class="white-text">%data%</span></li>',

        // This is a div that gets manipulated into line shapes on displays of width
        // greater than 1200px wide. See _media.scss for the style information.
        // HTMLprojectLines and HTMLeducationLines are also part of the same thing.
        HTMLworkLine: '<div id="work-line"></div>',
        HTMLworkStart: '<div class="work-entry"></div>',
        HTMLworkEmployer: '<a href="#" target="_blank">%data%',
        HTMLworkTitle: ' - %data%</a>',
        HTMLworkDates: '<div class="date-text">%data%</div>',
        HTMLworkLocation: '<div class="location-text">%data%</div>',
        HTMLworkDescription: '<p><br>%data%</p>',

        HTMLprojectLines: '<div id="project-line1"></div><div id="project-line2"></div>',
        HTMLprojectStart: '</div><div class="project-entry"></div>',
        HTMLprojectTitle: '<a href="#" target="_blank">%data%</a>',
        HTMLprojectDates: '<div class="date-text">%data%</div>',
        HTMLprojectDescription: '<p><br>%data%</p>',
        HTMLprojectImage: '<a href="#" target="_blank"><img class="project-img" src="%data%"></a>',

        HTMLeducationLines: '<div id="edu-line1"></div><div id="edu-line2"></div><div id="edu-line3"></div>',
        HTMLschoolStart: '<div class="education-entry"></div>',
        HTMLschoolName: '<a href="#" target="_blank">%data%',
        HTMLschoolDegree: ' -- %data%</a>',
        HTMLschoolDates: '<div class="date-text">%data%</div>',
        HTMLschoolLocation: '<div class="location-text">%data%</div>',
        HTMLschoolMajor: '<em><br>Major: %data%</em>',

        HTMLonlineClasses: '<h3 class="online-subtitle">Online Classes</h3>',
        HTMLonlineTitle: '<a href="#" target="_blank">%data%',
        HTMLonlineSchool: ' - %data%</a>',
        HTMLonlineDates: '<div class="date-text">%data%</div>',
        HTMLonlineURL: '<br><a href="#">%data%</a>',

        // These allow us to add Font Awesome icons that link to other sites to the footer
        HTMLfooterStart: '<li class="footer-entry"></li>',
        HTMLfooterContact: '<a class="footer-icon" href="#" target="_blank"><span class="%data%"></span></a>',

        googleMap: '<div id="map"></div>',

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
            map = new google.maps.Map(document.querySelector('#map'), mapOptions);


            /*
            locationFinder() returns an array of every location string from the JSONs
            written for bio, education, and work.
            */
            function locationFinder() {

                // initializes an empty array
                var locations = [];

                // adds the single location property from bio to the locations array
                locations.push(model.bio.contacts.location);

                // iterates through school locations and appends each location to
                // the locations array
                for (var school in model.education.schools) {
                    locations.push(model.education.schools[school].location);
                }

                // iterates through work locations and appends each location to
                // the locations array
                for (var job in model.work.jobs) {
                    locations.push(model.work.jobs[job].location);
                }

                return locations;
            }

            /*
            createMapMarker(placeData) reads Google Places search results to create map pins.
            placeData is the object returned from search results containing information
            about a single location.
            */

            function createMapMarker(placeData) {

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
    /*
    Uncomment the code below when you're ready to implement a Google Map!
    */

// Calls the initializeMap() function when the page loads
window.addEventListener('load', helper.initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
//window.addEventListener('resize', function(e) {
//Make sure the map bounds get updated on page resize
//  map.fitBounds(mapBounds);
//});

'use strict';
/* All information objects */
var helper;

var model, octopus, view;

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
            'title': 'Tiny Crossing',
            'date': '29/10/15 - 20/11/15',
            'description': 'An object oriented game using JavaScript and HTML 5 canvas. ' +
                'It is a Frogger clone with increasingly difficult levels.',
            'image': [
                'images/tiny_crossing.jpeg'
            ],
            'url': 'https://github.com/AndreiCommunication/tiny-crossing'
        }, {
            'title': 'Riddle Game',
            'date': '21/09/15 - 25/09/15',
            'description': 'An object oriented game in Python 2.7. Player walks around to complete ' +
                'riddles. The game is available on my GitHub account.',
            'image': [
                'images/riddle_game.jpeg'
            ],
            'url': 'https://github.com/AndreiCommunication/riddle-game'
        }, {
            'title': 'Optimized Website Project',
            'date': '12/11/15 - 19/01/16',
            'description': 'For this project, a horribly unoptimized portfolio was ' +
                'presented to me and I made its initial load and the animations on the ' +
                'linked pizza page work much faster.',
            'image': [
                'images/optimized_site.jpeg'
            ],
            'url': 'https://github.com/AndreiCommunication/Optimized-Portfolio'
        }, {
            'title': 'Portfolio Website',
            'date': '03/09/15 - 05/09/15',
            'description': 'A website set up to showcase web-based projects as they get completed.',
            'image': [
                'images/portfolio_site.jpeg'
            ],
            'url': 'http://andreicommunication.github.io/portfolio-website'
        }]
    },
    bio: {
        'name': 'Andrei Borissenko',
        'role': 'Software Engineer',
        'contacts': {
            'mobile': '416 508 1951',
            'email': 'Andrei.Borissenko@gmail.com',
            'github': 'AndreiCommunication',
            'twitter': '@BreathMachine',
            'location': 'Toronto, Ontario, Canada'
        },
        'picture': 'images/me-400.jpg',
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
            'Bash scripting'
        ],
        'icons': [{
            'icon': 'fa fa-git',
            'url': 'https://github.com/AndreiCommunication'
        }, {
            'icon': 'fa fa-linkedin',
            'url': '#'
        }, {
            'icon': 'fa fa-twitter',
            'url': 'https://twitter.com/BreathMachine'
        }, {
            'icon': 'fa fa-envelope',
            'url': 'mailto:Andrei.Borissenko@gmail.com'
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

octopus = {

};

view = {

};




/* Display functions */

// This function is defined using dot notation as part of the resume assignment
var renderBio = function() {
    var formattedName = helper.HTMLheaderName.replace('%data%', model.bio.name),
        formattedRole = helper.HTMLheaderRole.replace('%data%', model.bio.role),
        formattedMobile = helper.HTMLmobile.replace('%data%', model.bio.contacts.mobile),
        formattedEmail = helper.HTMLemail.replace('%data%', model.bio.contacts.email),
        formattedGithub = helper.HTMLgithub.replace('%data%', model.bio.contacts.github),
        formattedTwitter = helper.HTMLtwitter.replace('%data%', model.bio.contacts.twitter),
        formattedLocation = helper.HTMLlocation.replace('%data%', model.bio.contacts.location),
        formattedBioPic = helper.HTMLbioPic.replace('%data%', model.bio.picture),
        formattedWelcome = helper.HTMLwelcomeMsg.replace('%data%', model.bio.welcome);

    $('#header').prepend(formattedRole);
    // This .line-break will be toggled on when the display is sufficiently small
    // in order to give extra space to the role.
    $('.header-role').prepend('<span class="line-break"><br></span>');
    $('#header').prepend(formattedName);

    $('#topContacts').append(formattedMobile);
    $('#topContacts').append(formattedEmail);
    $('#topContacts').append(formattedGithub);
    $('#topContacts').append(formattedTwitter);
    $('#topContacts').append(formattedLocation);

    $('#header').append(formattedBioPic);
    $('#header').append(formattedWelcome);

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
    if (model.bio.skills.length > 0) {
        $('#header').append(helper.HTMLskillsStart);
        for (i = 0; i < model.bio.skills.length; i++) {
            $('#skills').append(helper.HTMLskills.replace('%data%', model.bio.skills[i]));
        }
    }

    // Display footer icons.
    var length = model.bio.icons.length;
    for (i = 0; i < length; i++) {
        $('#footerContacts').append(helper.HTMLfooterStart);
        var formattedFooter = helper.HTMLfooterContact.replace('%data%', model.bio.icons[i].icon);
        formattedFooter = formattedFooter.replace('#', model.bio.icons[i].url);
        $('.footer-entry:last').append(formattedFooter);
    }
};

var renderProjects = function() {

    // helper.HTMLprojectLines create line graphics for displays over 1200px wide, see
    // _media.scss. This is also the case for helper.HTMLworkLine and helper.HTMLeducationLines.
    $('#projects').prepend(helper.HTMLprojectLines);

    var length = model.projects.projects.length;
    for (var i = 0; i < length; i++) {
        $('#projects').append(helper.HTMLprojectStart);

        var formattedProjectTitle = helper.HTMLprojectTitle.replace('%data%', model.projects.projects[i].title);
        formattedProjectTitle = formattedProjectTitle.replace('#', model.projects.projects[i].url);

        var formattedProjectDates = helper.HTMLprojectDates.replace('%data%', model.projects.projects[i].date),
            formattedProjectDesc = helper.HTMLprojectDescription.replace('%data%', model.projects.projects[i].description),
            formattedProjectImage = helper.HTMLprojectImage.replace('%data%', model.projects.projects[i].image[0]);
        formattedProjectImage = formattedProjectImage.replace('#', model.projects.projects[i].url);

        $('.project-entry:last').append(formattedProjectTitle);
        $('.project-entry:last').append(formattedProjectDates);
        $('.project-entry:last').append(formattedProjectDesc);
        $('.project-entry:last').append(formattedProjectImage);
    }
};

var renderEducation = function() {

    $('#education').prepend(helper.HTMLeducationLines);

    var length = model.education.schools.length;
    for (var i = 0; i < length; i++) {
        $('#education').append(helper.HTMLschoolStart);

        var formattedName = helper.HTMLschoolName.replace('%data%', model.education.schools[i].name);
        formattedName = formattedName.replace('#', model.education.schools[i].url);

        var formattedDegree = helper.HTMLschoolDegree.replace('%data%', model.education.schools[i].degree),
            formattedDates = helper.HTMLschoolDates.replace('%data%', model.education.schools[i].dates),
            formattedLocation = helper.HTMLschoolLocation.replace('%data%', model.education.schools[i].location),
            formattedMajor = helper.HTMLschoolMajor.replace('%data%', model.education.schools[i].majors.join(', '));

        $('.education-entry:last').append(formattedName);
        $('.education-entry:last').append(formattedDegree);
        $('.education-entry:last').append(formattedDates);
        $('.education-entry:last').append(formattedLocation);
        $('.education-entry:last').append(formattedMajor);
    }

    // If there are no online classes, this heading won't be added to the resume
    if (model.education.online.length > 0) {
        $('#education').append(helper.HTMLonlineClasses);
    }

    length = model.education.online.length;
    for (var school = 0; school < length; school++) {
        $('#education').append(helper.HTMLschoolStart);

        var formattedTitle = helper.HTMLonlineTitle.replace('%data%', model.education.online[school].title);
        formattedTitle = formattedTitle.replace('#', model.education.online[school].url);

        var formattedSchool = helper.HTMLonlineSchool.replace('%data%', model.education.online[school].school);
        var formattedDatesOnline = helper.HTMLonlineDates.replace('%data%', model.education.online[school].dates);

        $('.education-entry:last').append(formattedTitle);
        $('.education-entry:last').append(formattedSchool);
        $('.education-entry:last').append(formattedDatesOnline);
    }
};

var renderWork = function() {

    if (model.work.jobs.length > 0) {

        $('#workExperience').prepend(helper.HTMLworkLine);

        var length = model.work.jobs.length;
        for (var i = 0; i < length; i++) {
            $('#workExperience').append(helper.HTMLworkStart);
            var formattedEmployer = helper.HTMLworkEmployer.replace('%data%', model.work.jobs[i].employer);
            formattedEmployer = formattedEmployer.replace('#', model.work.jobs[i].url);

            var formattedTitle = helper.HTMLworkTitle.replace('%data%', model.work.jobs[i].title),
                formattedEmployerTitle = formattedEmployer + formattedTitle,
                formattedDates = helper.HTMLworkDates.replace('%data%', model.work.jobs[i].date),
                formattedLocation = helper.HTMLworkLocation.replace('%data%', model.work.jobs[i].location),
                formattedDesc = helper.HTMLworkDescription.replace('%data%', model.work.jobs[i].description);

            $('.work-entry:last').append(formattedEmployerTitle);
            $('.work-entry:last').append(formattedDates);
            $('.work-entry:last').append(formattedLocation);
            $('.work-entry:last').append(formattedDesc);

        }
    }
};


renderBio();

renderWork();

renderProjects();

renderEducation();

$('#mapDiv').append(helper.googleMap);

// This console.logs click locations as part of the resume assignment.
$(document).click(function(loc) {
    console.log('x location: ' + loc.pageX, 'y location:' + loc.pageY);
});
