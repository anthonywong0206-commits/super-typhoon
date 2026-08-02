import test from 'node:test';import assert from 'node:assert/strict';import{createGame,updateForecast,advanceTurn,useWeapon,gradeGame}from'../engine.js';
test('same seed reproduces initial storm',()=>{const a=createGame('12345'),b=createGame('12345');assert.equal(a.storm.x,b.storm.x);assert.equal(a.storm.wind,b.storm.wind)});
test('forecast contains five future points',()=>{const g=createGame('9');updateForecast(g);assert.equal(g.storm.forecast.length,5)});
test('turn advances six hours',()=>{const g=createGame('22');updateForecast(g);const h=g.hour;advanceTurn(g);assert.equal(g.hour,(h+6)%24)});
test('weapon consumes energy',()=>{const g=createGame('88');const before=g.resources.energy;useWeapon(g,'drones');assert.ok(g.resources.energy<before)});
test('grade result is valid',()=>{const g=createGame('77');const r=gradeGame(g);assert.match(r.grade,/^[SABCDF]$/)});
