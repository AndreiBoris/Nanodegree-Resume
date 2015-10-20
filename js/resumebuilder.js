/* All information objects */

/*
description inside work.jobs and projects.projects uses an array of short lines
in order to be more presentable. These items then get concatinated in the
display functions defined below.
*/
var work = {
    'jobs': [
        {
            'employer': 'City of Vaughan',
            'title': 'Front of House Manager',
            'location': 'Vaughan, Ontario, Canada',
            'date': '07/2014 - present',
            'description': [
                'I talk to the client who is running the performance, as well as ',
                'the theatre technicians, the front of house staff, and the ',
                'patrons in order to ensure that everything runs smoothly. ',
                'Mainly, it is a matter of keeping things running on time, ',
                'making sure everyone is informed about current conditions, and ',
                'dealing with situations so as to avoid problems.'
            ],
            'url': 'http://www.vaughan.ca/services/cultural/city_playhouse_theatre/Pages/About.aspx'
        },
        {
            'employer': 'University of Toronto',
            'title': 'Standardized Patient',
            'location': 'Toronto, Ontario, Canada',
            'date': '10/2014 - present',
            'description': [
                'This job is involves learning and demonstrating particular ',
                'ailments and medical conditions so as to allow medical ',
                'students and practitioners to be tested for their knowledge ',
                'and aptitude for dealing with a variety of situations. ',
                'Due to the sensitive nature of dealing with examinations, ',
                'particulars are strictly confidential.'
            ],
            'url': 'http://www.spp.utoronto.ca/'
        },
        {
            'employer': 'Touchstone Institute',
            'title': 'Standardized Patient',
            'location': 'Toronto, Ontario, Canada',
            'date': '08/2015 - present',
            'description': [
                'See University of Toronto - Standardized Patient, above.'
            ],
            'url': 'http://www.touchstoneinstitute.ca/'
        },
        {
            'employer': 'York University',
            'title': 'Studio Monitor',
            'location': 'Toronto, Ontario, Canada',
            'date': '09/2013 - 04/2014',
            'description': [
                'I was tasked with keeping certainly rooms organized. It was ',
                'important to keep track of the dates when tasks were done and ',
                'to keep immediate supervisors informed of issues pertaining ',
                'to them. This was flexibly scheduled work ',
                'that had me working with little insturction. This job ',
                'terminated when I finished my degree at York.'
            ],
            'url': 'http://theatre.ampd.yorku.ca/'
        }
    ]
};

var projects = {
    'projects': [
        {
            'title': 'Riddle Game',
            'date': '21/09/15 - 25/09/15',
            'description': [
                'An object oriented game in Python 2.7. Player walks around to complete ',
                'riddles. The game is available on my GitHub account.'
            ],
            'image': [
                'images/riddle_game.jpeg'
            ],
            'url': 'https://github.com/AndreiCommunication/riddle-game'
        },
        {
            'title': 'Portfolio Website',
            'date': '03/09/15 - 05/09/15',
            'description': [
                'A website set up to showcase web-based projects as they get completed.'
            ],
            'image': [
                'images/portfolio_site.jpeg'
            ],
            'url': 'http://andreicommunication.github.io/portfolio-website'
        }
    ]
};

var bio = {
    // The span element around the last name with the last-name class is
    // necessary for the last name to appear in all caps when it is clicked to
    // appeal to international standards. See displayHeader() below.
    'name': 'Andrei <span id="last-name">Borissenko</span>',
    // The line-break class gets toggled on when the display is sufficiently
    // small to allow the role to take its own line.
    'role': '<span class="line-break"><br></span>Web Developer',
    'contacts': {
        'mobile': '416 508 1951',
        'email': 'Andrei.Borissenko@gmail.com',
        'github': 'AndreiCommunication',
        'twitter': '@BreathMachine',
        'location': 'Toronto, Ontario, Canada'
    },
    'picture': 'images/andrei.jpg',
    'welcome': 'Bringing communication and humanity, online.',
    'skills': [
        'Python',
        'HTML',
        'CSS',
        'Sass',
        'JavaScript',
        'jQuery',
        'Grunt',
        'English proficiency',
        'Creative approach',
        'Philosophical reflection'
    ],
    'icons': [{
      'icon': 'fa fa-git',
      'url': 'https://github.com/AndreiCommunication'
    },
    {
      'icon': 'fa fa-linkedin',
      'url': '#'
    },
    {
      'icon': 'fa fa-twitter',
      'url': 'https://twitter.com/BreathMachine'
    },
    {
      'icon': 'fa fa-envelope',
      'url': 'mailto:Andrei.Borissenko@gmail.com'
    }
    ]
};

var education = {
    'schools': [
        {
            'name': 'York University',
            'location': 'Toronto, Ontario, Canada',
            'degree': 'Bachelor of Fine Arts',
            'majors': [
                'theatre',
            ],
            'dates': '2014',
            'url': 'http://www.yorku.ca/index.html'
        }
    ],
    'online': [
        {
            'title': 'Intro to jQuery',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/intro-to-jquery--ud245'
        },
        {
            'title': 'JavaScript Basics',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/javascript-basics--ud804'
        },
        {
            'title': 'How to Use Git and GitHub',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/how-to-use-git-and-github--ud775'
        },
        {
            'title': 'Programming Foundations with Python',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/programming-foundations-with-python--ud036'
        },
        {
            'title': 'Responsive Images',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/responsive-images--ud882'
        },
        {
            'title': 'Responsive Web Design Fundamentals',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/responsive-web-design-fundamentals--ud893'
        },
        {
            'title': 'Intro to HTML and CSS',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/intro-to-html-and-css--ud304'
        },
        {
            'title': 'Intro to Computer Science',
            'school': 'Udacity',
            'dates': '2015',
            'url': 'https://www.udacity.com/course/intro-to-computer-science--cs101'
        }
    ]
};

/* Display functions */

// This function is defined using dot notation as part of the resume assignment
bio.display = function () {
  var formattedName = HTMLheaderName.replace('%data%', bio.name),
  formattedRole = HTMLheaderRole.replace('%data%', bio.role),
  formattedMobile = HTMLmobile.replace('%data%', bio.contacts.mobile),
  formattedEmail = HTMLemail.replace('%data%', bio.contacts.email),
  formattedGithub = HTMLgithub.replace('%data%', bio.contacts.github),
  formattedTwitter = HTMLtwitter.replace('%data%', bio.contacts.twitter),
  formattedLocation = HTMLlocation.replace('%data%', bio.contacts.location),
  formattedBioPic = HTMLbioPic.replace('%data%', bio.picture);
  formattedWelcome = HTMLwelcomeMsg.replace('%data%', bio.welcome);

  $('#header').prepend(formattedRole);
  $('#header').prepend(formattedName);

  $('#topContacts').append(formattedMobile);
  $('#topContacts').append(formattedEmail);
  $('#topContacts').append(formattedGithub);
  $('#topContacts').append(formattedTwitter);
  $('#topContacts').append(formattedLocation);

  $('#header').append(formattedBioPic);
  $('#header').append(formattedWelcome);

  // Display header skills.
  if (bio.skills.length > 0){
      $('#header').append(HTMLskillsStart);
      for (i = 0; i < bio.skills.length; i++) {
        $('#skills').append(HTMLskills.replace('%data%', bio.skills[i]));
      }
  }

  // Display footer icons.
  for (var i = 0; i < bio.icons.length; i++){
    $('#footerContacts').append(HTMLfooterStart);
    var formattedFooter = HTMLfooterContact.replace('%data%', bio.icons[i].icon);
    formattedFooter = formattedFooter.replace('#', bio.icons[i].url);
    $('.footer-entry:last').append(formattedFooter);
  }

  // This makes the last name appear in all caps when clicked on to appeal to
  // international standards. This only works when the span element with the
  // class last-name is applied to the last name in the bio object above.
  $('#name').on('click', function(){
    $('#last-name').toggleClass('all-caps');
  });
};

projects.display = function() {

  // HTMLprojectLines create line graphics for displays over 1200px wide, see
  // _media.scss. This is also the case for HTMLworkLine and HTMLeducationLines.
  $('#projects').prepend(HTMLprojectLines);

  for (var i = 0; i < projects.projects.length; i++) {
    $('#projects').append(HTMLprojectStart);

    var formattedProjectTitle = HTMLprojectTitle.replace('%data%', projects.projects[i].title);
    formattedProjectTitle = formattedProjectTitle.replace('#', projects.projects[i].url);

    var formattedProjectDates = HTMLprojectDates.replace('%data%', projects.projects[i].date),
    concatDescription = '';

    // This done in order to connect all the sentences in the description array
    // so that they display properly on the page. They were put in an array in
    // the first place to be easier to read in this javascript file. This is
    // also done in displayWork.
    for (var sentence = 0; sentence < projects.projects[i].description.length; sentence++){
      concatDescription = concatDescription + projects.projects[i].description[sentence];
    }

    var formattedProjectDesc = HTMLprojectDescription.replace('%data%', concatDescription);
    formattedProjectImage = HTMLprojectImage.replace('%data%', projects.projects[i].image[0]);
    formattedProjectImage = formattedProjectImage.replace('#', projects.projects[i].url);

    $('.project-entry:last').append(formattedProjectTitle);
    $('.project-entry:last').append(formattedProjectDates);
    $('.project-entry:last').append(formattedProjectDesc);
    $('.project-entry:last').append(formattedProjectImage);
    }
};

education.display = function() {

  $('#education').prepend(HTMLeducationLines);

  for (var i = 0; i < education.schools.length; i++) {
    $('#education').append(HTMLschoolStart);

    var formattedName = HTMLschoolName.replace('%data%', education.schools[i].name);
    formattedName = formattedName.replace('#', education.schools[i].url);

    var formattedDegree = HTMLschoolDegree.replace('%data%', education.schools[i].degree),
    formattedDates = HTMLschoolDates.replace('%data%', education.schools[i].dates),
    formattedLocation = HTMLschoolLocation.replace('%data%', education.schools[i].location),
    formattedMajor = HTMLschoolMajor.replace('%data%', education.schools[i].majors.join(', '));

    $('.education-entry:last').append(formattedName);
    $('.education-entry:last').append(formattedDegree);
    $('.education-entry:last').append(formattedDates);
    $('.education-entry:last').append(formattedLocation);
    $('.education-entry:last').append(formattedMajor);
    }

// If there are no online classes, this heading won't be added to the resume
  if (education.online.length > 0){
    $('#education').append(HTMLonlineClasses);
  }

  for (var school = 0; school < education.online.length; school++){
    $('#education').append(HTMLschoolStart);

    var formattedTitle = HTMLonlineTitle.replace('%data%', education.online[school].title);
    formattedTitle = formattedTitle.replace('#', education.online[school].url);

    var formattedSchool = HTMLonlineSchool.replace('%data%', education.online[school].school);
    var formattedDatesOnline = HTMLonlineDates.replace('%data%', education.online[school].dates);

    $('.education-entry:last').append(formattedTitle);
    $('.education-entry:last').append(formattedSchool);
    $('.education-entry:last').append(formattedDatesOnline);
  }
};

work.display = function(){

  if (work.jobs.length > 0){

    $('#workExperience').prepend(HTMLworkLine);

    for (var job = 0; job < work.jobs.length; job++){
      $('#workExperience').append(HTMLworkStart);
      var formattedEmployer = HTMLworkEmployer.replace('%data%', work.jobs[job].employer);
      formattedEmployer = formattedEmployer.replace('#', work.jobs[job].url);

      var formattedTitle = HTMLworkTitle.replace('%data%', work.jobs[job].title),
      formattedEmployerTitle = formattedEmployer + formattedTitle,
      formattedDates = HTMLworkDates.replace('%data%', work.jobs[job].date),
      formattedLocation = HTMLworkLocation.replace('%data%', work.jobs[job].location),
      concatDescription = '';

      for (var sentence = 0; sentence < work.jobs[job].description.length; sentence++){
        concatDescription = concatDescription + work.jobs[job].description[sentence];
      }

      var formattedDesc = HTMLworkDescription.replace('%data%', concatDescription);

      $('.work-entry:last').append(formattedEmployerTitle);
      $('.work-entry:last').append(formattedDates);
      $('.work-entry:last').append(formattedLocation);
      $('.work-entry:last').append(formattedDesc);

    }
  }
};


bio.display();

work.display();

projects.display();

education.display();

$('#mapDiv').append(googleMap);

// This console.logs click locations as part of the resume assignment.
$(document).click(function(loc) {
  console.log('x location: ' + loc.pageX, 'y location:' + loc.pageY);
});
