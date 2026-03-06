# NICE-PASS Captcha Solver (Multi-Language)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

본 프로젝트는 NICE PASS 보안문자(6자리 숫자)를 정밀하게 판독하기 위한 알고리즘 솔버입니다. 머신러닝이나 유료 API 호출 없이, 순수하게 픽셀 매칭 및 폰트 렌더링 규칙 분석(Kerning Analysis)만으로 99.9% 이상의 정확도를 달성했습니다.

제작자: moru_cat (디스코드)

---

## 주의사항 및 법적 고지

**본 프로젝트는 교육 및 연구 목적으로만 제작되었습니다.**

- 이 라이브러리를 사용함으로써 발생하는 모든 책임은 사용자 본인에게 있습니다.
- 본 모듈은 개인의 학습을 위해 제작되었으며, 상업적 목적으로의 무단 배포를 금합니다.
- **[NICE아이디](https://www.niceid.co.kr/) 등의 관계 기관으로부터 삭제 요청이 있을 경우 본 레포지토리는 즉시 삭제됩니다.**
- 자동화 도구 사용 시 대상 서비스의 이용 약관을 반드시 준수하십시오.

---

## 주요 특징

- **커닝(Kerning) 규칙 분석**: NICE PASS 특유의 숫자 간 커닝(Kerning) 규칙을 수학적으로 분석하여, 다음 숫자의 위치를 ±2px 오차 범위 내에서 완벽하게 예측합니다.
- **가중치 기반 스코어링**: 단순 일치도 계산이 아닌, Hit/Miss/Noise 가중치 시스템을 도입하여 폰트 겹침 및 노이즈 상황에서도 높은 정확도를 유지합니다.
- **초고속 판독**: Rust 기준 장당 **1ms 미만**, Python/JS 기준 **5~10ms** 내외의 압도적인 퍼포먼스를 제공합니다.
- **정확도**: 5OOO개 테스트에서 99% 이상의 정확도를 기록하여, 좋은 퍼포먼스를 보여줍니다.
- **가벼움**: 무거운 딥러닝 모델 없이 순수한 픽셀 매칭으로 구현되어 가볍습니다.
- **유연성**: Rust, Python, Node.js 세 가지 환경에서 동일한 로직을 지원합니다.

---

## 프로젝트 구조

```text
NICE-PASS_Capcha-solver/
├── assets/
│   ├── prototypes/      # 판독의 기준이 되는 숫자 1~9 원본 데이터 및 명세서
│   ├── samples/         # 테스트용 샘플 이미지 (Ground Truth 기반)
│   └── report.txt       # 5,000발 전수 스트레스 테스트 결과 리포트
├── rust/                # Rust CLI 도구 및 라이브러리
├── python/              # Python CLI 도구 및 라이브러리
└── js/                  # Node.js CLI 도구 및 라이브러리 (Sharp 기반)
```

---

## 시작하기

CLI 도구는 이미지 파일이 들어있는 **폴더 경로**를 인자로 받으며, 파일명(예: `123456.png`)을 정답으로 간주하여 정답률을 측정합니다.

### 1. Rust
```bash
cd rust
cargo run --release ../assets/samples
```

### 2. Python
필요 라이브러리: `numpy`, `Pillow`
```bash
cd python
python src/main.py ../assets/samples
```

### 3. Node.js
필요 라이브러리: `sharp`
```bash
cd js
node src/main.js ../assets/samples
```

---

## 알고리즘 분석

NICE PASS 보안문자는 고유한 폰트 렌더링 엔진을 사용하며, 글자마다 고유한 `Advance Width`(전진 너비)와 `Bearing`(여백) 값을 가집니다. 상세한 분석 수치는 `assets/prototypes/cunning_status.txt` 파일을 참조하십시오.

---

본 프로젝트의 초기 아이디어 확립과 NICE PASS 프로토콜 분석 과정에서 [KR-Identification/PASS-NICE](https://github.com/KR-Identification/PASS-NICE) 프로젝트로부터 많은 영감을 얻었습니다. 훌륭한 오픈소스를 공유해주신 제작자분께 감사드립니다.

제미나이클로드도고마워

