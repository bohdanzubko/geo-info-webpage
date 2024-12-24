function toggleMenu() {
	const menu = document.getElementById("hiddenMenu");
	const mButton = document.getElementById("menuButton");
	const menuBackground = document.getElementById("menuBgrd");
	
	if (menu.style.left === "0px") {
		menu.style.left = "-250px"; // Hide the menu
		mButton.innerText= "☰";
		menuBackground.style.visibility= "hidden";
		document.body.style.overflow = '';
	} else {
		menu.style.left = "0px"; // Show the menu
		mButton.innerText= "✕";
		menuBackground.style.visibility= "visible";
		document.body.style.overflow = 'hidden';
	}
}