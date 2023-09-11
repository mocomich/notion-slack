import { Client, iteratePaginatedAPI } from '@notionhq/client';
import { Post } from '../../models/post';
import { assertType, calculateDateDifference } from '../../utils';

export async function getPosts(notion: Client, notionDatabaseId: string): Promise<Post[]> {
	const posts: Post[] = [];
	for await (const block of iteratePaginatedAPI(notion.databases.query, {
		database_id: notionDatabaseId,
		sorts: [{ timestamp: 'created_time', direction: 'descending' }],
		filter: {
			and: [
				{ property: 'isRead', checkbox: { equals: false } },
				{ property: 'url', url: { is_not_empty: true } },
			],
		},
	})) {
		if (block.object !== 'page' || !('properties' in block)) {
			console.log(`skipped: ${block.id} is not a page`);
			continue;
		}
		const { properties } = block;

		assertType('url', properties.url);
		assertType('title', properties.title);
		assertType('created_time', properties.created_time);

		const url = properties.url.url ?? '';
		const title = properties.title.title[0].plain_text ?? '';
		// one week
		const remainingDay = 7 - calculateDateDifference(new Date(), new Date(properties.created_time.created_time));
		const note =
			remainingDay === 0
				? `🔰 残り7日です`
				: remainingDay < 0
				? `⚠️ 残り${Math.abs(remainingDay)}日です`
				: '💩 期限が過ぎています。早く読みなさい。';

		posts.push({
			notionBlockId: block.id,
			title,
			url,
			note,
		});
	}

	return posts;
}
