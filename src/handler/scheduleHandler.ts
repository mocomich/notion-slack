import { Client } from '@notionhq/client';
import { Env } from '../worker';
import { getPosts } from '../infra/notion/posts';
import { postAllMessage } from '../infra/slack/message';

export async function scheduleHandler(env: Env) {
	const notion = new Client({
		auth: env.NOTION_TOKEN,
	});
	const posts = await getPosts(notion, env.NOTION_DATABASE_ID);
	postAllMessage(posts, env.SLACK_TOKEN);
}
