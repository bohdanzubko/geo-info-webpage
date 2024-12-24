document.addEventListener("DOMContentLoaded", function () {  
    fetch("photo-gallery.xml")
      .then((response) => response.text())
      .then((xmlText) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const photos = xmlDoc.getElementsByTagName("photo");

        let container = document.getElementById("photoGallery");

        Array.from(photos).forEach((photo) => {
          const id = photo.getElementsByTagName("id")[0].textContent;
          const category = photo.getElementsByTagName("category")[0].textContent;
          const image = photo.getElementsByTagName("image")[0].textContent;

          container.innerHTML += `
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="photo-card card h-100">
              <div class="card-body">
				<div class="tour-card-main">
                <img src="${image}" class="card-bg" alt="${category}">
                <div class="tour-card-main-info">
                    <h5 class="card-text dark-bg-box">${category}</h5>
                </div>
				</div>
              </div>
            </div>
          </div>
          `;
        });
      })
      .catch((error) => {
        console.error("Error loading or parsing the XML file:", error);
      });
  });
