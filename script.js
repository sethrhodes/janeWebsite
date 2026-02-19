document.addEventListener('DOMContentLoaded', () => {

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // Matches CSS transition time
                }
            });
        });
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    portfolioItems.forEach(item => observer.observe(item));

    // Initial fade in for hero elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = 0;
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';

        setTimeout(() => {
            heroContent.style.opacity = 1;
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Modal Functionality
    const modal = document.getElementById('project-modal');
    const modalGallery = document.getElementById('modal-gallery-grid');
    const modalTitle = document.getElementById('dynamic-modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');

    const projectDescriptions = {
        'the-sill': `<strong>The Ask:</strong> Create an integrated campaign that demonstrates how plants from The Sill don't have to be high maintenance and can withstand errors most plants can’t.<br><br><strong>The Solution:</strong> A campaign that turns common plant-failure phrases into positive moments, proving that with The Sill, every mistake is not the end of a chapter.`,
        'osg': `<strong>The Ask:</strong> Create a campaign for Our Stomping Ground’s yearly fundraiser that highlights how a small donation helps support adults with developmental disabilities.<br><br><strong>The Solution:</strong> Showing how OSG helps build community through a "From ___, To____" campaign, highlighting specific classes and programs they offer.`,
        'norcal': `Iterated and created logos inspired by Bay Area surf culture for a new women’s collection and a skateboard design.`,
        'waiting-room-publishing': `Waiting Room Publishing holds 5 magazines that focus on topics of aging, grief, and mental health. I created graphics, videos, and collages to highlight each magazine and spread awareness to targeted customers.`,
        'garden-creamery': `Created social media that grew the store's community of 30k+ followers through interactive posts of dogs that visit the store.`
    };

    const projectAssets = {
        'the-sill': [
            { type: 'video', src: 'assets/The Sill/the sill (1).mp4' },
            { type: 'video', src: 'assets/The Sill/the sill (10).mp4' },
            { type: 'video', src: 'assets/The Sill/The sill (5).mp4' },
            { type: 'video', src: 'assets/The Sill/The sill (2).mp4' },
            { type: 'image', src: 'assets/The Sill/Billboard.jpg' }
        ],
        'waiting-room-publishing': [
            { type: 'image', src: 'assets/Waiting Room Publishing/01_1.png' },
            { type: 'image', src: 'assets/Waiting Room Publishing/02_2.png' },
            { type: 'video', src: 'assets/Waiting Room Publishing/04_Short Linkedin WRP movie.mp4' },
            { type: 'video', src: 'assets/Waiting Room Publishing/05_Thanksgiving.mp4' },
            { type: 'image', src: 'assets/Waiting Room Publishing/Screenshot 2025-10-06 at 6.25.06 PM.png' },
            { type: 'image', src: 'assets/Waiting Room Publishing/06_3.png' },
            { type: 'image', src: 'assets/Waiting Room Publishing/03_2 copy.png' },
            { type: 'image', src: 'assets/Waiting Room Publishing/07_Artboard 1.png' },
            { type: 'image', src: 'assets/Waiting Room Publishing/WRP-example.gif' },
            { type: 'image', src: 'assets/Waiting Room Publishing/08_January WRP LinkedIn Post.jpg' }
        ],
        'norcal': [
            { type: 'image', src: 'assets/NorCal Surf Shop/01_Artboard 2.png' },
            { type: 'image', src: 'assets/NorCal Surf Shop/02_Artboard 1_1.png' },
            { type: 'image', src: 'assets/NorCal Surf Shop/03_1.png' },
            { type: 'image', src: 'assets/NorCal Surf Shop/05_2.png' },
            { type: 'image', src: 'assets/NorCal Surf Shop/06_3.png' },
            { type: 'image', src: 'assets/NorCal Surf Shop/07_4.png' },
            { type: 'image', src: 'assets/NorCal Surf Shop/Untitled design (1) 1.58.53 PM.png' }
        ],
        'osg': [
            { type: 'video', src: 'assets/Our Stomping Grounds/01_andrewreelfinal.mp4' },
            { type: 'image', src: 'assets/Our Stomping Grounds/03_OSG madlibs.png' },
            { type: 'image', src: 'assets/Our Stomping Grounds/04_OSG poster madlib mock up.png' },
            { type: 'image', src: 'assets/Our Stomping Grounds/06_Untitled drawing.jpg' },
            { type: 'image', src: 'assets/Our Stomping Grounds/OSG-final-posts-big-give-frozen.gif' },
            { type: 'image', src: 'assets/Our Stomping Grounds/OSG-final-posts-big-give1111.gif' },
            { type: 'image', src: 'assets/Our Stomping Grounds/OSG-final-posts-big-give copy.gif' },
            { type: 'image', src: 'assets/Our Stomping Grounds/OSG-final-posts-big-give32323.gif' },
            { type: 'image', src: 'assets/Our Stomping Grounds/Screenshot 2025-03-27 at 9.04.55 PM.png' }
        ],
        'the-title': [
            { type: 'image', src: 'assets/The Title/01_Screenshot 2025-12-26 at 5.24.09 PM.png' },
            { type: 'image', src: 'assets/The Title/11_Screenshot 2025-12-11 at 1.23.37 PM.png' },
            { type: 'image', src: 'assets/The Title/03_Screenshot 2025-12-26 at 5.23.27 PM.png' },
            { type: 'image', src: 'assets/The Title/04_Screenshot 2025-12-26 at 5.23.44 PM.png' },
            { type: 'image', src: 'assets/The Title/05_Screenshot 2025-12-26 at 5.22.11 PM.png' },
            { type: 'image', src: 'assets/The Title/06_Screenshot 2025-12-26 at 5.22.29 PM.png' },
            { type: 'image', src: 'assets/The Title/02_Screenshot 2025-12-26 at 5.27.21 PM.png' },
            { type: 'image', src: 'assets/The Title/08_Screenshot 2025-12-26 at 5.22.55 PM.png' },
            { type: 'image', src: 'assets/The Title/09_Screenshot 2025-12-26 at 5.27.53 PM.png' },
            { type: 'image', src: 'assets/The Title/10_Screenshot 2025-12-26 at 5.28.31 PM.png' },
            { type: 'image', src: 'assets/The Title/07_Screenshot 2025-12-26 at 5.22.42 PM.png' },
            { type: 'image', src: 'assets/The Title/12_IMG_3970_edit.jpg' }
        ],
        'garden-creamery': [
            { type: 'image', src: 'assets/Garden Creamery/01_1 gift card (2).png' },
            { type: 'image', src: 'assets/Garden Creamery/02_dog scan cropped copy.png' },
            { type: 'image', src: 'assets/Garden Creamery/05_342E33E4-01CA-4F0C-A5A4-1681B46D6634.JPG' },
            { type: 'image', src: 'assets/Garden Creamery/06_68609C2C-D090-4D79-8588-DE30E0594F93.JPG' },
            { type: 'image', src: 'assets/Garden Creamery/07_D9F92847-D7F0-4901-9F10-2DCDDE2ECC92 (1).JPG' },
            { type: 'image', src: 'assets/Garden Creamery/08_IMG_4742 (3).jpg' },
            { type: 'image', src: 'assets/Garden Creamery/09_IMG_4744 (3).jpg' },
            { type: 'image', src: 'assets/Garden Creamery/10_Screenshot 2025-11-30 at 11.37.25 AM.png' },
            { type: 'image', src: 'assets/Garden Creamery/03_04FF7767-01A5-4953-BF68-C06EB6116ACF.JPG' },
            { type: 'image', src: 'assets/Garden Creamery/04_2E6A973E-CA5D-49ED-87C8-4624838901BF.JPG' },
            { type: 'image', src: 'assets/Garden Creamery/Dog1.jpg' },
            { type: 'image', src: 'assets/Garden Creamery/dog2.jpg' },
            { type: 'image', src: 'assets/Garden Creamery/ziggy.JPG' },
            { type: 'image', src: 'assets/Garden Creamery/8A7B1716-F5CB-4EAD-83B2-97F70F4DF067.JPG' }
        ]
    };


    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            if (projectId && projectAssets[projectId]) {
                const titleText = item.querySelector('h3').innerText;
                modalTitle.innerText = titleText;

                // Set description if available
                if (projectDescriptions[projectId]) {
                    modalDescription.innerHTML = projectDescriptions[projectId];
                } else {
                    modalDescription.innerHTML = '';
                }

                modalGallery.innerHTML = ''; // Clear previous content

                projectAssets[projectId].forEach(asset => {
                    const div = document.createElement('div');
                    div.className = 'gallery-item';

                    if (asset.type === 'video') {
                        const video = document.createElement('video');
                        video.src = asset.src;
                        video.controls = true;
                        video.playsInline = true;
                        div.appendChild(video);
                    } else if (asset.type === 'pdf') {
                        const pdfLink = document.createElement('a');
                        pdfLink.href = asset.src;
                        pdfLink.target = '_blank';
                        pdfLink.className = 'pdf-download-link';
                        pdfLink.innerHTML = '<div class="pdf-icon">📄</div><span>View Presentation (PDF)</span>';
                        div.appendChild(pdfLink);
                    } else {
                        const img = document.createElement('img');
                        img.src = asset.src;
                        img.alt = projectId + ' asset';
                        div.appendChild(img);
                    }
                    modalGallery.appendChild(div);
                });

                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // Stop videos
            modalGallery.querySelectorAll('video').forEach(vid => vid.pause());
        }, 300);
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal.click();
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const siteNav = document.getElementById('site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            siteNav.classList.toggle('active');
        });

        // Close menu when clicking a link
        siteNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                siteNav.classList.remove('active');
            });
        });
    }

});
