import { definePlugin } from '@qq-bot/plugin-sdk';
export default definePlugin<{showIds:boolean;helpTitle:string}>({
  async onCommand(ctx) {
    const m=ctx.message;
    if(ctx.command.id==='help') {await ctx.reply.text([ctx.config.helpTitle,...ctx.commands.map(c=>`${c.triggers.join(' / ')}：${c.description}`)].join('\n'));return;}
    const cf=m.meta?.cf??{};
    const time=new Date(new Date(m.meta?.receivedAt??Date.now()).getTime()+8*3600000).toISOString().replace('T',' ').slice(0,19);
    const lines=['📊 机器人运行状态','————————————','状态:🟢 在线','平台:Cloudflare Pages','运行时:Workers(无状态,按请求执行)',`处理节点:${cf.colo??'未知'}${cf.country?' / '+cf.country:''}`,`网络:${cf.httpProtocol??'未知'}${cf.tlsVersion?' / '+cf.tlsVersion:''}`,`来源渠道:${m.platform} / ${m.channelType}`,`服务器时间:${time} (UTC+8)`];
    if(ctx.config.showIds)lines.push(`本群 openid:${m.groupId??'(私聊,无群)'}`,`发送者 openid:${m.sender??'未知'}`);
    await ctx.reply.text(lines.join('\n'));
  }
});
