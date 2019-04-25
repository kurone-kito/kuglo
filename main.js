const electron = require('electron');
require('electron-reload')(__dirname, { electron });
const path = require('path');

const { app, BrowserWindow } = electron;

// ウインドウオブジェクトのグローバル参照を保持してください。さもないと、そのウインドウは
// JavaScript オブジェクトがガベージコレクションを行った時に自動的に閉じられます。
let win;

function createWindow() {
  // browser window を生成する
  win = new BrowserWindow({ width: 854, height: 480 });

  // アプリの index.html を読み込む
  win.loadFile(path.join(__dirname, './index.html'));

  // 開発者ツールを開く
  if (process.argv.find(arg => arg === '--debug')) {
    win.webContents.openDevTools();
  }

  // ウィンドウが閉じられた時に発火
  win.on('closed', () => {
    // ウインドウオブジェクトの参照を外す。
    // 通常、マルチウインドウをサポートするときは、
    // 配列にウインドウを格納する。
    // ここは該当する要素を削除するタイミング。
    win = null;
  });
}

// このイベントは、Electronが初期化処理と
// browser windowの作成を完了した時に呼び出されます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.on('ready', createWindow);

// 全てのウィンドウが閉じられた時に終了する
app.on('window-all-closed', () => {
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOSでは、ユーザがドックアイコンをクリックしたとき、
  // そのアプリのウインドウが無かったら再作成するのが一般的。
  if (win === null) {
    createWindow();
  }
});
