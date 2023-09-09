import { Post } from '../../models/post';

function generateDriver() {
	return {
		type: 'divider',
	};
}

function generateSection({ url, title }: Pick<Post, 'url' | 'title'>) {
	return {
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: `<${url}|${title}>`,
		},
	};
}

function generateContext({ note }: Pick<Post, 'note'>) {
	return {
		type: 'context',
		elements: [
			{
				type: 'mrkdwn',
				text: `${note}`,
			},
		],
	};
}

function generateActionButton({ notionBlockId }: Pick<Post, 'notionBlockId'>) {
	return {
		type: 'actions',
		elements: [
			{
				type: 'button',
				text: {
					type: 'plain_text',
					text: '読みました',
				},
				style: 'primary',
				value: notionBlockId,
				action_id: 'actionId-0',
			},
		],
	};
}

export function generateComponent({ url, title, note, notionBlockId }: Post): { type: string }[] {
	return [generateDriver(), generateSection({ url, title }), generateContext({ note }), generateActionButton({ notionBlockId })];
}
