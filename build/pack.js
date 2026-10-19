/**
 * 一键打包脚本：把 Vite 构建产物 dist/ 打成可部署 zip
 * 用法：npm run build && npm run pack
 * 输出：上级目录/科创源-Vue站点-部署包.zip
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', 'dist');
const OUTPUT = path.resolve(__dirname, '..', '..', '科创源-Vue站点-部署包.zip');

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error('❌ 未找到 dist/index.html，请先执行 npm run build');
  process.exit(1);
}

const output = fs.createWriteStream(OUTPUT);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log('✅ 打包完成');
  console.log(`   输出文件: ${OUTPUT}`);
  console.log(`   压缩包大小: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('   可直接上传到 Nginx / 对象存储 / CDN 解压部署');
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') console.warn('⚠️ 警告:', err.message);
  else throw err;
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(ROOT, false);
archive.finalize();