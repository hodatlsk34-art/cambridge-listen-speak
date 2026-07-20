# Dialogue Data Pipeline

Muc tieu: thay the toan bo hoi thoai mau cu bang corpus sach, co nguon hop le, duoc gan nhan CEFR va phu hop voi lo trinh nghe-noi cua web.

## Nguon du lieu

1. DailyDialog
   - Co the dung lam nguon doi thoai doi song neu license cua ban cho phep su dung trong san pham.
   - Luu raw data vao `data/raw/dailydialog.jsonl`.

2. ESL Fast va BBC Learning English
   - Khong scrape/copy nguyen van vao san pham neu chua co quyen su dung.
   - Nen dung nhu nguon tham khao ve topic taxonomy, function giao tiep va do kho bai hoc.
   - Neu co license/noi dung duoc cap phep, luu vao `data/raw/licensed-esl.jsonl` hoac `data/raw/licensed-bbc.jsonl`.

3. LLM-generated gap fill
   - Chi sinh bo sung cho chu de/cap do bi thieu.
   - Prompt phai yeu cau noi dung moi, khong paraphrase/copy tu nguon co ban quyen.
   - Bat buoc QA: grammar, coherence, CEFR, safety, duplicate check.

## Format input JSONL

Moi dong la mot object:

```json
{"source":"dailydialog","topic":"School & learning","dialogue":["A: ...","B: ..."],"license":"allowed","notes":"optional"}
```

Neu co san speaker, co the dung format moi de phat 2 giong:

```json
{"source":"generated","topic":"School & learning","dialogue":[{"speaker":"female","text":"Do we have enough time before class?"},{"speaker":"male","text":"Yes, but we should check the instructions first."}],"license":"generated"}
```

Khi dua vao web, audio chi doc `text`, khong doc ten nguoi doi thoai.

## Cac buoc pipeline

1. Normalize
   - Chuan hoa speaker labels.
   - Loai dong qua ngan, qua dai, trung lap, hoac noi dung khong phu hop voi nguoi hoc tre.

2. Classify
   - Gan domain: family, school, food, travel, shopping, community, ideas...
   - Uoc tinh CEFR bang word count, sentence length va readability proxy.

3. Align
   - Map vao chuong trinh: Beginner den Proficient, topic, skill function.
   - Dam bao Beginner co cau ngan; cac cap cao co ly do, so sanh, quan diem, tom tat.

4. Generate gaps
   - Tim topic/level thieu.
   - Sinh hoi thoai moi theo schema: context, problem, action, response, result.
   - Khong dung lai transcript cu.

5. QA
   - Duplicate score.
   - Grammar sanity.
   - Meaning coherence: moi cau phai tra loi hoac phat trien y truoc.
   - Vietnamese translation review neu them ban dich.

6. Export
   - `data/processed/dialogue-corpus.json`
   - Web chi doc processed corpus, khong doc raw copyrighted/source files.

## Luu y ban quyen

Khong dua noi dung BBC/ESL Fast nguyen van vao repo/public web neu chua co quyen. Pipeline nay co the xu ly file duoc cap phep, nhung mac dinh khong tai, scrape, hoac sao chep noi dung co ban quyen.
