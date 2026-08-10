document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       SLIDER UTAMA
    ====================================================== */

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


    let currentIndex = 0;

    const visibleCards = 2;



    /* =====================================================
       HITUNG LEBAR CARD
    ====================================================== */

    function getSlideWidth() {

        if (!cards.length) {
            return 0;
        }

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const trackStyle =
            window.getComputedStyle(sliderTrack);

        const gap =
            parseFloat(trackStyle.columnGap) || 32;

        return cardWidth + gap;
    }



    /* =====================================================
       UPDATE SLIDER UTAMA
    ====================================================== */

    function updateSlider() {

        const slideWidth =
            getSlideWidth();

        sliderTrack.style.transform =
            `translateX(-${currentIndex * slideWidth}px)`;
    }



    /* =====================================================
       NEXT SLIDER
    ====================================================== */

    nextButton.addEventListener(
        'click',
        function () {

            const maxIndex =
                cards.length - visibleCards;

            currentIndex++;

            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }

            updateSlider();
        }
    );



    /* =====================================================
       PREVIOUS SLIDER
    ====================================================== */

    prevButton.addEventListener(
        'click',
        function () {

            const maxIndex =
                cards.length - visibleCards;

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = maxIndex;
            }

            updateSlider();
        }
    );



    /* =====================================================
       RESPONSIVE SLIDER
    ====================================================== */

    window.addEventListener(
        'resize',
        function () {

            updateSlider();
        }
    );



    /* =====================================================
       DATA ARTIKEL
    ====================================================== */

    const articles = [

        {
            image: 'assets/artikel-1.png',

            caption:
                'Publikasi artikel nasional mengkaji Germanium sebagai material terapi, termasuk dalam bentuk pendant.'
        },

        {
            image: 'assets/artikel-2.png',

            caption:
                'Publikasi artikel kedua membahas pemanfaatan Germanium dalam pengembangan material kesehatan.'
        },

        {
            image: 'assets/artikel-3.png',

            caption:
                'Penelitian lain menjelaskan karakteristik Batu Germanium serta potensi aplikasinya.'
        },

        {
            image: 'assets/artikel-4.png',

            caption:
                'Publikasi selanjutnya mengulas penggunaan Germanium dalam berbagai produk kesehatan.'
        }

    ];



    /* =====================================================
       ELEMENT MODAL
    ====================================================== */

    const articleModal =
        document.getElementById(
            'articleModal'
        );

    const modalContent =
        document.getElementById(
            'modalContent'
        );

    const modalImage =
        document.getElementById(
            'modalArticleImage'
        );

    const modalCaption =
        document.getElementById(
            'modalArticleCaption'
        );

    const modalCounter =
        document.getElementById(
            'modalArticleCounter'
        );

    const closeModalButton =
        document.getElementById(
            'closeArticleModal'
        );

    const modalPrev =
        document.getElementById(
            'modalPrev'
        );

    const modalNext =
        document.getElementById(
            'modalNext'
        );

    const openModalButtons =
        document.querySelectorAll(
            '.open-article-modal'
        );


    let modalIndex = 0;



    /* =====================================================
       UPDATE MODAL
    ====================================================== */

    function updateModal() {

        /*
        Animasi keluar sebentar
        */

        modalContent.classList.add(
            'opacity-0',
            'scale-95'
        );


        setTimeout(function () {

            const article =
                articles[modalIndex];


            modalImage.src =
                article.image;


            modalCaption.textContent =
                article.caption;


            modalCounter.textContent =
                `${modalIndex + 1} / ${articles.length}`;


            /*
            Animasi masuk
            */

            modalContent.classList.remove(
                'opacity-0',
                'scale-95'
            );

        }, 120);
    }



    /* =====================================================
       OPEN MODAL
    ====================================================== */

    openModalButtons.forEach(
        function (button) {

            button.addEventListener(
                'click',
                function () {

                    modalIndex =
                        Number(
                            button.dataset.index
                        );


                    updateModal();


                    articleModal.classList.remove(
                        'hidden'
                    );


                    articleModal.classList.add(
                        'flex'
                    );


                    /*
                    Disable scroll halaman
                    */

                    document.body.style.overflow =
                        'hidden';
                }
            );

        }
    );



    /* =====================================================
       CLOSE MODAL FUNCTION
    ====================================================== */

    function closeArticleModal() {

        articleModal.classList.add(
            'hidden'
        );

        articleModal.classList.remove(
            'flex'
        );


        document.body.style.overflow =
            '';
    }



    /* =====================================================
       CLOSE BUTTON
    ====================================================== */

    closeModalButton.addEventListener(
        'click',
        closeArticleModal
    );



    /* =====================================================
       MODAL NEXT
    ====================================================== */

    modalNext.addEventListener(
        'click',
        function () {

            modalIndex++;

            if (
                modalIndex >=
                articles.length
            ) {

                modalIndex = 0;
            }


            updateModal();
        }
    );



    /* =====================================================
       MODAL PREVIOUS
    ====================================================== */

    modalPrev.addEventListener(
        'click',
        function () {

            modalIndex--;

            if (modalIndex < 0) {

                modalIndex =
                    articles.length - 1;
            }


            updateModal();
        }
    );



    /* =====================================================
       CLICK BACKGROUND UNTUK CLOSE
    ====================================================== */

    articleModal.addEventListener(
        'click',
        function (event) {

            if (
                event.target ===
                articleModal
            ) {

                closeArticleModal();
            }

        }
    );



    /* =====================================================
       KEYBOARD CONTROL
    ====================================================== */

    document.addEventListener(
        'keydown',
        function (event) {

            /*
            Jangan jalankan keyboard
            kalau modal sedang tertutup
            */

            if (
                articleModal.classList.contains(
                    'hidden'
                )
            ) {

                return;
            }


            /* ESC */

            if (
                event.key ===
                'Escape'
            ) {

                closeArticleModal();
            }


            /* LEFT */

            if (
                event.key ===
                'ArrowLeft'
            ) {

                modalIndex--;

                if (
                    modalIndex < 0
                ) {

                    modalIndex =
                        articles.length - 1;
                }


                updateModal();
            }


            /* RIGHT */

            if (
                event.key ===
                'ArrowRight'
            ) {

                modalIndex++;

                if (
                    modalIndex >=
                    articles.length
                ) {

                    modalIndex = 0;
                }


                updateModal();
            }

        }
    );

});