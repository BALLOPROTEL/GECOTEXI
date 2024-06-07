(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
})(jQuery);

(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });
})(jQuery);

(function ($) {
    "use strict";

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);

(function ($) {
    "use strict";

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
})(jQuery);
 
// Handle collection form submission
document.getElementById('collectionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const collectionPoint = document.getElementById('collectionPoint').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (collectionPoint && date && time) {
        alert(`Point de collecte : ${collectionPoint}\nDate de dépôt : ${date}\nHeure d'arrivée : ${time}`);
        // Add code to send data to the server here
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Handle recovery form submission
document.getElementById('recoveryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const contact = document.getElementById('contact').value;
    const commune = document.getElementById('commune').value;

    if (lastName && firstName && date && time && contact && commune) {
        alert(`Nom : ${lastName}\nPrénom : ${firstName}\nDate de disponibilité : ${date}\nHeure de passage : ${time}\nContact : ${contact}\nCommune : ${commune}`);
        // Add code to send data to the server here
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

document.getElementById('addArticleBtn').addEventListener('click', function () {
    var form = document.getElementById('articleForm');
    form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('get_data.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('articles-container');
            data.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('col-md-4', 'mb-4');
                articleElement.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${article.titre}</h5>
                            <p class="card-text">${article.contenu}</p>
                            <p class="card-text"><small class="text-muted">${article.date_publication}</small></p>
                        </div>
                    </div>
                `;
                container.appendChild(articleElement);
            });
        });
});

(function ($) {
    "use strict";

    // Initialize spinner, wowjs, navbar, back to top button, and carousels
    spinner();
    new WOW().init();
    handleNavbar();
    handleBackToTop();
    initCarousels();
})(jQuery);

function spinner() {
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);
}

function handleNavbar() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });
}

function handleBackToTop() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
}

function initCarousels() {
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
}
document.getElementById("showRegisterForm").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("resetPasswordForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
});

document.getElementById("showResetPasswordForm").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("resetPasswordForm").style.display = "block";
});

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
})(jQuery);

app.post('/recuperation_vetements', (req, res) => {
    const { nom, prenom, email, contact, commune, plage_horaire } = req.body;
    console.log('Données reçues:', req.body);
  
    const sql = 'INSERT INTO recuperation_vetements (nom, prenom, email, contact, commune, plage_horaire) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nom, prenom, email, contact, commune, plage_horaire], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données:', err);
        return res.status(500).json({ error: err });
      }
  
      res.status(200).json({ message: 'Récupération de vêtements ajoutée avec succès!' });
    });
  });