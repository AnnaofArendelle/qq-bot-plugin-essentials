<img src="assets/moebot.svg" width="80" height="80" alt="猫猫机器人（MoeBot）Logo">

# 猫猫机器人（MoeBot）— 系统信息与帮助插件

系统信息与帮助：/sys 展示后端版本、距上次部署的运行时长、当前请求节点、协议、时间、群和用户 ID；/help 自动列出当前渠道已启用插件及核心命令。

需要 猫猫机器人（MoeBot） v0.5.0+，插件 API v1。版本与运行时长信息需要后端 0.7.7+。

## 用户安装

1. 在 [Releases](https://github.com/AnnaofArendelle/qq-bot-plugin-essentials/releases) 下载 `essentials-1.0.4.zip`。不要使用 GitHub 的 Source code ZIP。
2. WebUI → 插件管理 → 上传 ZIP。
3. 检查权限和设置，启用插件，选择群聊/私聊范围。
4. 点击全局「保存并部署」，等待面板显示新配置已生效。

设置、更新、卸载也在同一面板完成。卸载默认保留数据；重新安装相同 ID 会复用数据。只安装你信任的 JavaScript：插件与核心共享 CPU 和运行环境。

## 开发

```sh
npm ci
npm run typecheck
npm test
```

输出 `dist/essentials-1.0.4.zip`。SDK 独立维护于 [qq-bot-plugin-sdk](https://github.com/AnnaofArendelle/qq-bot-plugin-sdk)。配置表单由 config.schema.json 自动生成；完整接口、资源限制和 AI 开发提示见 SDK 仓库。

官方后端首次升级会将旧 jrrp / daily_pic 记录导入 daily 的命名空间，旧表保留供回滚。后续运行只访问插件存储，不写入聊天消息表。

## 1.0.1：MoeBot 品牌更新

项目正式名称为**猫猫机器人（MoeBot）**，统一使用猫猫 SVG Logo。仓库地址、npm 包名、CLI、插件 ID、发布产物文件名和插件 API v1 保持兼容。

## 1.0.2：简化 Logo

使用绿色圆角底板与粗白线猫脸，以眼睛、鼻子、小嘴和胡须构成图标。插件 API v1 保持不变。

## 1.0.3：后端版本与部署运行时长

`/sys` 通过 SDK 1.2.0 的只读 `ctx.runtime` 显示后端版本，并以当前时间减去 Cloudflare 上次成功部署时间，输出天、小时、分、秒。部署时间在 WebUI 或 CLI 确认上线后保存，Worker 冷启动不会重置。旧核心、尚未确认或读取失败时显示未知；`/help` 不读取部署记录。

## 1.0.4：简化系统信息显示

`/sys` 的时长显示改为 `运行时长：2天3小时4分5秒`，移除标签中的“（距上次部署）”和时间单位之间的空格。计算方式仍基于上次确认的 Cloudflare 部署时间。删除硬编码的“平台：Cloudflare Pages”和“运行时：Workers（无状态，按请求执行）”两行。
