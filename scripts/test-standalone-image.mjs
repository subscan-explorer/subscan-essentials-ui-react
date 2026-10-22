import { execFileSync } from 'node:child_process';

const image = process.argv[2] ?? 'subscan-essentials-ui:local';

function docker(...args) {
  return execFileSync('docker', args, {
    encoding: 'utf8',
    timeout: 30_000,
    maxBuffer: 2 * 1024 * 1024,
  }).trim();
}

// This function executes inside the actual image, including its native sharp.
async function verifyImageOptimizer(coldCache) {
  const assert = require('node:assert/strict');
  const fs = require('node:fs');
  const path = require('node:path');
  const sharp = require('sharp');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cache = '/app/.next/cache';
  const imageCache = path.join(cache, 'images');
  const fixture = '/images/network/default/logo.png';
  const base = 'http://127.0.0.1:3000';

  assert.equal(process.getuid(), 1000, 'the server must run with the production UID');
  assert.equal(process.getgid(), 1000, 'the server must use the production GID');
  assert.equal(fs.statSync(cache).uid, 1000, 'node must own the cache directory');
  assert.equal(fs.statSync(cache).gid, 1000);
  assert.equal(fs.statSync(cache).mode & 0o002, 0, 'cache must not be world writable');
  fs.accessSync(cache, fs.constants.W_OK);

  let source;
  let startupError;
  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const response = await fetch(`${base}${fixture}`, {
        signal: AbortSignal.timeout(2_000),
      });
      assert.equal(response.status, 200, 'the local PNG fixture must be served');
      source = Buffer.from(await response.arrayBuffer());
      break;
    } catch (error) {
      startupError = error;
      await delay(200);
    }
  }
  assert.ok(source, `standalone server did not start: ${startupError}`);
  const original = await sharp(source).metadata();
  assert.equal(original.format, 'png');
  assert.ok(original.width > 64, 'fixture must require a real resize');

  const url = `${base}/_next/image?url=${encodeURIComponent(fixture)}&w=64&q=75`;
  const request = () => fetch(url, {
    headers: { Accept: 'image/webp' },
    signal: AbortSignal.timeout(10_000),
  });
  const first = await request();
  assert.equal(first.status, 200, 'image optimization must succeed');
  assert.equal(first.headers.get('content-type'), 'image/webp');
  assert.equal(first.headers.get('x-nextjs-cache'), coldCache ? 'MISS' : 'HIT');
  const optimized = Buffer.from(await first.arrayBuffer());
  const metadata = await sharp(optimized).metadata();
  assert.equal(metadata.format, 'webp');
  assert.equal(metadata.width, 64);
  assert.ok(metadata.height > 0);
  const decoded = await sharp(optimized).raw().toBuffer({ resolveWithObject: true });
  assert.equal(decoded.info.width, 64);
  assert.equal(decoded.data.length, decoded.info.width * decoded.info.height * decoded.info.channels);
  assert.ok(decoded.data.length > 0, 'the optimized image must decode to actual pixels');
  assert.notDeepEqual(optimized, source, 'the original PNG must not be passed through');

  const second = await request();
  assert.equal(second.status, 200);
  assert.equal(second.headers.get('x-nextjs-cache'), 'HIT');
  assert.deepEqual(Buffer.from(await second.arrayBuffer()), optimized);

  // Next may finish writing its disk cache just after sending the response.
  let files = [];
  for (let attempt = 0; attempt < 20; attempt++) {
    if (fs.existsSync(imageCache)) {
      files = fs.readdirSync(imageCache, { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile());
    }
    if (files.length > 0) break;
    await delay(100);
  }
  assert.ok(files.length > 0, 'optimized image must be persisted to disk');
  for (const file of files) {
    const stat = fs.statSync(path.join(file.parentPath, file.name));
    assert.equal(stat.uid, 1000, 'cache files must be written by node');
    assert.equal(stat.gid, 1000);
  }

  console.log(JSON.stringify({
    uid: process.getuid(),
    gid: process.getgid(),
    node: process.version,
    sharp: sharp.versions.sharp,
    libvips: sharp.versions.vips,
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    decodedBytes: decoded.data.length,
    firstCache: first.headers.get('x-nextjs-cache'),
    secondCache: second.headers.get('x-nextjs-cache'),
    diskCacheFiles: files.length,
  }));
}

let container;
try {
  // No public API, DNS, host bind mounts or production resources are involved.
  const user = docker('image', 'inspect', '--format', '{{.Config.User}}', image);
  if (user !== 'node') throw new Error(`Expected the non-root node user, received ${user}`);
  container = docker('run', '--detach', '--network', 'none', '--user', '1000:1000', image);
  const check = (coldCache) => docker(
    'exec', container, 'node', '-e',
    `(${verifyImageOptimizer.toString()})(${coldCache}).catch((error) => { console.error(error); process.exitCode = 1; })`,
  );
  console.log('Cold cache:', check(true));
  docker('restart', '--timeout', '10', container);
  console.log('Persisted cache after restart:', check(false));
  console.log('Standalone image optimization regression passed');
} catch (error) {
  if (container) {
    try {
      console.error(docker('logs', '--tail', '100', container));
    } catch (logError) {
      console.error('Failed to read container logs:', logError);
    }
  }
  throw error;
} finally {
  if (container) docker('rm', '--force', container);
}
