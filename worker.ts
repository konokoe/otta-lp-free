export interface Env {
  BASIC_AUTH_USER: string;
  BASIC_AUTH_PASS: string;
  ASSETS: Fetcher;
}

const BASE_PATH = '/lp/senior-free';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return unauthorized();
    }

    const base64 = authHeader.slice('Basic '.length);
    const decoded = atob(base64);
    const colonIndex = decoded.indexOf(':');
    if (colonIndex === -1) return unauthorized();

    const user = decoded.slice(0, colonIndex);
    const pass = decoded.slice(colonIndex + 1);

    if (user !== env.BASIC_AUTH_USER || pass !== env.BASIC_AUTH_PASS) {
      return unauthorized();
    }

    // /lp/senior-free/* → /* にパスを書き換えて dist/ と一致させる
    const url = new URL(request.url);
    let assetPath = url.pathname;

    if (assetPath.startsWith(BASE_PATH)) {
      assetPath = assetPath.slice(BASE_PATH.length) || '/';
    }

    const rewrittenUrl = new URL(assetPath + url.search, url.origin);
    const res = await env.ASSETS.fetch(new Request(rewrittenUrl.toString(), request));

    // 確認用のステージングなので HTML はキャッシュさせない。
    // ここを通さないとデプロイ直後にエッジの古い HTML が返ることがある。
    // 画像・CSS・JS は Astro がファイル名に内容ハッシュを付けるため、そのままキャッシュさせてよい。
    const contentType = res.headers.get('Content-Type') ?? '';
    if (contentType.includes('text/html')) {
      const headers = new Headers(res.headers);
      headers.set('Cache-Control', 'no-store, must-revalidate');
      headers.set('Pragma', 'no-cache');
      headers.set('Expires', '0');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
    }

    return res;
  },
} satisfies ExportedHandler<Env>;

function unauthorized(): Response {
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
  });
}
