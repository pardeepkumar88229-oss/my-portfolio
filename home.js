 // WELCOME SCREEN TIMER CONTROLLER (3 SECONDS)
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const preloader = document.getElementById('welcome-screen');
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.visibility = 'hidden'; }, 800);
            }, 3000);
        });

        // MULTI-PAGE TAB SWITCHER LOGIC
        function switchPage(pageId, buttonElement) {
            const pages = document.querySelectorAll('.portfolio-page');
            pages.forEach(page => page.classList.remove('active-page'));
            
            const buttons = document.querySelectorAll('.nav-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(pageId).classList.add('active-page');
            buttonElement.classList.add('active');
            
            window.scrollTo({
                top: document.querySelector('nav').offsetTop - 10,
                behavior: 'smooth'
            });
        }

        // INTERACTIVE FAQ ACCORDION LOGIC
        function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const sign = element.querySelector('span');
            if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
                answer.style.maxHeight = '0px';
                answer.style.padding = '0px 18px';
                sign.innerText = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 36 + 'px';
                answer.style.padding = '18px';
                sign.innerText = '−';
            }
        }

        // ADVANCED AJAX CONTACT FORM HANDLER (DIRECT GMAIL SYNC)
        const form = document.getElementById("portfolio-contact-form");
        const statusBox = document.getElementById("form-status");
        const submitBtn = document.getElementById("submit-btn");

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // page refresh hone se rokne ke liye
            
            submitBtn.innerText = "⏳ Sending Message...";
            submitBtn.disabled = true;

            const data = new FormData(form);
            
            fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                statusBox.style.display = "block";
                if (response.ok) {
                    statusBox.className = "success";
                    statusBox.innerText = "✅ Success! Your message has been sent directly to Pardeep's Gmail. Thank you!";
                    form.reset(); // Fields clear karne ke liye
                } else {
                    response.json().then(data => {
                        statusBox.className = "error";
                        if (Object.hasOwn(data, 'errors')) {
                            statusBox.innerText = data['errors'].map(error => error['message']).join(", ");
                        } else {
                            statusBox.innerText = "❌ Oops! There was a problem submitting your form.";
                        }
                    });
                }
            })
            .catch(error => {
                statusBox.style.display = "block";
                statusBox.className = "error";
                statusBox.innerText = "❌ Network Error! Please try again later.";
            })
            .finally(() => {
                submitBtn.innerText = "✉️ Send Message";
                submitBtn.disabled = false;
            });
        });

        // SLIDER INDEX SYSTEMS
        let projectIndex = 0; let techIndex = 0; let softIndex = 0; let hobbyIndex = 0;

        function updateSlider(trackId, index) {
            const track = document.getElementById(trackId);
            if(track) { track.style.transform = `translateX(-${index * 100}%)`; }
        }

        function moveProjectSlide(dir) {
            const total = document.querySelectorAll('#projectTrack .slide').length;
            projectIndex = (projectIndex + dir + total) % total;
            updateSlider('projectTrack', projectIndex);
        }
        function moveTechSlide(dir) {
            const total = document.querySelectorAll('#techTrack .slide').length;
            techIndex = (techIndex + dir + total) % total;
            updateSlider('techTrack', techIndex);
        }
        function moveSoftSlide(dir) {
            const total = document.querySelectorAll('#softTrack .slide').length;
            softIndex = (softIndex + dir + total) % total;
            updateSlider('softTrack', softIndex);
        }
        function moveHobbySlide(dir) {
            const total = document.querySelectorAll('#hobbyTrack .slide').length;
            hobbyIndex = (hobbyIndex + dir + total) % total;
            updateSlider('hobbyTrack', hobbyIndex);
        }

        // MODAL MANAGEMENT
        function openCertificate(imgUrl) {
            const modal = document.getElementById("certModal");
            const modalImg = document.getElementById("certImage");
            modal.style.display = "block";
            modalImg.src = imgUrl;
        }
        function closeCertificate() { document.getElementById("certModal").style.display = "none"; }

        window.onclick = function(event) {
            const modal = document.getElementById("certModal");
            if (event.target == modal) { modal.style.display = "none"; }
        }

        // AUTOMATIC AUTOPLAY SLIDER CYCLES
        setInterval(() => {
            if(document.getElementById('projects-page').classList.contains('active-page')) moveProjectSlide(1);
            if(document.getElementById('skills-page').classList.contains('active-page')) moveTechSlide(1);
            if(document.getElementById('skills-page').classList.contains('active-page')) moveSoftSlide(1);
            if(document.getElementById('home').classList.contains('active-page')) moveHobbySlide(1);
        }, 4500);