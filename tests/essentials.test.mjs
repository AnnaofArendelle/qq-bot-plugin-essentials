import test from 'node:test';import assert from 'node:assert/strict';import plugin from '../dist/plugin.mjs';import {createTestContext} from '@qq-bot/plugin-sdk/testing';
test('help uses deployed command catalog and title',async()=>{const t=createTestContext({config:{showIds:true,helpTitle:'帮助'},command:{id:'help'},commands:[{id:'hello',triggers:['/hello'],description:'问候'}]});await plugin.onCommand(t.context);assert.equal(t.replies[0],'帮助\n/hello：问候');});
test('sys uses request metadata and hides IDs when configured',async()=>{const t=createTestContext({config:{showIds:false,helpTitle:'帮助'},command:{id:'sys'},message:{sender:'secret-id',meta:{cf:{colo:'SIN',country:'SG'}}}});await plugin.onCommand(t.context);assert.match(t.replies[0],/SIN \/ SG/);assert.doesNotMatch(t.replies[0],/secret-id/);});
test('sys reports the backend version and elapsed deployment time instead of plugin or process age',async t=>{
  t.mock.method(Date,'now',()=>Date.parse('2026-10-14T03:04:05Z'));
  const mock=createTestContext({config:{showIds:false,helpTitle:'帮助'},command:{id:'sys'},runtime:{version:'0.7.7',getDeployedAt:async()=> '2026-10-12T00:00:00Z'}});
  await plugin.onCommand(mock.context);
  assert.match(mock.replies[0],/后端版本:0\.7\.7/);
  assert.doesNotMatch(mock.replies[0],/^(?:平台|运行时)[:：]/m);
  assert.match(mock.replies[0],/服务器时间:2026-10-14 11:04:05 \(UTC\+8\)\n运行时长：2天3小时4分5秒/);
});
test('older cores and unavailable deployment metadata do not fabricate uptime or break sys',async()=>{
  for(const runtime of [undefined,{version:'0.7.7',getDeployedAt:async()=>null},{version:'0.7.7',getDeployedAt:async()=>{throw Error('D1 unavailable');}},{version:'0.7.7',getDeployedAt:async()=> 'invalid'},{version:'0.7.7',getDeployedAt:async()=> '2999-01-01T00:00:00Z'}]) {
    const mock=createTestContext({config:{showIds:false},command:{id:'sys'},runtime});await plugin.onCommand(mock.context);
    assert.match(mock.replies[0],/运行时长：未知/);
    assert.doesNotMatch(mock.replies[0],/NaN|undefined/);
  }
});
