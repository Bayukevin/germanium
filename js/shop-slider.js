document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // SHOP SLIDER
    // =============================================

    const shopTrack =
        document.querySelector('.shop-slider-track');

    const shopCards =
        document.querySelectorAll('.shop-product-card');

    const shopPrev =
        document.querySelector('.shop-prev');

    const shopNext =
        document.querySelector('.shop-next');


    // Kalau slider tidak ditemukan
    if (
        !shopTrack ||
        !shopCards.length ||
        !shopPrev ||
        !shopNext
    ) {
        return;
    }


    let shopCurrentIndex = 0;



    // =============================================
    // JUMLAH PRODUK YANG TERLIHAT
    // =============================================

    function getShopVisibleCards() {

        /*
        MOBILE
        0 - 767px
        */

        if (window.innerWidth < 768) {
            return 1;
        }


        /*
        TABLET / LAPTOP KECIL
        768 - 1279px
        */

        if (window.innerWidth < 1280) {
            return 2;
        }


        /*
        DESKTOP
        1280px ke atas
        */

        return 3;
    }



    // =============================================
    // HITUNG LEBAR SATU PERGESERAN
    // =============================================

    function getShopSlideWidth() {

        const cardWidth =
            shopCards[0].getBoundingClientRect().width;


        const trackStyle =
            window.getComputedStyle(shopTrack);


        const gap =
            parseFloat(trackStyle.columnGap) || 0;


        return cardWidth + gap;
    }



    // =============================================
    // MAXIMUM INDEX
    // =============================================

    function getShopMaxIndex() {

        const visibleCards =
            getShopVisibleCards();


        return Math.max(
            0,
            shopCards.length - visibleCards
        );
    }



    // =============================================
    // UPDATE SLIDER
    // =============================================

    function updateShopSlider() {

        const maxIndex =
            getShopMaxIndex();


        /*
        Jika resize dari mobile ke desktop,
        index mungkin sudah terlalu jauh.
        */

        if (shopCurrentIndex > maxIndex) {
            shopCurrentIndex = maxIndex;
        }


        const slideWidth =
            getShopSlideWidth();


        shopTrack.style.transform =
            `translateX(-${shopCurrentIndex * slideWidth}px)`;
    }



    // =============================================
    // NEXT
    // =============================================

    shopNext.addEventListener(
        'click',
        function () {

            const maxIndex =
                getShopMaxIndex();


            shopCurrentIndex++;


            /*
            Jika sudah mentok kanan,
            kembali ke awal.
            */

            if (shopCurrentIndex > maxIndex) {
                shopCurrentIndex = 0;
            }


            updateShopSlider();

        }
    );



    // =============================================
    // PREVIOUS
    // =============================================

    shopPrev.addEventListener(
        'click',
        function () {

            const maxIndex =
                getShopMaxIndex();


            shopCurrentIndex--;


            /*
            Dari produk pertama,
            langsung ke posisi terakhir.
            */

            if (shopCurrentIndex < 0) {
                shopCurrentIndex = maxIndex;
            }


            updateShopSlider();

        }
    );



    // =============================================
    // RESPONSIVE
    // =============================================

    window.addEventListener(
        'resize',
        function () {

            updateShopSlider();

        }
    );



    // =============================================
    // INITIAL
    // =============================================

    updateShopSlider();

});