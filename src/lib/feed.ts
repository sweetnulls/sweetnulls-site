import Parser from 'rss-parser';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
}

const SUBSTACK_FEED_URL = 'https://sweetnulls.substack.com/feed';

// Fallback placeholder gradient classes for posts without images
const PLACEHOLDER_CLASSES = ['warm', 'cool', 'deep', 'blush', 'muted', 'sand', 'olive'];

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 250));
  return `${minutes} min read`;
}

function extractImage(item: any): string {
  // Try enclosure (most Substack feeds use this)
  if (item.enclosure?.url) return item.enclosure.url;

  // Try media:content
  if (item['media:content']?.$.url) return item['media:content'].$.url;

  // Try to find first image in content
  const imgMatch = (item['content:encoded'] || item.content || '').match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) return imgMatch[1];

  return '';
}

function extractExcerpt(item: any): string {
  // Use content:encodedSnippet or contentSnippet
  const snippet = item.contentSnippet || item['content:encodedSnippet'] || '';
  // Clean and truncate
  const clean = snippet.replace(/\n+/g, ' ').trim();
  if (clean.length > 200) return clean.substring(0, 200).replace(/\s+\S*$/, '') + '...';
  return clean;
}

export async function fetchPosts(): Promise<SubstackPost[]> {
  const parser = new Parser({
    customFields: {
      item: [
        ['media:content', 'media:content'],
        ['content:encoded', 'content:encoded'],
      ],
    },
  });

  try {
    const feed = await parser.parseURL(SUBSTACK_FEED_URL);

    return (feed.items || []).map((item, index) => ({
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: item.pubDate || '',
      excerpt: extractExcerpt(item),
      image: extractImage(item),
      readTime: estimateReadTime(item['content:encoded'] || item.content || ''),
      category: 'Sweet Nulls', // Substack doesn't provide categories in RSS
    }));
  } catch (error) {
    console.error('Failed to fetch Substack RSS feed:', error);
    return [];
  }
}
