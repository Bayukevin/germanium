document.addEventListener('DOMContentLoaded', function () {

    const faqItems = document.querySelectorAll('.faq-item');


    faqItems.forEach(function (item) {

        const toggle = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');
        const arrow = item.querySelector('.faq-arrow');
        const card = item.querySelector('.card-faq');


        toggle.addEventListener('click', function () {

            const isOpen =
                toggle.getAttribute('aria-expanded') === 'true';


            /*
            ==========================================
            TUTUP FAQ LAINNYA
            ==========================================
            */

            faqItems.forEach(function (otherItem) {

                const otherToggle =
                    otherItem.querySelector('.faq-toggle');

                const otherAnswer =
                    otherItem.querySelector('.faq-answer');

                const otherArrow =
                    otherItem.querySelector('.faq-arrow');

                const otherCard =
                    otherItem.querySelector('.card-faq');


                otherToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );


                otherAnswer.style.maxHeight = '0px';


                otherAnswer.classList.remove(
                    'opacity-100'
                );

                otherAnswer.classList.add(
                    'opacity-0'
                );


                otherArrow.classList.remove(
                    'rotate-180'
                );


                otherCard.classList.remove(
                    'bg-white/15',
                    'shadow-2xl'
                );

                otherCard.classList.add(
                    'bg-white/5'
                );

            });



            /*
            ==========================================
            BUKA FAQ YANG DIKLIK
            ==========================================
            */

            if (!isOpen) {

                toggle.setAttribute(
                    'aria-expanded',
                    'true'
                );


                answer.style.maxHeight =
                    answer.scrollHeight + 'px';


                answer.classList.remove(
                    'opacity-0'
                );

                answer.classList.add(
                    'opacity-100'
                );


                /*
                Rotasi arrow
                */

                arrow.classList.add(
                    'rotate-180'
                );


                /*
                Highlight card aktif
                */

                card.classList.remove(
                    'bg-white/5'
                );

                card.classList.add(
                    'bg-white/15',
                    'shadow-2xl'
                );

            }

        });

    });

});