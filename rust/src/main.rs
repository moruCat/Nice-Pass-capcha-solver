mod captcha;

use anyhow::{Context, Result};
use std::env;
use std::fs;

// 캡챠 일괄 판독 도구
fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        println!("❌ 사용법: cargo run --release <폴더>");
        return Ok(());
    }

    let folder_path = &args[1];

    // 솔버 로드
    let solver = captcha::CaptchaSolver::load().context("솔버 로드 실패")?;

    let entries = fs::read_dir(folder_path)
        .with_context(|| format!("폴더 못 읽음: {}", folder_path))?;

    let mut total = 0;
    let mut success = 0;

    println!("------------------------------------");
    println!("🔍 판독 시작: {}", folder_path);
    println!("------------------------------------");

    for entry in entries {
        let entry = entry?;
        let path = entry.path();

        if path.extension().and_then(|s| s.to_str()) == Some("png") {
            let img_bytes = fs::read(&path)?;

            // 파일명이 정답
            let expected = path.file_stem().and_then(|s| s.to_str()).unwrap_or("");

            let result = solver.solve(&img_bytes)?;
            total += 1;

            if result == expected {
                success += 1;
                println!("[OK] {} -> {}", expected, result);
            } else {
                println!("[NG] {} -> {} (틀림)", expected, result);
            }
        }
    }

    let rate = if total > 0 {
        (success as f32 / total as f32) * 100.0
    } else {
        0.0
    };
    println!("------------------------------------");
    println!("📊 결과");
    println!("총: {} | 성공: {} | 실패: {}", total, success, total - success);
    println!("성공률: {:.2}%", rate);
    println!("------------------------------------");

    Ok(())
}
