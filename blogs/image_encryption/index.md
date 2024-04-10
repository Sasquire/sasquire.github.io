---
layout: "default"
date: "2024-04-10"
title: "image_encryption"
---

<style>
	.input {
		display: flex;
		flex-direction: row;
		background-color: #00000033;
		padding: 1rem;
		margin-bottom: 2rem;
	}

	.input > div {
		border: 1px solid black;
		padding: 1rem;
		margin: 0 1rem;
	
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	#generated_password {
		font-weight:800;
	}
</style>

# Image Encryption & Decryption With ClientSide Javascript

This tool is supposed to act like a hub for all the encrypted images in this repository. You can even use it to encrypt data outside of here but be aware that I did not make this to conform to any standard.

The "encrypted" file is really just a JSON file containing a base64 encoded IV and data buffer after being encrypted with [AES-GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode). The key is derived from many many rounds of [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2). I am unsure of how secure this is but I never intended to store nuclear codes.

<div class="input" id="raw_input">
	<div>
		<span>Raw Image</span><br>
		<input type="file" id="raw_file" class="file" accept="image/*">
	</div>
	<div>
		<span>Password</span><br>
		<input id="raw_password" class="password">
	</div>
	<div>
		<button id="encrypt_button">Encrypt</button>
	</div>
</div>

<div class="input" id="raw_encrypted">
	<div>
		<span>Encrypted Image</span><br>
		<input type="file" id="encrypted_file" class="file">
	</div>
	<div>
		<span>Password</span><br>
		<input id="encrypted_password" class="password">
	</div>
	<div>
		<button id="decrypt_button">Decrypt</button>
	</div>
</div>

<div class="input">
	<div>
		<button id="generate_button">Generate Password</button>
	</div>
	<div>
		<span>Generated Password</span><br>
		<span id="generated_password"></span>
	</div>
</div>

<script src="/static/image_encryption/encryption_utils.js"></script>
<script src="encryption.js"></script>
