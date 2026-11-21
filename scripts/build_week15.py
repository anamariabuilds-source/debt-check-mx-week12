from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
import pypdfium2 as pdfium
import json, csv

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/week15'; AS=OUT/'assets'; EV=OUT/'evidence'
for p in [OUT,AS,EV]: p.mkdir(parents=True,exist_ok=True)
F=Path('/System/Library/Fonts/Supplemental')
for name,file in [('Body','Arial.ttf'),('Bold','Arial Bold.ttf'),('Title','Georgia.ttf')]: pdfmetrics.registerFont(TTFont(name,str(F/file)))
INK='#14211C'; MUTED='#52645B'; PAPER='#F6F3EA'; GREEN='#0E5946'; MINT='#CCEBD9'; ORANGE='#D96B38'
URL='https://debt-check-mx-week12.vercel.app/product'
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='Asset',fontName='Body',fontSize=15,leading=22,textColor=HexColor(INK)))

def para(c,text,x,y,w,size=15,font='Body',color=INK,leading=None):
    st=ParagraphStyle('p',fontName=font,fontSize=size,leading=leading or size*1.4,textColor=HexColor(color))
    p=Paragraph(text,st); _,h=p.wrap(w,1000); p.drawOn(c,x,y-h); return y-h

def shell(c,series,note='EJEMPLO FICTICIO · NO SON DATOS DE UNA PERSONA'):
    c.setFillColor(HexColor(PAPER)); c.rect(0,0,540,675,fill=1,stroke=0)
    c.setFillColor(HexColor(GREEN)); c.roundRect(34,618,34,34,17,fill=1,stroke=0)
    c.setFillColor(white);c.setFont('Bold',12);c.drawCentredString(51,630,'DC')
    c.setFillColor(HexColor(INK));c.setFont('Bold',13);c.drawString(80,630,'Debt Check MX')
    c.setFillColor(HexColor(GREEN));c.setFont('Bold',10);c.drawString(34,588,series.upper())
    para(c,note,34,74,472,8.5,color=MUTED,leading=12)
    c.setStrokeColor(HexColor('#D9D9CE'));c.line(34,88,506,88)

def cta(c,y=127):
    c.setFillColor(HexColor(GREEN));c.roundRect(34,y-34,472,36,18,fill=1,stroke=0)
    c.setFillColor(white);c.setFont('Bold',12);c.drawCentredString(270,y-21,'Ver la comparación gratuita')
    c.linkURL(URL,(34,y-34,506,y+2),relative=0)
    para(c,'debt-check-mx-week12.vercel.app/product',34,y-43,472,8.5,color=MUTED)

def raster(pdf,prefix,scale=2):
    d=pdfium.PdfDocument(str(pdf)); result=[]
    for i in range(len(d)):
        p=AS/f'{prefix}_{i+1:02}.png'; d[i].render(scale=scale).to_pil().convert('RGB').save(p);result.append(p)
    return result

# A: three-panel carousel.
p=AS/'A_antes_de_comprometerte.pdf';c=canvas.Canvas(str(p),pagesize=(540,675));c.setTitle('Debt Check MX La mensualidad no cuenta toda la historia')
shell(c,'01 / Antes de comprometerte')
para(c,'La mensualidad no cuenta toda la historia.',34,554,455,34,'Title',leading=39)
para(c,'Una lavadora de <b>$9,600 MXN</b> en 12 pagos de <b>$800</b>. Primer pago del ejemplo: 15 de enero de 2027.',34,414,465,17)
c.setFillColor(HexColor(MINT));c.roundRect(34,228,472,95,14,fill=1,stroke=0)
para(c,'¿En qué meses coincidiría con el celular y el seguro?',52,306,430,23,'Title',leading=29)
para(c,'Desliza para ver tres pagos alineados en el tiempo.',34,193,470,14)
para(c,'Comparación de pagos ingresados. No determina si puedes comprar.',34,139,472,11,color=MUTED)
c.showPage()
shell(c,'01 / Antes de comprometerte')
para(c,'Mismo pago. Meses distintos.',34,551,470,31,'Title',leading=37)
para(c,'Compra: $800 de enero a diciembre. Celular: $600 de enero a abril. Seguro: $2,400 en marzo y septiembre.',34,454,472,14)
rows=[('ENE 2027','$1,400','Compra + celular'),('MAR 2027','$3,800','Compra + celular + seguro'),('SEP 2027','$3,200','Compra + seguro')]
for y,(m,a,t) in zip([367,286,205],rows):
 c.setFillColor(white);c.roundRect(34,y-58,472,69,12,fill=1,stroke=0)
 c.setFillColor(HexColor(GREEN));c.setFont('Bold',11);c.drawString(49,y-9,m)
 c.setFillColor(HexColor(INK));c.setFont('Bold',24);c.drawRightString(487,y-15,a)
 c.setFont('Body',11);c.drawString(49,y-37,t)
para(c,'Subtotales conocidos en MXN de estos tres pagos. No incluyen tus demás gastos ni representan capacidad de pago.',34,130,472,11,color=MUTED)
c.showPage()
shell(c,'01 / Antes de comprometerte')
para(c,'Compara antes de comprometerte.',34,550,472,34,'Title',leading=40)
para(c,'Ten a la mano el importe, la primera fecha de pago y cuántos pagos faltan para los compromisos que quieras comparar.',34,426,472,17)
para(c,'Tú eliges qué ingresar y verificas los datos. El calendario no descubre obligaciones que no incluyas.',34,318,472,17)
para(c,'Si una fecha es desconocida, no debe inventarse. Un mes sin pagos mostrados no significa que puedas comprar.',34,211,472,14,color=MUTED)
cta(c,145);c.save();ap=raster(p,'A_carrusel')

# B: static card with an unknown date.
p=AS/'B_sin_fecha.pdf';c=canvas.Canvas(str(p),pagesize=(540,675));c.setTitle('Debt Check MX Sin fecha no significa sin pago')
shell(c,'02 / Lo que todavía no sabes')
para(c,'Sin fecha no significa sin pago.',34,550,472,36,'Title',leading=42)
c.setFillColor(HexColor('#FFF0D6'));c.roundRect(34,276,472,123,14,fill=1,stroke=0)
para(c,'PAGO INGRESADO',52,382,430,10,'Bold',color=GREEN)
para(c,'$300 MXN · fecha desconocida',52,351,430,23,'Bold',leading=28)
para(c,'No se puede ubicar en un mes. No equivale a $0.',52,309,430,14)
para(c,'Los subtotales de pagos conocidos no incluyen ese cargo. Confirma su fecha para ubicarlo; mientras tanto, sigue pendiente.',34,248,472,16)
para(c,'Un subtotal parcial no es el total de tus obligaciones.',34,170,472,12,'Bold')
cta(c,145);c.save();bp=raster(p,'B_tarjeta')

# C: practical one-page printable guide.
p=AS/'C_del_dato_al_calendario.pdf';c=canvas.Canvas(str(p),pagesize=A4);w,h=A4
c.setFillColor(HexColor(PAPER));c.rect(0,0,w,h,fill=1,stroke=0)
para(c,'DEBT CHECK MX · DEL DATO AL CALENDARIO',42,h-44,w-84,10,'Bold',color=GREEN)
para(c,'De tres pagos a una comparación',42,h-83,w-84,30,'Title',leading=36)
para(c,'Ejemplo ficticio para revisar el método. No es una evaluación de tus finanzas.',42,h-173,w-84,12,color=MUTED)
y=h-218
for title,body in [
('1  Reúne lo que vas a comparar','Lavadora: $9,600 MXN, 12 pagos de $800 desde el 15 de enero de 2027. Celular: cuatro pagos de $600 desde enero. Seguro: dos pagos de $2,400, en marzo y septiembre.'),
('2  Alinea los meses','Enero: $1,400. Marzo: $3,800. Septiembre: $3,200. Son subtotales conocidos de los tres pagos seleccionados; la compra coincide con el celular de enero a abril y con el seguro en marzo y septiembre.'),
('3  Revisa lo que falta','¿Incluiste todos los compromisos que querías comparar? ¿Son confirmadas las fechas? Una obligación sin fecha sigue pendiente y no se convierte en cero.'),
('4  Conserva la decisión','La comparación muestra coincidencias de pagos. No dice si puedes comprar, no verifica tus datos con el banco y no sustituye la revisión de tus demás gastos.')]:
 y=para(c,title,42,y,w-84,16,'Bold',color=GREEN)-12
 y=para(c,body,42,y,w-84,12.5,leading=18)-26
para(c,'Abre la comparación gratuita',42,104,w-84,14,'Bold',color=GREEN)
para(c,'debt-check-mx-week12.vercel.app/product',42,78,w-84,10)
c.linkURL(URL,(42,59,w-42,106),relative=0)
c.save();cp=raster(p,'C_guia',1.5)

# Record claims and distribution without invented metrics.
claims=[
{'claim':'Selected schedules can be aligned','basis':'Existing fixture, mechanical test suite; live end-to-end behavior still requires inspection','limit':'Not affordability or a complete financial picture'},
{'claim':'January 1400, March 3800, September 3200 MXN','basis':'Known selected schedules from approved fictional fixture','limit':'Estimated and undated entries not included; explicit limited scope'},
{'claim':'Unknown date does not equal zero payment','basis':'Domain engine unknown-date tests and data model','limit':'Not independent user comprehension evidence'},
{'claim':'Free comparison next action','basis':'Existing product positioning and public /product HTTP check','limit':'Human browser task and independent review outstanding'}]
(EV/'CLAIMS.json').write_text(json.dumps(claims,ensure_ascii=False,indent=2))
if not (EV/'DISTRIBUTION_LOG.csv').exists():
 with (EV/'DISTRIBUTION_LOG.csv').open('w') as f:
  writer=csv.writer(f);writer.writerow(['participant_code','audience_fit','consent_date','shared_date','asset_ids','channel','expected_action','observed_action','reported_action','comprehension','confusion','next_change','observation_window_end'])

# English academic packet; public-facing assets are in Spanish.
S=getSampleStyleSheet()
S.add(ParagraphStyle(name='T',fontName='Title',fontSize=27,leading=32,textColor=HexColor(INK),spaceAfter=18))
S.add(ParagraphStyle(name='H',fontName='Bold',fontSize=13,leading=17,textColor=HexColor(GREEN),spaceBefore=13,spaceAfter=7))
S.add(ParagraphStyle(name='B',fontName='Body',fontSize=10.5,leading=15,textColor=HexColor(INK),spaceAfter=9))
S.add(ParagraphStyle(name='SmallX',fontName='Body',fontSize=8.5,leading=12,textColor=HexColor(MUTED),spaceAfter=6))
S.add(ParagraphStyle(name='CellX',fontName='Body',fontSize=8.5,leading=12,textColor=HexColor(INK)))
flow=[]
def P(t,style='B'):flow.append(Paragraph(t,S[style]))
def H(t):P(t,'H')
def page(title):
 if flow:flow.append(PageBreak())
 P(title,'T')
def table(rows,widths):
 data=[[Paragraph(str(x),S['CellX']) for x in r] for r in rows]
 t=Table(data,colWidths=widths,hAlign='LEFT');t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor(MINT)),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LINEBELOW',(0,0),(-1,0),.5,HexColor(GREEN)),('LINEBELOW',(0,1),(-1,-1),.3,HexColor('#D9D9CE'))]));flow.append(t)
def img(path,width):
 from PIL import Image as PI
 im=PI.open(path);flow.append(Image(str(path),width=width,height=width*im.height/im.width))
page('Debt Check MX distribution playbook')
P('Ana María Matas · Week 15 Business Bending · 21 November 2026','SmallX')
P('I am narrowing distribution to a specific planning question: in which months would a proposed appliance installment coincide with payments the shopper enters? This packet documents the creative process and prepared assets. Real audience distribution, fresh-chat persona review, independent release review and the founder video are still outstanding.')
H('Audience and moment')
P('An adult in Mexico considering a specific appliance installment offer, with existing obligations ending in different months and an unresolved overlap question. I provisionally favor planning before checkout, when records can still be consulted. That is operational reasoning, not an observed preference. The shopper is the user and potential payer; willingness to pay remains unestablished. The initial check remains free.')
H('Promise and exclusions')
P('<b>“Compara en qué meses coincidiría esta compra con los pagos que ingreses.”</b> The first payment date and other required scheduling inputs must be supported. I will not promise affordability, complete debt discovery, saved money, faster decisions, or a bank-verified result. I exclude debt restructuring, credit approval and billing-date discovery.')
H('Evidence behind the choice')
P('The Week 12 Charter records one shopper reporting approximately 20 minutes using Notes and mental calculations. The source of that effort is unknown. Existing test fixtures establish particular calculation behaviors, not demand or human understanding. The Week 15 Blueprint confirms conditional support for investigating schedule alignment and requires explicit coverage, unknown dates and independent review before public claims.')
H('Current release and repository')
P(f'<link href="https://debt-check-mx-week12.vercel.app/guia" color="#0E5946">Open the published guide</link> · <link href="{URL}" color="#0E5946">Open the product</link> · <link href="https://github.com/anamariabuilds-source/debt-check-mx-week12/tree/main" color="#0E5946">Current repository branch</link>')
P('The product endpoint returned HTTP 200 on 21 November. A browser replay also matched the selected example totals; this is not independent human review. The repository URL and deployment history are inherited evidence, not newly verified deployment events.','SmallX')

page('Brand rules and creative range')
H('Three voice rules')
P('1. Start with a specific payment question in plain Mexican Spanish.<br/>2. Explain what is included and what remains unknown beside the result.<br/>3. Leave the purchase decision to the shopper; avoid urgency, fear and approval badges.')
P('<b>Weak:</b> “Compra tranquilo: descubre si te alcanza.”<br/><b>Revised:</b> “Compara en qué meses coincidiría esta compra con los pagos que ingreses.”')
H('Visual system')
P('Reuse the existing product: cream #F6F3EA, ink #14211C, green #0E5946, mint #CCEBD9 and orange #D96B38. Georgia headings and Arial body text keep the assets consistent with the site. Orange highlights unresolved information; green never means financial approval. Repeat: series label → one question → evidence panel → coverage → next action.')
P('Spanish copy, explicit MXN, installment counts and first-payment dates fit the proposed Mexican use case. Short mobile-readable panels are a design choice, not a demonstrated audience preference.')
H('Six concepts across three series')
table([['Series','Concept','Deliverable'],['Antes de comprometerte','La mensualidad no cuenta toda la historia','A · Finished 3-panel carousel'],['Antes de comprometerte','Antes de comparar, reúne estos datos','Sketch: input list and one next action'],['Lo que todavía no sabes','Sin fecha no significa sin pago','B · Finished static card'],['Lo que todavía no sabes','Confirmado, estimado y desconocido','Sketch: distinguish three evidence states'],['Del dato al calendario','De tres pagos a una comparación','C · Finished printable guide'],['Del dato al calendario','¿Tus Notas ya responden la pregunta?','Sketch: compare whole-task effort']],[130,230,150])
P('The finished pieces are prepared for review; they have not been distributed. They span a carousel, static explanation card and printable guide. The remaining concepts are purposeful sketches, not finished posts.','SmallX')

page('From input to useful content')
P('The actual editorial input is an existing fictional engine-test fixture, not a newly invented customer result. The scale-1 fixture contains a MXN 9,600 purchase in 12 payments of 800, a phone payment of 600 for four months, insurance of 2,400 twice, an estimated 300 charge and an unknown obligation.')
P('For the teaching example, I explicitly select the three known schedules: purchase from January to December 2027, phone from January to April, and insurance in March and September. Known selected subtotals are January 1,400; March 3,800; September 3,200; 12-month sum 16,800 MXN. The full fixture remains partial. The estimated 300 and unknown entry are not silently treated as confirmed or zero.')
table([['Stage','Input and output','Quality check'],['Research','Charter, Blueprint and fixture → claim register','Separate facts, hypotheses and fictional examples'],['Writing','Overlap question → Spanish copy and next action','No affordability, speed or savings claim'],['Visual production','Copy and brand → A, B and C','Readable amounts; recurring layout; visible scope'],['Claim check','Draft and engine fixture → reconciled amounts','Known-only subtotal; no omitted-data certainty'],['Style review','Checked draft → consistent voice','Plain Spanish; no fear or approval cues'],['Revision','Findings → corrected version','Recheck changed text and arithmetic'],['Human approval','Assets and release checks → permission to share','Ana owns claim approval; independent reviewer unassigned']],[100,240,170])
H('What the process produced')
P('Asset A demonstrates differing overlap months. Asset B explains why an undated known amount is not zero. Asset C makes the inputs, arithmetic and decision boundary inspectable. Each has the same product next action. No asset is a product screenshot or a claim of user success.')
P('The stages are documented editorial roles, not a claim that separate agents or independent human reviewers performed them.','SmallX')

page('Finished carousel')
P('Asset A · Antes de comprometerte · Three panels · Fictional worked example','SmallX')
thumbs=[]
for path in ap:
 from PIL import Image as PI
 im=PI.open(path);thumbs.append(Image(str(path),width=162,height=202.5))
t=Table([thumbs],colWidths=[170,170,170]);flow.append(t)
H('Claim and next action')
P('The carousel shows that a constant purchase installment can coincide with different selected obligations in different months. It does not infer available income. Panel 3 explains the required inputs and the risk of omitted obligations. The linked PDF button opens the existing comparison route; image versions show the address.')
H('Purposeful sketch from this series')
P('<b>“Antes de comparar, reúne estos datos.”</b> A short checklist would name payment amount, first payment date, remaining count and recurring timing. It should help someone recognize the work before entering data. No screen or checklist comprehension has been tested.')
H('Review gate')
P('Check the advertised task in the current accessible release, obtain independent review, and ask whether a viewer understands selected-payment coverage before sharing beyond the test. Prepared content is not an approved capability claim.')

page('Finished card and practical guide')
P('Asset B · Lo que todavía no sabes · Static card<br/>Asset C · Del dato al calendario · Printable one-page guide','SmallX')
from PIL import Image as PI
imgs=[]
for path,ww in [(bp[0],220),(cp[0],220)]:
 im=PI.open(path);imgs.append(Image(str(path),width=ww,height=ww*im.height/im.width))
flow.append(Table([imgs],colWidths=[255,255],style=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP')])))
H('What each piece adds')
P('B makes a missing-date limitation useful before the shopper starts. C lets a reader inspect the method and the three known schedules without using the product. Neither asks for personal financial information.')
H('Remaining sketches')
P('<b>“Confirmado, estimado y desconocido no son lo mismo.”</b> Show that a supported estimate needs an explicit assumption and is not part of a known subtotal.<br/><b>“¿Tus Notas ya responden la pregunta?”</b> Invite an honest comparison; if Notes answers easily with less effort, do not manufacture a reason to switch.')

page('Verification and Blueprint response')
H('Mechanical checks completed')
P('On 21 November, the existing Vitest suite passed: 45 tests across 10 files. The suite covers finite counts, cross-year recurrence, unknown dates and amounts, estimated-input handling, validation and other existing behaviors. These are automated local checks, not independent live-product review or user comprehension evidence.')
P('The product URL returned HTTP 200 without authentication via a header request. Earlier browsing-tool fetches failed, so the successful direct check is recorded separately. A browser replay then matched January 1,400, March 3,800, September 3,200 and a 16,800 MXN horizon total. The initial unknown-date state stayed outside the main calendar. These checks do not establish human comprehension or verify every repository/deployment link.')
H('Security and scope')
P('This sprint adds a public guide, content assets, navigation and bounded home copy. Calculation, authentication, database and persistence logic are unchanged. Existing code includes schema validation and owner-scoped Supabase controls, but their production configuration is not re-certified here. Public assets contain labeled fictional data only. Distribution logs use participant codes; do not enter credentials, names, phone numbers or private statement images.')
H('Team challenge and response')
P('Peers noted that “Debt Check” could imply a financial verdict. My response is to state selected-schedule scope, exclusions and missing-date behavior. The team supports testing the narrower promise with conditions; it does not validate demand. I own final claim approval. An independent release reviewer is still unassigned.')
P('<b>Shadow:</b> Do not present selected schedules as complete obligations or imply that no overlap establishes affordability.')
H('Pending persona review')
P('A research-grounded synthetic persona must be run in a fresh chat with the actual screens, retaining the original exchange. Record confusion, distinguish a plausible interpretation from a reproduced failure, fix a reproduced failure if one exists, and retest. This simulation is not completed here and cannot replace real audience exposure.')
H('Historical development evidence')
P('Git history includes more than five existing commits, including d41241b, bc38ea3, 8908738, 17cf94d and 9c3fbc4. Week 14 records a production URL and preview deployment. Do not add artificial edits or claim new deploys. Commit 59883a4 was pushed to main. Vercel production deployment dpl_6VAuRm3jLQLkRW4pYxCQ436hMAms reached READY. The deployed guide and product CTA opened without sign-in. Independent human review remains unassigned.')

page('Real audience test awaiting execution')
P('<b>Status:</b> The guide is published at /guia, but the founder reports that no Week 15 content has been shared with the intended audience. Exposure is not yet recorded; response, click and conversion rates are not applicable. This is not a completed zero-response test.')
H('Channel and recruitment')
P('Proposed channel: one-to-one WhatsApp messages after permission, to adults considering a specific appliance installment offer. Personal or university contacts provide a possible recruitment route, not a validated acquisition channel. Share A and B through this one channel with the published guide/product links after human review. Assistant checks are completed; independent human review remains an open condition. No public social account is required.')
H('Expectation recorded before sharing')
P('A viewer should explain that the tool compares selected payments, identify the next action, and recognize that missing dates remain unresolved. No numeric engagement target is assumed. Observe actual behavior rather than equating positive feedback with demand.')
H('Suggested permission message')
P('“Estoy preparando una herramienta para comparar una compra a plazos con otros pagos. ¿Estás considerando comprar un electrodoméstico a plazos? Si sí, ¿te puedo mandar dos piezas cortas para saber si se entiende qué hace? No necesito tus datos financieros.”')
H('After permission')
P('“Aquí están las dos piezas. Antes de abrir el enlace: ¿qué crees que podrías averiguar y qué datos necesitarías? Si te resulta útil, puedes abrir la comparación gratuita. ¿Qué hiciste después y qué quedó confuso?”')
P('Share the actual product URL. A reply about clicking is self-reported unless directly observed; do not label it a measured click. Asking someone to click is not spontaneous demand. Record the assistance you provide.')
H('Record and decide')
P('Use evidence/DISTRIBUTION_LOG.csv. Record participant code, audience fit, permission, exposure time, assets A/B, observed versus reported action, understanding, confusion and revision. Suggested observation window: 24 hours after sharing, with late replies separately recorded. If nobody replies, retain actual exposures and the elapsed window. If nobody received it, the test remains unrun.')
P('Keep or change decisions follow observations. If users expect affordability advice, revise the promise. If entry is burdensome or Notes suffices, revisit the use case. Do not invent engagement, payment or improvement.')

page('Walkthrough and submission checklist')
H('Three-minute walkthrough plan')
P('<b>0:00–0:25:</b> Name the first audience, moment, bounded promise and rejected affordability claim.<br/><b>0:25–1:15:</b> Open the actual product. Use labeled fictional inputs, show selected schedules and demonstrate missing-date behavior. State the result’s coverage.<br/><b>1:15–2:00:</b> Show the six-concept plan and finished A/B/C assets. Trace one input through writing, visual production and arithmetic review.<br/><b>2:00–2:35:</b> Show actual mechanical evidence and, once completed, the real audience observations. If not completed, say so.<br/><b>2:35–3:00:</b> Show the Blueprint condition, next change, independent review status and working next action.')
H('Thirty-second learning explanation')
P('Suggested starting point, to adapt to the founder’s own words: “I moved from reaching shoppers at checkout to investigating purchase planning, because entering and verifying payment data takes work. That change follows operational reasoning, not new user validation. I also narrowed the promise from checking debt to comparing selected schedules. The next evidence must show whether that alignment adds enough clarity over Notes and whether users understand its exclusions.”')
H('What still requires completion')
P('1. Independent accessible-release review and human claim approval.<br/>2. Actual distribution of two finished pieces and honest result/revision entry.<br/>3. Fresh-chat synthetic persona conversation, response and retest where justified.<br/>4. Founder walkthrough and learning video.<br/>5. Full original build-conversation export or readable link, checked without the founder’s session.<br/>6. Final packet update after those observations. This prepared packet is not evidence that they occurred.')
H('Evidence and source trail')
P('Venture: Week 12 Charter; Week 13/14 briefs and existing fixtures; Week 15 Brain and shared Blueprint. Source file paths and process detail remain in docs/PACKET.md and docs/DECISIONS.md. Historical image-generated mockups are retained with provenance; they are concepts, not live screenshots. No new image-generation claim is made.')
P('<link href="https://comparador.banxico.org.mx/ComparadorCrediticio/terminos-tarjeta-de-credito.jsp" color="#0E5946">Banco de México credit-card terms</link> and <link href="https://sidof.segob.gob.mx/notas/docFuente/5676037" color="#0E5946">CONDUSEF standardized statement guide</link> are inherited Week 15 Brain references for payment mechanics. They do not validate this product. Notes, Numbers and Mobills remain the inherited benchmark set; no new source verification is claimed.')

def footer(c,d):
 c.setFillColor(HexColor(MUTED));c.setFont('Body',8);c.drawString(42,25,'DEBT CHECK MX · WEEK 15 · BUSINESS BENDING');c.drawRightString(A4[0]-42,25,str(d.page))
SimpleDocTemplate(str(OUT/'PACKET_AnaMariaMatas_PREPARACION.pdf'),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=42,bottomMargin=43,title='Debt Check MX Week 15 distribution playbook',author='Ana María Matas').build(flow,onFirstPage=footer,onLaterPages=footer)
# Contact sheet directly from actual rendered PDFs.
from PIL import Image as PI, ImageOps, ImageDraw
allpaths=ap+bp+cp
sheet=PI.new('RGB',(1500,1100),'#E8E5DC');draw=ImageDraw.Draw(sheet)
for i,path in enumerate(allpaths):
 im=PI.open(path);im.thumbnail((450,475));x=25+(i%3)*495;y=30+(i//3)*540
 sheet.paste(im,(x,y));draw.text((x,y+480),path.name,fill=INK)
sheet.save(OUT/'VISTA_PIEZAS.png')
print('Created assets, 8-page prepared packet, claim register and empty observation log.')
