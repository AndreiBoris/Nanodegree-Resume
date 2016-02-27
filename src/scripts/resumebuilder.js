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
            'role': 'Frontend Web Developer',
            'contacts': {
                'email': 'Andrei.Borissenko@gmail.com',
                'github': 'AndreiCommunication',
                'twitter': '@BreathMachine',
                'location': 'Toronto, Ontario, Canada'
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

            $('#mapDiv').append(helper.googleMap);

            // This console.logs click locations as part of the resume assignment.
            $(document).click(function(loc) {
                console.log('x location: ' + loc.pageX, 'y location:' + loc.pageY);
            });

        },

        renderBio: function() {
            var formattedName = helper.HTMLheaderName.replace('%data%', bridge.getBio('name')),
                formattedRole = helper.HTMLheaderRole.replace('%data%', bridge.getBio('role')),
                formattedMobile = helper.HTMLmobile.replace('%data%', bridge.getBioContacts('mobile')),
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
        }

    };

    bridge.init();

    // return model;
    window.resumeBuilder = model;

})();
