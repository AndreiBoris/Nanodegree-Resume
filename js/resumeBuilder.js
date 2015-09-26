var myName = 'Andrei Borissenko';
var myRole = 'Web Developer';
var myContact = {
    'mobile' : '416 508 1951',
    'email' : 'Andrei.Borissenko@gmail.com',
    'github' : 'AndreiCommunication',
    'twitter' : '@BreathMachine',
    'location' : 'Toronto'
};
var myPicture = 'images/andrei.jpg';
var myWelcome = 'Bringing communication and humanity, online.';
var mySkills = ['Python', 'HTML', 'CSS', 'JavaScript',
                'Time management', 'English proficiency',
              'Philosophical reflection'];
var skillsObj = {}
var myJob = 'Front of House Manager'
var myEmployer = 'City of Vaughan'
var myYears = 'City of Vaughan'
var workLocation = 'Vaughan, Ontario'
var mySchool = "York University"
var schoolYears = "2010-2014"
var schoolCity = "Toronto"

var bio = {
    'name' : myName,
    'role' : myRole,
    'contact' : myContact,
    'picture' : myPicture,
    'welcome' : myWelcome,
    'skills' : mySkills
 };

var work = new Object();

work.position = myJob
work.employer = myEmployer
work.years = myYears
work.location = workLocation

var education = new Object();

education['name'] = mySchool
education['years attended'] = schoolYears
education['city'] = schoolCity

var formattedName = HTMLheaderName.replace('%data%', bio.name),
    formattedRole = HTMLheaderRole.replace('%data%', bio.role),
    formattedMobile = HTMLmobile.replace('%data%', bio.contact.mobile),
    formattedEmail = HTMLemail.replace('%data%', bio.contact.email),
    formattedGithub = HTMLgithub.replace('%data%', bio.contact.github),
    formattedTwitter = HTMLtwitter.replace('%data%', bio.contact.twitter),
    formattedLocation = HTMLlocation.replace('%data%', bio.contact.location),
    formattedBioPic = HTMLbioPic.replace('%data%', bio.picture),
    formattedWelcome = HTMLwelcomeMsg.replace('%data%', bio.welcome)

for (i = 0; i < bio.skills.length; i++) {
    skillsObj["formattedSkill" + (i + 1)] = HTMLskills.replace('%data%', bio.skills[i])
}

$('#header').prepend(formattedRole);
$('#header').prepend(formattedName);

$('#topContacts').append(formattedMobile);
$('#topContacts').append(formattedEmail);
$('#topContacts').append(formattedGithub);
$('#topContacts').append(formattedTwitter);
$('#topContacts').append(formattedLocation);

$('#header').append(formattedBioPic);
$('#header').append(formattedWelcome);

$('#header').append(HTMLskillsStart);
for (i = 0; i < bio.skills.length; i++) {
    $('#skills').append(skillsObj['formattedSkill' + (i + 1)]);
}
