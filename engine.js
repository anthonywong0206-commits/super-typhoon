export const MAP_BOUNDS={west:100,east:165,south:0,north:50};
export function projectLngLat(lng,lat){
  return{x:(lng-MAP_BOUNDS.west)/(MAP_BOUNDS.east-MAP_BOUNDS.west)*100,y:(MAP_BOUNDS.north-lat)/(MAP_BOUNDS.north-MAP_BOUNDS.south)*100};
}
export function unprojectXY(x,y){
  return{lng:MAP_BOUNDS.west+x/100*(MAP_BOUNDS.east-MAP_BOUNDS.west),lat:MAP_BOUNDS.north-y/100*(MAP_BOUNDS.north-MAP_BOUNDS.south)};
}
const CITY_BASE=[
  {id:'shanghai',name:'上海',lat:31.2304,lng:121.4737,pop:2487,coastal:1180,defense:44,priority:1},
  {id:'ningbo',name:'寧波',lat:29.8683,lng:121.5440,pop:954,coastal:460,defense:42,priority:2},
  {id:'fuzhou',name:'福州',lat:26.0745,lng:119.2965,pop:850,coastal:400,defense:38,priority:1},
  {id:'xiamen',name:'廈門',lat:24.4798,lng:118.0894,pop:532,coastal:250,defense:40,priority:1},
  {id:'shantou',name:'汕頭',lat:23.3541,lng:116.6820,pop:555,coastal:280,defense:36,priority:2},
  {id:'shenzhen',name:'深圳',lat:22.5431,lng:114.0579,pop:1768,coastal:700,defense:44,priority:1},
  {id:'hongkong',name:'香港',lat:22.3193,lng:114.1694,pop:750,coastal:430,defense:58,priority:1},
  {id:'macau',name:'澳門',lat:22.1987,lng:113.5439,pop:68,coastal:42,defense:48,priority:2},
  {id:'guangzhou',name:'廣州',lat:23.1291,lng:113.2644,pop:1880,coastal:520,defense:46,priority:1},
  {id:'haikou',name:'海口',lat:20.0440,lng:110.1999,pop:290,coastal:160,defense:34,priority:2},
  {id:'taipei',name:'台北',lat:25.0330,lng:121.5654,pop:654,coastal:300,defense:52,priority:1},
  {id:'kaohsiung',name:'高雄',lat:22.6273,lng:120.3014,pop:277,coastal:170,defense:47,priority:1},
  {id:'naha',name:'那霸',lat:26.2124,lng:127.6809,pop:32,coastal:20,defense:50,priority:2},
  {id:'manila',name:'馬尼拉',lat:14.5995,lng:120.9842,pop:1392,coastal:610,defense:35,priority:1},
  {id:'busan',name:'釜山',lat:35.1796,lng:129.0756,pop:332,coastal:195,defense:50,priority:2},
  {id:'seoul',name:'首爾',lat:37.5665,lng:126.9780,pop:940,coastal:170,defense:56,priority:2},
  {id:'osaka',name:'大阪',lat:34.6937,lng:135.5023,pop:275,coastal:150,defense:55,priority:2},
  {id:'tokyo',name:'東京',lat:35.6762,lng:139.6503,pop:1400,coastal:530,defense:62,priority:1}
];
export const CITY_DATA=CITY_BASE.map(c=>({...c,...projectLngLat(c.lng,c.lat)}));
export const MODES={
  tutorial:{label:'教學',ap:5,resources:1.35,intel:.82,noise:.50,heat:-.5,event:0.65},
  standard:{label:'標準',ap:3,resources:1,intel:.54,noise:1,heat:0,event:1},
  expert:{label:'專家',ap:3,resources:.8,intel:.39,noise:1.45,heat:.55,event:1.18},
  apocalypse:{label:'末日',ap:2,resources:.65,intel:.26,noise:1.85,heat:1.45,event:1.35}
};
export const WEAPONS=[
  {id:'satellite',name:'軌道能量衛星',glyph:'◉',energy:26,power:22,cooldown:3,success:.68,desc:'削弱核心對流',tone:'blue'},
  {id:'drones',name:'無人機群',glyph:'⌁',energy:12,power:9,cooldown:1,success:.82,desc:'提升情報並干預',tone:'green'},
  {id:'ion',name:'電離層加熱塔',glyph:'ϟ',energy:18,power:13,cooldown:2,success:.58,desc:'改變高空引導氣流',tone:'violet'},
  {id:'cooling',name:'海洋降溫裝置',glyph:'≋',energy:20,power:16,cooldown:2,success:.72,desc:'降低前方海域溫度',tone:'cyan'},
  {id:'seeding',name:'高空凝結劑投放',glyph:'✦',energy:14,power:11,cooldown:2,success:.63,desc:'破壞風眼結構',tone:'amber'}
];
export function rng(seed){let s=(Number(seed)||1)>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
export function bearingName(dx,dy){const a=Math.atan2(dy,dx)*180/Math.PI;const names=['東','東北東','東北','北北東','北','北北西','西北','西北西','西','西南西','西南','南南西','南','南南東','東南','東南東'];return names[Math.round(((a+360)%360)/22.5)%16]}
export function stormClass(w){if(w<63)return{label:'熱帶低氣壓',level:1,color:'#60c9ff'};if(w<88)return{label:'熱帶風暴',level:2,color:'#50e8df'};if(w<118)return{label:'強烈熱帶風暴',level:3,color:'#ffe56a'};if(w<150)return{label:'颱風',level:4,color:'#ff9c3a'};if(w<185)return{label:'強颱風',level:5,color:'#ff4e4e'};if(w<250)return{label:'超強颱風',level:6,color:'#ed4cff'};return{label:'滅世級風暴',level:7,color:'#ff2c64'}}
export function haversineKm(aLat,aLng,bLat,bLng){const R=6371,toRad=Math.PI/180;const p1=aLat*toRad,p2=bLat*toRad,dp=(bLat-aLat)*toRad,dl=(bLng-aLng)*toRad;const q=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return R*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q))}
function deterministic(game,salt){return rng(Number(game.seed)+game.turn*7919+salt)()}
function dateLabel(game,turnOffset=0){let hour=game.hour+turnOffset*6,day=game.day;while(hour>=24){hour-=24;day++}return`${game.month}/${day} ${String(hour).padStart(2,'0')}:00`}
function isApproxLand(lat,lng){
  const taiwan=((lat-23.7)/2.3)**2+((lng-121)/.75)**2<1;
  const luzon=((lat-16.4)/3.9)**2+((lng-121.1)/1.55)**2<1;
  const japan=lat>30&&lat<42&&lng>129&&lng<143&&Math.abs(lat-(.62*(lng-129)+32.4))<2.2;
  const korea=lat>33&&lat<39.5&&lng>125&&lng<130;
  const chinaCoast=lng<121.7&&lat>18&&lat<42&&lng<(112.2+(lat-18)*.42);
  return taiwan||luzon||japan||korea||chinaCoast;
}
export function createGame(seed,modeKey='standard'){
  const random=rng(seed),mode=MODES[modeKey]||MODES.standard;
  const lng=136+random()*11,lat=10+random()*11;
  const wind=118+random()*58+(modeKey==='apocalypse'?38:0);
  const resources={people:Math.round(124780*mode.resources),supplies:Math.round(86540*mode.resources),fuel:Math.round(72300*mode.resources),power:Math.min(100,Math.round(78*mode.resources)),medical:Math.round(12650*mode.resources),energy:Math.min(100,Math.round(86*mode.resources))};
  const position=projectLngLat(lng,lat);
  return{version:2,seed:String(seed),modeKey,turn:1,maxTurns:16,hour:3,day:14,month:7,year:2087,ap:mode.ap,maxAp:mode.ap,intel:mode.intel,resources,selectedCity:'hongkong',phase:0,gameOver:false,totalDeaths:0,totalDamage:0,log:[],cities:CITY_DATA.map(c=>({...c,evac:0,supplies:50,medical:60,power:78,traffic:15,status:'normal',deaths:0})),weapons:WEAPONS.map(w=>({...w,remaining:0})),storm:{name:'天鴻',code:`TY-${String(Math.floor(1000+random()*8999)).slice(-4)}`,lat,lng,...position,wind,pressure:1010-wind*.38,speed:16+random()*10,radius:145+wind*.48,seaTemp:29.5+random()*1.8+mode.heat,heading:(148+random()*32)*Math.PI/180,history:[{lat,lng,...position,wind}],forecast:[],ensemble:[],genesis:{lat,lng,date:'2087/7/14 03:00'}},randomState:Math.floor(random()*1e9)};
}
export function updateForecast(game){
  const pts=[],ensembles=[];let lat=game.storm.lat,lng=game.storm.lng,h=game.storm.heading,wind=game.storm.wind;const mode=MODES[game.modeKey];
  for(let i=1;i<=5;i++){
    const n=(deterministic(game,100+i)-.5)*mode.noise*(1.18-game.intel);
    h+=(n*.27)+.018;
    const distanceKm=(game.storm.speed+(.5-deterministic(game,180+i))*3)*6;
    const deg=distanceKm/111;
    lng+=Math.cos(h)*deg/Math.max(.72,Math.cos(lat*Math.PI/180));
    lat+=Math.sin(h)*deg;
    const sea=29.2+Math.max(0,1.7-Math.abs(lat-17)*.08)+mode.heat;
    wind=Math.max(55,Math.min(330,wind+(sea-28.4)*3.1-(isApproxLand(lat,lng)?14:0)+(deterministic(game,210+i)-.5)*8));
    const p=projectLngLat(lng,lat);
    pts.push({lat,lng,...p,wind,spreadKm:65+i*(62+(1-game.intel)*115),turn:game.turn+i,time:dateLabel(game,i)});
  }
  for(let branch=0;branch<3;branch++){
    let eLat=game.storm.lat,eLng=game.storm.lng,eH=game.storm.heading;const arr=[];
    for(let i=1;i<=5;i++){
      const offset=(branch-1)*(.055+i*.018)*(1.15-game.intel)+(deterministic(game,300+branch*20+i)-.5)*.045;
      eH+=offset+.015;
      const deg=(game.storm.speed*6/111)*(1+(branch-1)*.035);
      eLng+=Math.cos(eH)*deg/Math.max(.72,Math.cos(eLat*Math.PI/180));eLat+=Math.sin(eH)*deg;
      arr.push({...projectLngLat(eLng,eLat),lat:eLat,lng:eLng});
    }
    ensembles.push(arr);
  }
  game.storm.forecast=pts;game.storm.ensemble=ensembles;return game;
}
export function nearestCity(game,lat=game.storm.lat,lng=game.storm.lng){let best=null,dist=Infinity;for(const c of game.cities){const d=haversineKm(lat,lng,c.lat,c.lng);if(d<dist){dist=d;best=c}}return{city:best,dist}}
export function riskForCity(game,city){const now=haversineKm(city.lat,city.lng,game.storm.lat,game.storm.lng);const track=game.storm.forecast.reduce((m,p)=>Math.min(m,haversineKm(city.lat,city.lng,p.lat,p.lng)),9999);const intensity=Math.max(0,(game.storm.wind-70)*.28);const probability=112-Math.min(now,track)*.085+intensity+(1-game.intel)*7;return Math.max(0,Math.min(100,Math.round(probability)))}
export function applyCityAction(game,action){if(game.ap<=0)return{ok:false,msg:'本回合行動點已用盡'};const city=game.cities.find(c=>c.id===game.selectedCity);if(!city)return{ok:false,msg:'請先選擇城市'};
  if(action==='evacuate'){if(game.resources.fuel<2500||game.resources.people<3000)return{ok:false,msg:'運輸資源不足'};city.evac=Math.min(100,city.evac+18);city.traffic=Math.min(100,city.traffic+14);city.status='evacuating';game.resources.fuel-=2500;game.resources.people-=3000}
  if(action==='defend'){if(game.resources.supplies<3500)return{ok:false,msg:'物資不足'};city.defense=Math.min(100,city.defense+14);game.resources.supplies-=3500}
  if(action==='supply'){if(game.resources.supplies<2500||game.resources.medical<300)return{ok:false,msg:'補給不足'};city.supplies=Math.min(100,city.supplies+18);city.medical=Math.min(100,city.medical+12);game.resources.supplies-=2500;game.resources.medical-=300}
  if(action==='intel'){if(game.resources.power<4)return{ok:false,msg:'電力不足'};game.intel=Math.min(.95,game.intel+.12);game.resources.power-=4}
  game.ap--;game.log.push(`回合 ${game.turn}：對${city.name}執行${action}`);return{ok:true,msg:`${city.name}部署完成`};
}
export function useWeapon(game,id){const w=game.weapons.find(x=>x.id===id);if(!w||w.remaining>0)return{ok:false,msg:'武器仍在冷卻'};if(game.ap<=0)return{ok:false,msg:'本回合行動點已用盡'};if(game.resources.energy<w.energy)return{ok:false,msg:'氣象武器能源不足'};game.resources.energy-=w.energy;game.ap--;w.remaining=w.cooldown;const chance=w.success+(game.intel-.5)*.18;const success=deterministic(game,500+WEAPONS.findIndex(x=>x.id===id))<chance;if(success){game.storm.wind=Math.max(55,game.storm.wind-w.power);game.storm.pressure=Math.min(1005,game.storm.pressure+w.power*.2);if(id==='drones')game.intel=Math.min(.95,game.intel+.1);if(id==='ion')game.storm.heading+=(deterministic(game,614)-.5)*.45;if(id==='cooling')game.storm.seaTemp-=.9;game.log.push(`回合 ${game.turn}：${w.name}成功`);return{ok:true,msg:`${w.name}干預成功，風暴受到削弱`}}game.storm.wind+=id==='ion'?8:3;game.log.push(`回合 ${game.turn}：${w.name}失敗`);return{ok:true,msg:`${w.name}干預失敗，風暴出現反應`}}
export function advanceTurn(game){if(game.gameOver)return{game,event:null};const mode=MODES[game.modeKey];const steering=(deterministic(game,700)-.5)*.27*mode.noise+.014;game.storm.heading+=steering;const distanceKm=game.storm.speed*6*(.92+deterministic(game,703)*.16);const deg=distanceKm/111;game.storm.lng+=Math.cos(game.storm.heading)*deg/Math.max(.72,Math.cos(game.storm.lat*Math.PI/180));game.storm.lat+=Math.sin(game.storm.heading)*deg;game.storm.lng=Math.max(MAP_BOUNDS.west+1,Math.min(MAP_BOUNDS.east-1,game.storm.lng));game.storm.lat=Math.max(MAP_BOUNDS.south+1,Math.min(MAP_BOUNDS.north-1,game.storm.lat));Object.assign(game.storm,projectLngLat(game.storm.lng,game.storm.lat));const overLand=isApproxLand(game.storm.lat,game.storm.lng);const heatGain=(game.storm.seaTemp-28.3)*5.5;game.storm.wind+=overLand?-(16+deterministic(game,708)*14):heatGain+(deterministic(game,709)-.5)*11;game.storm.wind=Math.max(45,Math.min(330,game.storm.wind));game.storm.pressure=Math.max(875,Math.min(1004,1010-game.storm.wind*.38));game.storm.radius=110+game.storm.wind*.59;game.storm.history.push({lat:game.storm.lat,lng:game.storm.lng,x:game.storm.x,y:game.storm.y,wind:game.storm.wind});
  for(const c of game.cities){if(c.status==='evacuating'){const progress=Math.max(3,14-c.traffic*.06+c.supplies*.03);c.evac=Math.min(100,c.evac+progress);c.traffic=Math.max(12,c.traffic-4)}c.power=Math.max(0,c.power-(deterministic(game,800+Math.round(c.lng*10))-.5)*4)}
  const near=nearestCity(game);if(near.dist<game.storm.radius*1.45&&game.storm.wind>90){const c=near.city;const intensity=(game.storm.wind-80)/2.2;const proximity=Math.max(.15,1-near.dist/(game.storm.radius*1.6));const mitigation=c.defense*.52+c.evac*.42+c.supplies*.12;const damage=Math.max(0,intensity*proximity-mitigation);const deaths=Math.round(Math.max(0,damage)*c.coastal*(1-c.evac/115)*.18);c.deaths+=deaths;c.status=damage>40?'critical':'damaged';game.totalDeaths+=deaths;game.totalDamage+=Math.round(damage);c.power=Math.max(0,c.power-damage*.6)}
  game.weapons.forEach(w=>w.remaining=Math.max(0,w.remaining-1));game.turn++;game.hour+=6;if(game.hour>=24){game.hour-=24;game.day++}game.ap=game.maxAp;
  const eventRoll=deterministic(game,900)/mode.event;let event=null;if(eventRoll<.18){game.intel=Math.max(.18,game.intel-.12);event='雷達資料中斷，預測可信度下降'}else if(eventRoll<.34){game.resources.supplies+=4200;event='國際支援物資已抵達'}else if(eventRoll<.48){game.storm.seaTemp+=.6;event='颱風進入暖水渦旋，強度可能急升'}else if(eventRoll<.60){const c=game.cities[Math.floor(deterministic(game,940)*game.cities.length)];c.traffic=Math.min(100,c.traffic+30);event=`${c.name}撤離道路嚴重擠塞`}
  updateForecast(game);if(overLand&&game.storm.wind<80||game.turn>game.maxTurns||game.storm.wind<65||game.storm.lng<108){game.gameOver=true}return{game,event};
}
export function gradeGame(game){const avgEvac=game.cities.reduce((s,c)=>s+c.evac,0)/game.cities.length;const avgDefense=game.cities.reduce((s,c)=>s+c.defense,0)/game.cities.length;const score=Math.max(0,Math.round(1000-game.totalDeaths*.02-game.totalDamage*2+avgEvac*2+avgDefense*1.2+game.resources.energy));let grade='F',title='文明崩潰';if(score>=950){grade='S';title='人類守護者'}else if(score>=800){grade='A';title='危機指揮官'}else if(score>=650){grade='B';title='防災專家'}else if(score>=500){grade='C';title='勉強守住'}else if(score>=330){grade='D';title='重大災難'}return{score,grade,title,avgEvac:Math.round(avgEvac),avgDefense:Math.round(avgDefense)}}
