const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';
const ROOT = __dirname;

const MIMES = {
  '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json',
  '.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml',
  '.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.webp':'image/webp',
};
const mime = p => MIMES[path.extname(p).toLowerCase()] || 'application/octet-stream';

// Cache
const C = new Map();
function get(p) {
  if (C.has(p)) return C.get(p);
  try {
    const s = fs.statSync(p);
    if (!s.isFile()) return null;
    if (s.size < 80000) {
      const d = fs.readFileSync(p);
      const e = {d,m:mime(p),s:s.size};
      if (C.size<300) C.set(p,e);
      return e;
    }
    return {d:null,m:mime(p),s:s.size,p};
  } catch{return null;}
}
function walk(dir) {
  if(!fs.existsSync(dir))return;
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const fp=path.join(dir,e.name);
    if(e.isDirectory())walk(fp);else get(fp);
  }
}

const pages = {'/':path.join(ROOT,'.next/server/app/index.html'),'/admin':path.join(ROOT,'.next/server/app/admin.html')};

console.log('Caching...');
walk(path.join(ROOT,'.next/static'));
walk(path.join(ROOT,'.next/server/app'));
walk(path.join(ROOT,'.public'));
for(const fp of Object.values(pages))get(fp);
console.log('Cached '+C.size+' files');

// Request serializer - only one request at a time
let busy = false;
const pending = [];

function handle(req, res) {
  pending.push({req, res});
  drain();
}

async function drain() {
  if (busy || pending.length === 0) return;
  busy = true;
  const {req, res} = pending.shift();
  
  try {
    const u = new URL(req.url, 'http://x');
    const pn = u.pathname;

    if (pn.startsWith('/api')) {
      const b = JSON.stringify({status:'healthy',service:'Clipe233 API',version:'1.0.0',timestamp:new Date().toISOString()});
      res.writeHead(200,{'Content-Type':'application/json','Content-Length':Buffer.byteLength(b)});
      res.end(b);
    } else if (pages[pn]) {
      const f = get(pages[pn]);
      if (f&&f.d) { res.writeHead(200,{'Content-Type':f.m,'Content-Length':f.s}); res.end(f.d); }
      else { res.writeHead(404); res.end(); }
    } else {
      let fp;
      if (pn.startsWith('/_next/')) fp = path.join(ROOT,pn.replace('/_next/','.next/'));
      else fp = path.join(ROOT,'public',pn);
      const f = get(fp);
      if (!f) { res.writeHead(404); res.end(); }
      else if (f.d) {
        const cc = pn.startsWith('/_next/')?'public, max-age=31536000, immutable':'public, max-age=3600';
        res.writeHead(200,{'Content-Type':f.m,'Content-Length':f.s,'Cache-Control':cc});
        res.end(f.d);
      } else {
        await new Promise(r=>{
          res.writeHead(200,{'Content-Type':f.m,'Content-Length':f.s,'Cache-Control':'public, max-age=31536000, immutable'});
          const fd=fs.openSync(f.p,'r'); let off=0;
          const go=()=>{
            const len=Math.min(16384,f.s-off);
            if(len<=0){res.end();fs.closeSync(fd);return r();}
            const buf=Buffer.alloc(len);
            fs.readSync(fd,buf,0,len,off);
            off+=len;
            res.write(buf);
            setImmediate(go);
          };
          go();
        });
      }
    }
  } catch(e) {
    if(!res.headersSent){res.writeHead(500);res.end();}
  }
  
  busy = false;
  setImmediate(drain);
}

const srv = http.createServer(handle);
srv.listen(PORT, HOST, () => {
  console.log('> Clipe233 on http://'+HOST+':'+PORT);
});
