//ProjectExample
function Project(previewImgSrc, fullImgSrc, projectName, projectTehnogies, projectLink, projectDescription) {
    this.previewImgSrc = previewImgSrc || "";
    this.fullImgSrc = fullImgSrc || "";
    this.projectName = projectName || "";
    this.projectTehnogies = projectTehnogies || "";
    this.projectLink = projectLink || "";
    this.projectDescription = projectDescription || "";

}

//DragonsGameProject
var dragonGame = new Project(
    "images/content/dragonsGamePreview.jpg",
    "images/content/dragonsGameScreen.jpg",
    "Драконы воды и пламени",
    "HTML, CSS",
    "dragon-game/index.html",
    "Вертска сайта игровой тематики для дипломного проекта"
);

//RosDnevnikProject
var rosDnevnik = new Project(
    "images/content/rosDnevnikPreview.jpg",
    "images/content/rosDnevnikScreen.jpg",
    "РосДневник",
    "HTML, CSS",
    "rosdnevnik/friends.html",
    "Вертска сайта под руководством верстальщика для проекта РосДневник"
);

//GameRoundProject
var gameRound = new Project(
    "images/content/gameRoundPreview.jpg",
    "images/content/gameRoundScreen.jpg",
    "GameRound",
    "HTML, CSS",
    "gameround/index.html",
    "Вертска сайта игровой тематики в качестве фрилансера"
);


//RosDnevnikProject
var vipSotka = new Project(
    "images/content/vipSotkaPreview.jpg",
    "images/content/vipSotkaScreen.jpg",
    "Вип-сотка",
    "HTML, CSS",
    "vip-sotka/index.html",
    "Вертска главной страницы сайта для проекта Вип-сотка"
);

var projectsArray = [vipSotka, gameRound, rosDnevnik, dragonGame];

function preloadImages(array) {
    for(var i = 0; i<array.length; i++)
        $("<img />").attr("src", array[i].fullImgSrc);
}

preloadImages(projectsArray);
