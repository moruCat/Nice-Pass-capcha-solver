const fs = require('fs');
const path = require('path');
const CaptchaSolver = require('./captcha');

// 캡챠 판독 도구
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("❌ 사용법: node src/main.js <이미지_폴더>");
    process.exit(1);
  }

  const folderPath = args[0];

  // 솔버 로드
  let solver;
  try {
    solver = await CaptchaSolver.load();
  } catch (err) {
    console.error(`❌ 초기화 실패: ${err.message}`);
    process.exit(1);
  }

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    console.error(`❌ 폴더 없음: ${folderPath}`);
    process.exit(1);
  }

  // 이미지 목록
  const files = fs.readdirSync(folderPath)
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort();

  let total = 0;
  let success = 0;

  console.log("------------------------------------");
  console.log(`🔍 판독 시작: ${folderPath}`);
  console.log("------------------------------------");

  for (const filename of files) {
    const filePath = path.join(folderPath, filename);
    const expected = path.parse(filename).name;

    try {
      const imgBuffer = fs.readFileSync(filePath);
      const result = await solver.solve(imgBuffer);
      total++;

      if (result === expected) {
        success++;
        console.log(`[OK] ${expected} -> ${result}`);
      } else {
        console.log(`[NG] ${expected} -> ${result} (틀림)`);
      }
    } catch (err) {
      console.error(`[ERR] ${filename}: ${err.message}`);
    }
  }

  const rate = total > 0 ? (success / total * 100).toFixed(2) : "0.00";
  console.log("------------------------------------");
  console.log("📊 결과 (Node.js)");
  console.log(`총: ${total} | 성공: ${success} | 실패: ${total - success}`);
  console.log(`성공률: ${rate}%`);
  console.log("------------------------------------");
}

main();
