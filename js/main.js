import '../css/style.css';
import html2pdf from 'html2pdf.js';

const downloadBtn = document.querySelector('.contact__download-button');
const overlay = document.querySelector('#pdf-download-overlay');

downloadBtn.addEventListener('click', function (e) {
	const ripple = document.createElement('span');
	ripple.classList.add('ripple');

	const rect = this.getBoundingClientRect();
	const x = e.clientX - rect.left - 50;
	const y = e.clientY - rect.top - 50;

	ripple.style.left = `${x}px`;
	ripple.style.top = `${y}px`;

	this.appendChild(ripple);
	setTimeout(() => ripple.remove(), 600);
});

document.addEventListener('DOMContentLoaded', () => {
	const editableElements = document.querySelectorAll('[contenteditable="true"]');

	editableElements.forEach((el, index) => {
		const key = el.dataset.key || `editable-${index}`;

		const saved = localStorage.getItem(key);
		if (saved !== null) {
			el.innerHTML = saved;
		}

		el.addEventListener('input', () => {
			localStorage.setItem(key, el.innerHTML);
		});
	});
});

downloadBtn.addEventListener('click', async e => {
	e.preventDefault();

	overlay.classList.add('active');
	document.body.classList.add('force-desktop-pdf');

	const resume = document.querySelector('.general-resume-container');

	const clone = resume.cloneNode(true);
	clone.classList.add('pdf-view');
	const wrapper = document.createElement('div');
	wrapper.style.position = 'fixed';
	wrapper.style.top = '0';
	wrapper.style.left = '0';
	wrapper.style.width = '1000px';
	wrapper.style.zIndex = '-1';
	wrapper.style.opacity = '0';
	wrapper.style.pointerEvents = 'none';
	wrapper.appendChild(clone);
	document.body.appendChild(wrapper);

	await new Promise(resolve => setTimeout(resolve, 200));

	try {
		await html2pdf()
			.set({
				margin: 0,
				filename: 'resume.pdf',
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: {
					scale: 3,
					useCORS: true,
					allowTaint: false,
					scrollY: 0,
				},
				jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
			})
			.from(clone)
			.save();
	} catch (error) {
		throw new Error('PDF generation error:', error);
	} finally {
		wrapper.remove();
		document.body.classList.remove('force-desktop-pdf');
		overlay.classList.remove('active');
	}
});

downloadBtn.classList.add('download-fly');
setTimeout(() => {
	downloadBtn.classList.remove('download-fly');
}, 1000);
