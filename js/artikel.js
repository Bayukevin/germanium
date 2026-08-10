document.addEventListener('DOMContentLoaded', function () {

    const sliderTrack =
        document.querySelector('.slider-track');

    const cards =
        document.querySelectorAll(
            '.slider-track .cover-artikel'
        );

    const prevButton =
        document.querySelector('.prev');

    const nextButton =
        document.querySelector('.next');


    if (
        !sliderTrack ||
        !cards.length ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    let currentIndex = 0;



    /*
    ==========================================
    JUMLAH CARD YANG DITAMPILKAN
    ==========================================
    */

    function getVisibleCards() {

        /*
        Mobile + sm
        < 768px
        */

        if (window.innerWidth < 768) {
            return 1;
        }


        /*
        md ke atas
        */

        return 2;
    }



    /*
    ==========================================
    HITUNG LEBAR SLIDE
    ==========================================
    */

    function getSlideWidth() {

        const cardWidth =
            cards[0].getBoundingClientRect().width;


        const trackStyle =
            window.getComputedStyle(sliderTrack);


        const gap =
            parseFloat(trackStyle.columnGap) || 0;


        return cardWidth + gap;
    }



    /*
    ==========================================
    UPDATE SLIDER
    ==========================================
    */

    function updateSlider() {

        const visibleCards =
            getVisibleCards();


        const maxIndex =
            Math.max(
                0,
                cards.length - visibleCards
            );


        /*
        Saat desktop pindah ke mobile
        atau sebaliknya, pastikan index
        tidak melewati batas.
        */

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }


        const slideWidth =
            getSlideWidth();


        sliderTrack.style.transform =
            `translateX(-${currentIndex * slideWidth}px)`;

    }



    /*
    ==========================================
    NEXT
    ==========================================
    */

    nextButton.addEventListener(
        'click',
        function () {

            const visibleCards =
                getVisibleCards();


            const maxIndex =
                Math.max(
                    0,
                    cards.length - visibleCards
                );


            currentIndex++;


            /*
            Kembali ke awal
            */

            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }


            updateSlider();

        }
    );



    /*
    ==========================================
    PREVIOUS
    ==========================================
    */

    prevButton.addEventListener(
        'click',
        function () {

            const visibleCards =
                getVisibleCards();


            const maxIndex =
                Math.max(
                    0,
                    cards.length - visibleCards
                );


            currentIndex--;


            /*
            Dari artikel pertama,
            langsung ke artikel terakhir
            */

            if (currentIndex < 0) {
                currentIndex = maxIndex;
            }


            updateSlider();

        }
    );



    /*
    ==========================================
    RESIZE
    ==========================================
    */

    window.addEventListener(
        'resize',
        function () {

            updateSlider();

        }
    );


    /*
    Initial position
    */

    updateSlider();

});