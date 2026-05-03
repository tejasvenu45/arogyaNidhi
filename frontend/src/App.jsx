import { useEffect, useState } from "react"
import axios from "axios"

const palette = {
  mint: "#3ecf8e",
  teal: "#0d9488",
  sky: "#38bdf8",
  leafGreen: "#4ade80",
  softCoral: "#fb7185",
  warmYellow: "#fbbf24",
  bg: "#f0fdf9",
  card: "#ffffff",
  textDark: "#0f4c41",
  textMid: "#2d7a6a",
  textLight: "#6b9e93",
}

const icons = {
  income: "💰",
  bpl: "📋",
  condition: "🩺",
  occupation: "💼",
  age: "🎂",
  default: "❓",
}

const questionIcons = [icons.income, icons.bpl, icons.condition, icons.occupation, icons.age]

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Lora:ital,wght@0,500;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Nunito', sans-serif;
    background: #f0fdf9;
    min-height: 100vh;
  }

  .app-shell {
    max-width: 420px;
    margin: 0 auto;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background: #f0fdf9;
    position: relative;
    overflow: hidden;
  }

  /* Decorative blobs */
  .blob1 {
    position: fixed;
    top: -80px;
    right: -60px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, #a7f3d0 0%, #6ee7b7 60%, transparent 100%);
    border-radius: 50%;
    opacity: 0.45;
    pointer-events: none;
    z-index: 0;
  }
  .blob2 {
    position: fixed;
    bottom: -60px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #bfdbfe 0%, #93c5fd 60%, transparent 100%);
    border-radius: 50%;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  /* Header */
  .header {
    padding: 20px 20px 0;
    position: relative;
    z-index: 1;
  }
  .logo-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .logo-icon {
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, #10b981, #0d9488);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 4px 12px rgba(16,185,129,0.3);
  }
  .logo-text {
    font-size: 18px;
    font-weight: 800;
    color: #0f4c41;
    letter-spacing: -0.3px;
  }
  .logo-text span {
    color: #10b981;
  }
  .tagline {
    font-size: 12px;
    color: #6b9e93;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding-left: 46px;
  }

  /* Progress area */
  .progress-area {
    padding: 18px 20px 0;
    position: relative;
    z-index: 1;
  }
  .progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .progress-step {
    font-size: 13px;
    font-weight: 700;
    color: #0d9488;
  }
  .progress-pct {
    font-size: 12px;
    color: #6b9e93;
    font-weight: 600;
  }
  .progress-bar-bg {
    height: 7px;
    background: #d1fae5;
    border-radius: 99px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #34d399, #0d9488);
    border-radius: 99px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Step dots */
  .step-dots {
    display: flex;
    gap: 6px;
    justify-content: center;
    margin-top: 10px;
  }
  .step-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d1fae5;
    transition: all 0.3s;
  }
  .step-dot.done {
    background: #10b981;
    width: 22px;
    border-radius: 4px;
  }
  .step-dot.active {
    background: #0d9488;
    width: 22px;
    border-radius: 4px;
  }

  /* Question card */
  .q-card {
    margin: 18px 16px;
    background: white;
    border-radius: 24px;
    padding: 28px 22px 24px;
    box-shadow: 0 8px 32px rgba(0,100,80,0.08), 0 1px 4px rgba(0,0,0,0.04);
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    border: 1.5px solid rgba(167,243,208,0.5);
  }

  .q-icon-wrap {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin: 0 auto 16px;
    box-shadow: 0 4px 12px rgba(16,185,129,0.12);
  }

  .q-number {
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    color: #10b981;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .q-text {
    font-family: 'Lora', serif;
    font-size: 19px;
    font-weight: 500;
    color: #0f4c41;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 24px;
  }

  .q-inputs {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  /* Number input */
  .num-input-wrap {
    position: relative;
  }
  .num-input {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid #d1fae5;
    border-radius: 16px;
    font-size: 18px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    color: #0f4c41;
    outline: none;
    background: #f8fffc;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .num-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 4px rgba(16,185,129,0.12);
    background: white;
  }
  .num-input::placeholder { color: #a7c9c0; font-weight: 600; }

  /* Boolean buttons */
  .bool-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .bool-btn {
    padding: 18px 12px;
    border: 2px solid #d1fae5;
    border-radius: 18px;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    cursor: pointer;
    background: white;
    color: #2d7a6a;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .bool-btn .bool-emoji { font-size: 26px; }
  .bool-btn:hover { border-color: #6ee7b7; background: #f0fdf9; }
  .bool-btn.selected-yes {
    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
    border-color: #10b981;
    color: #065f46;
    box-shadow: 0 4px 16px rgba(16,185,129,0.2);
    transform: translateY(-2px);
  }
  .bool-btn.selected-no {
    background: linear-gradient(135deg, #fff1f2, #ffe4e6);
    border-color: #fb7185;
    color: #9f1239;
    box-shadow: 0 4px 16px rgba(251,113,133,0.15);
    transform: translateY(-2px);
  }

  /* Choice buttons */
  .choice-btn {
    width: 100%;
    padding: 15px 18px;
    border: 2px solid #d1fae5;
    border-radius: 14px;
    font-size: 15px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    cursor: pointer;
    background: white;
    color: #2d7a6a;
    text-align: left;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .choice-btn::before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #6ee7b7;
    flex-shrink: 0;
    transition: all 0.2s;
  }
  .choice-btn:hover { border-color: #6ee7b7; background: #f0fdf9; }
  .choice-btn.selected {
    background: linear-gradient(90deg, #ecfdf5, #f0fdf9);
    border-color: #10b981;
    color: #065f46;
    box-shadow: 0 3px 12px rgba(16,185,129,0.15);
  }
  .choice-btn.selected::before {
    background: #10b981;
    border-color: #10b981;
  }

  /* Nav buttons */
  .nav-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 24px;
    position: relative;
    z-index: 1;
    gap: 12px;
  }
  .btn-back {
    flex: 0 0 auto;
    padding: 14px 20px;
    border-radius: 14px;
    border: 2px solid #d1fae5;
    background: white;
    color: #2d7a6a;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .btn-back:disabled { opacity: 0.35; cursor: not-allowed; }
  .btn-back:not(:disabled):hover { border-color: #6ee7b7; background: #f0fdf9; }

  .btn-next {
    flex: 1;
    padding: 16px 20px;
    border-radius: 16px;
    border: none;
    background: linear-gradient(135deg, #10b981, #0d9488);
    color: white;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 6px 20px rgba(16,185,129,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: 0.2px;
  }
  .btn-next:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(16,185,129,0.45);
  }
  .btn-next:active { transform: translateY(0); }

  /* Loading */
  .loading-screen {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: #f0fdf9;
  }
  .spinner {
    width: 44px;
    height: 44px;
    border: 4px solid #d1fae5;
    border-top-color: #10b981;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text {
    font-size: 16px;
    font-weight: 700;
    color: #2d7a6a;
  }

  /* Results screen */
  .results-shell {
    max-width: 420px;
    margin: 0 auto;
    min-height: 100dvh;
    background: #f0fdf9;
    padding: 0 0 32px;
    overflow: hidden;
  }
  .results-hero {
    background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
    padding: 36px 24px 28px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .results-hero::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 60px;
    background: #f0fdf9;
    border-radius: 50%;
  }
  .results-hero-icon {
    font-size: 48px;
    display: block;
    margin-bottom: 10px;
  }
  .results-hero h1 {
    font-family: 'Lora', serif;
    font-size: 22px;
    font-weight: 500;
    color: white;
    margin-bottom: 6px;
    font-style: italic;
  }
  .results-hero p {
    font-size: 13px;
    color: rgba(255,255,255,0.8);
    font-weight: 600;
  }

  .results-body {
    padding: 44px 16px 0;
  }

  .section-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #0d9488;
    margin-bottom: 12px;
    padding-left: 4px;
  }

  .scheme-card {
    background: white;
    border-radius: 18px;
    padding: 16px 18px;
    margin-bottom: 10px;
    border: 1.5px solid #d1fae5;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    box-shadow: 0 2px 10px rgba(0,100,80,0.06);
  }
  .scheme-card-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #34d399, #0d9488);
    flex-shrink: 0;
    margin-top: 5px;
  }
  .scheme-card-text {
    font-size: 15px;
    font-weight: 700;
    color: #0f4c41;
    line-height: 1.4;
  }

  .docs-section { margin-top: 24px; }
  .doc-card {
    background: white;
    border-radius: 14px;
    padding: 13px 16px;
    margin-bottom: 8px;
    border: 1.5px solid #fef9c3;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .doc-icon {
    font-size: 18px;
    flex-shrink: 0;
  }
  .doc-text {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
  }

  .restart-btn {
    display: block;
    width: calc(100% - 32px);
    margin: 24px 16px 0;
    padding: 16px;
    border-radius: 16px;
    border: 2px solid #d1fae5;
    background: white;
    color: #0d9488;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }
  .restart-btn:hover { background: #f0fdf9; border-color: #6ee7b7; }

  /* Hospitals section */
  .hospitals-section { margin-top: 24px; }

  .hospital-card {
    background: white;
    border-radius: 18px;
    padding: 14px 16px;
    margin-bottom: 10px;
    border: 1.5px solid #e0f2fe;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: 0 2px 10px rgba(14,116,144,0.07);
    position: relative;
    overflow: hidden;
  }
  .hospital-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    border-radius: 4px 0 0 4px;
  }
  .hospital-card.apollo::before { background: linear-gradient(180deg, #3b82f6, #6366f1); }
  .hospital-card.peoples::before { background: linear-gradient(180deg, #10b981, #0d9488); }
  .hospital-card.fortis::before { background: linear-gradient(180deg, #f59e0b, #ef4444); }

  .hospital-logo {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }
  .hospital-card.apollo .hospital-logo { background: #eff6ff; }
  .hospital-card.peoples .hospital-logo { background: #ecfdf5; }
  .hospital-card.fortis .hospital-logo { background: #fff7ed; }

  .hospital-info { flex: 1; min-width: 0; }
  .hospital-name {
    font-size: 15px;
    font-weight: 800;
    color: #0f4c41;
    margin-bottom: 2px;
  }
  .hospital-tag {
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    letter-spacing: 0.3px;
  }
  .hospital-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 9px;
    border-radius: 20px;
    flex-shrink: 0;
  }
  .hospital-card.apollo .hospital-badge { background: #eff6ff; color: #3b82f6; }
  .hospital-card.peoples .hospital-badge { background: #ecfdf5; color: #10b981; }
  .hospital-card.fortis .hospital-badge { background: #fff7ed; color: #f59e0b; }
`

export default function App() {
  const [questions, setQuestions] = useState([])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/questions")
      .then(res => setQuestions(res.data.questions))
      .catch(err => console.error(err))
  }, [])

  const currentQuestion = questions[step]
  const progress = questions.length ? ((step) / questions.length) * 100 : 0

  const handleChange = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
  }

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      submitAnswers()
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const submitAnswers = () => {
    setSubmitting(true)
    const payload = {
      income: Number(answers[1]),
      bpl: answers[2] === "true",
      condition: answers[3],
      occupation: answers[4],
      age: Number(answers[5])
    }
    axios.post("http://127.0.0.1:5000/evaluate", payload)
      .then(res => setResult(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setSubmitting(false))
  }

  if (submitting) {
    return (
      <>
        <style>{style}</style>
        <div className="loading-screen">
          <div className="spinner" />
          <p className="loading-text">Finding your schemes…</p>
        </div>
      </>
    )
  }

  if (result) {
    return (
      <>
        <style>{style}</style>
        <div className="results-shell">
          <div className="results-hero">
            <span className="results-hero-icon">🎉</span>
            <h1>You're Eligible!</h1>
            <p>{result.eligible_schemes?.length || 0} schemes found for you</p>
          </div>
          <div className="results-body">
            <p className="section-label">✅ Eligible Schemes</p>
            {result.eligible_schemes?.map((scheme, idx) => (
              <div key={idx} className="scheme-card">
                <div className="scheme-card-dot" />
                <p className="scheme-card-text">{scheme}</p>
              </div>
            ))}
            <div className="docs-section">
              <p className="section-label">📄 Documents Required</p>
              {result.documents_required?.map((doc, idx) => (
                <div key={idx} className="doc-card">
                  <span className="doc-icon">📌</span>
                  <p className="doc-text">{doc}</p>
                </div>
              ))}
            </div>

            <div className="hospitals-section">
              <p className="section-label">🏥 3 Hospitals Near You</p>

              <div className="hospital-card apollo">
                <div className="hospital-logo">🔵</div>
                <div className="hospital-info">
                  <p className="hospital-name">Apollo Hospitals</p>
                  <p className="hospital-tag">Multi-speciality · Accredited</p>
                </div>
                <span className="hospital-badge">Empanelled</span>
              </div>

              <div className="hospital-card peoples">
                <div className="hospital-logo">🌿</div>
                <div className="hospital-info">
                  <p className="hospital-name">People's Tree Hospital</p>
                  <p className="hospital-tag">Cancer & Cardio · Trusted</p>
                </div>
                <span className="hospital-badge">Empanelled</span>
              </div>

              <div className="hospital-card fortis">
                <div className="hospital-logo">🟠</div>
                <div className="hospital-info">
                  <p className="hospital-name">Fortis Hospital</p>
                  <p className="hospital-tag">Super-speciality · 24/7</p>
                </div>
                <span className="hospital-badge">Empanelled</span>
              </div>
            </div>
          </div>
          <button className="restart-btn" onClick={() => { setResult(null); setStep(0); setAnswers({}) }}>
            ↩ Start Over
          </button>
        </div>
      </>
    )
  }

  if (!currentQuestion) {
    return (
      <>
        <style>{style}</style>
        <div className="loading-screen">
          <div className="spinner" />
          <p className="loading-text">Loading questions…</p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{style}</style>
      <div className="app-shell">
        <div className="blob1" />
        <div className="blob2" />

        {/* Header */}
        <div className="header">
          <div className="logo-row">
            <div className="logo-icon">🌿</div>
            <span className="logo-text">Health<span>Aid</span></span>
          </div>
          <p className="tagline">Welfare Scheme Finder</p>
        </div>

        {/* Progress */}
        <div className="progress-area">
          <div className="progress-label">
            <span className="progress-step">Step {step + 1} of {questions.length}</span>
            <span className="progress-pct">{Math.round(progress)}% done</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="step-dots">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="q-card">
          <div className="q-icon-wrap">
            {questionIcons[step] || icons.default}
          </div>
          <p className="q-number">Question {step + 1}</p>
          <h2 className="q-text">{currentQuestion.question}</h2>

          <div className="q-inputs">
            {currentQuestion.type === "number" && (
              <div className="num-input-wrap">
                <input
                  type="number"
                  className="num-input"
                  placeholder="Enter value…"
                  value={answers[currentQuestion.id] || ""}
                  onChange={e => handleChange(e.target.value)}
                />
              </div>
            )}

            {currentQuestion.type === "boolean" && (
              <div className="bool-row">
                <button
                  className={`bool-btn ${answers[currentQuestion.id] === "true" ? "selected-yes" : ""}`}
                  onClick={() => handleChange("true")}
                >
                  <span className="bool-emoji">✅</span>
                  Yes
                </button>
                <button
                  className={`bool-btn ${answers[currentQuestion.id] === "false" ? "selected-no" : ""}`}
                  onClick={() => handleChange("false")}
                >
                  <span className="bool-emoji">❌</span>
                  No
                </button>
              </div>
            )}

            {currentQuestion.type === "choice" && (
              <div>
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`choice-btn ${answers[currentQuestion.id] === opt ? "selected" : ""}`}
                    onClick={() => handleChange(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="nav-row">
          <button className="btn-back" onClick={prevStep} disabled={step === 0}>
            ← Back
          </button>
          <button
            className="btn-next"
            onClick={nextStep}
            disabled={answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === ""}
          >
            {step === questions.length - 1 ? "Submit ✨" : "Next →"}
          </button>
        </div>
      </div>
    </>
  )
}