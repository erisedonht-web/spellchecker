# 猿でもわかる GitHub Pages のやり方

「スペルチェッカー」をインターネットで誰でも見られるようにする手順です。

---

## 方法A: ブラウザだけでアップロード（黒い画面なし・おすすめ）

**Git は不要です。** ブラウザだけでファイルを送って公開できます。

### ステップ1: 入れ物（リポジトリ）を作る

1. [github.com](https://github.com) にログインする
2. 右上の **＋** → **「New repository」**
3. **Repository name** に英語で名前を入れる（例: `spellchecker`）
4. **Public** を選ぶ
5. **「Create repository」** をクリック

### ステップ2: ファイルをドラッグで上げる

1. 作成したリポジトリのページ（例: `https://github.com/あなたの名前/spellchecker`）を開いた状態にする
2. **「Add file」** ボタンをクリック → **「Upload files」** をクリック
3. パソコンの **「スペルチェッカー」フォルダ** を開く  
   （`index.html` と `styles.css` と `app.js` があるフォルダ）
4. **中身だけ** を選んで GitHub の画面にドラッグする  
   - 選ぶもの: `index.html` と `styles.css` と `app.js` の **3つ**（と、入れたいなら `docs` フォルダごと）  
   - **注意:** 「スペルチェッカー」フォルダごとドラッグしない。**中のファイル**をドラッグする。  
     そうしないと、サイトのトップに `index.html` が来ず 404 になります。
5. 下の **「Commit changes」** をクリック（緑ボタン）

### ステップ3: サイトを公開する

1. リポジトリのページで **「Settings」** をクリック
2. 左の **「Pages」** をクリック
3. **Source** で **「Deploy from a branch」** を選ぶ
4. **Branch** で **「main」**、右は **「/ (root)」** のまま
5. **「Save」** をクリック
6. 1〜2分待つ。ページを更新すると、上に **「Your site is live at https://〇〇.github.io/リポジトリ名/」** と出るので、そのURLを開く（**最後に `/` を付ける**）

**これで完了です。** 黒い画面も Git も使いません。

---

## 方法B: Git を使う（コマンドで送る）

あとから更新を「コマンドで送りたい」人向けです。**まずは方法Aで十分**です。

### 最初に用意するもの

- **GitHub のアカウント**（まだなら [github.com](https://github.com) で「Sign up」から作る）
- **Git**（パソコンに「バージョン管理」のソフトを入れること。入ってない場合は [ここ](https://git-scm.com/download/win) から「Download」してインストール）

---

# ステップ1: GitHub に「入れ物」を作る（方法B）

GitHub の「リポジトリ」＝**ファイルを置く入れ物**だと思ってください。

1. ブラウザで [github.com](https://github.com) を開く
2. ログインする
3. 画面**右上**の **＋**（プラス）をクリック
4. 出てきたメニューから **「New repository」** をクリック
5. **Repository name** のところに、**英語で**名前を入れる  
   例: `spell-checker` とか `lol-flash` とか（何でもOK、半角英数字とハイフンだけ）
6. **Public** が選ばれていることを確認（黒丸が Public の横にある）
7. 下の方にある **「Create repository」** の緑ボタンをクリック
8. 次の画面が出たらOK。**この画面のURLをコピー**しておく（あとで使う）  
   例: `https://github.com/あなたの名前/spell-checker`

これで「入れ物」の準備完了です。

---

# ステップ2: 自分のフォルダを GitHub に送る

「スペルチェッカー」のフォルダの中身を、さっき作った「入れ物」に送ります。

## 2-1. 黒い画面（コマンド）を開く

1. エクスプローラーで **デスクトップ** を開く
2. **「スペルチェッカー」** というフォルダを開く  
   （中に `index.html` があるフォルダです）
3. 上の **アドレスバー**（フォルダのパスが書いてあるところ）を **1回クリック** する
4. そこに **`cmd`** と打って **Enter** を押す  
   → 真っ黒い画面（コマンドプロンプト）が開きます。**今いる場所が「スペルチェッカー」の中**になっています。

## 2-2. コマンドを 1行ずつ打つ

黒い画面に、**下のコマンドを 1行ずつ** 打って Enter を押します。  
（コピー＆ペーストでOK。`あなたの名前` と `入れ物の名前` は、ステップ1で作ったリポジトリのURLに合わせて変えてください）

```
git init
```
Enter。

```
git add .
```
Enter。（最後の「.」も忘れずに）

```
git commit -m "はじめ"
```
Enter。

```
git branch -M main
```
Enter。

```
git remote add origin https://github.com/あなたの名前/入れ物の名前.git
```
Enter。  
例: あなたの名前が `tanaka`、入れ物の名前が `spell-checker` なら  
`https://github.com/tanaka/spell-checker.git` こういう感じ。

```
git push -u origin main
```
Enter。

### ここで「ユーザー名とパスワードを入れろ」と言われたら

- **ユーザー名**: GitHub にログインしている**自分のユーザー名**を入れる
- **パスワード**: ここでは **ログインのパスワードは使えません**。  
  **「トークン」** という特別なパスワードを用意します。

#### トークンの作り方（ここだけちょっと手順が多い）

1. ブラウザで GitHub を開いたまま、**右上の自分のアイコン** をクリック
2. **「Settings」** をクリック
3. 左の一番下の方にある **「Developer settings」** をクリック
4. 左の **「Personal access tokens」** の **「Tokens (classic)」** をクリック
5. **「Generate new token」** → **「Generate new token (classic)」** をクリック
6. **Note** に `pages` とか適当な名前を入れる
7. **Expiration** は「90 days」や「No expiration」でOK
8. 下の方で **「repo」** にチェックを入れる（これが大事）
9. 一番下の **「Generate token」** をクリック
10. 出てきた **英数字の列**（ghp_ で始まるやつ）を **コピー** する  
    ※この画面を離れると二度と見られないので、メモ帳に貼っておいてもOK
11. 黒い画面に戻り、**パスワードを聞かれたら、今コピーしたトークンを貼り付けて Enter**

うまくいくと「branch 'main' set up to track...」のような英語が出て終わります。  
**ここまでできたらステップ2は完了です。**

#### 「failed to push some refs」というエラーが出たとき

GitHub でリポジトリを作ったときに **README を追加した** 場合、GitHub 側にすでに1つコミットがあります。そのため「中身が食い違っている」と怒られます。

**対処：** 黒い画面で、次の2行を **順番に** 打って Enter。

```
git pull origin main --allow-unrelated-histories
```

（「マージメッセージ」の画面が出たら、そのまま閉じてOK。VS Code や Cursor で開いている場合は、保存して閉じる）

```
git push -u origin main
```

これで送れるはずです。まだエラーなら、下の「うまくいかないとき」を見てください。

#### 「src refspec main does not match any」と出たとき

**「main というブランチがローカルにない」** という意味です。古い Git だと最初のブランチ名が `master` のままだったり、まだ1回もコミットしていないときによく出ます。

**対処：** 黒い画面で、次のを **順番に** 実行。

1. まずコミットがあるか作る（まだなら）  
   ```
   git add .
   git commit -m "はじめ"
   ```

2. ブランチ名を `main` にする  
   ```
   git branch -M main
   ```

3. 送る  
   ```
   git push -u origin main
   ```

これで送れるはずです。

---

# ステップ3: 「Webで見えるようにする」をオンにする

GitHub の「この入れ物を、Webサイトとして見せる」設定をします。

1. ブラウザで、**自分のリポジトリのページ**を開く  
   （ステップ1で作った、例: `https://github.com/あなたの名前/spell-checker`）
2. そのページの**上の方**にある **「Settings」** をクリック  
   （Code とか Issues とか並んでいるところの右端）
3. 左側に長いメニューがあるので、**「Pages」** を探してクリック  
   （だいたい真ん中より下、「Code and automation」の下あたり）
4. **「Build and deployment」** のところで、**「Source」** が「Deploy from a branch」になっているか確認
5. **「Branch」** の右の▼を押して **「main」** を選ぶ
6. 右のフォルダは **「/ (root)」** のまま
7. **「Save」** ボタンをクリック
8. 少し待つ（30秒〜2分）。  
   ページを更新すると、上の方に  
   **「Your site is live at https://あなたの名前.github.io/入れ物の名前/」**  
   と**緑**で表示されます。

その **緑のURL** が、あなたのサイトの住所です。

---

# ステップ4: サイトを開いてみる

1. 表示された **URL をコピー** する  
   例: `https://tanaka.github.io/spell-checker/`
2. **最後にスラッシュ `/` が付いているか** 確認する。付いてなかったら自分で `/` を付ける
3. そのURLをブラウザのアドレスバーに貼り付けて Enter

スペルチェッカーの画面が出れば **完了** です。

---

## うまくいかないとき

- **「failed to push some refs」と出る**  
  → GitHub 側に README などがすでにある状態。上にある **「failed to push some refs というエラーが出たとき」** のとおり、まず `git pull origin main --allow-unrelated-histories` を打ってから、もう一度 `git push -u origin main` を試す。  
  → どうしてもダメな場合（リポジトリを今作り直してもよい場合）は、`git push -u origin main --force` で**強制送信**できる。ただし GitHub 上にあったファイル（README など）は上書きされる。

- **「src refspec main does not match any」と出る**  
  → ローカルに `main` ブランチがない（まだコミットしていないか、ブランチ名が `master` のまま）。上にある **「src refspec main does not match any と出たとき」** のとおり、`git add .` → `git commit` → `git branch -M main` → `git push -u origin main` を順に試す。

- **404 とか Not Found が出る**  
  → URL の**最後に `/` を付けて**もう一度開く。  
  → ステップ3をやってから **2〜3分待って** もう一度開く。

- **黒い画面で「git は認識されていません」**  
  → Git が入っていないか、入れたあとパソコンを再起動していない。Git をインストールしてから再起動してやり直す。

- **パスワードでログインできない**  
  → GitHub のログイン用パスワードではダメ。**トークン**（上の「トークンの作り方」）を使う。

---

## あとから中身を直したとき

ファイルを直したあと、もう一度 GitHub に送りたいときは、  
「スペルチェッカー」フォルダで黒い画面を開き、次の3行を順に打つ：

```
git add .
git commit -m "直した"
git push
```

数分すると、公開してあるURLのサイトも更新されます。

---

**おつかれさまでした。ここまでできれば、猿ではなくあなたは GitHub Pages マスターです。**
