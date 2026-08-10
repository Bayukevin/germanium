document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       ELEMENT SLIDER UTAMA
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



    /* =====================================================
       JUMLAH ARTIKEL YANG TERLIHAT
    ====================================================== */

    function getVisibleCards() {

        // Mobile dan tablet kecil
        if (window.innerWidth < 768) {
            return 1;
        }

        // Desktop
        return 2;
    }



    /* =====================================================
       HITUNG LEBAR SATU SLIDE
    ====================================================== */

    function getSlideWidth() {

        if (!cards.length || !sliderTrack) {
            return 0;
        }

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const trackStyle =
            window.getComputedStyle(sliderTrack);

        const gap =
            parseFloat(trackStyle.columnGap) || 0;

        return cardWidth + gap;
    }



    /* =====================================================
       UPDATE POSISI SLIDER
    ====================================================== */

    function updateSlider() {

        if (!sliderTrack || !cards.length) {
            return;
        }

        const visibleCards =
            getVisibleCards();

        const maxIndex =
            Math.max(
                0,
                cards.length - visibleCards
            );

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        const slideWidth =
            getSlideWidth();

        sliderTrack.style.transform =
            `translateX(-${currentIndex * slideWidth}px)`;
    }



    /* =====================================================
       NEXT SLIDER
    ====================================================== */

    if (nextButton) {

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

                if (currentIndex > maxIndex) {
                    currentIndex = 0;
                }

                updateSlider();
            }
        );

    }



    /* =====================================================
       PREVIOUS SLIDER
    ====================================================== */

    if (prevButton) {

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

                if (currentIndex < 0) {
                    currentIndex = maxIndex;
                }

                updateSlider();
            }
        );

    }



    /* =====================================================
       RESPONSIVE
    ====================================================== */

    window.addEventListener(
        'resize',
        function () {
            updateSlider();
        }
    );


    updateSlider();



    /* =====================================================
       MODAL ARTICLE
    ====================================================== */

    const articleModal =
        document.getElementById('articleModal');

    const modalContent =
        document.getElementById('modalContent');

    const modalImage =
        document.getElementById('modalArticleImage');

    const modalCaption =
        document.getElementById('modalArticleCaption');

    const modalCounter =
        document.getElementById('modalArticleCounter');

    const closeModalButton =
        document.getElementById('closeArticleModal');

    const modalPrev =
        document.getElementById('modalPrev');

    const modalNext =
        document.getElementById('modalNext');

    const openModalButtons =
        document.querySelectorAll(
            '.open-article-modal'
        );



    /*
    ==========================================
    DATA ARTIKEL DIAMBIL LANGSUNG DARI HTML
    ==========================================

    Dengan cara ini Anda tidak perlu menulis
    data artikel dua kali di JavaScript.
    */

    const articles =
        Array.from(cards).map(function (card) {

            const image =
                card.querySelector('img');

            const caption =
                card.querySelector(
                    '.text-center p'
                );

            return {

                image:
                    image
                        ? image.getAttribute('src')
                        : '',

                alt:
                    image
                        ? image.getAttribute('alt')
                        : 'Artikel',

                caption:
                    caption
                        ? caption.textContent
                            .replace(/\s+/g, ' ')
                            .trim()
                        : ''

            };

        });



    let modalIndex = 0;



    /* =====================================================
       UPDATE ISI MODAL
    ====================================================== */

    function updateModalContent() {

        if (
            !articles.length ||
            !modalImage
        ) {
            return;
        }

        const article =
            articles[modalIndex];


        /*
        Animasi kecil ketika ganti artikel
        */

        if (modalContent) {

            modalContent.classList.add(
                'opacity-0',
                'scale-95'
            );

        }


        setTimeout(function () {

            modalImage.src =
                article.image;

            modalImage.alt =
                article.alt;


            if (modalCaption) {

                modalCaption.textContent =
                    article.caption;

            }


            if (modalCounter) {

                modalCounter.textContent =
                    `${modalIndex + 1} / ${articles.length}`;

            }


            if (modalContent) {

                modalContent.classList.remove(
                    'opacity-0',
                    'scale-95'
                );

            }

        }, 120);

    }



    /* =====================================================
       OPEN MODAL
    ====================================================== */

    function openArticleModal(index) {

        if (!articleModal) {
            return;
        }


        modalIndex =
            Number(index);


        /*
        Validasi index
        */

        if (
            Number.isNaN(modalIndex) ||
            modalIndex < 0 ||
            modalIndex >= articles.length
        ) {

            modalIndex = 0;

        }


        updateModalContent();


        articleModal.classList.remove(
            'hidden'
        );

        articleModal.classList.add(
            'flex'
        );


        articleModal.setAttribute(
            'aria-hidden',
            'false'
        );


        /*
        Stop scroll body ketika modal terbuka
        */

        document.body.style.overflow =
            'hidden';

    }



    /* =====================================================
       EVENT TOMBOL ZOOM
    ====================================================== */

    openModalButtons.forEach(
        function (button) {

            button.addEventListener(
                'click',
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const index =
                        button.dataset.index;


                    openArticleModal(index);

                }
            );

        }
    );



    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeArticleModal() {

        if (!articleModal) {
            return;
        }


        articleModal.classList.add(
            'hidden'
        );

        articleModal.classList.remove(
            'flex'
        );


        articleModal.setAttribute(
            'aria-hidden',
            'true'
        );


        document.body.style.overflow =
            '';

    }



    if (closeModalButton) {

        closeModalButton.addEventListener(
            'click',
            closeArticleModal
        );

    }



    /* =====================================================
       NEXT MODAL
    ====================================================== */

    function showNextArticle() {

        if (!articles.length) {
            return;
        }


        modalIndex++;


        if (
            modalIndex >=
            articles.length
        ) {

            modalIndex = 0;

        }


        updateModalContent();

    }



    if (modalNext) {

        modalNext.addEventListener(
            'click',
            function (event) {

                event.stopPropagation();

                showNextArticle();

            }
        );

    }



    /* =====================================================
       PREVIOUS MODAL
    ====================================================== */

    function showPreviousArticle() {

        if (!articles.length) {
            return;
        }


        modalIndex--;


        if (modalIndex < 0) {

            modalIndex =
                articles.length - 1;

        }


        updateModalContent();

    }



    if (modalPrev) {

        modalPrev.addEventListener(
            'click',
            function (event) {

                event.stopPropagation();

                showPreviousArticle();

            }
        );

    }



    /* =====================================================
       CLICK BACKGROUND UNTUK CLOSE
    ====================================================== */

    if (articleModal) {

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

    }



    /* =====================================================
       KEYBOARD
    ====================================================== */

    document.addEventListener(
        'keydown',
        function (event) {

            if (
                !articleModal ||
                articleModal.classList.contains(
                    'hidden'
                )
            ) {

                return;

            }


            /*
            ESC
            */

            if (
                event.key ===
                'Escape'
            ) {

                closeArticleModal();

            }


            /*
            LEFT
            */

            if (
                event.key ===
                'ArrowLeft'
            ) {

                showPreviousArticle();

            }


            /*
            RIGHT
            */

            if (
                event.key ===
                'ArrowRight'
            ) {

                showNextArticle();

            }

        }
    );



    /* =====================================================
       SWIPE MOBILE DI MODAL
    ====================================================== */

    let touchStartX = 0;

    let touchEndX = 0;



    if (articleModal) {

        articleModal.addEventListener(
            'touchstart',
            function (event) {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        articleModal.addEventListener(
            'touchend',
            function (event) {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                handleModalSwipe();

            },
            {
                passive: true
            }
        );

    }



    function handleModalSwipe() {

        const minimumSwipe =
            50;


        const difference =
            touchStartX - touchEndX;


        /*
        Swipe ke kiri
        */

        if (
            difference >
            minimumSwipe
        ) {

            showNextArticle();

        }


        /*
        Swipe ke kanan
        */

        if (
            difference <
            -minimumSwipe
        ) {

            showPreviousArticle();

        }

    }

});