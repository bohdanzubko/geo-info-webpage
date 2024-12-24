document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);
	const tourId = urlParams.get("id");
  
	fetch("tours.xml")
	  .then((response) => response.text())
	  .then((xmlText) => {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlText, "application/xml");
		const tours = xmlDoc.getElementsByTagName("tour");
  
		if (tourId) {
		  // Відображення одного маршруту
		  let container = document.getElementById("tourDetailContainer");

		  container.innerHTML = `<hr class="divid mx-3">`;

		  let selectedTour = null;
		  Array.from(tours).forEach((tour) => {
			const id = tour.getElementsByTagName("id")[0].textContent;
			if (id === tourId) {
			  selectedTour = tour;
			}
		  });
  
		  if (selectedTour) {
			const name = selectedTour.getElementsByTagName("name")[0].textContent;
			const category = selectedTour.getElementsByTagName("category")[0].textContent;
			const distance = selectedTour.getElementsByTagName("distance")[0].textContent;
			const difficulty = selectedTour.getElementsByTagName("difficulty")[0].textContent;
			const duration = selectedTour.getElementsByTagName("duration")[0].textContent;
			const type = selectedTour.getElementsByTagName("type")[0].textContent;
			const location = selectedTour.getElementsByTagName("location")[0].textContent;
			const preview = selectedTour.getElementsByTagName("preview")[0].textContent;
			const description = selectedTour.getElementsByTagName("description")[0].textContent;
			const gps = selectedTour.getElementsByTagName("gps")[0].textContent;
			const mapLink = selectedTour.getElementsByTagName("mapLink")[0].textContent;
			const mapFrameLink = selectedTour.getElementsByTagName("mapFrameLink")[0].textContent;
			const image = selectedTour.getElementsByTagName("image")[0].textContent;
  
			container.innerHTML += `
			  <div class="container-fluid d-flex flex-column justify-content-center align-items-center p-3">
				  <h2 class="text-center text-uppercase my-2">${name}</h2>
				  <p class="text-center mb-4">${preview}</p>
				  <img src="${image}" class="tour-img " alt="${name}">
				  <div class="container-fluid px-5 my-4 fst-italic">
				  	<p><strong>Категорія:</strong> ${category}</p>
				  	<p><strong>Тип:</strong> ${type}</p>
				  	<p><strong>Дистанція:</strong> ${distance}</p>
				  	<p><strong>Складність:</strong> ${difficulty}</p>
				  	<p><strong>Час проходження:</strong> ${duration}</p>
				  	<p><strong>Локація:</strong> ${location}</p>
				  </div>
				  <p class="tour-description text-justify px-5 mb-4">${description}</p>
				  <iframe class="tour-gm mx-auto" src="${mapFrameLink}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				  <p class="w-100 text-right pr-3 mt-3"><strong>GPS координати:</strong> ${gps}</p>
				  <div class="container-fluid d-flex justify-content-between p-3">
				  	<a href="tours.html" class="btn btn-secondary">Повернутися до списку маршрутів</a>
				  	<a href="${mapLink}" target="_blank" class="btn btn-primary">Переглянути на карті</a>
				  </div>
			  </div>
			`;
		  } else {
			let container = document.getElementById("tourDetailContainer");
			container.innerHTML = "<p>Маршрут не знайдено.</p>";
		  }
		} else {
		// Якщо параметра id немає, відображаємо всі маршрути
		let container = document.getElementById("toursContainer");

		container.innerHTML += `
		<div class="welcome-msg container-fluid d-flex flex-column justify-content-center align-items-center" style="background-image: url(images/jpg/welcome/tour-welcome.jpg);">
			<h2 class="text-center">Туристичні маршрути в Карпатах</h2>
		</div>
		<div class="advices d-flex justify-content-center my-4">
			<p class="advice-text text-center">Карпати пропонують безліч можливостей для тих, хто хоче вирватися
			з міської метушні та насолодитися природою. Ми підготували для вас мапи, корисні поради, орієнтовний 
			час на маршруті, список необхідного спорядження та багато іншої важливої інформації. Завдяки великій 
			різноманітності маршрутів, кожен знайде оптимальний варіант залежно від свого рівня підготовки, доступного 
			часу та погодних умов.</p>
		</div>
		`;

		Array.from(tours).forEach((tour) => {
		const id = tour.getElementsByTagName("id")[0].textContent;
		const name = tour.getElementsByTagName("name")[0].textContent;
		const category = tour.getElementsByTagName("category")[0].textContent;
		const distance = tour.getElementsByTagName("distance")[0].textContent;
		const difficulty = tour.getElementsByTagName("difficulty")[0].textContent;
		const duration = tour.getElementsByTagName("duration")[0].textContent;
		const preview = tour.getElementsByTagName("preview")[0].textContent;
		const location = tour.getElementsByTagName("location")[0].textContent;
		const image = tour.getElementsByTagName("image")[0].textContent;

		container.innerHTML += `
		<div class="col-lg-4 col-md-6 col-sm-12">
			<div class="tour-card card h-100">
				<div class="card-body">
				<a class="tour-card-read link" href="tours.html?id=${id}">
					<div class="tour-card-main">
					<img src="${image}" class="card-bg" alt="${name}">
					<div class="tour-card-main-info">
						<h5 class="card-title"><strong>${name}</strong></h5>
						<p class="card-text dark-bg-box">${category}</p>
					</div>
					</div>
				</a>
				<div class="tour-card-details">
					<p class="card-text">${preview}</p><br>
					<p class="card-text">Дистанція та складність:<strong> ${distance}, ${difficulty}</strong></p>
					<p class="card-text">Час проходження:<strong> ${duration}</strong></p>
					<p class="card-text">Локація:<strong> ${location}</strong></p>
				</div>
				</div>
			</div>
		</div>
		`;
		});
		}
	  })
	  .catch((error) => {
		console.error("Error loading or parsing the XML file:", error);
	  });
  });