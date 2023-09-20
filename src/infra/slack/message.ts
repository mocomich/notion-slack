import { Post } from '../../models/post';
import { generateComponent } from './components';
import { EP } from './const';

export async function postMessage(token: string, channel: string, blocks: { type: string }[]) {
	const payload = {
		channel,
		text: 'This is sample message',
		blocks,
	};

	try {
		const res = await fetch(`${EP}/chat.postMessage`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		});
		if (!res.ok) {
			throw new Error(`Server error ${res.status}`);
		}
	} catch (error) {
		new Error(`${error}`);
	}
}

export async function postAllMessage(posts: Post[], token: string) {
	for (let index = 0; index < posts.length; index++) {
		const post = posts[index];
		const component = generateComponent({ ...post });
		try {
			await postMessage(token, '#notion', component);
		} catch (error) {
			console.error(`投稿メッセージ ${index + 1} の送信エラー:`, error);
		}
	}
}
