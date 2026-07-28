from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

# Colori Brand
PRIMARY_BLUE = RGBColor(13, 71, 161) # #0D47A1
DARK_GRAY = RGBColor(11, 29, 58) # #0B1D3A
LIGHT_GRAY = RGBColor(107, 114, 128) # #6B7280
WHITE = RGBColor(255, 255, 255)

prs = Presentation()

def add_slide(title, content_items, subtitle=None):
    """Helper per creare slide coerenti"""
    slide_layout = prs.slide_layouts[1] # Title + Content
    slide = prs.slides.add_slide(slide_layout)

    # Titolo
    title_shape = slide.shapes.title
    title_shape.text = title
    title_shape.text_frame.paragraphs[0].font.color.rgb = DARK_GRAY
    title_shape.text_frame.paragraphs[0].font.bold = True

    # Sottotitolo opzionale
    if subtitle:
        left = Inches(1)
        top = Inches(1.5)
        width = Inches(8)
        height = Inches(0.5)
        txBox = slide.shapes.add_textbox(left, top, width, height)
        tf = txBox.text_frame
        p = tf.paragraphs[0]
        p.text = subtitle
        p.font.size = Pt(16)
        p.font.color.rgb = PRIMARY_BLUE
        p.font.bold = True

    # Contenuto
    body_shape = slide.placeholders[1]
    tf = body_shape.text_frame
    tf.clear()

    for item in content_items:
        p = tf.add_paragraph()
        p.text = item
        p.font.size = Pt(18)
        p.font.color.rgb = DARK_GRAY
        p.space_after = Pt(10)
        if item.startswith("•"):
            p.level = 0
        elif item.startswith("  -"):
            p.level = 1
            p.text = item.replace("  -", "")

# --- SLIDE 1: COPERTINA ---
slide_layout = prs.slide_layouts[0] # Title Slide
slide = prs.slides.add_slide(slide_layout)
slide.shapes.title.text = "Strategia di Lancio:\nFacile Medical"
slide.placeholders[1].text = "Piano Marketing per l'Acquisizione Pazienti e Cliniche\nGiugno 2026"
slide.shapes.title.text_frame.paragraphs[0].font.color.rgb = PRIMARY_BLUE

# --- SLIDE 2: PROBLEMA E SOLUZIONE ---
add_slide("Il Problema e La Soluzione", [
    "👤 PAZIENTI",
    "  - Cure costose e preventivi opachi",
    "  - Difficoltà nel confrontare informazioni e preventivi",
    "  - ✅ Soluzione: percorso chiaro, confronto opzioni, check-up gratuito",
    "",
    "🏥 CLINICHE",
    "  - Poltrone vuote e CAC (Costo Acquisizione) alto",
    "  - Dipendenza dal passaparola imprevedibile",
    "  - ✅ Soluzione: Lead qualificati, visibilità locale, agenda piena"
])

# --- SLIDE 3: VALUE PROPOSITION ---
add_slide("Value Proposition Unica", [
    "🎯 MESSAGGIO CHIAVE PAZIENTI",
    "  - \"La salute, più semplice. Ogni giorno.\"",
    "  - Ricerca strutture, check-up e confronto delle opzioni",
    "",
    "🎯 MESSAGGIO CHIAVE CLINICHE",
    "  - \"Riempi la tua agenda con pazienti che cercano",
    "     esattamente te, pagando solo per risultati.\""
], subtitle="Posizionamento Marketplace a Due Facce")

# --- SLIDE 4: STRATEGIA B2C ---
add_slide("Strategia Acquisizione Pazienti (B2C)", [
    "📱 META ADS (Facebook & Instagram)",
    "  - Reels UGC + Caroselli educativi",
    "  - Targeting geolocalizzato + interessi medicali",
    "  - Budget: €30-50/giorno per città pilota",
    "",
    "🔍 GOOGLE SEARCH ADS",
    "  - Keyword: \"preventivo implantologia [città]\"",
    "  - Landing page dedicata con Form Check-up above the fold",
    "",
    "🌐 SEO LOCALE",
    "  - Pagine città-specifiche + blog educativo",
    "  - Traffico organico gratuito nel medio termine"
], subtitle="Obiettivo: Costo per Check-up < €15")

# --- SLIDE 5: STRATEGIA B2B ---
add_slide("Strategia Acquisizione Cliniche (B2B)", [
    "📧 OUTREACH DIRETTO",
    "  - Email/LinkedIn personalizzati a titolari clinica",
    "  - Offerta entry: \"3 lead gratuiti questa settimana\"",
    "  - Follow-up telefonico dopo 48h",
    "",
    "🤝 PARTNERSHIP STRATEGICHE",
    "  - Accordi con fornitori attrezzature/software gestionali",
    "  - Canale fiduciario già esistente",
    "",
    "📊 CONTENT B2B",
    "  - Case study reali + report costi acquisizione paziente"
], subtitle="Obiettivo: Conversione Trial → Paid > 30%")

# --- SLIDE 6: ROADMAP 90 GIORNI ---
add_slide("Roadmap di Lancio (90 Giorni)", [
    "🚀 FASE 1: VALIDAZIONE (Giorni 1-30)",
    "  - 1 Città pilota | 50 check-up target | 5 cliniche beta gratis",
    "",
    "⚙️ FASE 2: OTTIMIZZAZIONE (Giorni 31-60)",
    "  - Attivazione Google Ads | Primi pagamenti | Automazione email",
    "",
    "📈 FASE 3: SCALABILITÀ (Giorni 61-90)",
    "  - Espansione 3 nuove città | Referral pazienti | MRR stabile"
])

# --- SLIDE 7: BUDGET E KPI ---
add_slide("Budget e KPI (Mese 1)", [
    "💰 BUDGET STIMATO: €1.900 - €2.900/mese",
    "  - Meta Ads: €1.000-1.500",
    "  - Google Ads: €500-800",
    "  - Outreach/Tool: €400-600",
    "",
    "📊 METRICHE DI SUCCESSO",
    "  - CPA Paziente: < €15",
    "  - Conversione Check-up → Appuntamento: > 20%",
    "  - Retention Cliniche: > 80%"
])

# --- SLIDE 8: RISCHI ---
add_slide("Gestione del Rischio", [
    "⚠️ Lead Bassa Qualità",
    "  - → Qualifica via SMS + campo budget obbligatorio nel form",
    "",
    "⚠️ Cliniche Insoddisfatte",
    "  - → Script vendita forniti + SLA contatto entro 2h",
    "",
    "⚠️ CAC Troppo Alto",
    "  - → Ottimizzazione ossessiva Landing Page + A/B testing"
])

# --- SLIDE 9: ACTION PLAN ---
add_slide("Prossimi Passi Immediati", [
    "✅ Preparare 3 varianti creative Meta Ads",
    "✅ Lista 50 cliniche target nella città pilota",
    "✅ Configurare tracking (Pixel + GA4) sul Form Check-up",
    "✅ Setup Resend per email transazionali",
    "✅ Lancio campagna test su 1 città"
], subtitle="Settimana 1 - Execution Mode")

# Salva
prs.save('FacileMedical_Presentazione.pptx')
print("✅ Presentazione creata: FacileMedical_Presentazione.pptx")
