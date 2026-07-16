#!/usr/bin/env python3
"""从 profile.json 生成与站点 Stone 主题一致的简历 PDF。

用法:
    python3 scripts/make_resume.py
    npm run resume

依赖: pip install playwright && playwright install chromium
配色: 与 src/index.css 的 stone 色板保持一致（无渐变、暖灰克制风）。
"""
import json
import os
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROFILE = os.path.join(ROOT, 'src', 'data', 'profile.json')
OUT = os.path.join(ROOT, 'public', 'resume.pdf')

# Stone 色板（与 index.css @theme 对齐）
STONE_900 = '#1c1917'   # 主文字/标题
STONE_700 = '#44403c'   # 次级文字
STONE_600 = '#57534e'   # 强调/小标题
STONE_500 = '#78716c'   # 弱化文字
STONE_200 = '#e7e5e4'   # 边框
STONE_100 = '#f5f5f4'   # 浅底标签

with open(PROFILE, encoding='utf-8') as f:
    d = json.load(f)

skills_html = ""
for g in d.get('skills', []):
    chips = "".join(f'<span class="chip">{t}</span>' for t in g['items'])
    skills_html += f'<div class="skill-g"><div class="skill-cat">{g["category"]}</div><div class="chips">{chips}</div></div>'

projects_html = ""
for p in d.get('projects', []):
    tech = "".join(f'<span class="chip">{t}</span>' for t in p.get('tech', []))
    hl = "".join(f'<li>{h}</li>' for h in p.get('highlights', []))
    projects_html += f'''
      <div class="proj">
        <div class="proj-h"><span class="proj-name">{p["name"]}</span></div>
        <p class="proj-desc">{p["description"]}</p>
        <div class="chips">{tech}</div>
        <ul class="hl">{hl}</ul>
      </div>'''

edu_html = ""
for e in d.get('education', []):
    edu_html += f'''
      <div class="edu">
        <div class="edu-top"><span class="edu-school">{e["school"]}</span><span class="edu-period">{e["period"]}</span></div>
        <div class="edu-meta">{e["degree"]} · {e["major"]}</div>
      </div>'''

certs_html = "".join(f'<span class="cert">{c["name"]}</span>' for c in d.get('certificates', []))

exp = d['experience'][0]
exp_hl = "".join(f'<li>{h}</li>' for h in exp['highlights'])
ji = d['jobIntentions']

HTML = f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<style>
@page {{ size: A4; margin: 14mm 14mm; }}
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ font-family:'Noto Sans CJK SC','Microsoft YaHei',sans-serif; color:{STONE_900}; font-size:10.3px; line-height:1.65; -webkit-print-color-adjust:exact; print-color-adjust:exact; }}
.wrap {{ max-width:780px; margin:0 auto; }}
.head {{ text-align:center; padding-bottom:10px; border-bottom:2px solid {STONE_200}; }}
.name {{ font-size:30px; font-weight:800; letter-spacing:2px; color:{STONE_900}; }}
.role {{ font-size:14px; font-weight:700; color:{STONE_600}; margin-top:2px; }}
.contact {{ margin-top:6px; font-size:10px; color:{STONE_500}; }}
.contact b {{ color:{STONE_900}; font-weight:600; }}
.sec {{ margin-top:15px; }}
.sec-t {{ font-size:13px; font-weight:800; color:{STONE_600}; letter-spacing:1px; text-transform:uppercase; margin-bottom:7px; }}
.about {{ font-size:10.3px; color:{STONE_700}; text-align:justify; }}
.ji {{ display:flex; flex-wrap:wrap; gap:6px 14px; margin-top:7px; font-size:10px; }}
.ji span {{ background:{STONE_100}; color:{STONE_700}; padding:2px 9px; border-radius:20px; }}
.skill-g {{ margin-bottom:7px; }}
.skill-cat {{ font-weight:700; color:{STONE_900}; font-size:10.3px; margin-bottom:3px; }}
.chips {{ display:flex; flex-wrap:wrap; gap:4px; }}
.chip {{ background:{STONE_100}; border:1px solid {STONE_200}; border-radius:5px; padding:1.5px 7px; font-size:9.3px; color:{STONE_700}; }}
.proj {{ margin-bottom:10px; padding:9px 11px; border:1px solid {STONE_200}; border-radius:8px; }}
.proj-name {{ font-weight:700; font-size:11px; }}
.proj-desc {{ font-size:9.6px; color:{STONE_500}; margin:3px 0 5px; text-align:justify; }}
.hl {{ margin:4px 0 0 14px; font-size:9.3px; color:{STONE_700}; }}
.hl li {{ margin-bottom:1.5px; }}
.edu-top {{ display:flex; justify-content:space-between; font-weight:700; }}
.edu-period {{ color:{STONE_500}; font-weight:600; font-size:9.6px; }}
.edu-meta {{ color:{STONE_600}; font-size:9.6px; margin-top:1px; }}
.exp-co {{ font-weight:700; }}
.exp-role {{ color:{STONE_600}; font-weight:600; }}
.exp-period {{ color:{STONE_500}; font-size:9.6px; float:right; }}
.exp ul {{ margin:4px 0 0 14px; font-size:9.6px; color:{STONE_700}; }}
.certs {{ display:flex; flex-wrap:wrap; gap:5px; }}
.cert {{ background:{STONE_100}; border:1px solid {STONE_200}; border-radius:5px; padding:2px 8px; font-size:9.3px; }}
</style></head><body><div class="wrap">
  <div class="head">
    <div class="name">{d['name']}</div>
    <div class="role">{d['title']}</div>
    <div class="contact"><b>邮箱</b> {d['email']} &nbsp;·&nbsp; <b>所在地</b> {d['location']} &nbsp;·&nbsp; <b>年龄</b> {d['age']}岁</div>
  </div>

  <div class="sec"><div class="sec-t">关于我 / About</div><p class="about">{d['about']}</p>
    <div class="ji"><span>意向岗位：{ji['targetPosition']}</span><span>期望薪资：{ji['salaryRange']}</span><span>到岗时间：{ji['availability']}</span><span>工作城市：{ji['city']}</span></div>
  </div>

  <div class="sec"><div class="sec-t">工作经历 / Experience</div>
    <div><span class="exp-co">{exp['company']}</span> &nbsp;<span class="exp-role">{exp['role']}</span><span class="exp-period">{exp['period']}</span></div>
    <ul>{exp_hl}</ul>
  </div>

  <div class="sec"><div class="sec-t">教育背景 / Education</div>{edu_html}</div>

  <div class="sec"><div class="sec-t">专业技能 / Skills</div>{skills_html}</div>

  <div class="sec"><div class="sec-t">项目精选 / Projects</div>{projects_html}</div>

  <div class="sec"><div class="sec-t">荣誉证书 / Certificates</div><div class="certs">{certs_html}</div></div>
</div></body></html>'''

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.set_content(HTML, wait_until='load')
    pg.wait_for_timeout(400)
    pg.pdf(path=OUT, format='A4',
           print_background=True, margin={'top': '0', 'bottom': '0', 'left': '0', 'right': '0'})
    b.close()
print(f"resume.pdf generated -> {OUT}")
