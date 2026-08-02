import test from 'node:test';import assert from 'node:assert/strict';import{CITY_DATA,createGame,updateForecast,advanceTurn,useWeapon,gradeGame,projectLngLat,haversineKm}from'../engine.js';
test('same seed reproduces initial storm',()=>{const a=createGame('12345'),b=createGame('12345');assert.equal(a.storm.lng,b.storm.lng);assert.equal(a.storm.lat,b.storm.lat);assert.equal(a.storm.wind,b.storm.wind)});
test('forecast contains five observatory points',()=>{const g=createGame('9');updateForecast(g);assert.equal(g.storm.forecast.length,5);assert.ok(g.storm.forecast.every(p=>p.spreadKm>0&&p.time))});
test('turn advances six hours',()=>{const g=createGame('22');updateForecast(g);const h=g.hour;advanceTurn(g);assert.equal(g.hour,(h+6)%24)});
test('weapon consumes energy',()=>{const g=createGame('88');const before=g.resources.energy;useWeapon(g,'drones');assert.ok(g.resources.energy<before)});
test('grade result is valid',()=>{const g=createGame('77');const r=gradeGame(g);assert.match(r.grade,/^[SABCDF]$/)});
test('major cities use real geographic coordinates',()=>{assert.ok(CITY_DATA.length>=18);const hk=CITY_DATA.find(c=>c.id==='hongkong');assert.ok(Math.abs(hk.lat-22.3193)<.001);assert.ok(Math.abs(hk.lng-114.1694)<.001)});
test('projection and geographic distance are coherent',()=>{const p=projectLngLat(121.5654,25.033);assert.ok(p.x>0&&p.x<100&&p.y>0&&p.y<100);const d=haversineKm(22.3193,114.1694,22.1987,113.5439);assert.ok(d>50&&d<80)});
