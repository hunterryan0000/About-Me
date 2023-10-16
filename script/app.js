document.addEventListener('DOMContentLoaded', () =>{
    // Array containing filenames of images
const imageNames = ["transferDetails.png", "viewTransfer.png"];

// Reference to the container where images will be appended
const imageContainer = document.getElementById("dynamic-images-container");

// Loop through each image name and create an img element
imageNames.forEach((imageName) => {
  const imgElement = document.createElement("img");
  imgElement.src = `./Bio/images/${imageName}`; // Adjust the path as per your directory structure
  imgElement.alt = `${imageName} Screenshot`;
  imgElement.loading = "lazy"; // For performance, images will load only when they enter the viewport
  
  imgElement.className = "custom-image";  // Add the custom CSS class

  // Add image to container
  imageContainer.appendChild(imgElement);
});


//-------------------------------------------------------------------

    // Get all timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Add click event listener to each timeline item
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      // Toggle active class on clicked item
      item.classList.toggle('active');
  
      // Collapse or expand the content of the clicked item
      const content = item.querySelector('p');
      content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
  
      // Collapse or expand other timeline items
      timelineItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('p').style.maxHeight = null;
        }
      });
    });
  });

  //-----------------------------------------------------------
  
  
  //interactive nav
  let isScrolling = false; // Initialize isScrolling flag
  let timeoutId;
  
  // Listen for scroll events
  window.addEventListener('scroll', () => {
      // Find the navbar and "To Top" button elements
    const navbar = document.querySelector('.bar');
    const toTopButton = document.querySelector('.to-top-btn');
    // Get the current scroll position
    const currentPosition = window.scrollY;
    // Define the positions of each section
    const sectionPositions = [
        { id: 'about', position: document.getElementById('about').offsetTop },
        { id: 'resume', position: document.getElementById('resume').offsetTop },
        { id: 'projects', position: document.getElementById('projects').offsetTop }
      ];
  
      let currentSectionId = '';
      // Identify the current section based on scroll position
      sectionPositions.forEach(function(section) {
        if (currentPosition >= section.position - 1) {
          currentSectionId = section.id;
        }
      });
  
      // Highlight the navbar item corresponding to the current section
      if (currentSectionId !== '') {
        const currentNavItem = document.querySelector(`.bar a[href="#${currentSectionId}"]`);
        const navItems = document.querySelectorAll('.bar a');
  
        navItems.forEach(function(navItem) {
          navItem.classList.remove('active');
        });
  
        currentNavItem.classList.add('active');
      }
  
    // Show or hide navbar and "To Top" button based on scroll position  
    if (currentPosition === 0 || isScrolling === true) {
      navbar.style.display = 'flex';
      navbar.style.background = '#333';
      toTopButton.style.display = 'none'; // Hide the "To Top" button when at the top or scrolling
    } else{
      toTopButton.style.display = 'block'; // Display the "To Top" button when scrolling stops
    }
  
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      isScrolling = false;
      if (currentPosition > 400) {
        navbar.style.display = 'none';
      }
    }, 2000); // Adjust the duration as needed (in milliseconds) (2sec)
  
    isScrolling = true;
  });

  // Make navbar appear when mouse hovers over the top of the page
  window.addEventListener('mousemove', (e) => {
    const navbar = document.querySelector('.bar');
    // Check if the mouse is within 50 pixels of the top of the screen
    if (e.clientY <= 50) {
      navbar.style.display = 'flex';
    }
  });

  // Scroll to top when the "To Top" button is clicked
  const toTopButton = document.querySelector('.to-top-btn');
  toTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})