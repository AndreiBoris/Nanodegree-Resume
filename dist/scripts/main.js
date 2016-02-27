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

    HTMLskillsStart: '<h3 id="skills-h3" class="header-heading">Toolkit:</h3><ul id="skills" class="flex-box-skills"></ul>',
    HTMLskills: '<div class="btn btn-default skill">%data%</div>',
    // HTMLskills: '<li class="flex-item"><span class="white-text">%data%</span></li>',

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
    HTMLprojectImage: '<a href="#" target="_blank"><img class="project-img" src="%data%" alt="%alt%"></a>',

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
                'title': 'Tiny Crossing',
                'date': '29/10/15 - 20/11/15',
                'description': 'An object oriented game using JavaScript and HTML 5 canvas. ' +
                    'It is a Frogger clone with increasingly difficult levels.',
                'image': [
                    'images/tiny_crossing.jpeg'
                ],
                'url': 'https://github.com/AndreiCommunication/tiny-crossing',
                'altText': 'Screen capture of a frogger-style game'
            }, {
                'title': 'Riddle Game',
                'date': '21/09/15 - 25/09/15',
                'description': 'An object oriented game in Python 2.7. Player walks around to complete ' +
                    'riddles. The game is available on my GitHub account.',
                'image': [
                    'images/riddle_game.jpeg'
                ],
                'url': 'https://github.com/AndreiCommunication/riddle-game',
                'altText': 'Screen capture of a text-based game'
            }, {
                'title': 'Optimized Website Project',
                'date': '12/11/15 - 19/01/16',
                'description': 'For this project, a horribly unoptimized portfolio was ' +
                    'presented to me and I made its initial load and the animations on the ' +
                    'linked pizza page work much faster.',
                'image': [
                    'images/optimized_site.jpeg'
                ],
                'url': 'https://github.com/AndreiCommunication/Optimized-Portfolio',
                'altText': 'Site segment featuring a randomly generated pizza ingredient list'
            }, {
                'title': 'Portfolio Website',
                'date': '03/09/15 - 05/09/15',
                'description': 'A website set up to showcase web-based projects as they get completed.',
                'image': [
                    'images/portfolio_site.jpeg'
                ],
                'url': 'http://andreicommunication.github.io/portfolio-website',
                'altText': 'Site segment of a Featured Work section in a portfolio website'
            }]
        },
        bio: {
            'name': 'Andrei Borissenko',
            'role': 'Frontend Web Developer',
            'contacts': {
                'email': 'Andrei.Borissenko@gmail.com',
                'github': 'AndreiCommunication',
                'twitter': '@BreathMachine',
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

    bridge = {

        init: function() {
            view.init();
        },

        getBio: function(detail) {
            return model.bio[detail];
        },

        getBioContacts: function(detail) {
            return model.bio.contacts[detail];
        },
        getSkills: function() {
            return model.bio.skills;
        },
        getIcons: function() {
            return model.bio.icons;
        },
        getProjects: function() {
            return model.projects.projects;
        },
        getSchools: function() {
            return model.education.schools;
        },
        getOnlineCourses: function() {
            return model.education.online;
        },
        getJobs: function() {
            return model.work.jobs;
        }
    };

    view = {

        init: function() {

            this.renderBio();
            this.renderProjects();
            this.renderEducation();
            this.renderWork();
            this.renderNav();

            $('#mapDiv').append(helper.googleMap);

            // This console.logs click locations as part of the resume assignment.
            $(document).click(function(loc) {
                console.log('x location: ' + loc.pageX, 'y location:' + loc.pageY);
            });

        },

        renderBio: function() {
            var formattedName = helper.HTMLheaderName.replace('%data%', bridge.getBio('name')),
                formattedRole = helper.HTMLheaderRole.replace('%data%', bridge.getBio('role')),
                // formattedMobile = helper.HTMLmobile.replace('%data%', bridge.getBioContacts('mobile')),
                formattedEmail = helper.HTMLemail.replace('%data%', bridge.getBioContacts('email')),
                formattedGithub = helper.HTMLgithub.replace('%data%', bridge.getBioContacts('github')),
                formattedTwitter = helper.HTMLtwitter.replace('%data%', bridge.getBioContacts('twitter')),
                formattedLocation = helper.HTMLlocation.replace('%data%', bridge.getBioContacts('location')),
                formattedBioPic = helper.HTMLbioPic.replace('%data%', bridge.getBio('picture')),
                formattedWelcome = helper.HTMLwelcomeMsg.replace('%data%', bridge.getBio('welcome'));

            $('#header-name').append(formattedName);
            $('#header-title').append(formattedRole);

            // $('#topContacts').append(formattedMobile);
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
            var usefulSkills = bridge.getSkills();
            var numSkills = usefulSkills.length;
            if (numSkills > 0) {
                $('#header-skill-title').append(helper.HTMLskillsStart);
                for (i = 0; i < numSkills; i++) {
                    $('#header-skills').append(helper.HTMLskills.replace('%data%', usefulSkills[i]));
                }
            }

            // Display footer icons.
            var footerIcons = bridge.getIcons();
            var numIcons = footerIcons.length;
            for (i = 0; i < numIcons; i++) {
                $('#footerContacts').append(helper.HTMLfooterStart);
                var formattedFooter = helper.HTMLfooterContact.replace('%data%', footerIcons[i].icon);
                formattedFooter = formattedFooter.replace('#', footerIcons[i].url);
                $('.footer-entry:last').append(formattedFooter);
            }
        },

        renderProjects: function() {

            // helper.HTMLprojectLines create line graphics for displays over 1200px wide, see
            // _media.scss. This is also the case for helper.HTMLworkLine and helper.HTMLeducationLines.
            $('#projects').prepend(helper.HTMLprojectLines);

            var allProjects = bridge.getProjects();
            var numProjects = allProjects.length;
            for (var i = 0; i < numProjects; i++) {
                $('#projects').append(helper.HTMLprojectStart);

                var formattedProjectTitle = helper.HTMLprojectTitle.replace('%data%', allProjects[i].title);
                formattedProjectTitle = formattedProjectTitle.replace('#', allProjects[i].url);

                var formattedProjectDates = helper.HTMLprojectDates.replace('%data%', allProjects[i].date),
                    formattedProjectDesc = helper.HTMLprojectDescription.replace('%data%', allProjects[i].description),
                    formattedProjectImage = helper.HTMLprojectImage.replace('%data%', allProjects[i].image[0]);
                formattedProjectImage = formattedProjectImage.replace('#', allProjects[i].url);
                formattedProjectImage = formattedProjectImage.replace('%alt%', allProjects[i].altText);

                $('.project-entry:last').append(formattedProjectTitle);
                $('.project-entry:last').append(formattedProjectDates);
                $('.project-entry:last').append(formattedProjectDesc);
                $('.project-entry:last').append(formattedProjectImage);
            }
        },

        renderEducation: function() {

            $('#education').prepend(helper.HTMLeducationLines);

            var allSchools = bridge.getSchools();
            var numSchools = allSchools.length;
            var i;
            for (i = 0; i < numSchools; i++) {
                $('#education').append(helper.HTMLschoolStart);

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
                $('#education').append(helper.HTMLonlineClasses);
            }

            for (i = 0; i < numOnlineCourses; i++) {
                $('#education').append(helper.HTMLschoolStart);

                var formattedTitle = helper.HTMLonlineTitle.replace('%data%', allOnlineCourses[i].title);
                formattedTitle = formattedTitle.replace('#', allOnlineCourses[i].url);

                var formattedSchool = helper.HTMLonlineSchool.replace('%data%', allOnlineCourses[i].school);
                var formattedDatesOnline = helper.HTMLonlineDates.replace('%data%', allOnlineCourses[i].dates);

                $('.education-entry:last').append(formattedTitle);
                $('.education-entry:last').append(formattedSchool);
                $('.education-entry:last').append(formattedDatesOnline);
            }
        },
        renderWork: function() {

            var allJobs = bridge.getJobs();
            var numJobs = allJobs.length;
            if (numJobs > 0) {

                $('#workExperience').prepend(helper.HTMLworkLine);

                for (var i = 0; i < numJobs; i++) {
                    $('#workExperience').append(helper.HTMLworkStart);
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
        renderNav: function() {
            $('#nav-div').affix({
                offset: {
                    top: function() {
                        return (this.top = $('#header').outerHeight(true));
                    }
                }
            });
        }

    };

    bridge.init();

    // return model;
    window.resumeBuilder = model;

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
