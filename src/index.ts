import { definePlugin } from '@qq-bot/plugin-sdk';
function elapsed(since: string | null | undefined, now: number) {
  const start = since ? Date.parse(since) : NaN;
  if (!Number.isFinite(start) || start > now) return '未知（请完成部署后的确认）';
  let seconds = Math.floor((now - start) / 1000);
  const days = Math.floor(seconds / 86400); seconds %= 86400;
  const hours = Math.floor(seconds / 3600); seconds %= 3600;
  const minutes = Math.floor(seconds / 60); seconds %= 60;
  return `${days}天${hours}小时${minutes}分${seconds}秒`;
}
export default definePlugin<{showIds:boolean;helpTitle:string}>({
  async onCommand(ctx) {
    const m=ctx.message;
    if(ctx.command.id==='help') {await ctx.reply.text([ctx.config.helpTitle,...ctx.commands.map(c=>`${c.triggers.join(' / ')}：${c.description}`)].join('\n'));return;}
    const cf=m.meta?.cf??{};
    const now=Date.now();
    const deployedAt=await ctx.runtime?.getDeployedAt().catch(()=>null);
    const time=new Date(now+8*3600000).toISOString().replace('T',' ').slice(0,19);
    const lines=['🐱 猫猫机器人（MoeBot）运行状态','————————————','状态:🟢 在线',`后端版本:${ctx.runtime?.version??'未知（后端需升级）'}`,`运行时长：${elapsed(deployedAt,now)}`,`处理节点:${cf.colo??'未知'}${cf.country?' / '+cf.country:''}`,`网络:${cf.httpProtocol??'未知'}${cf.tlsVersion?' / '+cf.tlsVersion:''}`,`来源渠道:${m.platform} / ${m.channelType}`,`服务器时间:${time} (UTC+8)`];
    if(ctx.config.showIds)lines.push(`本群 openid:${m.groupId??'(私聊,无群)'}`,`发送者 openid:${m.sender??'未知'}`);
    await ctx.reply.text(lines.join('\n'));
  }
});
