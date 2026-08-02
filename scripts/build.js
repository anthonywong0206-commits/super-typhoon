import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();const dist=path.join(root,'dist');fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
for(const file of ['index.html','styles.css','app.js','engine.js','vercel.json'])fs.copyFileSync(path.join(root,file),path.join(dist,file));
fs.cpSync(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
console.log('Static production build created in dist/');
