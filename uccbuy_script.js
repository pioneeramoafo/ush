// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded.'); // Debugging log
    console.log('Current page path:', window.location.pathname); // Debugging log

    // --- Navbar Selection Script (Existing) ---
    const navLinks = document.querySelectorAll('.navbar-links a'); // Select links within navbar-links

    // Check if nav links exist before adding listeners
    if (navLinks.length > 0) {
        console.log(`Found ${navLinks.length} navbar links.`); // Debugging log
        function removeSelectedClass() {
            navLinks.forEach(link => {
                link.classList.remove('selected');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // Check if the link's href is '#' or if it doesn't have a data-category
                // Only prevent default if it's a filtering link, not a navigation link
                if (link.getAttribute('href') === '#' || !link.hasAttribute('data-category')) {
                     event.preventDefault();
                     console.log('Navbar link clicked (prevented default):', link.textContent); // Debugging log
                     removeSelectedClass();
                     link.classList.add('selected');
                     const selectedCategory = link.getAttribute('data-category');
                     console.log('Selected category:', selectedCategory);
                     // In a real application, you would now fetch/filter products based on selectedCategory
                } else {
                    // For links with a valid href (like dashboard.html), allow default behavior
                    console.log('Navbar link clicked (allowing default):', link.textContent, 'Href:', link.getAttribute('href')); // Debugging log
                    removeSelectedClass(); // Still remove selected class from others
                    link.classList.add('selected'); // Add selected class to the clicked link
                    console.log('Navigating to:', link.getAttribute('href'));
                }
            });
        });

        // Set the 'All' link as selected by default on page load
        const defaultSelectedLink = document.querySelector('.navbar-links a[data-category="all"]'); // Select default link within navbar-links
        if (defaultSelectedLink) {
            defaultSelectedLink.classList.add('selected');
            console.log('Set default navbar link "All" as selected.'); // Debugging log
        }
    } else {
         console.log('No navbar links found.'); // Debugging log
    }


    // --- Search Bar Script (Existing) ---
    const searchIcon = document.querySelector('.search-icon');
    const searchBarContainer = document.querySelector('.search-bar-container');
    const closeSearchIcon = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-input'); // Get the input field
    const searchButton = document.querySelector('.search-button'); // Get the search button

    // Check if search elements exist before adding listeners
    if (searchIcon && searchBarContainer && closeSearchIcon && searchInput && searchButton) {
        console.log('Search elements found.'); // Debugging log
        // Toggle search bar visibility on search icon click
        searchIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from closing dropdown
            searchBarContainer.classList.toggle('active');
            if (searchBarContainer.classList.contains('active')) {
                searchInput.focus();
                console.log('Search bar opened, focusing input.'); // Debugging log
            } else {
                 console.log('Search bar closed.'); // Debugging log
            }
             // Close account dropdown if open
            const accountDropdown = document.querySelector('.account-dropdown'); // Get dropdown here
            if (accountDropdown) {
                accountDropdown.classList.remove('active');
                 console.log('Closed account dropdown.'); // Debugging log
            }
        });

        // Hide search bar on close icon click
        closeSearchIcon.addEventListener('click', () => {
            searchBarContainer.classList.remove('active');
            searchInput.value = ''; // Clear the input when closing
            console.log('Closed search bar via close icon.'); // Debugging log
        });

        // Optional: Add functionality to the search button
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // In a real application, you would redirect or trigger a search function here
                // Example: window.location.href = 'products.php?search=' + encodeURIComponent(searchTerm);
            } else {
                console.log('Search term is empty.');
                // Optionally provide user feedback if search term is empty
            }
        });

        // Optional: Trigger search on pressing Enter key in the input field
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default form submission if input is in a form
                searchButton.click(); // Simulate a click on the search button
                console.log('Search triggered by Enter key.'); // Debugging log
            }
        });
    } else {
         console.log('Search elements not found.'); // Debugging log
    }


    // --- Account Dropdown Script (Existing) ---
    const accountIcon = document.querySelector('.account-icon'); // Select the account icon
    const accountDropdown = document.querySelector('.account-dropdown'); // Select the dropdown menu

    // Check if account elements exist before adding listeners
    if (accountIcon && accountDropdown) {
        console.log('Account elements found.'); // Debugging log
        // Toggle dropdown visibility on account icon click
        accountIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from closing dropdown immediately
            accountDropdown.classList.toggle('active');
            console.log('Account dropdown toggled.'); // Debugging log
             // Close search bar if open
            if (searchBarContainer) { // Check if searchBarContainer exists
                 searchBarContainer.classList.remove('active');
                 console.log('Closed search bar.'); // Debugging log
            }
        });

        // Close dropdown when clicking outside of it
        document.addEventListener('click', (event) => {
            if (!accountDropdown.contains(event.target) && event.target !== accountIcon) {
                accountDropdown.classList.remove('active');
                 console.log('Account dropdown closed by clicking outside.'); // Debugging log
            }
             if (searchBarContainer && !searchBarContainer.contains(event.target) && event.target !== searchIcon) { // Check if searchIcon and searchBarContainer exist
                 searchBarContainer.classList.remove('active');
                  console.log('Search bar closed by clicking outside.'); // Debugging log
             }
        });

        // Prevent clicks inside the dropdown from closing it
        accountDropdown.addEventListener('click', (event) => {
            event.stopPropagation();
             console.log('Click inside account dropdown (propagation stopped).'); // Debugging log
        });
    } else {
         console.log('Account elements not found.'); // Debugging log
    }


    // --- Advert Carousel Script (Existing) ---
    // Check if advert container exists before adding listeners
    const advertContainer = document.querySelector('.advert-container');
    if (advertContainer) {
        console.log('Advert container found.'); // Debugging log
        const advertSlides = advertContainer.querySelectorAll('.advert-slide');
        let currentSlideIndex = 0;

        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            advertSlides.forEach(slide => {
                slide.classList.remove('active');
            });

            // Show the selected slide
            if (advertSlides[index]) {
                advertSlides[index].classList.add('active');
                console.log('Showing advert slide:', index); // Debugging log
            }
        }

        // Function to go to the next slide
        function nextSlide() {
            currentSlideIndex++;
            if (currentSlideIndex >= advertSlides.length) {
                currentSlideIndex = 0; // Loop back to the first slide
            }
            showSlide(currentSlideIndex);
        }

        // Show the first slide initially
        showSlide(currentSlideIndex);

        // Automatically advance to the next slide every 5 seconds
        setInterval(nextSlide, 5000); // Change slide every 5000 milliseconds (5 seconds)
         console.log('Advert carousel interval started.'); // Debugging log
    } else {
         console.log('Advert container not found.'); // Debugging log
    }


    // --- Theme Toggle Script (Existing) ---
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body; // Ensure body is correctly selected
    const dashboardIframe = document.getElementById('dashboard-content'); // Get the iframe element

    console.log('Theme toggle button found:', !!themeToggle); // Debugging log
    console.log('Body element found:', !!body); // Debugging log: Should always be true

    // Function to update the toggle button appearance
    function updateToggleIcon(isLightMode) {
        if (themeToggle) { // Check if themeToggle exists
            const sunIcon = themeToggle.querySelector('.fa-sun');
            const moonIcon = themeToggle.querySelector('.fa-moon');
            const toggleText = themeToggle.querySelector('span'); // Get toggleText here too
            if (isLightMode) {
                if (sunIcon) sunIcon.style.display = 'inline-block';
                if (moonIcon) moonIcon.style.display = 'none';
                 if (toggleText) toggleText.textContent = 'Toggle Theme'; // Update text
            } else {
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'inline-block';
                 if (toggleText) toggleText.textContent = 'Toggle Theme'; // Update text
            }
             console.log('Updated theme toggle icon and text.'); // Debugging log
        }
    }

    // Function to send theme message to iframe
    function sendThemeToIframe(theme) {
        // Check if we are on the dashboard page and the iframe exists and is accessible
        if (window.location.pathname.includes('dashboard.html') && dashboardIframe && dashboardIframe.contentWindow) {
            // Send the theme state ('light-mode' or 'dark-mode')
            // Using event.origin for security is recommended in production
            dashboardIframe.contentWindow.postMessage({ theme: theme }, '*'); // '*' allows messages to any origin
            console.log(`Sent theme '${theme}' to iframe.`); // Debugging log
        } else if (window.location.pathname.includes('dashboard.html')) {
             console.log('Dashboard iframe not found or not accessible to send theme.'); // Debugging log
        }
    }


    // --- Check for saved theme preference in local storage and apply on load ---
    console.log('Checking for saved theme in localStorage...'); // Debugging log
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme found:', savedTheme); // Debugging log

    if (savedTheme === 'light-mode') {
        body.classList.add('light-mode');
        updateToggleIcon(true); // Update icon for light mode
        console.log('Applied saved light mode theme to body.'); // Debugging log
    } else {
         body.classList.remove('light-mode'); // Ensure dark mode is default if no saved theme or saved is dark
         updateToggleIcon(false); // Update icon for dark mode
         console.log('Applied default dark mode theme or saved dark mode to body.'); // Debugging log
    }
    // --- End Theme Loading on Load ---


     // Check screen width on load and resize to hide/show text
     function handleResize() {
         const toggleText = themeToggle ? themeToggle.querySelector('span') : null; // Get toggleText if themeToggle exists
         if (toggleText) {
             if (window.innerWidth <= 480) {
                  toggleText.style.display = 'none';
             } else {
                  toggleText.style.display = 'inline-block';
             }
         }
     }

     handleResize(); // Call on initial load
     window.addEventListener('resize', handleResize); // Call on window resize
     console.log('Added window resize listener for theme toggle text.'); // Debugging log


    // Add event listener to the theme toggle button
    if (themeToggle) { // Check if themeToggle exists
        console.log('Adding click listener to theme toggle button.'); // Debugging log
        themeToggle.addEventListener('click', () => {
            console.log('Theme toggle button clicked.'); // Debugging log
            const isLightModeBeforeToggle = body.classList.contains('light-mode');
            console.log('Body has light-mode before toggle:', isLightModeBeforeToggle); // Debugging log

            body.classList.toggle('light-mode'); // This is the line that toggles the class

            const isLightModeAfterToggle = body.classList.contains('light-mode');
            console.log('Body has light-mode after toggle:', isLightModeAfterToggle); // Debugging log

            updateToggleIcon(isLightModeAfterToggle); // Update icon on toggle

            // Determine the current theme state
            const currentThemeState = isLightModeAfterToggle ? 'light-mode' : 'dark-mode';

            // Save the theme preference to local storage
            localStorage.setItem('theme', currentThemeState);
            console.log('Theme toggled, saved:', currentThemeState); // Debugging log

            // Send the theme state to the iframe if on the dashboard page
            sendThemeToIframe(currentThemeState);
        });
    } else {
         console.log('Theme toggle button not found.'); // Debugging log
    }


    // --- User Form Tab Switching Script (Existing) ---
    // This function needs to be in the global scope to be called by onclick attributes
    // It also needs to be called on DOMContentLoaded for initial tab selection
    // Function to switch between login/signup tabs
    window.switchTab = function(tabName) {
        console.log('Switching user form tab to:', tabName); // Debugging log
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show the selected tab content
        const selectedContent = document.getElementById(tabName + '-content');
        if (selectedContent) {
             selectedContent.classList.add('active');
             console.log('Activated tab content:', tabName + '-content'); // Debugging log
        } else {
             console.log('Tab content not found:', tabName + '-content'); // Debugging log
        }


        // Add active class to the clicked tab
        // Find the tab element based on tabName
        const selectedTab = document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`);
         if (selectedTab) {
             selectedTab.classList.add('active');
             console.log('Activated tab:', selectedTab.textContent); // Debugging log
         } else {
              console.log('Tab element not found for:', tabName); // Debugging log
         }
    }

    // Check URL parameters on page load to determine which tab to open
    // This part should run inside DOMContentLoaded
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');

    // Check if we are on the user.html page before trying to switch tabs based on URL parameter
    // This prevents errors on other pages that include this script
    if (window.location.pathname.includes('user.html')) {
        console.log('On user.html page.'); // Debugging log
        if (tabParam === 'signup') {
            switchTab('signup');
             console.log('URL parameter "tab=signup" found, switching to signup tab.'); // Debugging log
        } else {
            // Default to login tab if no parameter or parameter is not 'signup'
            switchTab('login');
             console.log('No URL parameter or "tab" is not "signup", switching to login tab.'); // Debugging log
        }
    }


    // --- Product Detail Page Script (Existing) ---
    // Check if we are on the product_detail.html page
    if (window.location.pathname.includes('product_detail.html')) {
        console.log('On product_detail.html page.'); // Debugging log
        const mainProductImage = document.getElementById('mainProductImage');
        // Select all images within the further-image container
        const thumbnailImages = document.querySelectorAll('.further-image img');

        // Check if main image and thumbnails exist before adding listeners
        if (mainProductImage && thumbnailImages.length > 0) {
            console.log(`Found main product image and ${thumbnailImages.length} thumbnail images.`); // Debugging log
            thumbnailImages.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    // Get the source of the clicked thumbnail
                    const thumbnailSrc = thumbnail.getAttribute('src');

                    // Set the source of the main image to the thumbnail's source
                    mainProductImage.setAttribute('src', thumbnailSrc);
                    console.log('Thumbnail clicked, main image src updated:', thumbnailSrc); // Debugging log
                });
            });
        } else {
             console.log('Main product image or thumbnails not found.'); // Debugging log
        }
    }

    // --- Dashboard Script (Simplified History Management) ---
    // Check if we are on the dashboard.html page
    if (window.location.pathname.includes('dashboard.html')) {
        console.log('On dashboard.html page.'); // Debugging log
        const dashboardLinks = document.querySelectorAll('.dashboard-sidebar .dashboard-link');
        const dashboardIframe = document.getElementById('dashboard-content'); // Already selected above
        const body = document.body; // Get the body element
        const backToShopBtn = document.querySelector('.back-to-shop-btn'); // Get the new button

        console.log('Dashboard iframe found:', !!dashboardIframe); // Debugging log: true if found, false if not
        console.log('Back to Shop button found:', !!backToShopBtn); // Debugging log: true if found, false if not


        // Function to load content into the iframe
        function loadDashboardIframeContent(url) {
            if (dashboardIframe) {
                dashboardIframe.src = url;
                console.log('Loading dashboard content into iframe:', url); // Debugging log
                // History is NOT managed here, so the back button will go to the previous page
            } else {
                 console.error('Error: Dashboard iframe not found when trying to load content:', url); // Error log
            }
        }

        // Add event listeners for dashboard sidebar links
        if (dashboardLinks.length > 0 && dashboardIframe) {
            console.log(`Found ${dashboardLinks.length} dashboard sidebar links.`); // Debugging log
            dashboardLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent the default link behavior
                    console.log('Dashboard link clicked (prevented default):', link.textContent, 'Href:', link.getAttribute('href')); // Debugging log

                    // Remove 'active' class from all dashboard links
                    dashboardLinks.forEach(otherLink => {
                        otherLink.classList.remove('active');
                    });

                    // Add 'active' class to the clicked link
                    link.classList.add('active');

                    // Get the href of the clicked link (the URL to load)
                    const contentUrl = link.getAttribute('href');

                    // Load content into the iframe - NO history manipulation here
                    loadDashboardIframeContent(contentUrl);

                });
            });

            // --- Add event listener for the Back to Shop button ---
            if (backToShopBtn) {
                console.log('Adding click listener to Back to Shop button.'); // Debugging log
                backToShopBtn.addEventListener('click', () => {
                    console.log('Back to Shop button clicked. Navigating to index.html'); // Debugging log
                    window.location.href = 'index.html'; // Navigate to the homepage
                });
            } else {
                 console.log('Back to Shop button not found on dashboard page.'); // Debugging log
            }
            // --- End Back to Shop button listener ---


            // --- Handle initial load based on URL query parameter (Optional) ---
            // This part is now optional if you always want the default view on dashboard load
            // If you remove this, the iframe should have a default 'src' set in the HTML
            const initialUrlParams = new URLSearchParams(window.location.search);
            const initialContentUrl = initialUrlParams.get('content');

            if (initialContentUrl) {
                console.log('Initial load with content parameter:', initialContentUrl); // Debugging log
                // Load the content specified in the URL parameter on initial load
                loadDashboardIframeContent(initialContentUrl);

                // Set the initial active link based on the URL parameter
                const initialActiveLink = document.querySelector(`.dashboard-sidebar .dashboard-link[href="${initialContentUrl}"]`);
                if (initialActiveLink) {
                    dashboardLinks.forEach(link => link.classList.remove('active')); // Remove active from others
                    initialActiveLink.classList.add('active');
                    console.log('Set initial active dashboard link based on URL parameter.'); // Debugging log
                } else {
                     console.log('Initial active dashboard link not found for URL parameter:', initialContentUrl); // Debugging log
                }

            } else {
                console.log('Initial load without content parameter. Loading default content.'); // Debugging log
                // If no 'content' parameter, load the default dashboard content
                // Ensure you have a default link or set the iframe src in HTML
                const defaultLink = document.querySelector('.dashboard-sidebar .dashboard-link.default') || dashboardLinks[0];
                if (defaultLink) {
                    loadDashboardIframeContent(defaultLink.getAttribute('href'));
                    defaultLink.classList.add('active');
                    console.log('Set default active dashboard link.'); // Debugging log
                } else {
                     console.log('No default dashboard link found.'); // Debugging log
                }
            }
            // --- End Optional Initial Load ---


            // --- Send theme to iframe when the iframe finishes loading ---
            // This listener is crucial for applying the theme to newly loaded content
            if (dashboardIframe) {
                console.log('Adding load listener to dashboard iframe.'); // Debugging log
                dashboardIframe.addEventListener('load', () => {
                    console.log('Dashboard iframe finished loading.'); // Debugging log
                    const currentThemeState = body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
                    sendThemeToIframe(currentThemeState);
                });
            }
        } else {
             console.log('Dashboard sidebar links or iframe not found.'); // Debugging log
        }

        // --- Removed the popstate listener ---
        // Since we are not pushing states for sidebar clicks, the popstate listener
        // is no longer needed for internal dashboard navigation. The browser
        // will handle navigating away from dashboard.html.
    }
});
