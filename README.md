# 个人工具箱（Personal Toolbox）

一个纯前端、可离线运行、可安装到手机主屏幕的个人记录工具（PWA）。
包含五个模块：**仪表盘 · 读书 · 健身 · 身体 · 习惯**，所有数据只保存在你自己设备的浏览器里。

---

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `index.html` | 应用本体（内含全部 HTML / CSS / JS） |
| `manifest.webmanifest` | PWA 清单：应用名、图标、主题色 |
| `sw.js` | Service Worker：离线缓存 |
| `icon-192.png` / `icon-512.png` | 应用图标 |
| `apple-touch-icon.png` | iOS 主屏幕图标 |
| `.nojekyll` | 让 GitHub Pages 原样托管静态文件 |

> 这些文件必须放在同一目录、保持文件名不变（`index.html` 通过相对路径引用它们）。

---

## 一、用 GitHub Pages 部署（推荐，纯网页操作，无需安装任何软件）

1. 登录 / 注册 [github.com](https://github.com)。
2. 右上角 **+ → New repository** 新建仓库：
   - Repository name 填一个名字，例如 `toolbox`；
   - 选 **Public**（公开；Pages 免费版需要公开仓库）；
   - 点 **Create repository**。
3. 进入仓库页，点 **Add file → Upload files**，把本文件夹里的**所有文件**（含 `.nojekyll`）一起拖进去，下方点 **Commit changes**。
4. 顶部菜单 **Settings → Pages**：
   - **Source** 选 `Deploy from a branch`；
   - **Branch** 选 `main`，文件夹选 `/ (root)`，点 **Save**。
5. 等 1–2 分钟，刷新该页面，会出现网址：
   `https://<你的用户名>.github.io/<仓库名>/`
   例如 `https://zhangsan.github.io/toolbox/`。
6. 用手机或电脑浏览器打开这个网址即可使用。

> 之后想更新应用：回到仓库 **Add file → Upload files** 重新上传覆盖即可，Pages 会自动重新发布。

### （可选）用 Git 命令行部署

```bash
git init
git add .
git commit -m "init toolbox"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```
推送后同样到 **Settings → Pages** 开启即可。

---

## 二、安装到手机（变成 App）

先用手机浏览器打开上面的 Pages 网址，然后：

- **iPhone（用 Safari 打开）**：点底部「分享」→ **添加到主屏幕**。
- **安卓（用 Chrome 打开）**：点右上角菜单 → **安装应用 / 添加到主屏幕**。

装好后从桌面图标进入，就是全屏 App，有独立图标，**断网也能用**。

---

## 三、数据与备份

- 数据保存在当前设备浏览器的本地存储中，不会上传，换设备 / 清浏览器数据会丢失。
- 在 **设置 → 导出全部数据** 可下载 JSON 备份；换设备后 **导入数据** 即可恢复。

---

## 四、本地预览（可选）

直接双击 `index.html` 也能用大部分功能，但 PWA 安装与 Service Worker 需要通过 http 访问。本地起一个静态服务器即可：

```bash
# 任选其一，在本文件夹内执行
python3 -m http.server 8000
# 然后浏览器打开 http://localhost:8000
```

---

技术栈：纯 HTML / CSS / JavaScript，无框架、无构建步骤。图表在线用 Chart.js（CDN），离线自动降级为原生 Canvas 绘制。
