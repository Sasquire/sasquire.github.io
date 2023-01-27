import { fileURLToPath } from 'url';
import path from 'path';

// Used like file_here(import.meta.url, 'really_cool_file.png')
function file_here (here_url, file_name) {
	const here_file = fileURLToPath(here_url);
	const here = path.dirname(here_file);

	return path.join(here, file_name);
}

export {
	file_here
};
