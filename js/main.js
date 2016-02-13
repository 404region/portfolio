
// Объект определяющий элементы gallery
function GalleryElem() {
    this.oneImgWidth = 230; // ширина изображения
    this.scrollImgCount = 1; // количество передвигаемых изображений
    this.visibleImgsCount = 3; //количество изображений на странице visibleImgsCount
    this.imgMargin = 22; // отступ изображения
    this.ul = $('#list-images'); // ID элемента родителя
    this.li = $('li', this.ul);
    this.galleryTemplate = $('#previewImages-template'); // ID шаблона галереи
    this.discriptionTemplate = $('#projectDiscription-template');  //ID шаблона для описания проекта
    this.discriptionBlock = $('#tb-article-block'); //ID блока для описания проекта
    this.fullImgTemplate = $('#fullImages-template'); //ID шаблона для большого изображения
    this.fullImgBlock = $('#tb-bigImage');  //ID блока для большого изображения
    this.prevBtn = $('#prev');
    this.nextBtn = $('#next');
    this.array = projectsArray; //массив объектов
    this.maxLeftLimit  = 0; // Максимальный предел скрола слева
    //Максимальный предел скрола справа:
    this.maxRightLimit = this.oneImgWidth * (this.array.length - this.visibleImgsCount) + this.imgMargin * (this.array.length - this.visibleImgsCount);
    this.startPosition = 0; //Начальная позиция
    this.startImgIndex = 1; //Начальный индекс изображения
}

function ImagesGallery(options) { //options - galleryElem
    var self = this;
    var options = options;
    this.startPosition = options.startPosition;  //Начальная позиция
    this.startImgIndex = options.startImgIndex; //Начальный индекс изображения

    this.renderGallery = function() { //Функция для отрисоки галереи
        options.ul.html(_.template( options.galleryTemplate.html(), options.array ));
    };

    this.galleryScrollNext = function() {
        self.startPosition = Math.max(self.startPosition - (options.oneImgWidth*options.scrollImgCount+options.imgMargin*(options.scrollImgCount)),
                                 -options.maxRightLimit );
        options.ul[0].style.marginLeft = self.startPosition + 'px';
    };

    this.galleryScrollPrev = function() {
        self.startPosition = Math.min(self.startPosition + options.oneImgWidth*options.scrollImgCount + options.imgMargin*options.scrollImgCount,
                                options.maxLeftLimit);
        options.ul[0].style.marginLeft = self.startPosition + 'px';
    };

    this.pasteProjectDetails = function (index) {
        projectDetails.pasteDiscription(index);
        projectDetails.pasteScreen(index);
    }

    this.selection = function(index) {
        var span = $('li', options.ul)[index];
        span = $('span', span)[0];
        span.style.visibility = 'hidden'; //Убрать тень для маленькойх картинки
    }
    this.noneSelection = function(index) {
        var span = $('li', options.ul)[index];
        span = $('span', span)[0];
        span.style.visibility = ''; //Добавить тень для маленькойх картинки
    }

    options.nextBtn.on('click', function() {
        if(options.startPosition < options.maxRightLimit ) {
            if(self.startImgIndex >= 2) {
            self.galleryScrollNext();
            }
        }

        if(self.startImgIndex < options.array.length-1) {
            self.noneSelection(self.startImgIndex);
            self.startImgIndex++; // Индекс текущего изображения
            self.pasteProjectDetails(self.startImgIndex);
            self.selection(self.startImgIndex);
        }
        return false;
    });

    options.prevBtn.on('click', function() {
        if(self.startPosition < options.maxLeftLimit) {
                self.galleryScrollPrev();
        }

        if(self.startImgIndex > 0) {
            self.noneSelection(self.startImgIndex);
            self.startImgIndex--;
            self.pasteProjectDetails(self.startImgIndex);
            self.selection(self.startImgIndex);
        }
        return false;
    });
}

function ProjectDetails(options) { //options - объект с нужными оптиями
    // Метод вставки нужного описания
    this.pasteDiscription = function(index) {
        // Шаблон-Добавление описания к фильму:
        options.discriptionBlock.html(_.template( options.discriptionTemplate.html(), {project : options.array[index] } ));
    }

    // Метод вставки большой картинки
    this.pasteScreen = function(index) {
        //Добавление большой картинки:
        options.fullImgBlock.html(_.template( options.fullImgTemplate.html(), {project : options.array[index]} ));
    }
}

var galleryElem = new GalleryElem();
var imagesGallery = new ImagesGallery(galleryElem);
imagesGallery.renderGallery();
imagesGallery.selection(1);

var projectDetails = new ProjectDetails(galleryElem);
projectDetails.pasteDiscription(1);
projectDetails.pasteScreen(1);

