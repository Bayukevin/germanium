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


    // Kalau section tidak ada, hentikan script
    if (
        !shopTrack ||
        !shopCards.length ||
        !shopPrev ||
        !shopNext
    ) {
        return;
    }


    // Posisi slider saat ini
    let shopCurrentIndex = 0;


    // Jumlah produk yang terlihat
    const shopVisibleCards = 3;



    // =============================================
    // HITUNG LEBAR PERGESERAN
    // =============================================

    function getShopSlideWidth() {

        const cardWidth =
            shopCards[0].getBoundingClientRect().width;

        const trackStyle =
            window.getComputedStyle(shopTrack);

        const gap =
            parseFloat(trackStyle.columnGap) || 40;


        return cardWidth + gap;
    }



    // =============================================
    // UPDATE POSISI SLIDER
    // =============================================

    function updateShopSlider() {

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
                shopCards.length - shopVisibleCards;


            shopCurrentIndex++;


            // Jika sudah mencapai akhir,
            // kembali ke produk pertama
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
                shopCards.length - shopVisibleCards;


            shopCurrentIndex--;


            // Jika mundur dari produk pertama,
            // langsung menuju posisi terakhir
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

});