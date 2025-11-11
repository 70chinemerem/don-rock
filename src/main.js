// Main entry point for the DonRock Global Services application
import './style.css'

// Application initialization code will go here
console.log('DonRock Global Services application loaded')

// 🎯 Scroll to About Section
const scrollBtn = document.getElementById('scrollBtn');
scrollBtn.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});