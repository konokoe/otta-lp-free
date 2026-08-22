const ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, (c) => ESCAPE[c]);
}

/**
 * 英数字のまとまりを <span class="en"> で包んだ HTML を返す。
 * 英数字は Montserrat 本来の字間で組むため letter-spacing を外す（global.css の .en）。
 * 使用例: <p set:html={en(text)} />
 */
export function en(text: string): string {
  const re = /[A-Za-z0-9]+(?:[.,:/&'’-][A-Za-z0-9]+)*/g;
  let out = '';
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    out += escapeHtml(text.slice(last, m.index));
    out += `<span class="en">${escapeHtml(m[0])}</span>`;
    last = m.index + m[0].length;
  }

  return out + escapeHtml(text.slice(last));
}
