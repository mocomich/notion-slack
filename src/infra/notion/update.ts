import { Client } from '@notionhq/client';
import { Post } from '../../models/post';

export async function updateIsRead(notion: Client, post: Post) {
	return await notion.pages.update({
		page_id: post.notionBlockId,
		properties: {
			isRead: { checkbox: true },
		},
	});
}
