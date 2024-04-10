
async function generate_seed_phrase () {
	const words = await fetch('bip_39_english.json').then(e => e.json());

	const random_string = new Array(24).fill(0)
		.map(e => Math.floor(Math.random() * words.length))
		.map(e => words[e])
		.join(' ');

	document.getElementById('generated_password').textContent = random_string;
	set_passwords(random_string);
}


async function sleep (time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

async function get_file_and_password (type) {
	const file = document.getElementById(`${type}_file`).files[0];
	const password = document.getElementById(`${type}_password`).value;

	if (file === undefined || password === undefined || password === '') {
		document.getElementById('raw_input').style.backgroundColor = 'red';
		await sleep(600);
		document.getElementById('raw_input').style.backgroundColor = '';
		await sleep(200);
		document.getElementById('raw_input').style.backgroundColor = 'red';
		await sleep(200);
		document.getElementById('raw_input').style.backgroundColor = '';
		return [null, null];
	}

	const file_buffer = await file.arrayBuffer();
	const password_buffer = new TextEncoder().encode(password)

	return [file_buffer, password_buffer]
}

async function encrypt_handler () {
	const [file, password] = await get_file_and_password('raw');
	const encrypted = await encrypt(file, password);
	await download_data(JSON.stringify(encrypted), 'image/*', 'encrypted_file.image');
}

async function decrypt_handler () {
	const [file, password] = await get_file_and_password('encrypted');
	const decrypted = await decrypt(file, password);
	await download_data(decrypted, 'image/*', 'decrypted_file.image');
}

function set_passwords (password) {
	document.getElementById('encrypted_password').value = password;
	document.getElementById('raw_password').value = password;
}

document.getElementById('raw_password').addEventListener('change', e => set_passwords(e.target.value));
document.getElementById('encrypted_password').addEventListener('change', e => set_passwords(e.target.value));

document.getElementById('encrypt_button').addEventListener('click', encrypt_handler)
document.getElementById('decrypt_button').addEventListener('click', decrypt_handler)

document.getElementById('generate_button').addEventListener('click', generate_seed_phrase)