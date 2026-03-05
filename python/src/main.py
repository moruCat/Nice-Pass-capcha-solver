import os
import sys
from captcha import CaptchaSolver

def main():
    if len(sys.argv) < 2:
        print("❌ 사용법: python src/main.py <이미지_폴더>")
        sys.exit(1)

    folder_path = sys.argv[1]
    
    # 솔버 로드
    try:
        solver = CaptchaSolver.load()
    except Exception as e:
        print(f"❌ 초기화 실패: {e}")
        sys.exit(1)

    if not os.path.isdir(folder_path):
        print(f"❌ 폴더 없음: {folder_path}")
        sys.exit(1)

    # 이미지 파일 목록
    files = [f for f in os.listdir(folder_path) if f.lower().endswith(".png")]
    files.sort()

    total = 0
    success = 0

    print("------------------------------------")
    print(f"🔍 판독 시작: {folder_path}")
    print("------------------------------------")

    for filename in files:
        path = os.path.join(folder_path, filename)
        expected = os.path.splitext(filename)[0]

        try:
            with open(path, "rb") as f:
                img_data = f.read()

            result = solver.solve(img_data)
            total += 1

            if result == expected:
                success += 1
                print(f"[OK] {expected} -> {result}")
            else:
                print(f"[NG] {expected} -> {result} (틀림)")
        except Exception as e:
            print(f"[ERR] {filename}: {e}")

    rate = (success / total * 100) if total > 0 else 0
    print("------------------------------------")
    print("📊 결과 (Python)")
    print(f"총: {total} | 성공: {success} | 실패: {total - success}")
    print(f"성공률: {rate:.2f}%")
    print("------------------------------------")

if __name__ == "__main__":
    main()
