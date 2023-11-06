import { redirect } from '@sveltejs/kit';

export function load({ cookies, params }) {
	if (!cookies.get('username')) {
		throw redirect(303, `/${params.ID}/login`);
	}
}