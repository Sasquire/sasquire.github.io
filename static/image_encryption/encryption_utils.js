// https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
function buffer_to_base64( buffer ) {
	let binary = '';
	const bytes = new Uint8Array( buffer );
	for (var i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

function base64_to_buffer (string) {
	return Uint8Array.from(atob(string), c => c.charCodeAt(0));
}

// https://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript
function buffer_to_string (buffer) {
	return new TextDecoder().decode(buffer);
}

function string_to_buffer (string) {
	return new TextEncoder().encode(string);
}

function download_data (data, file_type, file_name) {
	const blob = new Blob([data], {type: file_type});

	if (typeof navigator.msSaveBlob === 'function') {
		return navigator.msSaveBlob(blob, file_name);
	}

	const url = URL.createObjectURL(blob);

	const saver = document.createElement('a');
	saver.href = url;
	saver.download = file_name;

	document.body.appendChild(saver);
	saver.dispatchEvent(new MouseEvent('click'));
	document.body.removeChild(saver);
	
	URL.revokeObjectURL(url);
}

// As of 2024-04-09 this takes about 2300ms on my Ryzen 9 5900x
async function generate_key_from_password (password_buffer) {
	const salt_buffer = string_to_buffer('fzF5W%#8#Ve@T!y7hx');
	const rounds = 1_000_000 + 1_420_000 + 1_000_069 + 6268 + 2_592_147 + 1;

	const password_key = await crypto.subtle.importKey(
		'raw',
		password_buffer,
		'PBKDF2',
		false,
		['deriveBits', 'deriveKey']
	);

	const true_key = await crypto.subtle.deriveKey({
			name: 'PBKDF2',
			salt: salt_buffer,
			iterations: rounds,
			hash: 'SHA-512',
		},
		password_key,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt'],
	);

	return true_key;
}

async function encrypt (file_buffer, password_buffer) {
	const key = await generate_key_from_password(password_buffer);
	const iv_buffer = crypto.getRandomValues(new Uint8Array(12));

	const encrypted_buffer = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv: iv_buffer },
		key,
		file_buffer
	);

	return {
		iv: buffer_to_base64(iv_buffer),
		data: buffer_to_base64(encrypted_buffer)
	};
}

async function decrypt (encrypted_file_buffer, password_buffer) {
	const key = await generate_key_from_password(password_buffer);
	const {iv, data} = JSON.parse(buffer_to_string(encrypted_file_buffer));

	const iv_buffer = base64_to_buffer(iv);
	const file_buffer = base64_to_buffer(data);

	const decrypted_buffer = await crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv: iv_buffer },
	 	key,
	 	file_buffer
	);
	
	return decrypted_buffer;
}